import http from 'http';

async function testTrackerConsistency() {
  console.log('--- Testing Tracker Cross-Device Consistency & MongoDB Calculations ---');

  const testUser = {
    name: 'Aswin CrossDevice Test',
    email: `aswin.test.${Date.now()}@fitkart.app`,
    password: 'password123',
    currentWeight: 80,
    startingWeight: 85,
    targetWeight: 72,
    height: 180,
    age: 26,
    gender: 'male',
    goal: 'Weight Loss',
    activityLevel: 'moderate'
  };

  // 1. Register
  const regRes = await makeRequest('/api/auth/register', 'POST', testUser);
  console.log('Register Response Status:', regRes.status);
  const token = regRes.data.token;
  const user = regRes.data.user;

  console.log('User Registered with ID:', user.id);
  console.log('Initial Metabolic Metrics:');
  console.log('  BMI:', user.metabolicMetrics.bmi, `(${user.metabolicMetrics.bmiCategory})`);
  console.log('  BMR:', user.metabolicMetrics.bmr);
  console.log('  TDEE:', user.metabolicMetrics.tdee);
  console.log('  Calorie Target:', user.metabolicMetrics.calorieGoal);
  console.log('  Protein Target:', user.metabolicMetrics.proteinGoal);
  console.log('  Water Glasses:', user.metabolicMetrics.waterGoalGlasses);
  console.log('  Journey Progress:', user.metabolicMetrics.journey);

  // 2. Simulate Device 1 (e.g. Laptop) updating weight to 78 kg and goal to Weight Loss
  console.log('\n--- Simulating Device 1 (Laptop): Updating weight to 78 kg ---');
  const updateRes = await makeRequest('/api/auth/profile', 'PUT', {
    currentWeight: 78,
    fitnessStats: {
      currentWeight: 78,
      weightHistory: [
        { weight: 80, date: '2026-09-13', note: 'Initial weigh-in' },
        { weight: 78, date: '2026-09-14', note: 'Post morning workout' }
      ]
    }
  }, token);
  console.log('Device 1 Update Status:', updateRes.status);

  // 3. Simulate Device 2 (Mobile) logging in or calling /api/auth/me
  console.log('\n--- Simulating Device 2 (Mobile): Calling /api/auth/me ---');
  const meRes = await makeRequest('/api/auth/me', 'GET', null, token);
  console.log('Device 2 Fetch Status:', meRes.status);
  const meUser = meRes.data.user;

  console.log('Device 2 (Mobile) Retrieved User Data:');
  console.log('  Current Weight:', meUser.currentWeight, 'kg');
  console.log('  Starting Weight:', meUser.startingWeight, 'kg');
  console.log('  Target Weight:', meUser.targetWeight, 'kg');
  console.log('  BMI:', meUser.metabolicMetrics.bmi, `(${meUser.metabolicMetrics.bmiCategory})`);
  console.log('  BMR:', meUser.metabolicMetrics.bmr);
  console.log('  TDEE:', meUser.metabolicMetrics.tdee);
  console.log('  Calorie Target:', meUser.metabolicMetrics.calorieGoal);
  console.log('  Protein Target:', meUser.metabolicMetrics.proteinGoal);
  console.log('  Water Target (Glasses):', meUser.metabolicMetrics.waterGoalGlasses);
  console.log('  Journey Progress %:', meUser.metabolicMetrics.journey.percentage + '%');
  console.log('  Remaining kg:', meUser.metabolicMetrics.journey.remainingKg + ' kg');
  console.log('  Weight History Entries:', meUser.fitnessStats.weightHistory.length);

  // Assertions
  const passed = (
    meUser.currentWeight === 78 &&
    meUser.startingWeight === 85 &&
    meUser.targetWeight === 72 &&
    meUser.metabolicMetrics.calorieGoal > 0 &&
    meUser.metabolicMetrics.proteinGoal === Math.round(78 * 1.8) &&
    meUser.fitnessStats.weightHistory.length === 2
  );

  console.log('\n=========================================');
  console.log('CONSISTENCY TEST RESULT:', passed ? '✅ PASSED (100% MATCH ACROSS DEVICES)' : '❌ FAILED');
  console.log('=========================================');
}

function makeRequest(path, method, body, token) {
  return new Promise((resolve, reject) => {
    const dataStr = body ? JSON.stringify(body) : '';
    const req = http.request({
      hostname: '127.0.0.1',
      port: 5000,
      path,
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(dataStr ? { 'Content-Length': Buffer.byteLength(dataStr) } : {}),
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      }
    }, (res) => {
      let raw = '';
      res.on('data', chunk => raw += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(raw) });
        } catch {
          resolve({ status: res.statusCode, data: raw });
        }
      });
    });
    req.on('error', reject);
    if (dataStr) req.write(dataStr);
    req.end();
  });
}

testTrackerConsistency();
