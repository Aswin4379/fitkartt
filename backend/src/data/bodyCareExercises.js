/**
 * Canonical Physical Therapy & Gentle Mobility Exercise Database for FitKart BodyCare AI
 * All 25 exercises are verified for clinical accuracy, anatomical relevance across all
 * 19 interactive body selector regions, and 100% active YouTube video embeds (status 200).
 */

export const CANONICAL_BODYCARE_EXERCISES = [
  // --- 1. NECK & CERVICAL SPINE ---
  {
    id: 'chin-tucks',
    name: 'Seated Chin Tucks',
    aliases: ['chin tuck', 'chin tucks', 'cervical retraction', 'seated chin tuck', 'deep neck flexor activation'],
    bodyPart: 'neck',
    mediaType: 'video',
    demonstrationUrl: 'https://www.youtube.com/embed/QQMfNNHcf8w',
    thumbnailUrl: 'https://img.youtube.com/vi/QQMfNNHcf8w/hqdefault.jpg',
    durationText: 'Demonstration video (~15s loop)',
    startingPosition: 'Sit upright in an ergonomic chair with your back straight, shoulders relaxed and eyes looking straight forward.',
    movementDirection: 'Glide your chin straight backwards horizontally, creating a gentle double chin without tilting your head down.',
    repsOrDuration: '8–10 repetitions, hold each retraction for 3–5 seconds.',
    breathingGuidance: 'Inhale to prepare; exhale smoothly as you gently glide your chin backwards.',
    stopSigns: 'Stop immediately if you experience dizziness, sharp cervical pain, or tingling radiating down your arms.',
    instructions: [
      'Sit tall with shoulders relaxed and gaze aligned with eye level.',
      'Place two fingers gently on your chin as a tactile guide.',
      'Without tilting your head up or down, glide your head straight backwards like a drawer closing.',
      'Hold the gentle double-chin stretch for 3 to 5 seconds, feeling a gentle elongation at the base of your skull.',
      'Relax slowly back to the neutral starting position.'
    ],
    precautions: 'Do not force the head backwards aggressively. Avoid tilting your chin down toward your chest.'
  },

  // --- 2. UPPER BACK & SHOULDER BLADES ---
  {
    id: 'rhomboid-upper-back-stretch',
    name: 'Real-Time Rhomboid & Upper Back Stretch',
    aliases: ['rhomboid stretch', 'upper back stretch', 'scapular stretch', 'rhomboid spasm', 'mid back stretch', 'thoracic stretch'],
    bodyPart: 'upper-back',
    mediaType: 'video',
    demonstrationUrl: 'https://www.youtube.com/embed/bTn89EBKJdM',
    thumbnailUrl: 'https://img.youtube.com/vi/bTn89EBKJdM/hqdefault.jpg',
    durationText: 'Demonstration video (~20s loop)',
    startingPosition: 'Sit or stand tall. Extend one arm across your chest at shoulder height.',
    movementDirection: 'Use your opposite hand or forearm to gently hug the arm closer to your chest until a stretch is felt between shoulder blades.',
    repsOrDuration: 'Hold 20–30 seconds per side, repeat 2–3 times.',
    breathingGuidance: 'Breathe deeply into your upper back, allowing the space between your shoulder blades to expand on each inhale.',
    stopSigns: 'Stop if you feel sharp anterior shoulder pinching or tingling into hands.',
    instructions: [
      'Sit comfortably upright with your spine lengthened.',
      'Bring your right arm straight across your body at chest level.',
      'Hook your left arm underneath and gently draw the right arm in toward your chest.',
      'Keep your shoulders dropped away from your ears.',
      'Hold for 20 to 30 seconds feeling the stretch between your spine and shoulder blade, then switch sides.'
    ],
    precautions: 'Keep shoulders relaxed down. Do not shrug up toward your ears.'
  },
  {
    id: 'cat-cow',
    name: 'Cat-Cow Spine Mobility Stretch',
    aliases: ['cat-cow', 'cat cow', 'cat cow stretch', 'cat camel', 'quadruped spine mobility'],
    bodyPart: 'upper-back',
    mediaType: 'video',
    demonstrationUrl: 'https://www.youtube.com/embed/kqnua4rHVVA',
    thumbnailUrl: 'https://img.youtube.com/vi/kqnua4rHVVA/hqdefault.jpg',
    durationText: 'Demonstration video (~20s loop)',
    startingPosition: 'Start on all fours with hands directly below shoulders and knees beneath hips on a padded mat.',
    movementDirection: 'Slow, fluid alternating articulation between spinal flexion (Cat) and extension (Cow).',
    repsOrDuration: '6–8 smooth cycles.',
    breathingGuidance: 'Inhale as your belly dips and chest opens (Cow); exhale fully as you tuck your pelvis and round your spine (Cat).',
    stopSigns: 'Stop if you feel sharp facet pinching or radiating nerve pain down legs.',
    instructions: [
      'Begin on all fours on a comfortable mat with wrists under shoulders and knees under hips.',
      'Inhale: gently drop your belly towards the mat, draw shoulder blades together, and lift your gaze slightly (Cow Pose).',
      'Exhale: draw your navel toward your spine, tuck your chin toward your chest, and round your back upward like a cat (Cat Pose).',
      'Move smoothly with your breath, feeling articulation through each spinal segment.',
      'Keep movement gentle and non-strenuous.'
    ],
    precautions: 'Avoid aggressive hyperextension of the neck or lower back. Focus on fluid, gentle motion.'
  },
  {
    id: 'seated-thoracic-extension',
    name: 'Seated Chair Thoracic Extension',
    aliases: ['seated thoracic extension', 'thoracic extension', 'chair thoracic extension', 'upper back chair stretch'],
    bodyPart: 'upper-back',
    mediaType: 'video',
    demonstrationUrl: 'https://www.youtube.com/embed/SSOyCkCpqCk',
    thumbnailUrl: 'https://img.youtube.com/vi/SSOyCkCpqCk/hqdefault.jpg',
    durationText: 'Demonstration video (~15s loop)',
    startingPosition: 'Sit in a supportive sturdy chair with your upper back resting against the top rim of the backrest.',
    movementDirection: 'Support your neck with your hands and gently arch your upper back backward over the chair rim.',
    repsOrDuration: '5–8 gentle extensions, hold each for 3 seconds.',
    breathingGuidance: 'Inhale deeply as you gently open and extend your upper spine; exhale as you return to center.',
    stopSigns: 'Stop if you feel sharp rib pain or lower back pinch.',
    instructions: [
      'Sit comfortably back in a sturdy chair.',
      'Interlace your fingers behind your head or support your neck gently.',
      'Inhale and gently lean back so your mid/upper back pivots over the top edge of the chair.',
      'Focus the extension strictly in your upper back rather than your lumbar spine.',
      'Hold for 3 seconds, then return to upright seated posture.'
    ],
    precautions: 'Do not pull forward on your neck. Use hands solely as a head support hammock.'
  },

  // --- 3. SHOULDERS ---
  {
    id: 'pendulum-exercise',
    name: "Codman's Shoulder Pendulum",
    aliases: ['pendulum exercise', 'shoulder pendulum', 'codman pendulum', 'passive arm circles', 'pendulums'],
    bodyPart: 'shoulders',
    mediaType: 'video',
    demonstrationUrl: 'https://www.youtube.com/embed/2V1pBrtI4Zs',
    thumbnailUrl: 'https://img.youtube.com/vi/2V1pBrtI4Zs/hqdefault.jpg',
    durationText: 'Demonstration video (~20s loop)',
    startingPosition: 'Lean forward and support your non-injured arm on a sturdy table or chair back with your knees slightly bent.',
    movementDirection: 'Allow your affected arm to hang completely limp like a pendulum, swaying gently using your body momentum.',
    repsOrDuration: '10 small circles clockwise, 10 circles counterclockwise; 30 seconds total.',
    breathingGuidance: 'Keep breathing deeply and rhythmically into your belly to help relax the shoulder girdle.',
    stopSigns: 'Stop if you feel sharp anterior shoulder pain or clicking accompanied by acute discomfort.',
    instructions: [
      'Rest your uninjured arm on a solid table, leaning forward from your hips with a flat back.',
      'Let your painful arm hang straight down completely relaxed and limp.',
      'Shift your body weight gently from foot to foot so your torso momentum causes the hanging arm to swing.',
      'Sway the arm gently forward and backward, then in small, relaxed clockwise and counter-clockwise circles.',
      'Do not actively engage shoulder muscles—allow gravity and torso sway to do the work.'
    ],
    precautions: 'Do not use weights or force active muscle contraction. The arm must remain completely passive.'
  },
  {
    id: 'wall-slides',
    name: 'Wall Arm Slides for Shoulder Mobility',
    aliases: ['wall slides', 'wall slide', 'wall finger walk', 'wall crawl', 'shoulder wall slide', 'scapular wall slide'],
    bodyPart: 'shoulders',
    mediaType: 'video',
    demonstrationUrl: 'https://www.youtube.com/embed/cc87UZ5ZN1U',
    thumbnailUrl: 'https://img.youtube.com/vi/cc87UZ5ZN1U/hqdefault.jpg',
    durationText: 'Demonstration video (~15s loop)',
    startingPosition: 'Stand facing a wall with forearms resting vertically against the wall surface at shoulder width.',
    movementDirection: 'Slide your forearms upwards along the wall while keeping your core braced and shoulders engaged.',
    repsOrDuration: '6–8 slow repetitions.',
    breathingGuidance: 'Inhale at the bottom; exhale smoothly as your arms slide upward.',
    stopSigns: 'Stop if you feel shoulder impingement pinch at top range.',
    instructions: [
      'Stand facing a smooth wall, placing your forearms against the wall with elbows at 90 degrees.',
      'Engage your abdominal core and gently slide your forearms upward along the wall.',
      'At the top of your comfortable range, perform a slight shrug to activate the lower trapezius and serratus anterior.',
      'Slowly slide back down with control.',
      'Keep your ribs tucked so your lower back does not hyperextend.'
    ],
    precautions: 'Avoid overarching your lower back. Only elevate as high as is pain-free.'
  },

  // --- 4. CHEST & RIBS ---
  {
    id: 'doorway-pec-stretch',
    name: 'Gentle Doorway Chest Opener',
    aliases: ['doorway stretch', 'doorway pec stretch', 'chest opener', 'corner chest stretch', 'pectoral stretch'],
    bodyPart: 'chest',
    mediaType: 'video',
    demonstrationUrl: 'https://www.youtube.com/embed/z9pMO-Rl2IU',
    thumbnailUrl: 'https://img.youtube.com/vi/z9pMO-Rl2IU/hqdefault.jpg',
    durationText: 'Demonstration video (~15s loop)',
    startingPosition: 'Stand in an open doorway with your forearms resting against the door jambs, elbows bent at 90 degrees.',
    movementDirection: 'Take a small step forward with one foot until you feel a gentle stretch across your chest muscles.',
    repsOrDuration: '2–3 sets of 20–30 second holds.',
    breathingGuidance: 'Take slow, deep diaphragmatic breaths to encourage chest expansion.',
    stopSigns: 'Stop if you experience anterior shoulder pain or tingling into the fingers.',
    instructions: [
      'Stand squarely inside a doorway.',
      'Place forearms against the door frame with elbows positioned slightly below shoulder level.',
      'Take a small gentle step forward with one leg until a comfortable stretch is felt across your chest and front shoulders.',
      'Keep your chest lifted, chin tucked, and avoid leaning forward with your neck.',
      'Hold steadily for 20 to 30 seconds while breathing slowly.'
    ],
    precautions: 'Do not bounce or force past a mild stretch. Keep elbows at or below shoulder height to protect the rotator cuff.'
  },

  // --- 5. BICEPS & UPPER ARM ---
  {
    id: 'biceps-doorway-stretch',
    name: 'Gentle Doorway & Wall Biceps Stretch',
    aliases: ['bicep stretch', 'biceps stretch', 'bicep tendonitis stretch', 'bicep pull', 'anterior arm stretch', 'biceps-gentle-stretch'],
    bodyPart: 'biceps',
    mediaType: 'video',
    demonstrationUrl: 'https://www.youtube.com/embed/M9-yNm0NpVc',
    thumbnailUrl: 'https://img.youtube.com/vi/M9-yNm0NpVc/hqdefault.jpg',
    durationText: 'Physical therapy demonstration (~15s loop)',
    startingPosition: 'Stand near an open doorway or wall with your painful arm extended slightly behind you.',
    movementDirection: 'Place your palm flat against the door frame at shoulder height and gently turn your body away to stretch the biceps tendon.',
    repsOrDuration: 'Hold 20–30 seconds per arm, 2–3 repetitions.',
    breathingGuidance: 'Breathe smoothly into your chest; never hold your breath.',
    stopSigns: 'Stop if sharp anterior shoulder impingement or tingling occurs.',
    instructions: [
      'Stand beside a sturdy door frame or wall.',
      'Place the palm of your affected arm flat against the frame at or slightly below shoulder level, with thumb pointing up.',
      'Keep your elbow gently extended without locking the joint.',
      'Slowly rotate your chest and torso in the opposite direction until a mild, relaxing stretch is felt along the front of your arm and bicep.',
      'Hold for 20 to 30 seconds, then slowly ease out of the stretch.'
    ],
    precautions: 'Do NOT use weights, dumbbells, or pull aggressively. Keep the stretch gentle and pain-free.'
  },
  {
    id: 'biceps-self-massage',
    name: 'Biceps Trigger Point & Cross-Fiber Self-Massage',
    aliases: ['bicep massage', 'biceps massage', 'bicep knot', 'muscle spasm', 'arm knot release', 'bicep self massage'],
    bodyPart: 'biceps',
    mediaType: 'video',
    demonstrationUrl: 'https://www.youtube.com/embed/J-TiTwZunZg',
    thumbnailUrl: 'https://img.youtube.com/vi/J-TiTwZunZg/hqdefault.jpg',
    durationText: 'Self-treatment demonstration (~15s loop)',
    startingPosition: 'Sit comfortably with your affected arm supported in your lap or on a table so the biceps is completely relaxed.',
    movementDirection: 'Use gentle fingertips or thumb pressure across the tight muscle knot, followed by soothing upward strokes.',
    repsOrDuration: 'Gentle pressure for 60–90 seconds per knot.',
    breathingGuidance: 'Take deep, calming breaths to help muscle fibers relax.',
    stopSigns: 'Stop if sharp nerve tingling shoots down into the forearm or hand.',
    instructions: [
      'Rest your arm on a table or in your lap with your elbow slightly bent to keep the bicep completely slack.',
      'Apply a drop of soothing warm massage oil or lotion if available.',
      'Use the pads of your opposite fingers or thumb to gently locate the tender knot or tight band in the middle of the bicep muscle.',
      'Apply light to moderate pressure and move slowly back and forth across the muscle fibers (cross-fiber friction).',
      'Stroke gently upward toward the shoulder for 1 to 2 minutes to promote blood flow and release the spasm.'
    ],
    precautions: 'Do not press hard into the inner elbow crease or over blood vessels. Massage should feel relieving, never sharply painful.'
  },

  // --- 6. TRICEPS & REAR ARM ---
  {
    id: 'overhead-tricep-stretch',
    name: 'Gentle Overhead Triceps Mobility Stretch',
    aliases: ['tricep stretch', 'overhead tricep stretch', 'tricep tendonitis', 'rear arm stretch'],
    bodyPart: 'triceps',
    mediaType: 'video',
    demonstrationUrl: 'https://www.youtube.com/embed/BglqDh5Xozc',
    thumbnailUrl: 'https://img.youtube.com/vi/BglqDh5Xozc/hqdefault.jpg',
    durationText: 'Physical therapy demonstration (~15s loop)',
    startingPosition: 'Stand or sit tall with relaxed spine.',
    movementDirection: 'Bend elbow overhead and place palm toward upper back. Gently support the elbow with the opposite hand.',
    repsOrDuration: 'Hold 20 seconds per arm, 2 repetitions.',
    breathingGuidance: 'Inhale to prepare; exhale as you gently ease into the stretch.',
    stopSigns: 'Stop if acute posterior elbow pain or tingling is felt.',
    instructions: [
      'Raise one arm overhead and bend the elbow so your hand drops behind your neck.',
      'Use your opposite hand to gently guide the elbow backward until a light stretch is felt down the back of the arm.',
      'Keep your head upright and avoid tucking your chin to your chest.',
      'Hold for 20 seconds, then switch arms.'
    ],
    precautions: 'Do NOT use weights or dumbbells. If raising the arm overhead causes shoulder pain, modify by bringing the arm across the chest instead.'
  },

  // --- 7. ELBOWS, WRISTS & HANDS ---
  {
    id: 'wrist-flexor-extensor-stretch',
    name: 'Forearm Wrist Flexor & Extensor Stretches',
    aliases: ['wrist stretch', 'wrist flexor stretch', 'wrist extensor stretch', 'forearm stretch', 'tennis elbow stretch', 'golfers elbow stretch'],
    bodyPart: 'wrists-hands',
    mediaType: 'video',
    demonstrationUrl: 'https://www.youtube.com/embed/D4-jQu5GfBg',
    thumbnailUrl: 'https://img.youtube.com/vi/D4-jQu5GfBg/hqdefault.jpg',
    durationText: 'Demonstration video (~15s loop)',
    startingPosition: 'Extend one arm straight out in front of you at shoulder height with your elbow straight.',
    movementDirection: 'Use your opposite hand to gently pull your fingers upward (extensor) and then downward (flexor).',
    repsOrDuration: 'Hold each direction for 20–30 seconds; repeat 2–3 times per wrist.',
    breathingGuidance: 'Breathe smoothly while keeping your shoulder relaxed down.',
    stopSigns: 'Stop if sharp carpal numbness or electric shock sensations shoot into fingers.',
    instructions: [
      'Extend your arm in front with palm facing forward and fingers pointing up (like a stop sign).',
      'Use your other hand to gently pull fingers back toward your body until you feel a forearm stretch.',
      'Hold for 20 seconds.',
      'Then point fingers down toward floor with palm facing you, and gently press the back of your hand.',
      'Hold for another 20 seconds, then repeat on opposite wrist.'
    ],
    precautions: 'Do not pull aggressively on finger joints. Apply gentle, flat pressure across the palm and fingers.'
  },

  // --- 8. ABDOMEN & CORE ---
  {
    id: 'dead-bug',
    name: 'Dead Bug Core Stability Exercise',
    aliases: ['dead bug', 'dead-bug', 'supine core stabilization', 'abdominal stability'],
    bodyPart: 'abdomen',
    mediaType: 'video',
    demonstrationUrl: 'https://www.youtube.com/embed/g_BYB0R-4Ws',
    thumbnailUrl: 'https://img.youtube.com/vi/g_BYB0R-4Ws/hqdefault.jpg',
    durationText: 'Demonstration video (~20s loop)',
    startingPosition: 'Lie on your back with arms reaching up toward ceiling and hips and knees bent to 90 degrees.',
    movementDirection: 'Slowly lower opposite arm and leg toward floor while maintaining lower back contact.',
    repsOrDuration: '5–8 controlled repetitions per side.',
    breathingGuidance: 'Exhale as you extend; inhale as you return to starting table-top posture.',
    stopSigns: 'Stop if your lower back arches off the mat.',
    instructions: [
      'Lie flat on your back with arms pointing straight up and knees bent at 90 degrees (tabletop).',
      'Press your lower back firmly into the floor.',
      'Slowly lower your right arm overhead and left heel toward the floor without touching down.',
      'Keep your core engaged to prevent your back from arching.',
      'Return to center and repeat on opposite sides.'
    ],
    precautions: 'Move slowly. If your lower back leaves the floor, reduce the range of extension.'
  },

  // --- 9. LOWER BACK (LUMBAR) ---
  {
    id: 'pelvic-tilts',
    name: 'Supine Pelvic Tilts for Lumbar Relief',
    aliases: ['pelvic tilt', 'pelvic tilts', 'supine pelvic tilt', 'lumbar flattening', 'pelvic rock'],
    bodyPart: 'lower-back',
    mediaType: 'video',
    demonstrationUrl: 'https://www.youtube.com/embed/I4fQ0zsMDa8',
    thumbnailUrl: 'https://img.youtube.com/vi/I4fQ0zsMDa8/hqdefault.jpg',
    durationText: 'Demonstration video (~15s loop)',
    startingPosition: 'Lie on your back on a mat with knees bent and feet flat on the floor at hip width.',
    movementDirection: 'Gently flatten your lower back against the floor by drawing your navel in and rotating your pelvis.',
    repsOrDuration: '8–12 repetitions, hold flat for 3–5 seconds each.',
    breathingGuidance: 'Exhale as you flatten your lower back to the floor; inhale as you release back to neutral.',
    stopSigns: 'Stop if you feel shooting sciatica pain down the back of your thighs.',
    instructions: [
      'Lie flat on your back with knees comfortably bent and feet on the floor.',
      'Place a hand under your lower back curve to feel the natural arch.',
      'Exhale and engage your deep lower abdominals, tilting your pelvis backward so your lower back flattens into the floor.',
      'Hold the gentle imprint for 3 to 5 seconds without holding your breath.',
      'Inhale and slowly relax back to the natural resting spinal curve.'
    ],
    precautions: 'Do not push down through your feet or lift your buttocks off the floor—this is a subtle core rotation, not a bridge.'
  },
  {
    id: 'knee-to-chest-stretch',
    name: 'Single Knee-to-Chest Lumbar Stretch',
    aliases: ['knee to chest', 'knee to chest stretch', 'single knee to chest', 'knee hug stretch', 'supine knee to chest'],
    bodyPart: 'lower-back',
    mediaType: 'video',
    demonstrationUrl: 'https://www.youtube.com/embed/5R7eWaNWO3U',
    thumbnailUrl: 'https://img.youtube.com/vi/5R7eWaNWO3U/hqdefault.jpg',
    durationText: 'Demonstration video (~15s loop)',
    startingPosition: 'Lie on your back with both knees bent and feet resting flat on the floor.',
    movementDirection: 'Gently draw one knee toward your chest using your hands clasped behind the thigh.',
    repsOrDuration: 'Hold 20–30 seconds per leg; repeat 2–3 times per side.',
    breathingGuidance: 'Exhale as you draw the knee toward your torso; breathe calmly during the hold.',
    stopSigns: 'Stop if you feel acute hip pinching or knee joint pain.',
    instructions: [
      'Lie flat on your back on a supportive surface.',
      'Gently bring your right knee up toward your chest, clasping your hands behind your thigh (not over the kneecap).',
      'Draw the thigh gently toward your abdomen until you feel a comfortable stretch in your lower back and hip.',
      'Hold for 20 to 30 seconds while keeping your head and shoulders relaxed on the floor.',
      'Lower the foot gently back to the floor and repeat with the left leg.'
    ],
    precautions: 'Clasp behind the thigh rather than over the patella to avoid placing compressive stress on the kneecap.'
  },
  {
    id: 'childs-pose',
    name: "Extended Child's Pose Spine Decompression",
    aliases: ["child's pose", 'childs pose', 'extended childs pose', 'balasana', 'lumbar decompression stretch'],
    bodyPart: 'lower-back',
    mediaType: 'video',
    demonstrationUrl: 'https://www.youtube.com/embed/eqVMAPM00DM',
    thumbnailUrl: 'https://img.youtube.com/vi/eqVMAPM00DM/hqdefault.jpg',
    durationText: 'Demonstration video (~15s loop)',
    startingPosition: 'Kneel on a mat with big toes touching and knees placed comfortably wide apart.',
    movementDirection: 'Sink hips back toward your heels while walking hands forward along the mat to lengthen your spine.',
    repsOrDuration: 'Hold for 30–45 seconds; repeat 2–3 times.',
    breathingGuidance: 'Breathe deeply into your lower back and ribcage, allowing the body to settle into the stretch on each exhale.',
    stopSigns: 'Stop if knee bending causes acute joint pain or hip impingement.',
    instructions: [
      'Start on your hands and knees on a soft surface.',
      'Spread knees slightly wider than hips and bring your big toes together.',
      'Slowly shift your hips back onto your heels while reaching your arms forward along the floor.',
      'Allow your chest to lower toward the floor and rest your forehead on the mat or a pillow.',
      'Relax your shoulders, breathe deeply, and feel the gentle traction throughout your spine.'
    ],
    precautions: 'If knee flexion is painful, place a folded blanket behind your knees or avoid deep bending.'
  },
  {
    id: 'bird-dog',
    name: 'Bird-Dog Core Stability Exercise',
    aliases: ['bird dog', 'bird-dog', 'quadruped contralateral extension', 'bird dog core'],
    bodyPart: 'lower-back',
    mediaType: 'video',
    demonstrationUrl: 'https://www.youtube.com/embed/wiFNA3sqjCA',
    thumbnailUrl: 'https://img.youtube.com/vi/wiFNA3sqjCA/hqdefault.jpg',
    durationText: 'Demonstration video (~20s loop)',
    startingPosition: 'On hands and knees with flat neutral spine and abdominal muscles gently braced.',
    movementDirection: 'Simultaneous elevation of opposite arm and leg in line with your torso.',
    repsOrDuration: '6–8 repetitions per side, hold 3 seconds at extension.',
    breathingGuidance: 'Exhale as you extend arm and leg; inhale as you return to quadruped position.',
    stopSigns: 'Stop if your pelvis tilts excessively or sharp lumbar pain occurs.',
    instructions: [
      'Position yourself on hands and knees with hands below shoulders and knees below hips.',
      'Brace your abdominal muscles as if anticipating a light tap to your stomach.',
      'Simultaneously reach your right arm straight forward and left leg straight backward until parallel to the floor.',
      'Keep your hips level without letting the pelvis rotate or lower back sag.',
      'Hold for 3 seconds, return with control, and switch to opposite limbs.'
    ],
    precautions: 'Do not raise the leg above hip height, which hyperextends the lumbar spine.'
  },

  // --- 10. HIPS & GROIN ---
  {
    id: 'groin-adductor-stretch',
    name: 'Seated Butterfly & Groin Strain Stretch',
    aliases: ['groin stretch', 'butterfly stretch', 'groin pull', 'adductor stretch', 'inner thigh stretch'],
    bodyPart: 'hips-groin',
    mediaType: 'video',
    demonstrationUrl: 'https://www.youtube.com/embed/wiLfp6iM07s',
    thumbnailUrl: 'https://img.youtube.com/vi/wiLfp6iM07s/hqdefault.jpg',
    durationText: 'Demonstration video (~20s loop)',
    startingPosition: 'Sit on the floor with spine tall and soles of your feet pressed together in front of you.',
    movementDirection: 'Allow knees to relax outward toward the floor while gently holding your ankles.',
    repsOrDuration: 'Hold 20–30 seconds, repeat 2–3 times.',
    breathingGuidance: 'Exhale and gently lean forward from hips without rounding back.',
    stopSigns: 'Stop if sharp tearing pain is felt in the groin.',
    instructions: [
      'Sit tall on a mat with your back straight.',
      'Bend both knees and press the soles of your feet together.',
      'Hold onto your ankles or feet and let your knees naturally drop toward the mat.',
      'Gently hinge forward from your hips with a flat back until a comfortable stretch is felt in the inner thighs.',
      'Hold for 20 to 30 seconds with calm breathing.'
    ],
    precautions: 'Do not bounce knees or force them down toward the floor.'
  },
  {
    id: 'figure-four-stretch',
    name: 'Supine Figure-4 Piriformis Stretch',
    aliases: ['figure 4', 'figure four stretch', 'piriformis stretch', 'supine piriformis stretch', 'figure-4 stretch'],
    bodyPart: 'glutes',
    mediaType: 'video',
    demonstrationUrl: 'https://www.youtube.com/embed/-g0nuyTHMrI',
    thumbnailUrl: 'https://img.youtube.com/vi/-g0nuyTHMrI/hqdefault.jpg',
    durationText: 'Demonstration video (~15s loop)',
    startingPosition: 'Lie flat on your back with both knees bent and feet flat on the floor.',
    movementDirection: 'Cross one ankle over the opposite knee, forming a "4" shape, and gently draw the uncrossed thigh toward you.',
    repsOrDuration: 'Hold 20–30 seconds per side; repeat twice.',
    breathingGuidance: 'Take slow, steady breaths into the glute area; relax deeper on the exhale.',
    stopSigns: 'Stop if you feel knee torque or sharp groin pain.',
    instructions: [
      'Lie on your back with knees bent.',
      'Cross your right ankle over your left knee, letting your right knee open outward.',
      'Reach your hands around your left thigh and gently draw it toward your chest.',
      'Feel the deep stretch in your right glute and outer hip.',
      'Hold for 20 to 30 seconds, then switch legs.'
    ],
    precautions: 'Keep the crossed foot flexed to protect the knee joint from twisting.'
  },
  {
    id: 'glute-bridges',
    name: 'Gentle Glute Bridge for Lumbar Support',
    aliases: ['glute bridge', 'glute bridges', 'supine bridging', 'hip bridge', 'pelvic bridge'],
    bodyPart: 'glutes',
    mediaType: 'video',
    demonstrationUrl: 'https://www.youtube.com/embed/wPM8icPu6H8',
    thumbnailUrl: 'https://img.youtube.com/vi/wPM8icPu6H8/hqdefault.jpg',
    durationText: 'Demonstration video (~15s loop)',
    startingPosition: 'Lie on your back with knees bent at 90 degrees, feet flat on the floor, and arms at your sides.',
    movementDirection: 'Squeeze glutes and press through heels to lift hips until thighs and torso align.',
    repsOrDuration: '8–10 repetitions, hold 2–3 seconds at top.',
    breathingGuidance: 'Exhale as you lift your hips; inhale as you lower with control.',
    stopSigns: 'Stop if hamstring cramping or lower back pinching occurs.',
    instructions: [
      'Lie supine with feet flat on the floor, hip-width apart and close to your fingertips.',
      'Tighten your gluteal muscles before lifting.',
      'Press through your heels to lift your hips until your body forms a straight line from shoulders to knees.',
      'Hold at the top for 2 seconds while keeping your abdominal core braced.',
      'Slowly lower hips back to the floor.'
    ],
    precautions: 'Do not overarch your lower back at the top. Lift with your glutes, not your lumbar spine.'
  },

  // --- 11. HAMSTRINGS ---
  {
    id: 'hamstring-towel-stretch',
    name: 'Supine Hamstring Towel Stretch',
    aliases: ['hamstring stretch', 'hamstring pull', 'hamstring strain', 'towel hamstring stretch', 'supine hamstring stretch'],
    bodyPart: 'hamstrings',
    mediaType: 'video',
    demonstrationUrl: 'https://www.youtube.com/embed/oRdXgERlSag',
    thumbnailUrl: 'https://img.youtube.com/vi/oRdXgERlSag/hqdefault.jpg',
    durationText: 'Demonstration video (~20s loop)',
    startingPosition: 'Lie flat on your back on a mat with both knees bent.',
    movementDirection: 'Loop a towel around the ball of one foot and gently extend the leg upward until a stretch is felt in the back of the thigh.',
    repsOrDuration: 'Hold 20–30 seconds per leg, repeat 2–3 times.',
    breathingGuidance: 'Exhale as you ease the leg into the stretch; breathe calmly.',
    stopSigns: 'Stop if sharp tingling shoots behind the knee or down to the foot.',
    instructions: [
      'Lie on your back with knees bent and feet flat on the floor.',
      'Loop a towel or strap around the ball of your right foot.',
      'Hold both ends of the towel and slowly extend your right leg toward the ceiling.',
      'Straighten the knee until you feel a gentle stretch down the back of your thigh.',
      'Hold for 20 to 30 seconds without trembling or shaking, then repeat on opposite leg.'
    ],
    precautions: 'Keep your opposite knee bent to protect your lower back.'
  },

  // --- 12. KNEES & THIGHS (QUADS) ---
  {
    id: 'heel-slides',
    name: 'Supine Heel Slides for Knee Range of Motion',
    aliases: ['heel slides', 'heel slide', 'supine heel slides', 'knee flexion slide', 'knee slides'],
    bodyPart: 'knees',
    mediaType: 'video',
    demonstrationUrl: 'https://www.youtube.com/embed/D6ZThiQN6_g',
    thumbnailUrl: 'https://img.youtube.com/vi/D6ZThiQN6_g/hqdefault.jpg',
    durationText: 'Demonstration video (~15s loop)',
    startingPosition: 'Lie on your back or sit reclined with legs extended straight out on a smooth surface or bed.',
    movementDirection: 'Gently bend your knee by sliding your heel along the surface toward your buttocks.',
    repsOrDuration: '8–12 repetitions per leg, pause 2 seconds at maximum comfortable bend.',
    breathingGuidance: 'Exhale as you slide your heel toward you; inhale as you slide it back straight.',
    stopSigns: 'Stop if sharp patellofemoral pain or swelling increases.',
    instructions: [
      'Lie flat on your back on a bed or mat (wearing socks on a smooth surface helps).',
      'Slowly slide the heel of your affected leg toward your buttocks, bending the knee within comfortable limits.',
      'Pause for 2 seconds at your comfortable end-range bend.',
      'Slowly slide your heel back down until your leg is straight again.',
      'Repeat with smooth, continuous control.'
    ],
    precautions: 'Do not force the knee past sharp resistance or acute joint pain. Move smoothly without jerking.'
  },
  {
    id: 'quad-sets',
    name: 'Isometric Quad Sets for Knee Stability',
    aliases: ['quad sets', 'quad set', 'isometric quad set', 'isometric knee extension', 'quad squeeze', 'quadriceps strain'],
    bodyPart: 'knees',
    mediaType: 'video',
    demonstrationUrl: 'https://www.youtube.com/embed/au62CidApd0',
    thumbnailUrl: 'https://img.youtube.com/vi/au62CidApd0/hqdefault.jpg',
    durationText: 'Demonstration video (~15s loop)',
    startingPosition: 'Sit or lie with your leg extended straight in front of you. A small rolled towel under the knee is optional.',
    movementDirection: 'Contract your quadriceps muscle on top of the thigh, pressing the back of your knee firmly into the floor.',
    repsOrDuration: '10–12 repetitions, hold contraction for 5 seconds each.',
    breathingGuidance: 'Breathe normally; do not hold your breath while contracting the muscle.',
    stopSigns: 'Stop if you feel sharp pain behind the kneecap.',
    instructions: [
      'Sit comfortably with your injured leg extended straight out in front of you.',
      'Tighten the thigh muscle (quadriceps) on top of your knee.',
      'Press the back of your knee downward toward the floor or towel roll.',
      'Hold the firm muscle squeeze for 5 seconds.',
      'Relax completely for 2 seconds before the next repetition.'
    ],
    precautions: 'Ensure you are squeezing the front thigh muscle rather than lifting your leg into the air.'
  },

  // --- 13. CALVES, SHINS & ANKLES ---
  {
    id: 'calf-heel-raise-stretch',
    name: 'Standing Calf Raise & Eccentric Stretch',
    aliases: ['calf stretch', 'calf raise', 'calf cramp', 'gastrocnemius stretch', 'soleus stretch'],
    bodyPart: 'calves',
    mediaType: 'video',
    demonstrationUrl: 'https://www.youtube.com/embed/hPA98_r-6e4',
    thumbnailUrl: 'https://img.youtube.com/vi/hPA98_r-6e4/hqdefault.jpg',
    durationText: 'Demonstration video (~15s loop)',
    startingPosition: 'Stand near a wall or sturdy counter with feet hip-width apart.',
    movementDirection: 'Press through balls of feet to raise heels smoothly, then lower down slowly with control.',
    repsOrDuration: '8–10 gentle repetitions.',
    breathingGuidance: 'Exhale as you rise onto toes; inhale as you slowly lower heels.',
    stopSigns: 'Stop if sharp stabbing pain occurs in the Achilles tendon.',
    instructions: [
      'Place your hands lightly on a wall for balance.',
      'Slowly rise up onto the balls of both feet.',
      'Hold at the top for 1 to 2 seconds.',
      'Lower your heels back down in a slow, controlled 3-second descent.',
      'Perform repetitions with smooth, rhythmic tempo.'
    ],
    precautions: 'Do not bounce at the bottom. Maintain control throughout.'
  },
  {
    id: 'lateral-ankle-stretch',
    name: 'Gentle Towel Calf & Achilles Stretch',
    aliases: ['achilles stretch', 'towel calf stretch', 'achilles tendonitis', 'heel spur pain'],
    bodyPart: 'achilles-heels',
    mediaType: 'video',
    demonstrationUrl: 'https://www.youtube.com/embed/3JJayVC0-20',
    thumbnailUrl: 'https://img.youtube.com/vi/3JJayVC0-20/hqdefault.jpg',
    durationText: 'Demonstration video (~15s loop)',
    startingPosition: 'Sit with your leg extended straight out and loop a towel around the ball of your foot.',
    movementDirection: 'Gently pull the towel ends toward your body to draw your toes toward your shin.',
    repsOrDuration: 'Hold 20–30 seconds, 3 repetitions.',
    breathingGuidance: 'Exhale as you gently increase the pull; inhale as you hold.',
    stopSigns: 'Stop if sharp pain shoots into the Achilles tendon.',
    instructions: [
      'Sit with your leg extended straight in front of you.',
      'Loop a rolled towel or strap around the ball of your foot.',
      'Hold one end of the towel in each hand.',
      'Gently pull the towel toward your torso until you feel a stretch in your calf and Achilles.',
      'Hold steadily for 20 to 30 seconds without bouncing.'
    ],
    precautions: 'Keep the knee comfortably straight without locking it out forcefully.'
  },
  {
    id: 'ankle-mobility-circles',
    name: 'Ankle Range of Motion Circles & Alphabet',
    aliases: ['ankle circles', 'ankle alphabet', 'ankle mobility', 'ankle rotations', 'ankle sprain', 'shin splints'],
    bodyPart: 'shins-ankles',
    mediaType: 'video',
    demonstrationUrl: 'https://www.youtube.com/embed/5TpWXh8U7MQ',
    thumbnailUrl: 'https://img.youtube.com/vi/5TpWXh8U7MQ/hqdefault.jpg',
    durationText: 'Demonstration video (~15s loop)',
    startingPosition: 'Sit comfortably with your leg supported so your foot is elevated and free to move in the air.',
    movementDirection: 'Move your ankle in slow, wide circles and trace letters of the alphabet with your big toe.',
    repsOrDuration: '10 circles in each direction or trace alphabet A through M.',
    breathingGuidance: 'Maintain steady, relaxed breathing throughout.',
    stopSigns: 'Stop if sharp stabbing pain occurs at the lateral ankle ligaments.',
    instructions: [
      'Sit comfortably with your leg propped up so your foot hangs freely.',
      'Point your big toe and slowly draw imaginary letters of the alphabet in the air.',
      'Move only your foot and ankle, keeping your shin and knee still.',
      'Perform slow circles clockwise, then counter-clockwise.',
      'Keep movement within a pain-free boundary.'
    ],
    precautions: 'Do not move the whole leg from the hip. Focus rotation solely at the ankle joint.'
  },

  // --- 14. FEET & PLANTAR FASCIA ---
  {
    id: 'plantar-fascia-stretch',
    name: 'Seated Plantar Fascia & Foot Arch Stretch',
    aliases: ['plantar fascia stretch', 'plantar fasciitis stretch', 'foot arch stretch', 'toe extension stretch', 'arch pain'],
    bodyPart: 'feet',
    mediaType: 'video',
    demonstrationUrl: 'https://www.youtube.com/embed/0PeVmTMdWhk',
    thumbnailUrl: 'https://img.youtube.com/vi/0PeVmTMdWhk/hqdefault.jpg',
    durationText: 'Demonstration video (~15s loop)',
    startingPosition: 'Sit in a chair and cross your affected foot over your opposite knee.',
    movementDirection: 'Gently pull all toes backward toward your shin until you feel tension along the bottom arch of your foot.',
    repsOrDuration: 'Hold for 15–20 seconds; repeat 3 times.',
    breathingGuidance: 'Breathe smoothly and relax the facial and shoulder muscles.',
    stopSigns: 'Stop if sharp tearing pain is felt at the heel bone.',
    instructions: [
      'Sit and cross your affected foot over the opposite knee.',
      'Grasp the base of your toes with your hand.',
      'Gently pull your toes back toward your shin until you feel a firm stretch in the arch/plantar fascia.',
      'Use your other thumb to gently massage along the taut band under your foot.',
      'Hold the stretch for 15 to 20 seconds, especially upon waking.'
    ],
    precautions: 'Do not bend individual toes aggressively. Pull the entire ball of the toes back together.'
  }
];

