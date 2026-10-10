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

async function runExerciseDemoVerification() {
  console.log('================================================================');
  console.log('🏋️ BODYCARE AI EXERCISE VISUAL DEMONSTRATION VERIFICATION');
  console.log('================================================================\n');

  let passedTests = 0;
  const totalTests = 6;
  const mediaMap = new Map();

  // 1. TEST: Neck Pain -> Neck Demonstration
  console.log('--- TEST 1: Neck Discomfort -> Matching Cervical Demonstration ---');
  try {
    const res = await postJson(`${BASE_URL}/assess`, {
      bodyPart: 'neck',
      bodyPartName: 'Neck & Cervical Spine',
      bodySide: 'front',
      symptoms: {
        painType: 'Stiffness & Tightness',
        onset: '2 - 3 days ago',
        severity: 4,
        injuryRelated: false,
        additionalSymptoms: ['Reduced Range of Motion', 'Morning Stiffness'],
        customDescription: 'Upper neck tightness and forward head posture strain from desk work.'
      },
      consentGiven: false
    });

    const moves = res.data.guidance?.gentleMovements || [];
    console.log(`✅ Success (HTTP ${res.status}). Movements Count: ${moves.length}`);
    moves.forEach((m, idx) => {
      console.log(`  [${idx + 1}] ID: ${m.exerciseId} | Name: ${m.name}`);
      console.log(`      Media: ${m.mediaType} -> ${m.demonstrationUrl || m.youtubeSearchUrl}`);
      console.log(`      Starting: ${m.startingPosition}`);
      console.log(`      Direction: ${m.movementDirection}`);
      console.log(`      Reps/Duration: ${m.repsOrDuration}`);
      console.log(`      Breathing: ${m.breathingGuidance}`);
      console.log(`      Stop Signs: ${m.stopSigns}`);
      if (m.demonstrationUrl) {
        mediaMap.set(m.name, m.demonstrationUrl);
      }
    });

    const hasNeckSpecificMove = moves.some(m => /chin|neck|cervical|retraction|rotat/i.test(m.name) || /chin|neck/i.test(m.exerciseId));
    if (moves.length > 0 && hasNeckSpecificMove && moves.every(m => m.startingPosition && m.movementDirection && m.stopSigns)) {
      console.log('✅ PASS: Neck pain produced appropriate cervical exercises with complete demonstration metadata.');
      passedTests++;
    } else {
      console.error('❌ FAIL: Missing required neck demonstration fields.');
    }
  } catch (err) {
    console.error('❌ Test 1 Failed:', err.message);
  }

  // 2. TEST: Shoulder Pain -> Shoulder Demonstration
  console.log('\n--- TEST 2: Shoulder Pain -> Matching Shoulder Mobility Demonstration ---');
  try {
    const res = await postJson(`${BASE_URL}/assess`, {
      bodyPart: 'shoulders',
      bodyPartName: 'Shoulders (Deltoids / Rotator Cuff)',
      bodySide: 'front',
      symptoms: {
        painType: 'Dull Ache',
        onset: '1 - 2 weeks ago',
        severity: 5,
        injuryRelated: false,
        additionalSymptoms: ['Reduced Range of Motion'],
        customDescription: 'Mild anterior shoulder pinch when lifting arm overhead, feels tight.'
      },
      consentGiven: false
    });

    const moves = res.data.guidance?.gentleMovements || [];
    console.log(`✅ Success (HTTP ${res.status}). Movements Count: ${moves.length}`);
    moves.forEach((m, idx) => {
      console.log(`  [${idx + 1}] ID: ${m.exerciseId} | Name: ${m.name}`);
      console.log(`      Media: ${m.mediaType} -> ${m.demonstrationUrl || m.youtubeSearchUrl}`);
      console.log(`      Reps/Duration: ${m.repsOrDuration}`);
      if (m.demonstrationUrl) {
        mediaMap.set(m.name, m.demonstrationUrl);
      }
    });

    const hasShoulderMove = moves.some(m => /pendulum|wall|slide|shoulder|rotator|scapul/i.test(m.name) || /pendulum|wall|shoulder/i.test(m.exerciseId));
    if (moves.length > 0 && hasShoulderMove) {
      console.log('✅ PASS: Shoulder pain produced matching shoulder mobility demonstrations.');
      passedTests++;
    } else {
      console.error('❌ FAIL: Shoulder matching failed.');
    }
  } catch (err) {
    console.error('❌ Test 2 Failed:', err.message);
  }

  // 3. TEST: Lower Back Pain -> Lumbar & Pelvic Demonstrations
  console.log('\n--- TEST 3: Lower Back Pain -> Matching Lumbar Mobility Demonstration ---');
  try {
    const res = await postJson(`${BASE_URL}/assess`, {
      bodyPart: 'lower-back',
      bodyPartName: 'Lower Back (Lumbar)',
      bodySide: 'back',
      symptoms: {
        painType: 'Stiffness & Tightness',
        onset: '2 - 3 days ago',
        severity: 4,
        injuryRelated: false,
        additionalSymptoms: ['Morning Stiffness'],
        customDescription: 'Stiff lumbar region after sitting for long driving trips, mild muscular ache.'
      },
      consentGiven: false
    });

    const moves = res.data.guidance?.gentleMovements || [];
    console.log(`✅ Success (HTTP ${res.status}). Movements Count: ${moves.length}`);
    moves.forEach((m, idx) => {
      console.log(`  [${idx + 1}] ID: ${m.exerciseId} | Name: ${m.name}`);
      console.log(`      Media: ${m.mediaType} -> ${m.demonstrationUrl || m.youtubeSearchUrl}`);
      if (m.demonstrationUrl) {
        mediaMap.set(m.name, m.demonstrationUrl);
      }
    });

    const hasLumbarMove = moves.some(m => /pelvic|child|cat|knee|bridge|bird|spine/i.test(m.name) || /pelvic|child|knee|cat/i.test(m.exerciseId));
    if (moves.length > 0 && hasLumbarMove) {
      console.log('✅ PASS: Lower-back pain produced matching lumbar/pelvic mobility demonstrations.');
      passedTests++;
    } else {
      console.error('❌ FAIL: Lower-back matching failed.');
    }
  } catch (err) {
    console.error('❌ Test 3 Failed:', err.message);
  }

  // 4. TEST: Knee Pain -> Knee Mobility Demonstrations
  console.log('\n--- TEST 4: Knee Pain -> Matching Knee Mobility Demonstration ---');
  try {
    const res = await postJson(`${BASE_URL}/assess`, {
      bodyPart: 'knees',
      bodyPartName: 'Knees (Patella / Joint)',
      bodySide: 'front',
      symptoms: {
        painType: 'Dull Ache',
        onset: '1 - 2 weeks ago',
        severity: 4,
        injuryRelated: false,
        additionalSymptoms: ['Morning Stiffness', 'Clicking'],
        customDescription: 'Mild knee stiffness and slight clicking after walking.'
      },
      consentGiven: false
    });

    const moves = res.data.guidance?.gentleMovements || [];
    console.log(`✅ Success (HTTP ${res.status}). Movements Count: ${moves.length}`);
    moves.forEach((m, idx) => {
      console.log(`  [${idx + 1}] ID: ${m.exerciseId} | Name: ${m.name}`);
      console.log(`      Media: ${m.mediaType} -> ${m.demonstrationUrl || m.youtubeSearchUrl}`);
      if (m.demonstrationUrl) {
        mediaMap.set(m.name, m.demonstrationUrl);
      }
    });

    const hasKneeMove = moves.some(m => /heel|quad|knee|slide|extension/i.test(m.name) || /heel|quad|knee/i.test(m.exerciseId));
    if (moves.length > 0 && hasKneeMove) {
      console.log('✅ PASS: Knee pain produced matching knee mobility demonstrations.');
      passedTests++;
    } else {
      console.error('❌ FAIL: Knee matching failed.');
    }
  } catch (err) {
    console.error('❌ Test 4 Failed:', err.message);
  }

  // 5. TEST: Wrist Pain -> Wrist Mobility Demonstrations
  console.log('\n--- TEST 5: Wrist Pain -> Matching Forearm/Wrist Demonstration ---');
  try {
    const res = await postJson(`${BASE_URL}/assess`, {
      bodyPart: 'wrists-hands',
      bodyPartName: 'Wrists & Hands',
      bodySide: 'front',
      symptoms: {
        painType: 'Stiffness & Tightness',
        onset: '1 - 2 weeks ago',
        severity: 3,
        injuryRelated: false,
        additionalSymptoms: ['Tender to Touch'],
        customDescription: 'Wrist extensor fatigue and mild tightness from mouse and keyboard typing.'
      },
      consentGiven: false
    });

    const moves = res.data.guidance?.gentleMovements || [];
    console.log(`✅ Success (HTTP ${res.status}). Movements Count: ${moves.length}`);
    moves.forEach((m, idx) => {
      console.log(`  [${idx + 1}] ID: ${m.exerciseId} | Name: ${m.name}`);
      console.log(`      Media: ${m.mediaType} -> ${m.demonstrationUrl || m.youtubeSearchUrl}`);
      if (m.demonstrationUrl) {
        mediaMap.set(m.name, m.demonstrationUrl);
      }
    });

    const hasWristMove = moves.some(m => /wrist|forearm|prayer|finger|tendon/i.test(m.name) || /wrist|forearm/i.test(m.exerciseId));
    if (moves.length > 0 && hasWristMove) {
      console.log('✅ PASS: Wrist pain produced matching forearm/wrist stretch demonstrations.');
      passedTests++;
    } else {
      console.error('❌ FAIL: Wrist matching failed.');
    }
  } catch (err) {
    console.error('❌ Test 5 Failed:', err.message);
  }

  // 6. TEST: Red-Flag Safety Escalation (No active exercise demonstrations allowed)
  console.log('\n--- TEST 6: Red-Flag Emergency -> Active Exercise Demonstration Suppression ---');
  try {
    const res = await postJson(`${BASE_URL}/assess`, {
      bodyPart: 'chest',
      bodyPartName: 'Chest (Pectorals & Ribs)',
      bodySide: 'front',
      symptoms: {
        painType: 'Sharp / Stabbing',
        onset: 'Just today (Few hours)',
        severity: 9,
        injuryRelated: false,
        additionalSymptoms: ['Radiating down arm / leg', 'Numbness / Pins & Needles'],
        customDescription: 'Crushing heavy chest tightness spreading to left jaw and shoulder with shortness of breath.'
      },
      consentGiven: false
    });

    const moves = res.data.guidance?.gentleMovements || [];
    const isRedFlag = res.data.guidance?.isRedFlag;
    const urgency = res.data.guidance?.medicalConsultation?.urgency;
    console.log(`isRedFlag: ${isRedFlag} | Urgency: ${urgency}`);
    console.log(`Movements: ${JSON.stringify(moves.map(m => m.name))}`);

    const onlyRestMovements = moves.every(m => /rest|protection|immobility/i.test(m.name));
    if (isRedFlag && urgency === 'Emergency' && onlyRestMovements) {
      console.log('✅ PASS: Safety rule suppressed active exercise demonstrations during acute red flag.');
      passedTests++;
    } else {
      console.error('❌ FAIL: Red flag safety suppression failed.');
    }
  } catch (err) {
    console.error('❌ Test 6 Failed:', err.message);
  }

  // Media Diversity Verification: Ensure distinct exercises don't share the same video
  console.log('\n--- MEDIA DIVERSITY AUDIT ---');
  const urls = Array.from(mediaMap.values());
  const uniqueUrls = new Set(urls);
  console.log(`Total Verified Demonstration URLs: ${urls.length}`);
  console.log(`Unique Demonstration URLs: ${uniqueUrls.size}`);
  if (urls.length === uniqueUrls.size) {
    console.log('✅ PASS: Strict 1-to-1 exercise-to-media matching verified. Zero shared/reused demonstration URLs across distinct movements.');
  } else {
    console.warn('⚠️ Notice: Some exercises share media.');
  }

  console.log('\n================================================================');
  console.log(`🏁 EXERCISE DEMONSTRATION VERIFICATION: ${passedTests}/${totalTests} Passed`);
  console.log('================================================================');
}

runExerciseDemoVerification();
