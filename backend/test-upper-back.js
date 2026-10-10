const BASE_URL = 'http://localhost:5000/api/bodycare';

async function testUpperBack() {
  console.log('Testing Upper Back Assessment...');
  try {
    const res = await fetch(`${BASE_URL}/assess`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        bodyPart: 'upper-back',
        bodyPartName: 'Upper Back & Shoulder Blades',
        bodySide: 'back',
        symptoms: {
          painType: 'Stiffness & Tightness',
          onset: '2 - 3 days ago',
          severity: 4,
          injuryRelated: false,
          additionalSymptoms: ['Reduced Range of Motion'],
          customDescription: 'Upper back tightness between shoulder blades from prolonged sitting.'
        },
        consentGiven: false
      })
    });

    const json = await res.json();
    console.log('Status:', res.status);
    console.log('Guidance received:', Boolean(json.guidance));
    console.log('Gentle movements count:', json.guidance?.gentleMovements?.length);
    json.guidance?.gentleMovements?.forEach((m, i) => {
      console.log(`[${i+1}] Name: ${m.name}`);
      console.log(`    Media: ${m.mediaType} -> ${m.demonstrationUrl}`);
      console.log(`    Thumbnail: ${m.thumbnailUrl}`);
      console.log(`    Reps: ${m.repsOrDuration}`);
      console.log(`    Starting: ${m.startingPosition}`);
      console.log(`    Steps count: ${m.instructions?.length}`);
    });
  } catch (err) {
    console.error('Test error:', err);
  }
}

testUpperBack();