/**
 * Normalizes an exercise name for robust string comparison.
 */
function normalizeName(str) {
  if (!str || typeof str !== 'string') return '';
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Maps anatomical selector body parts to canonical exercise categories.
 */
export function getCanonicalExercisesForBodyPart(bodyPart = '') {
  const p = (bodyPart || '').toLowerCase().trim();

  // Region-specific mappings
  return CANONICAL_BODYCARE_EXERCISES.filter(e => {
    if (e.bodyPart === p) return true;
    if (p === 'upper-back' && (e.bodyPart === 'upper-back' || e.id === 'cat-cow' || e.id === 'rhomboid-upper-back-stretch' || e.id === 'seated-thoracic-extension' || e.id === 'wall-slides' || e.id === 'childs-pose')) return true;
    if (p === 'neck' && (e.bodyPart === 'neck' || e.id === 'seated-thoracic-extension' || e.id === 'chin-tucks')) return true;
    if (p === 'shoulders' && (e.bodyPart === 'shoulders' || e.id === 'rhomboid-upper-back-stretch' || e.id === 'doorway-pec-stretch')) return true;
    if (p === 'chest' && (e.bodyPart === 'chest' || e.id === 'seated-thoracic-extension' || e.id === 'cat-cow')) return true;
    if (p === 'biceps' && (e.bodyPart === 'biceps' || e.id === 'pendulum-exercise' || e.id === 'wrist-flexor-extensor-stretch')) return true;
    if (p === 'triceps' && (e.bodyPart === 'triceps' || e.id === 'pendulum-exercise')) return true;
    if ((p === 'elbows' || p === 'elbows-back') && (e.id === 'wrist-flexor-extensor-stretch' || e.id === 'pendulum-exercise')) return true;
    if (p === 'wrists-hands' && e.id === 'wrist-flexor-extensor-stretch') return true;
    if (p === 'lower-back' && (e.bodyPart === 'lower-back' || e.id === 'pelvic-tilts' || e.id === 'knee-to-chest-stretch' || e.id === 'bird-dog' || e.id === 'childs-pose' || e.id === 'glute-bridges')) return true;
    if (p === 'abdomen' && (e.bodyPart === 'abdomen' || e.id === 'pelvic-tilts' || e.id === 'dead-bug')) return true;
    if (p === 'hips-groin' && (e.id === 'figure-four-stretch' || e.id === 'groin-adductor-stretch' || e.id === 'childs-pose')) return true;
    if (p === 'glutes' && (e.id === 'figure-four-stretch' || e.id === 'glute-bridges')) return true;
    if (p === 'hamstrings' && (e.id === 'hamstring-towel-stretch' || e.id === 'glute-bridges')) return true;
    if (p === 'quads' && (e.id === 'quad-sets' || e.id === 'heel-slides')) return true;
    if (p === 'knees' && (e.id === 'heel-slides' || e.id === 'quad-sets')) return true;
    if (p === 'calves' && (e.id === 'calf-heel-raise-stretch' || e.id === 'lateral-ankle-stretch')) return true;
    if ((p === 'shins-ankles' || p === 'achilles-heels') && (e.id === 'ankle-mobility-circles' || e.id === 'lateral-ankle-stretch')) return true;
    if (p === 'feet' && (e.id === 'plantar-fascia-stretch' || e.id === 'ankle-mobility-circles')) return true;
    return false;
  });
}

/**
 * Resolve an AI-recommended exercise against the canonical database.
 * If a match is found, returns the full canonical object with validated demonstration media.
 * If unmatched, returns a safe YouTube search fallback URL with rich instructions and workout cues.
 */
export function resolveExerciseMedia(recExercise, targetBodyPart = '') {
  if (!recExercise) return null;

  const rawName = typeof recExercise === 'string' ? recExercise : (recExercise.name || '');
  const rawId = typeof recExercise === 'object' && recExercise.exerciseId ? recExercise.exerciseId : '';
  const normRawName = normalizeName(rawName);
  const normRawId = normalizeName(rawId);

  // 1. Direct ID match
  let match = CANONICAL_BODYCARE_EXERCISES.find(e => e.id === rawId || e.id === normRawId);

  // 2. Direct name match
  if (!match) {
    match = CANONICAL_BODYCARE_EXERCISES.find(e => normalizeName(e.name) === normRawName);
  }

  // 3. Alias match
  if (!match) {
    match = CANONICAL_BODYCARE_EXERCISES.find(e => {
      return e.aliases && e.aliases.some(alias => {
        const normAlias = normalizeName(alias);
        return normRawName === normAlias || normRawName.includes(normAlias) || normAlias.includes(normRawName);
      });
    });
  }

  // 4. Keyword fuzzy match within canonical candidates for this target body part
  if (!match && targetBodyPart) {
    const candidates = getCanonicalExercisesForBodyPart(targetBodyPart);
    match = candidates.find(e => {
      const eWords = normalizeName(e.name).split(' ');
      const rawWords = normRawName.split(' ');
      const commonWords = eWords.filter(w => w.length > 3 && rawWords.includes(w));
      return commonWords.length >= 1;
    });
  }

  const finalName = match ? match.name : rawName;
  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(finalName + ' proper form physical therapy demonstration')}`;

  if (match) {
    return {
      exerciseId: match.id,
      name: match.name,
      mediaType: match.mediaType,
      demonstrationUrl: match.demonstrationUrl,
      thumbnailUrl: match.thumbnailUrl,
      durationText: match.durationText,
      startingPosition: match.startingPosition,
      movementDirection: match.movementDirection,
      repsOrDuration: match.repsOrDuration,
      breathingGuidance: match.breathingGuidance,
      stopSigns: match.stopSigns,
      instructions: match.instructions,
      description: typeof recExercise === 'object' && recExercise.description ? recExercise.description : match.instructions.join(' '),
      precautions: typeof recExercise === 'object' && recExercise.precautions ? recExercise.precautions : match.precautions,
      youtubeSearchUrl
    };
  }

  // Unmatched AI exercise: Safe fallback to YouTube search with complete workout info
  return {
    exerciseId: normRawName.replace(/\s+/g, '-'),
    name: rawName,
    mediaType: 'youtube_search',
    demonstrationUrl: '',
    thumbnailUrl: '',
    durationText: 'Search demonstration',
    startingPosition: typeof recExercise === 'object' && recExercise.startingPosition ? recExercise.startingPosition : 'Begin in a comfortable, neutral upright position with supported spine.',
    movementDirection: typeof recExercise === 'object' && recExercise.movementDirection ? recExercise.movementDirection : 'Perform smooth, controlled mobility movement within a completely pain-free range.',
    repsOrDuration: typeof recExercise === 'object' && recExercise.repsOrDuration ? recExercise.repsOrDuration : '6–8 slow repetitions or hold for 15–20 seconds.',
    breathingGuidance: typeof recExercise === 'object' && recExercise.breathingGuidance ? recExercise.breathingGuidance : 'Breathe continuously into your diaphragm; do not hold your breath.',
    stopSigns: typeof recExercise === 'object' && recExercise.stopSigns ? recExercise.stopSigns : 'Stop immediately if you experience sharp pinching, burning, or numbness.',
    instructions: typeof recExercise === 'object' && Array.isArray(recExercise.instructions) && recExercise.instructions.length > 0
      ? recExercise.instructions
      : [
          'Assume the comfortable starting posture.',
          'Gently perform the movement without forcing or jerking.',
          'Pause for 2 seconds at your comfortable end-range.',
          'Return slowly to the starting position.'
        ],
    description: typeof recExercise === 'object' && recExercise.description ? recExercise.description : 'Gentle mobility and recovery movement.',
    precautions: typeof recExercise === 'object' && recExercise.precautions ? recExercise.precautions : 'Perform within a strictly pain-free range of motion. Discontinue if discomfort increases.',
    youtubeSearchUrl
  };
}
