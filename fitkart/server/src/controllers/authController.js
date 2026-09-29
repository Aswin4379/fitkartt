import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Otp from '../models/Otp.js';
import { calculateMetabolicMetrics, getLocalDateString } from '../utils/metabolicEngine.js';
import transporter from '../utils/email.js';

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required.' });

    // Check if user already exists (for signup flow)
    const existingUser = await User.findOne({ email });
    if (existingUser && req.path.includes('register')) {
      return res.status(400).json({ message: 'Email already registered.' });
    }

    // Rate Limiting: Check if there's an existing OTP requested recently (e.g., within the last 60 seconds)
    const existingOtp = await Otp.findOne({ email });
    if (existingOtp) {
      const timeSinceCreation = Date.now() - new Date(existingOtp.createdAt).getTime();
      if (timeSinceCreation < 60000) { // 60 seconds
        return res.status(429).json({ message: 'Please wait a minute before requesting a new OTP.' });
      }
      // Invalidate the previous OTP by deleting it
      await Otp.deleteOne({ email });
    }

    // Generate secure random 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    
    // Store OTP in database with 5 minute expiration
    await Otp.create({
      email,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000)
    });

    // Try sending email using real SMTP
    const mailOptions = {
      from: process.env.EMAIL_USER || 'FitKart <no-reply@fitkart.app>',
      to: email,
      subject: 'FitKart - Your Verification Code',
      text: `Welcome to FitKart! Your 4-digit verification code is: ${otp}\n\nThis code will expire in 5 minutes.`
    };

    try {
      console.log(`\n========================================`);
      console.log(`🔑 DEV/RENDER OTP: The OTP for ${email} is: ${otp} 🔑`);
      console.log(`========================================\n`);

      if (process.env.EMAIL_USER && process.env.EMAIL_PASS && !process.env.EMAIL_PASS.includes('put_your')) {
        // Fire and forget so we do not block the API response
        transporter.sendMail(mailOptions)
          .then(() => console.log(`[OTP] Email sending initiated for ${email}`))
          .catch(err => console.error('[Nodemailer Error]: Failed to send email to', email));
      } else {
        console.warn(`[WARNING] Cannot send OTP. SMTP credentials are missing in .env!`);
      }
      // Respond immediately without waiting for the email to finish sending
      res.json({ success: true, message: 'OTP sent successfully to your email.' });
    } catch (err) {
      console.error('[Send OTP Logic Error]:', err);
      res.status(500).json({ message: 'Error initiating OTP email.' });
    }
  } catch (err) {
    console.error('[Send OTP Error]:', err.message);
    res.status(500).json({ message: 'Failed to process OTP request.' });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ message: 'Email and OTP are required.' });

    const storedOtp = await Otp.findOne({ email });
    
    if (!storedOtp) {
      return res.status(400).json({ message: 'OTP expired or not found. Please request a new one.' });
    }

    if (Date.now() > new Date(storedOtp.expiresAt).getTime()) {
      await Otp.deleteOne({ email });
      return res.status(400).json({ message: 'OTP has expired. Please resend.' });
    }

    // Rate Limiting: Max 3 failed attempts
    if (storedOtp.attempts >= 3) {
      await Otp.deleteOne({ email });
      return res.status(400).json({ message: 'Too many failed attempts. Please request a new OTP.' });
    }

    // Verify hashed OTP
    const isMatch = await storedOtp.matchOtp(otp);
    if (!isMatch) {
      storedOtp.attempts += 1;
      await storedOtp.save();
      return res.status(400).json({ message: 'Invalid OTP. Please try again.' });
    }

    // Verification succeeds: Invalidate (delete) the OTP so it can only be used once
    await Otp.deleteOne({ email });
    
    // Generate a temporary token for password reset if needed
    const resetToken = jwt.sign({ resetEmail: email }, process.env.JWT_SECRET || 'fitkart_super_secret_jwt_key_2026_fitkart', { expiresIn: '15m' });
    
    res.json({ success: true, message: 'OTP verified successfully.', resetToken });
  } catch (err) {
    console.error('[Verify OTP Error]:', err.message);
    res.status(500).json({ message: 'Failed to verify OTP.' });
  }
};

