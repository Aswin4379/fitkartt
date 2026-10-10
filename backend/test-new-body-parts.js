const BASE_URL = 'http://localhost:5000/api/bodycare';

async function testAllBodyParts() {
  const parts = [
    { part: 'biceps', name: 'Biceps' },
    { part: 'triceps', name: 'Triceps' },
    { part: 'elbows', name: 'Elbows' },
    { part: 'hips-groin', name: 'Hips & Groin' },
    { part: 'hamstrings', name: 'Hamstrings' },
    { part: 'calves', name: 'Calves' }
  ];

  console.log('Testing newly expanded body parts...\n');

  for (const item of parts) {
    try {
      const res = await fetch(`${BASE_URL}/assess`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bodyPart: item.part,
          bodyPartName: item.name,
          bodySide: 'front',
          symptoms: {
            painType: 'Dull Ache',
            onset: '2 - 3 days ago',
            severity: 4,
            injuryRelated: false,
            additionalSymptoms: ['Stiffness & Tightness'],
            userDescription: `Mild tightness and soreness in ${item.name} after workout.`
          },
          consentGiven: false
        })
      });

      const json = await res.json();
      const moves = json.guidance?.gentleMovements || [];
      const videos = moves.filter(m => m.mediaType === 'video');
      console.log(`✅ [${item.name}] Returned ${moves.length} movements (${videos.length} direct videos):`);
      moves.forEach(m => console.log(`   - ${m.name} [${m.mediaType}: ${m.demonstrationUrl ? 'Direct Video' : 'Search'}]`));
      await new Promise(r => setTimeout(r, 1500));
    } catch (err) {
      console.error(`❌ [${item.name}] Failed:`, err.message);
    }
  }
}

testAllBodyParts();
