/**
 * Centralized Metabolic & Bio-Metrics Calculation Engine (FitKart)
 * Implements clinical Mifflin-St Jeor formula, BMI, TDEE, and Goal-Scaled Nutrition Targets.
 */

export function calculateMetabolicMetrics({ weight, height, age, gender, goal, activityLevel, startingWeight, targetWeight }) {
  const w = Math.max(30, Math.min(300, Number(weight) || 70));
  const h = Math.max(100, Math.min(250, Number(height) || 175));
  const a = Math.max(10, Math.min(120, Number(age) || 24));
  const g = (gender || 'male').toLowerCase() === 'female' ? 'female' : 'male';
  const goalStr = goal || 'Fitness Maintenance';
  const act = (activityLevel || 'moderate').toLowerCase();

  // 1. BMI Calculation
  const heightInMeters = h / 100;
  const bmi = heightInMeters > 0 ? Number((w / (heightInMeters * heightInMeters)).toFixed(1)) : 22.5;
  let bmiCategory = 'Normal';
  let bmiColor = 'text-fit-primary';
  if (bmi < 18.5) {
    bmiCategory = 'Underweight';
    bmiColor = 'text-amber-400';
  } else if (bmi >= 25 && bmi < 30) {
    bmiCategory = 'Overweight';
    bmiColor = 'text-amber-400';
  } else if (bmi >= 30) {
    bmiCategory = 'Obese';
    bmiColor = 'text-red-400';
  }

  // 2. BMR calculation (Mifflin-St Jeor equation)
  const bmr = g === 'female'
    ? 10 * w + 6.25 * h - 5 * a - 161
    : 10 * w + 6.25 * h - 5 * a + 5;

  // 3. TDEE Multipliers
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    heavy: 1.725,
    athlete: 1.9
  };
  const factor = activityMultipliers[act] || 1.55;
  const tdee = Math.round(bmr * factor);

  // 4. Dynamic Calorie & Protein Goal Adjustments
  let calorieGoal = tdee;
  let proteinPerKg = 1.4; // Balanced maintenance baseline

  const lowerGoal = goalStr.toLowerCase();
  if (lowerGoal.includes('loss')) {
    calorieGoal -= 450; // Clean caloric deficit
    proteinPerKg = 1.8; // Muscle retention
  } else if (lowerGoal.includes('gain')) {
    calorieGoal += 450; // Surplus for hypertrophy
    proteinPerKg = 2.0; // Maximum synthesis
  }

  const finalCalories = Math.max(1200, Math.round(calorieGoal));
  const proteinGoal = Math.max(50, Math.round(w * proteinPerKg));
  const waterGoalGlasses = Math.max(8, Math.min(16, Math.round(w * 0.035 * 4))); // ~2.5L - 3.5L

  // 5. Transformation Journey Calculations
  const startW = Number(startingWeight) || w;
  const targetW = Number(targetWeight) || w;
  const isLoss = startW > targetW;
  const isGain = startW < targetW;

  let journeyPercentage = 0;
  let remainingKg = 0;
  const netChangeKg = Number((w - startW).toFixed(1));
  let journeyStatusText = 'On Track';

  if (isLoss) {
    const totalToLose = Math.max(0.1, startW - targetW);
    const lostSoFar = startW - w;
    journeyPercentage = Math.min(100, Math.max(0, Math.round((lostSoFar / totalToLose) * 100)));
    remainingKg = Math.max(0, Number((w - targetW).toFixed(1)));
    if (w <= targetW) journeyStatusText = 'Target Achieved! 🎉';
    else if (w < startW) journeyStatusText = `${(startW - w).toFixed(1)} kg dropped`;
    else journeyStatusText = 'Starting phase';
  } else if (isGain) {
    const totalToGain = Math.max(0.1, targetW - startW);
    const gainedSoFar = w - startW;
    journeyPercentage = Math.min(100, Math.max(0, Math.round((gainedSoFar / totalToGain) * 100)));
    remainingKg = Math.max(0, Number((targetW - w).toFixed(1)));
    if (w >= targetW) journeyStatusText = 'Target Achieved! 🎉';
    else if (w > startW) journeyStatusText = `${(w - startW).toFixed(1)} kg gained`;
    else journeyStatusText = 'Starting phase';
  } else {
    journeyPercentage = 100;
    remainingKg = 0;
    journeyStatusText = 'Maintaining Weight';
  }

  return {
    bmi,
    bmiCategory,
    bmiColor,
    bmr: Math.round(bmr),
    tdee,
    calorieGoal: finalCalories,
    proteinGoal,
    waterGoalGlasses,
    journey: {
      percentage: journeyPercentage,
      remainingKg,
      netChangeKg,
      statusText: journeyStatusText
    }
  };
}

export function getLocalDateString(dateInput = new Date()) {
  if (!dateInput) return '';

  if (typeof dateInput === 'string') {
    const trimmed = dateInput.trim();
    // 1. Standard ISO YYYY-MM-DD
    if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
      return trimmed;
    }
    // 2. Format DD/MM/YYYY or DD-MM-YYYY
    const ddmmyyyyMatch = trimmed.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
    if (ddmmyyyyMatch) {
      const day = ddmmyyyyMatch[1].padStart(2, '0');
      const month = ddmmyyyyMatch[2].padStart(2, '0');
      const year = ddmmyyyyMatch[3];
      return `${year}-${month}-${day}`;
    }
  }

  const d = dateInput instanceof Date ? dateInput : new Date(dateInput);
  if (isNaN(d.getTime())) {
    // If not a valid date, return empty string so it never falsely matches today
    return '';
  }
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}