const generateToken = (id, role = 'user') => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || 'fitkart_super_secret_jwt_key_2026_fitkart', {
    expiresIn: '30d'
  });
};

const formatUserResponse = (user, clientDate) => {
  const effectiveDate = clientDate || getLocalDateString();
  const stats = user.fitnessStats?.toObject ? user.fitnessStats.toObject() : (user.fitnessStats || {});
  const currentWeight = Number(stats.currentWeight ?? user.currentWeight ?? 70);
  const startingWeight = Number(stats.startingWeight ?? user.startingWeight ?? 75);
  const targetWeight = Number(stats.targetWeight ?? user.targetWeight ?? 65);
  const height = Number(user.height ?? 175);
  const age = Number(user.age ?? 24);
  const gender = user.gender || 'male';
  const goal = user.goal || 'Fitness Maintenance';
  const activityLevel = user.activityLevel || 'moderate';

  const metrics = calculateMetabolicMetrics({
    weight: currentWeight,
    height,
    age,
    gender,
    goal,
    activityLevel,
    startingWeight,
    targetWeight
  });

  // 1. Process Meals & Daily Nutrition
  const rawNutrition = stats.nutrition || {};
  const allMeals = Array.isArray(rawNutrition.meals) ? rawNutrition.meals : [];
  // Today's meals strictly matching effectiveDate
  const todayMeals = allMeals.filter(m => {
    if (!m.date) return false;
    return m.date === effectiveDate || getLocalDateString(m.date) === effectiveDate;
  });
  const caloriesConsumed = todayMeals.reduce((sum, m) => sum + (Number(m.calories) || 0), 0);
  const proteinConsumed = todayMeals.reduce((sum, m) => sum + (Number(m.protein) || 0), 0);
  const carbsConsumed = todayMeals.reduce((sum, m) => sum + (Number(m.carbs) || 0), 0);
  const fatConsumed = todayMeals.reduce((sum, m) => sum + (Number(m.fat) || 0), 0);

  // 2. Process Daily Water & Hydration
  const rawWater = stats.water || {};
  let waterGlasses = 0;
  let waterHistory = Array.isArray(rawWater.history) ? [...rawWater.history] : [];
  
  if (rawWater.lastUpdatedDate === effectiveDate) {
    waterGlasses = Number(rawWater.glasses) || 0;
  } else {
    // New calendar day: water starts at 0 for today
    if (rawWater.glasses && rawWater.lastUpdatedDate && !waterHistory.some(h => h.date === rawWater.lastUpdatedDate)) {
      waterHistory.push({ date: rawWater.lastUpdatedDate, glasses: Number(rawWater.glasses) });
    }
    waterGlasses = 0;
  }

  // 3. Process Workout Logs & Today's Workouts (Strict Date Filtering)
  const rawWorkoutLogs = Array.isArray(stats.workoutLogs) ? stats.workoutLogs : [];
  // Deduplicate workoutLogs by ID or unique timestamp to ensure clean database state
  const seenLogIds = new Set();
  const workoutLogs = rawWorkoutLogs.filter((log) => {
    if (!log) return false;
    const identifier = log.id || `${log.workoutName || log.routineName}_${log.completedAt || log.date}`;
    if (seenLogIds.has(identifier)) return false;
    seenLogIds.add(identifier);
    return true;
  });

  const todaysWorkouts = workoutLogs.filter(log => {
    if (!log) return false;
    const logDate = getLocalDateString(log.date || log.completedAt);
    return Boolean(logDate) && logDate === effectiveDate;
  });
  const todaysWorkoutMinutes = todaysWorkouts.reduce((sum, w) => sum + (Number(w.durationMinutes || w.duration) || 0), 0);
  const todaysCaloriesBurned = todaysWorkouts.reduce((sum, w) => sum + (Number(w.caloriesBurned || w.calories) || Math.round((Number(w.durationMinutes || w.duration) || 30) * 7.5)), 0);
  const todaysCompletedCount = todaysWorkouts.length;

  // 4. Process Activity (Today vs History) strictly from actual completion records
  const rawActivity = stats.activity || {};
  const todayMinutes = todaysWorkoutMinutes;
  const todayBurned = todaysCaloriesBurned;
  const todayWorkoutsCount = todaysCompletedCount;
  let activityHistory = Array.isArray(rawActivity.history) ? [...rawActivity.history] : [];

  // All-time aggregate calculations from persistent workout logs
  const allTimeCompleted = stats.workoutStats?.completed ?? workoutLogs.length;
  const allTimeTime = stats.workoutStats?.time ?? workoutLogs.reduce((sum, w) => sum + (Number(w.durationMinutes || w.duration) || 0), 0);
  const allTimeCalories = stats.workoutStats?.calories ?? workoutLogs.reduce((sum, w) => sum + (Number(w.caloriesBurned || w.calories) || 0), 0);

  return {
    id: user._id.toString(),
    _id: user._id.toString(),
    name: user.name,
    email: user.email,
    phone: user.phone || '',
    role: user.role || 'user',
    avatar: user.avatar || '',
    goal,
    age,
    gender,
    height,
    activityLevel,
    startingWeight,
    currentWeight,
    targetWeight,
    fitCoins: user.fitCoins ?? 150,
    isPremium: user.isPremium || false,
    subscription: user.subscription || { active: false, plan: null },
    cart: user.cart || [],
    addresses: user.addresses || [],
    wishlist: user.wishlist || [],
    orders: user.orders || [],
    metabolicMetrics: metrics,
    fitnessStats: {
      currentWeight,
      startingWeight,
      targetWeight,
      weightHistory: (stats.weightHistory && stats.weightHistory.length > 0) ? stats.weightHistory : [{ weight: currentWeight, date: effectiveDate }],
      water: {
        glasses: waterGlasses,
        maxGlasses: metrics.waterGoalGlasses,
        lastUpdatedDate: effectiveDate,
        history: waterHistory
      },
      nutrition: {
        calorieGoal: metrics.calorieGoal,
        proteinGoal: metrics.proteinGoal,
        caloriesConsumed,
        proteinConsumed,
        carbsConsumed,
        fatConsumed,
        lastUpdatedDate: effectiveDate,
        meals: allMeals,
        todayMeals
      },
      activity: {
        todayMinutes,
        todayCaloriesBurned: todayBurned,
        workoutsCompletedToday: todayWorkoutsCount,
        lastUpdatedDate: effectiveDate,
        history: activityHistory
      },
      streak: stats.streak || { current: 0, best: 0, lastActiveDate: '', history: [] },
      workoutStats: {
        todayCompleted: todaysCompletedCount,
        todayTime: todaysWorkoutMinutes,
        todayCalories: todaysCaloriesBurned,
        completed: allTimeCompleted,
        time: allTimeTime,
        calories: allTimeCalories,
        streak: stats.workoutStats?.streak || stats.streak?.current || 0,
        lastWorkoutDate: stats.workoutStats?.lastWorkoutDate || (workoutLogs.length > 0 ? (workoutLogs[0].date || workoutLogs[0].completedAt) : '')
      },
      workoutLogs,
      todaysWorkouts,
      workoutPRs: stats.workoutPRs || {},
      workoutAchievements: stats.workoutAchievements || [],
      achievements: stats.achievements || [],
      customWorkout: stats.customWorkout || null,
      recentActivities: stats.recentActivities || []
    }
  };
};

