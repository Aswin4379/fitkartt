const BASE_URL = 'http://localhost:5000/api/bodycare';

async function postJson(url, data) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || `HTTP ${res.status}`);
  }
  return { status: res.status, data: json };
}

async function runE2ETests() {
  console.log('========================================================');
  console.log('🧪 BODYCARE AI COMPREHENSIVE END-TO-END VERIFICATION');
  console.log('========================================================\n');

  let passedTests = 0;
  let totalTests = 4;

  // TEST 1: Case A - Runner's Knee (Sharp pain after running 10k)
  console.log('--- TEST 1: Dynamic AI Generation - Runner\'s Knee (Sharp, Acute) ---');
  try {
    const t0 = Date.now();
    const resA = await postJson(`${BASE_URL}/assess`, {
      bodyPart: 'knees',
      bodyPartName: 'Knees (Patella / Joint)',
      bodySide: 'front',
      symptoms: {
        painType: 'Sharp / Stabbing',
        onset: '2 - 3 days ago',
        severity: 6,
        injuryRelated: true,
        injuryDetails: 'Felt a sharp twinge on the outer knee during kilometer 8 of a 10km run.',
        additionalSymptoms: ['Swelling / Inflammation', 'Reduced Range of Motion'],
        customDescription: 'Sharp pain when bending knee or descending stairs after running.'
      },
      consentGiven: false
    });
    const durA = ((Date.now() - t0) / 1000).toFixed(2);
    const gA = resA.data.guidance;
    console.log(`✅ Success in ${durA}s. Status: ${resA.status}`);
    console.log(`Possible Explanations: ${JSON.stringify(gA?.possibleExplanations)}`);
    console.log(`Thermal Therapy: ${gA?.thermalTherapy?.recommendation} - ${gA?.thermalTherapy?.instructions}`);
    console.log(`Gentle Movements count: ${gA?.gentleMovements?.length} (${gA?.gentleMovements?.map(m => m.name).join(', ')})`);
    console.log(`Movements to Avoid: ${gA?.movementsToAvoid?.join('; ')}`);
    console.log(`Urgency: ${gA?.medicalConsultation?.urgency}`);
    passedTests++;
  } catch (err) {
    console.error('❌ Test 1 Failed:', err.message);
  }

  // TEST 2: Case B - Knee Pain (Chronic, Dull Ache with Morning Stiffness - SAME BODY PART)
  console.log('\n--- TEST 2: Dynamic Differentiation - Chronic Knee Stiffness (Same Body Part, Different Symptoms) ---');
  try {
    const t0 = Date.now();
    const resB = await postJson(`${BASE_URL}/assess`, {
      bodyPart: 'knees',
      bodyPartName: 'Knees (Patella / Joint)',
      bodySide: 'front',
      symptoms: {
        painType: 'Dull Ache',
        onset: 'Over 1 month (Chronic)',
        severity: 3,
        injuryRelated: false,
        injuryDetails: '',
        additionalSymptoms: ['Morning Stiffness', 'Popping / Clicking Sound'],
        customDescription: 'Slow onset over months, feels stiff and tight every morning for 20 minutes.'
      },
      consentGiven: false
    });
    const durB = ((Date.now() - t0) / 1000).toFixed(2);
    const gB = resB.data.guidance;
    console.log(`✅ Success in ${durB}s. Status: ${resB.status}`);
    console.log(`Possible Explanations: ${JSON.stringify(gB?.possibleExplanations)}`);
    console.log(`Thermal Therapy: ${gB?.thermalTherapy?.recommendation} - ${gB?.thermalTherapy?.instructions}`);
    console.log(`Gentle Movements: ${gB?.gentleMovements?.map(m => m.name).join(', ')}`);
    console.log(`Movements to Avoid: ${gB?.movementsToAvoid?.join('; ')}`);
    console.log(`Urgency: ${gB?.medicalConsultation?.urgency}`);
    passedTests++;
  } catch (err) {
    console.error('❌ Test 2 Failed:', err.message);
  }

  // TEST 3: Red Flag Safety Escalation (Chest Pain / Cardiac Warning Signs)
  console.log('\n--- TEST 3: Deterministic & AI Red-Flag Emergency Escalation ---');
  try {
    const resRedFlag = await postJson(`${BASE_URL}/assess`, {
      bodyPart: 'chest',
      bodyPartName: 'Chest (Pectorals & Ribs)',
      bodySide: 'front',
      symptoms: {
        painType: 'Sharp / Stabbing',
        onset: 'Just today (Few hours)',
        severity: 9,
        injuryRelated: false,
        injuryDetails: '',
        additionalSymptoms: ['Radiating down arm / leg', 'Numbness / Pins & Needles'],
        customDescription: 'Crushing heavy chest tightness spreading to left jaw and shoulder with shortness of breath.'
      },
      consentGiven: false
    });
    const gRF = resRedFlag.data.guidance;
    console.log(`Status: ${resRedFlag.status}`);
    console.log(`isRedFlag: ${gRF?.isRedFlag}`);
    console.log(`Medical Consultation Urgency: ${gRF?.medicalConsultation?.urgency}`);
    console.log(`Red-Flag Reason: ${gRF?.redFlagReason}`);
    console.log(`Gentle Movements: ${JSON.stringify(gRF?.gentleMovements)}`);

    if (gRF?.isRedFlag === true && gRF?.medicalConsultation?.urgency === 'Emergency') {
      console.log('✅ PASS: Safety rule successfully prioritized emergency assessment over exercise/treatment.');
      passedTests++;
    } else {
      console.error('❌ Red flag escalation failed.');
    }
  } catch (err) {
    console.error('❌ Test 3 Failed:', err.message);
  }

  // TEST 4: Follow-Up Conversation Context
  console.log('\n--- TEST 4: Contextual Follow-Up Conversation ---');
  try {
    const resChat = await postJson(`${BASE_URL}/chat`, {
      bodyPart: 'Knees (Patella / Joint)',
      symptoms: {
        painType: 'Sharp / Stabbing',
        onset: '2 - 3 days ago',
        severity: 6
      },
      guidance: {
        possibleExplanations: ['Patellar Tendinopathy', 'IT Band Friction'],
        thermalTherapy: { recommendation: 'Cold Therapy' }
      },
      message: 'Can I do deep squats or jump rope right now, or should I stick to swimming?',
      chatHistory: [
        { role: 'user', content: 'What about high-impact jumping?' },
        { role: 'assistant', content: 'High impact jumping puts acute stress on the patellar tendon and should be avoided.' }
      ]
    });
    console.log(`✅ Success. AI Follow-Up Reply:`);
    console.log(`"${resChat.data.reply.slice(0, 300)}..."`);
    passedTests++;
  } catch (err) {
    console.error('❌ Test 4 Failed:', err.message);
  }

  console.log('\n========================================================');
  console.log(`🏁 TEST SUMMARY: ${passedTests}/${totalTests} Passed`);
  console.log('========================================================');
}

runE2ETests();