// @desc Register a new user
// @route POST /api/auth/register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, goal, age, height, startingWeight, currentWeight, targetWeight, activityLevel } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide name, email and password' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const userEmail = cleanEmail.includes('@') ? cleanEmail : `${cleanEmail}@gmail.com`;

    const existingUser = await User.findOne({
      $or: [{ email: cleanEmail }, { email: userEmail }]
    });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // First user can be admin or if email contains admin
    const isFirstUser = (await User.countDocuments({})) === 0;
    const role = (isFirstUser || userEmail.includes('admin')) ? 'admin' : 'user';

    const curW = currentWeight !== undefined ? Number(currentWeight) : 70;
    const startW = startingWeight !== undefined ? Number(startingWeight) : curW;
    const tarW = targetWeight !== undefined ? Number(targetWeight) : 65;

    const user = await User.create({
      name: name.trim(),
      email: userEmail,
      password,
      phone: phone || '',
      role,
      goal: goal || 'Fitness Maintenance',
      age: age ? Number(age) : 24,
      height: height ? Number(height) : 175,
      startingWeight: startW,
      currentWeight: curW,
      targetWeight: tarW,
      activityLevel: activityLevel || 'moderate',
      fitnessStats: {
        startingWeight: startW,
        currentWeight: curW,
        targetWeight: tarW,
        weightHistory: [{ weight: curW, date: new Date().toISOString().split('T')[0] }]
      }
    });

    const token = generateToken(user._id, user.role);
    const clientDate = req.headers['x-client-date'] || req.query.date || req.body?.clientDate || getLocalDateString();

    res.status(201).json({
      token,
      user: formatUserResponse(user, clientDate)
    });
  } catch (error) {
    console.error('[Register Error]:', error);
    res.status(500).json({ message: error.message || 'Server error during registration' });
  }
};

// @desc Login user & get token
// @route POST /api/auth/login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const userEmail = cleanEmail.includes('@') ? cleanEmail : `${cleanEmail}@gmail.com`;

    let user = await User.findOne({
      $or: [
        { email: cleanEmail },
        { email: userEmail },
        { email: `${cleanEmail}@fitkart.com` },
        { email: `${cleanEmail}@fitkart.app` }
      ]
    });

    if (!user) {
      // Auto-register athlete if account is new and password is at least 6 characters
      if (password.length >= 6) {
        const isFirstUser = (await User.countDocuments({})) === 0;
        const role = (isFirstUser || userEmail.includes('admin')) ? 'admin' : 'user';
        const rawName = userEmail.split('@')[0].replace(/[._0-9]/g, ' ').trim();
        const extractedName = rawName.length > 1
          ? rawName.replace(/\b\w/g, l => l.toUpperCase())
          : 'Athlete ' + userEmail.split('@')[0];

        user = await User.create({
          name: extractedName,
          email: userEmail,
          password,
          role,
          goal: 'Fitness Maintenance',
          age: 24,
          height: 175,
          startingWeight: 75,
          currentWeight: 70,
          targetWeight: 65,
          activityLevel: 'moderate'
        });
      } else {
        return res.status(401).json({ message: 'No account found with this email. Password must be at least 6 characters to create account.' });
      }
    } else {
      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Incorrect password. Please try again or use Forgot Password.' });
      }
    }

    const token = generateToken(user._id, user.role);
    const clientDate = req.headers['x-client-date'] || req.query.date || req.body?.clientDate || getLocalDateString();

    res.json({
      token,
      user: formatUserResponse(user, clientDate)
    });
  } catch (error) {
    console.error('[Login Error]:', error);
    res.status(500).json({ message: error.message || 'Server error during login' });
  }
};

// @desc Google Login / OAuth handler
// @route POST /api/auth/google
export const googleAuth = async (req, res) => {
  try {
    const { email, name, avatar } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Google account email is required' });
    }
    const cleanEmail = email.trim().toLowerCase();
    const userEmail = cleanEmail.includes('@') ? cleanEmail : `${cleanEmail}@gmail.com`;

    let user = await User.findOne({
      $or: [
        { email: cleanEmail },
        { email: userEmail }
      ]
    });

    if (!user) {
      const isFirstUser = (await User.countDocuments({})) === 0;
      const role = (isFirstUser || userEmail.includes('admin')) ? 'admin' : 'user';
      const rawName = name?.trim() || userEmail.split('@')[0].replace(/[._0-9]/g, ' ').trim();
      const extractedName = rawName.length > 1
        ? rawName.replace(/\b\w/g, l => l.toUpperCase())
        : userEmail.split('@')[0];

      user = await User.create({
        name: extractedName,
        email: userEmail,
        password: Math.random().toString(36).slice(-10) + 'A1!',
        avatar: avatar || '',
        role,
        goal: 'Fitness Maintenance',
        age: 24,
        height: 175,
        startingWeight: 75,
        currentWeight: 70,
        targetWeight: 65,
        activityLevel: 'moderate'
      });
    }

    const token = generateToken(user._id, user.role);
    const clientDate = req.headers['x-client-date'] || req.query.date || req.body?.clientDate || getLocalDateString();

    res.json({
      token,
      user: formatUserResponse(user, clientDate)
    });
  } catch (error) {
    console.error('[Google Auth Error]:', error);
    res.status(500).json({ message: error.message || 'Server error during Google Sign-In' });
  }
};

// @desc Reset user password
// @route POST /api/auth/reset-password
export const resetPassword = async (req, res) => {
  try {
    const { email, password, resetToken } = req.body;
    if (!email || !password || !resetToken) {
      return res.status(400).json({ message: 'Please provide email, reset token, and new password' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const cleanEmail = email.trim().toLowerCase();

    // Verify reset token
    try {
      const decoded = jwt.verify(resetToken, process.env.JWT_SECRET || 'fitkart_super_secret_jwt_key_2026_fitkart');
      if (decoded.resetEmail !== cleanEmail) {
        return res.status(400).json({ message: 'Invalid reset token for this email.' });
      }
    } catch (err) {
      return res.status(400).json({ message: 'Invalid or expired reset token. Please verify OTP again.' });
    }

    const user = await User.findOne({
      $or: [
        { email: cleanEmail },
        { email: `${cleanEmail}@gmail.com` }
      ]
    });

    if (!user) {
      return res.status(404).json({ message: 'No account found with this email' });
    }

    user.password = password;
    await user.save();

    const token = generateToken(user._id, user.role);
    const clientDate = req.headers['x-client-date'] || req.query.date || req.body?.clientDate || getLocalDateString();

    res.json({
      message: 'Password reset successfully',
      token,
      user: formatUserResponse(user, clientDate)
    });
  } catch (error) {
    console.error('[Reset Password Error]:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// @desc Get current user profile
// @route GET /api/auth/me
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    const clientDate = req.headers['x-client-date'] || req.query.date || getLocalDateString();
    res.json({
      user: formatUserResponse(user, clientDate)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Update user profile
// @route PUT /api/auth/profile
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const clientDate = req.headers['x-client-date'] || req.query.date || req.body?.clientDate || getLocalDateString();
    const {
      name, phone, avatar, goal, isPremium, fitCoins, subscription,
      age, gender, height, activityLevel, startingWeight, currentWeight, targetWeight,
      cart, fitnessStats
    } = req.body;

    if (name) user.name = name;
    if (phone !== undefined) user.phone = phone;
    if (avatar !== undefined) user.avatar = avatar;
    if (goal !== undefined) user.goal = goal;
    if (age !== undefined) user.age = Number(age);
    if (gender !== undefined) user.gender = gender;
    if (height !== undefined) user.height = Number(height);
    if (activityLevel !== undefined) user.activityLevel = activityLevel;
    if (startingWeight !== undefined) user.startingWeight = Number(startingWeight);
    if (currentWeight !== undefined) user.currentWeight = Number(currentWeight);
    if (targetWeight !== undefined) user.targetWeight = Number(targetWeight);
    if (isPremium !== undefined) user.isPremium = isPremium;
    if (fitCoins !== undefined) user.fitCoins = fitCoins;
    if (subscription !== undefined) user.subscription = subscription;
    if (cart !== undefined) user.cart = cart;

    if (fitnessStats !== undefined) {
      const existingStats = user.fitnessStats?.toObject ? user.fitnessStats.toObject() : (user.fitnessStats || {});
      
      user.fitnessStats = {
        ...existingStats,
        ...fitnessStats,
        water: {
          ...(existingStats.water || {}),
          ...(fitnessStats.water || {}),
          history: fitnessStats.water?.history !== undefined ? fitnessStats.water.history : (existingStats.water?.history || [])
        },
        nutrition: {
          ...(existingStats.nutrition || {}),
          ...(fitnessStats.nutrition || {}),
          meals: fitnessStats.nutrition?.meals !== undefined ? fitnessStats.nutrition.meals : (existingStats.nutrition?.meals || [])
        },
        activity: {
          ...(existingStats.activity || {}),
          ...(fitnessStats.activity || {}),
          history: fitnessStats.activity?.history !== undefined ? fitnessStats.activity.history : (existingStats.activity?.history || [])
        },
        streak: {
          ...(existingStats.streak || {}),
          ...(fitnessStats.streak || {}),
          history: fitnessStats.streak?.history !== undefined ? fitnessStats.streak.history : (existingStats.streak?.history || [])
        },
        workoutStats: {
          ...(existingStats.workoutStats || {}),
          ...(fitnessStats.workoutStats || {})
        },
        workoutLogs: (() => {
          const incoming = fitnessStats.workoutLogs !== undefined ? fitnessStats.workoutLogs : (existingStats.workoutLogs || []);
          if (!Array.isArray(incoming)) return [];
          const seen = new Set();
          return incoming.filter(log => {
            if (!log) return false;
            const key = log.id || `${log.workoutName || log.routineName}_${log.completedAt || log.date}`;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
          });
        })(),
        workoutPRs: fitnessStats.workoutPRs !== undefined ? fitnessStats.workoutPRs : (existingStats.workoutPRs || {}),
        workoutAchievements: fitnessStats.workoutAchievements !== undefined ? fitnessStats.workoutAchievements : (existingStats.workoutAchievements || []),
        weightHistory: fitnessStats.weightHistory !== undefined ? fitnessStats.weightHistory : (existingStats.weightHistory || []),
        achievements: fitnessStats.achievements !== undefined ? fitnessStats.achievements : (existingStats.achievements || []),
        recentActivities: fitnessStats.recentActivities !== undefined ? fitnessStats.recentActivities : (existingStats.recentActivities || []),
        customWorkout: fitnessStats.customWorkout !== undefined ? fitnessStats.customWorkout : (existingStats.customWorkout || null)
      };

      if (fitnessStats.currentWeight !== undefined) {
        user.currentWeight = Number(fitnessStats.currentWeight);
        user.fitnessStats.currentWeight = Number(fitnessStats.currentWeight);
      }
      if (fitnessStats.targetWeight !== undefined) {
        user.targetWeight = Number(fitnessStats.targetWeight);
        user.fitnessStats.targetWeight = Number(fitnessStats.targetWeight);
      }
      if (fitnessStats.startingWeight !== undefined) {
        user.startingWeight = Number(fitnessStats.startingWeight);
        user.fitnessStats.startingWeight = Number(fitnessStats.startingWeight);
      }
    } else {
      if (user.fitnessStats) {
        if (startingWeight !== undefined) user.fitnessStats.startingWeight = Number(startingWeight);
        if (currentWeight !== undefined) user.fitnessStats.currentWeight = Number(currentWeight);
        if (targetWeight !== undefined) user.fitnessStats.targetWeight = Number(targetWeight);
      }
    }

    // Recalculate and update nutritional goals if bio-metrics or goals changed
    const freshMetrics = calculateMetabolicMetrics({
      weight: user.currentWeight || 70,
      height: user.height || 175,
      age: user.age || 24,
      gender: user.gender || 'male',
      goal: user.goal || 'Fitness Maintenance',
      activityLevel: user.activityLevel || 'moderate',
      startingWeight: user.startingWeight || 75,
      targetWeight: user.targetWeight || 65
    });

    if (user.fitnessStats?.nutrition) {
      user.fitnessStats.nutrition.calorieGoal = freshMetrics.calorieGoal;
      user.fitnessStats.nutrition.proteinGoal = freshMetrics.proteinGoal;
    }
    if (user.fitnessStats?.water) {
      user.fitnessStats.water.maxGlasses = freshMetrics.waterGoalGlasses;
    }

    user.markModified('fitnessStats');
    if (cart !== undefined) user.markModified('cart');
    await user.save();

    res.json({
      user: formatUserResponse(user, clientDate)
    });
  } catch (error) {
    console.error('[Update Profile Error]:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc Add address
// @route POST /api/auth/addresses
export const addAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.addresses.push(req.body);
    await user.save();

    res.status(201).json({
      addresses: user.addresses,
      message: 'Address added successfully'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Delete address
// @route DELETE /api/auth/addresses/:id
export const deleteAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.addresses = user.addresses.filter(
      (a) => a._id.toString() !== req.params.id && a.id !== req.params.id
    );
    await user.save();

    res.json({
      addresses: user.addresses,
      message: 'Address removed successfully'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Toggle wishlist
// @route POST /api/auth/wishlist/toggle
export const toggleWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const exists = user.wishlist.includes(productId);
    if (exists) {
      user.wishlist = user.wishlist.filter((id) => id !== productId);
    } else {
      user.wishlist.push(productId);
    }

    await user.save();

    res.json({
      wishlist: user.wishlist,
      inWishlist: !exists
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
