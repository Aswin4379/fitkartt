// Complete Production Database of Exercises for FitKart Workout System
// High quality CDN exercise images, step photos, animations and video demonstrations
const BASE_IMG = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises'

export const exerciseLibrary = [
  {
    "id": "bench-press",
    "name": "Barbell Bench Press",
    "target": "Chest",
    "categories": [
      "Chest"
    ],
    "secondary": "Triceps, Front Deltoids",
    "equipment": "Barbell",
    "level": "Intermediate",
    "videoUrl": "https://www.youtube.com/embed/rT7DgCr-3pg",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Bench_Press_-_Medium_Grip/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Bench_Press_-_Medium_Grip/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Bench_Press_-_Medium_Grip/1.jpg",
    "instructions": [
      "Lie flat on the bench with eyes directly beneath the bar. Grip the barbell slightly wider than shoulder-width.",
      "Unrack the bar and hold it straight over your chest with arms locked.",
      "Lower the bar with control to your mid-chest while tucking elbows at roughly 45-degrees.",
      "Press the bar back up explosively until your arms are fully extended."
    ],
    "formTips": "Retract and depress shoulder blades into the bench throughout the lift. Drive heels into the floor.",
    "commonMistakes": "Bouncing bar off the sternum, flaring elbows out to 90 degrees.",
    "defaultSets": 4,
    "defaultReps": 8,
    "defaultWeight": 50
  },
  {
    "id": "incline-barbell-press",
    "name": "Incline Barbell Bench Press",
    "target": "Chest",
    "categories": [
      "Chest"
    ],
    "secondary": "Upper Chest, Front Deltoids, Triceps",
    "equipment": "Barbell",
    "level": "Intermediate",
    "videoUrl": "https://www.youtube.com/embed/SrqOu55lrYU",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Incline_Bench_Press_-_Medium_Grip/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Incline_Bench_Press_-_Medium_Grip/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Incline_Bench_Press_-_Medium_Grip/1.jpg",
    "instructions": [
      "Lie back on an incline bench set to 30-45 degrees. Grip the barbell slightly wider than shoulder-width.",
      "Unrack the bar and stabilize it directly over your upper chest.",
      "Lower the bar slowly to touch your upper chest / clavicle area.",
      "Press the barbell back up explosively to locked arms."
    ],
    "formTips": "Keep bench incline at 30° to target clavicular pectorals without over-engaging front delts.",
    "commonMistakes": "Setting bench angle too high, lifting lower back excessively off bench.",
    "defaultSets": 4,
    "defaultReps": 8,
    "defaultWeight": 45
  },
  {
    "id": "db-incline-press",
    "name": "Incline Dumbbell Press",
    "target": "Chest",
    "categories": [
      "Chest"
    ],
    "secondary": "Upper Chest, Shoulders, Triceps",
    "equipment": "Dumbbells",
    "level": "Intermediate",
    "videoUrl": "https://www.youtube.com/embed/8iPEnn-ltC8",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Incline_Dumbbell_Press/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Incline_Dumbbell_Press/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Incline_Dumbbell_Press/1.jpg",
    "instructions": [
      "Sit on an incline bench angled at 30 to 45 degrees, holding a dumbbell in each hand on your knees.",
      "Kick dumbbells up to your shoulders with palms facing forward.",
      "Press dumbbells upwards straight above your upper chest until arms extend.",
      "Slowly lower the dumbbells back down until you feel a deep stretch in your upper chest."
    ],
    "formTips": "Tuck elbows slightly (45° angle) to protect shoulder rotators and maximize pectoral stretch.",
    "commonMistakes": "Clanging dumbbells together at top which releases muscle tension.",
    "defaultSets": 3,
    "defaultReps": 10,
    "defaultWeight": 18
  },
  {
    "id": "flat-db-press",
    "name": "Flat Dumbbell Bench Press",
    "target": "Chest",
    "categories": [
      "Chest"
    ],
    "secondary": "Triceps, Front Deltoids",
    "equipment": "Dumbbells",
    "level": "Intermediate",
    "videoUrl": "https://www.youtube.com/embed/VmB1G1K7v94",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Decline_Dumbbell_Bench_Press/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Decline_Dumbbell_Bench_Press/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Decline_Dumbbell_Bench_Press/1.jpg",
    "instructions": [
      "Lie flat on a bench holding dumbbells above your chest with a pronated grip.",
      "Lower the dumbbells out to the sides in a controlled arc until level with your chest.",
      "Pause briefly in the stretched position.",
      "Drive the dumbbells upwards back together over your chest."
    ],
    "formTips": "Allows for a greater active range of motion and joint freedom than a fixed barbell.",
    "commonMistakes": "Dropping dumbbells too low or letting wrists bend backwards.",
    "defaultSets": 3,
    "defaultReps": 10,
    "defaultWeight": 20
  },
  {
    "id": "decline-bench-press",
    "name": "Decline Barbell Bench Press",
    "target": "Chest",
    "categories": [
      "Chest"
    ],
    "secondary": "Lower Chest, Triceps",
    "equipment": "Barbell",
    "level": "Intermediate",
    "videoUrl": "https://www.youtube.com/embed/LfyQBUKR8SE",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Decline_Barbell_Bench_Press/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Decline_Barbell_Bench_Press/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Decline_Barbell_Bench_Press/1.jpg",
    "instructions": [
      "Secure your legs at the end of a decline bench and lie back.",
      "Grip the barbell medium-wide and unrack with control.",
      "Lower the bar to your lower sternum area.",
      "Press back up forcefully to full arm extension."
    ],
    "formTips": "Keep lower back arched slightly and focus on contracting lower chest fibers.",
    "commonMistakes": "Bouncing bar off chest, using an unsafely wide grip.",
    "defaultSets": 4,
    "defaultReps": 10,
    "defaultWeight": 45
  },
  {
    "id": "decline-db-press",
    "name": "Decline Dumbbell Press",
    "target": "Chest",
    "categories": [
      "Chest"
    ],
    "secondary": "Lower Pectorals, Triceps",
    "equipment": "Dumbbells",
    "level": "Intermediate",
    "videoUrl": "https://www.youtube.com/embed/0xRwl4Qv3EY",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Decline_Dumbbell_Bench_Press/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Decline_Dumbbell_Bench_Press/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Decline_Dumbbell_Bench_Press/1.jpg",
    "instructions": [
      "Secure feet in decline bench with dumbbells rested on thighs.",
      "Lie back and bring dumbbells to chest level.",
      "Press dumbbells upwards over lower chest until arms extend.",
      "Lower down smoothly feeling the stretch along the lower chest."
    ],
    "formTips": "Emphasizes lower chest development with minimal shoulder strain.",
    "commonMistakes": "Rushing descent without controlling dumbbell path.",
    "defaultSets": 3,
    "defaultReps": 10,
    "defaultWeight": 16
  },
  {
    "id": "cable-flys",
    "name": "Cable Crossover Flys",
    "target": "Chest",
    "categories": [
      "Chest"
    ],
    "secondary": "Inner Chest, Front Deltoids",
    "equipment": "Cable Machine",
    "level": "Intermediate",
    "videoUrl": "https://www.youtube.com/embed/taI4XduLpTk",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Crossover/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Crossover/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Crossover/1.jpg",
    "instructions": [
      "Place cable pulleys at high positions. Stand centered in the machine and hold handles.",
      "Take a small step forward to create constant tension, leaning slightly forward at hips.",
      "Slightly bend elbows, pull hands downwards and inwards to meet in front of waist.",
      "Slowly reverse the motion under control to feel deep stretch."
    ],
    "formTips": "Focus on squeezing chest muscles together at peak contraction.",
    "commonMistakes": "Using too much weight causing body to swing back and forth.",
    "defaultSets": 3,
    "defaultReps": 12,
    "defaultWeight": 15
  },
  {
    "id": "low-cable-flys",
    "name": "Low-to-High Cable Flys",
    "target": "Chest",
    "categories": [
      "Chest"
    ],
    "secondary": "Upper Chest, Front Delts",
    "equipment": "Cable Machine",
    "level": "Intermediate",
    "videoUrl": "https://www.youtube.com/embed/M1N804yWA-8",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Low_Cable_Crossover/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Low_Cable_Crossover/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Low_Cable_Crossover/1.jpg",
    "instructions": [
      "Set cable pulleys to lowest position. Hold handles with palms facing up.",
      "Step forward with staggered stance, maintaining upright torso.",
      "Bring hands upward and inward in an arc until they meet in front of upper chest.",
      "Lower slowly back to start position."
    ],
    "formTips": "Great isolation exercise for upper clavicular head of the pectorals.",
    "commonMistakes": "Bending elbows excessively and turning movement into a bicep curl.",
    "defaultSets": 3,
    "defaultReps": 12,
    "defaultWeight": 12
  },
  {
    "id": "db-flys",
    "name": "Flat Dumbbell Chest Flys",
    "target": "Chest",
    "categories": [
      "Chest"
    ],
    "secondary": "Anterior Deltoids, Sternal Pectorals",
    "equipment": "Dumbbells",
    "level": "Beginner",
    "videoUrl": "https://www.youtube.com/embed/eozdVDA78K0",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/One-Arm_Flat_Bench_Dumbbell_Flye/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/One-Arm_Flat_Bench_Dumbbell_Flye/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/One-Arm_Flat_Bench_Dumbbell_Flye/1.jpg",
    "instructions": [
      "Lie flat on bench holding dumbbells directly over chest, palms facing each other.",
      "Maintain slight bend in elbows and lower dumbbells outward in wide sweeping arc.",
      "Descend until you feel comfortable stretch across chest.",
      "Engage chest to bring dumbbells back together in hugging motion."
    ],
    "formTips": "Maintain consistent elbow angle (around 15-20 degrees) throughout the entire repetition.",
    "commonMistakes": "Straightening arms completely or turning movement into a dumbbell press.",
    "defaultSets": 3,
    "defaultReps": 12,
    "defaultWeight": 12
  },
  {
    "id": "incline-db-flys",
    "name": "Incline Dumbbell Chest Flys",
    "target": "Chest",
    "categories": [
      "Chest"
    ],
    "secondary": "Upper Chest, Front Deltoids",
    "equipment": "Dumbbells",
    "level": "Intermediate",
    "videoUrl": "https://www.youtube.com/embed/bDaIL_zKbGs",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Incline_Cable_Chest_Press/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Incline_Cable_Chest_Press/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Incline_Cable_Chest_Press/1.jpg",
    "instructions": [
      "Set bench to 30 degree incline. Hold dumbbells directly over upper chest with palms facing each other.",
      "Lower arms outward in wide arc keeping slight bend in elbows.",
      "Stop when dumbbells reach chest level and you feel deep upper chest stretch.",
      "Contract upper chest to bring dumbbells back together."
    ],
    "formTips": "Think of hugging a large tree to keep the circular fly path consistent.",
    "commonMistakes": "Over-stretching shoulders past parallel.",
    "defaultSets": 3,
    "defaultReps": 12,
    "defaultWeight": 10
  },
  {
    "id": "chest-dips",
    "name": "Parallel Bar Chest Dips",
    "target": "Chest",
    "categories": [
      "Chest",
      "Triceps"
    ],
    "secondary": "Triceps, Front Shoulders",
    "equipment": "Bodyweight",
    "level": "Advanced",
    "videoUrl": "https://www.youtube.com/embed/2z8JmcrW-As",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bench_Dips/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bench_Dips/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bench_Dips/1.jpg",
    "instructions": [
      "Mount parallel dip bars and lock arms. Lean torso forward roughly 30 degrees.",
      "Bend knees and flare elbows out slightly as you lower body down.",
      "Lower until shoulders are below elbows or chest is deeply stretched.",
      "Press through palms back to top lockout, squeezing lower chest."
    ],
    "formTips": "Leaning forward places tension on chest; upright posture shifts tension to triceps.",
    "commonMistakes": "Dropping down too quickly or keeping body completely vertical.",
    "defaultSets": 3,
    "defaultReps": 10,
    "defaultWeight": 0
  },
  {
    "id": "pec-deck",
    "name": "Pec Deck Machine Flys",
    "target": "Chest",
    "categories": [
      "Chest"
    ],
    "secondary": "Front Shoulders, Inner Chest",
    "equipment": "Machine",
    "level": "Beginner",
    "videoUrl": "https://www.youtube.com/embed/Z57CtFmRMxA",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Machine_Bench_Press/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Machine_Bench_Press/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Machine_Bench_Press/1.jpg",
    "instructions": [
      "Sit with back flat against machine pad and grip handles or rest forearms on pads at chest height.",
      "Bring handles together in front of chest while forcefully contracting pectorals.",
      "Hold contraction for 1 second at peak.",
      "Slowly return to starting position until chest is stretched."
    ],
    "formTips": "Keep shoulders pressed down and avoid shrugging traps.",
    "commonMistakes": "Using momentum instead of controlled chest contraction.",
    "defaultSets": 3,
    "defaultReps": 12,
    "defaultWeight": 25
  },
  {
    "id": "machine-chest-press",
    "name": "Seated Machine Chest Press",
    "target": "Chest",
    "categories": [
      "Chest"
    ],
    "secondary": "Triceps, Shoulders",
    "equipment": "Machine",
    "level": "Beginner",
    "videoUrl": "https://www.youtube.com/embed/xUm0f5VuUco",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Chest_Press/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Chest_Press/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Chest_Press/1.jpg",
    "instructions": [
      "Adjust seat height so handles align with mid-chest. Sit back firmly against pad.",
      "Grip handles and press forward extending arms without locking elbows.",
      "Slowly return handles back until chest muscles feel full stretch.",
      "Repeat with smooth controlled tempo."
    ],
    "formTips": "Safe, controlled alternative for building pushing power and chest hypertrophy.",
    "commonMistakes": "Letting weights slam at the bottom of the rep.",
    "defaultSets": 3,
    "defaultReps": 12,
    "defaultWeight": 35
  },
  {
    "id": "landmine-chest-press",
    "name": "Standing Landmine Chest Press",
    "target": "Chest",
    "categories": [
      "Chest",
      "Shoulders"
    ],
    "secondary": "Upper Chest, Core, Shoulders",
    "equipment": "Barbell",
    "level": "Intermediate",
    "videoUrl": "https://www.youtube.com/embed/6iI-7X46aT8",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Cable_Chest_Press/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Cable_Chest_Press/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Cable_Chest_Press/1.jpg",
    "instructions": [
      "Place one end of barbell in landmine anchor or corner. Hold sleeve with both hands at chest level.",
      "Stand in athletic stance, lean slightly into the bar.",
      "Press the barbell upwards and away at 45 degree angle, squeezing upper chest.",
      "Lower bar with control back to sternum."
    ],
    "formTips": "Extremely joint-friendly movement that builds upper chest thickness.",
    "commonMistakes": "Hyperextending lower back to assist press.",
    "defaultSets": 3,
    "defaultReps": 10,
    "defaultWeight": 20
  },
  {
    "id": "deadlift",
    "name": "Barbell Deadlift",
    "target": "Back",
    "categories": [
      "Back"
    ],
    "secondary": "Hamstrings, Glutes, Core, Traps",
    "equipment": "Barbell",
    "level": "Advanced",
    "videoUrl": "https://www.youtube.com/embed/op9kVnSso6Q",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Deadlift/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Deadlift/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Deadlift/1.jpg",
    "instructions": [
      "Stand with feet hip-width apart, bar over mid-foot. Grip bar outside shins.",
      "Hinge at hips, bend knees slightly, and flatten spine from neck to tailbone.",
      "Drive through heels, pulling bar straight up shins by extending hips and knees in unison.",
      "Lock out hips at top, squeezing glutes without hyperextending lower back."
    ],
    "formTips": "Keep bar in contact with your legs throughout the entire pull to minimize lower back torque.",
    "commonMistakes": "Rounding lower back during initial lift off floor.",
    "defaultSets": 4,
    "defaultReps": 5,
    "defaultWeight": 80
  },
  {
    "id": "sumo-deadlift",
    "name": "Sumo Barbell Deadlift",
    "target": "Back",
    "categories": [
      "Back"
    ],
    "secondary": "Glutes, Adductors, Hamstrings, Lats",
    "equipment": "Barbell",
    "level": "Advanced",
    "videoUrl": "https://www.youtube.com/embed/wQ2SgZuvl4A",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Deadlift/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Deadlift/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Deadlift/1.jpg",
    "instructions": [
      "Take wide stance with toes pointed outward at 45 degrees. Grip bar inside knees.",
      "Drop hips, keep torso upright, and pull slack out of the barbell.",
      "Drive through floor with legs to lift bar straight up.",
      "Lock out glutes and hips at top."
    ],
    "formTips": "Keep torso more vertical than conventional deadlifts; push knees outward in direction of toes.",
    "commonMistakes": "Hips shooting up before chest.",
    "defaultSets": 4,
    "defaultReps": 6,
    "defaultWeight": 75
  },
  {
    "id": "lat-pulldown",
    "name": "Wide-Grip Lat Pulldown",
    "target": "Back",
    "categories": [
      "Back",
      "Pull-ups"
    ],
    "secondary": "Biceps, Rear Deltoids, Rhomboids",
    "equipment": "Cable Machine",
    "level": "Beginner",
    "videoUrl": "https://www.youtube.com/embed/CAwf7n6Luuc",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Wide-Grip_Lat_Pulldown/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Wide-Grip_Lat_Pulldown/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Wide-Grip_Lat_Pulldown/1.jpg",
    "instructions": [
      "Sit on pulldown seat, adjust thigh pads snugly. Grip bar with wide overhand grip.",
      "Slightly lean torso back 10-15 degrees. Draw shoulder blades down and pull bar to upper chest.",
      "Squeeze lats for 1 second at bottom.",
      "Slowly allow bar to return up, getting full stretch in lats."
    ],
    "formTips": "Pull with your elbows driving down towards your pockets rather than pulling with your forearms.",
    "commonMistakes": "Leaning back too far and using momentum to swing bar down.",
    "defaultSets": 4,
    "defaultReps": 10,
    "defaultWeight": 40
  },
  {
    "id": "close-grip-pulldown",
    "name": "Close-Grip V-Bar Lat Pulldown",
    "target": "Back",
    "categories": [
      "Back",
      "Pull-ups"
    ],
    "secondary": "Lower Lats, Biceps, Middle Back",
    "equipment": "Cable Machine",
    "level": "Beginner",
    "videoUrl": "https://www.youtube.com/embed/ecRF8ERf34k",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Close-Grip_Front_Lat_Pulldown/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Close-Grip_Front_Lat_Pulldown/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Close-Grip_Front_Lat_Pulldown/1.jpg",
    "instructions": [
      "Attach V-bar handle to pulldown cable. Grip neutral handles.",
      "Sit with thighs locked under pads. Lean back slightly.",
      "Pull V-handle down to touch upper chest, driving elbows down and back.",
      "Slowly extend arms overhead to full lat extension."
    ],
    "formTips": "Neutral grip allows for deeper lower lat contraction and less wrist strain.",
    "commonMistakes": "Jerking lower back to initiate movement.",
    "defaultSets": 3,
    "defaultReps": 10,
    "defaultWeight": 45
  },
  {
    "id": "reverse-grip-pulldown",
    "name": "Underhand Reverse-Grip Lat Pulldown",
    "target": "Back",
    "categories": [
      "Back",
      "Biceps",
      "Pull-ups"
    ],
    "secondary": "Biceps, Lower Lats",
    "equipment": "Cable Machine",
    "level": "Beginner",
    "videoUrl": "https://www.youtube.com/embed/0oeXZy3o-6U",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Close-Grip_Front_Lat_Pulldown/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Close-Grip_Front_Lat_Pulldown/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Close-Grip_Front_Lat_Pulldown/1.jpg",
    "instructions": [
      "Grip straight bar shoulder-width apart with palms facing towards you (supinated).",
      "Sit tall with chest proud. Pull bar straight down to collarbones.",
      "Hold peak squeeze in lats and biceps.",
      "Control the ascent to full stretch."
    ],
    "formTips": "Supinated grip provides great bicep assist and targets lower lat attachments.",
    "commonMistakes": "Rounding shoulders forward at bottom.",
    "defaultSets": 3,
    "defaultReps": 10,
    "defaultWeight": 35
  },
  {
    "id": "db-row",
    "name": "One-Arm Dumbbell Row",
    "target": "Back",
    "categories": [
      "Back"
    ],
    "secondary": "Lats, Rhomboids, Biceps",
    "equipment": "Dumbbells",
    "level": "Beginner",
    "videoUrl": "https://www.youtube.com/embed/pYcpY20QaE8",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/One-Arm_Dumbbell_Row/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/One-Arm_Dumbbell_Row/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/One-Arm_Dumbbell_Row/1.jpg",
    "instructions": [
      "Place one knee and matching hand on flat bench. Opposite foot on floor for support.",
      "Hold dumbbell in free hand. Keep spine flat and parallel to floor.",
      "Pull dumbbell upwards towards your hip, driving elbow straight back.",
      "Squeeze back muscles at top, then lower dumbbell down to full stretch."
    ],
    "formTips": "Keep your torso steady and avoid rotating your upper body to heave the weight.",
    "commonMistakes": "Pulling with bicep instead of initiating with back and elbow.",
    "defaultSets": 3,
    "defaultReps": 10,
    "defaultWeight": 16
  },
  {
    "id": "bent-over-row",
    "name": "Bent-Over Barbell Row",
    "target": "Back",
    "categories": [
      "Back"
    ],
    "secondary": "Lats, Rhomboids, Lower Back, Biceps",
    "equipment": "Barbell",
    "level": "Intermediate",
    "videoUrl": "https://www.youtube.com/embed/FWJR5Ve8gkQ",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bent_Over_Barbell_Row/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bent_Over_Barbell_Row/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bent_Over_Barbell_Row/1.jpg",
    "instructions": [
      "Stand feet hip-width. Hinge at hips until torso is roughly 45 degrees to floor.",
      "Grip barbell overhand slightly wider than shoulder-width.",
      "Pull the bar up into your lower ribcage/belly button area.",
      "Squeeze shoulder blades together, then lower under control."
    ],
    "formTips": "Maintain tight core and flat spine to safeguard lower back during heavy rows.",
    "commonMistakes": "Standing upright as fatigue sets in.",
    "defaultSets": 4,
    "defaultReps": 8,
    "defaultWeight": 50
  },
  {
    "id": "yates-row",
    "name": "Reverse-Grip Barbell Row (Yates Row)",
    "target": "Back",
    "categories": [
      "Back",
      "Biceps"
    ],
    "secondary": "Lower Lats, Biceps, Upper Back",
    "equipment": "Barbell",
    "level": "Intermediate",
    "videoUrl": "https://www.youtube.com/embed/nuhFm_0Zq8A",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bent_Over_Barbell_Row/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bent_Over_Barbell_Row/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bent_Over_Barbell_Row/1.jpg",
    "instructions": [
      "Hold barbell with underhand (supinated) grip shoulder-width apart.",
      "Hinge forward at 30-45 degree angle with chest tall.",
      "Row the bar smoothly into your lower abdominal area.",
      "Contract lower lats and biceps, then lower with control."
    ],
    "formTips": "Popularized by Dorian Yates for building massive lower lat thickness.",
    "commonMistakes": "Rounding shoulders forward.",
    "defaultSets": 3,
    "defaultReps": 10,
    "defaultWeight": 45
  },
  {
    "id": "cable-row",
    "name": "Seated Cable Row (V-Grip)",
    "target": "Back",
    "categories": [
      "Back"
    ],
    "secondary": "Rhomboids, Lats, Biceps",
    "equipment": "Cable Machine",
    "level": "Beginner",
    "videoUrl": "https://www.youtube.com/embed/GZbfZ033fbo",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Cable_Rows/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Cable_Rows/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Cable_Rows/1.jpg",
    "instructions": [
      "Sit on low row machine, place feet on footrests with slight knee bend.",
      "Grip V-handle and sit upright with flat lower back.",
      "Pull handle into abdomen, retracting shoulder blades together.",
      "Slowly extend arms forward, feeling stretch through mid-back."
    ],
    "formTips": "Do not rock back and forth excessively; let back muscles perform the work.",
    "commonMistakes": "Rounding lower back when reaching forward.",
    "defaultSets": 4,
    "defaultReps": 10,
    "defaultWeight": 45
  },
  {
    "id": "wide-cable-row",
    "name": "Wide-Grip Seated Cable Row",
    "target": "Back",
    "categories": [
      "Back"
    ],
    "secondary": "Rear Delts, Rhomboids, Upper Lats",
    "equipment": "Cable Machine",
    "level": "Intermediate",
    "videoUrl": "https://www.youtube.com/embed/UCXxvVItLoM",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Cable_Rows/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Cable_Rows/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Cable_Rows/1.jpg",
    "instructions": [
      "Attach lat pulldown bar to seated row machine. Grip wide with pronated grip.",
      "Sit upright with chest proud. Pull bar towards sternum with elbows flared out.",
      "Squeeze upper back and rear delts, then return under control."
    ],
    "formTips": "Flaring elbows widens recruitment across rhomboids and rear deltoids.",
    "commonMistakes": "Shrugging traps upward.",
    "defaultSets": 3,
    "defaultReps": 12,
    "defaultWeight": 35
  },
  {
    "id": "tbar-row",
    "name": "T-Bar Landmine Row",
    "target": "Back",
    "categories": [
      "Back"
    ],
    "secondary": "Middle Back, Lats, Spinal Erectors",
    "equipment": "Barbell",
    "level": "Intermediate",
    "videoUrl": "https://www.youtube.com/embed/j3Igk5nyZE4",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bent_Over_One-Arm_Long_Bar_Row/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bent_Over_One-Arm_Long_Bar_Row/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bent_Over_One-Arm_Long_Bar_Row/1.jpg",
    "instructions": [
      "Straddle landmine barbell fitted with V-grip handle under sleeves.",
      "Hinge at hips, maintaining 45-degree flat back posture.",
      "Pull handle up towards chest, squeezing shoulder blades together tightly.",
      "Lower weights smoothly without rounding spine."
    ],
    "formTips": "Use 10kg/25lb plates instead of 20kg plates to increase active range of motion at chest.",
    "commonMistakes": "Jerking hips upward to bounce weight.",
    "defaultSets": 4,
    "defaultReps": 8,
    "defaultWeight": 40
  },
  {
    "id": "chest-supported-db-row",
    "name": "Incline Chest-Supported Dumbbell Row",
    "target": "Back",
    "categories": [
      "Back"
    ],
    "secondary": "Upper Back, Rhomboids, Lats",
    "equipment": "Dumbbells",
    "level": "Beginner",
    "videoUrl": "https://www.youtube.com/embed/H75im9fAUMc",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Incline_Row/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Incline_Row/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Incline_Row/1.jpg",
    "instructions": [
      "Set bench to 30-45 degree incline. Lie face-down with chest supported on pad.",
      "Hold dumbbells with arms hanging straight down.",
      "Row dumbbells up by driving elbows back towards ceiling.",
      "Squeeze shoulder blades firmly, then lower slowly."
    ],
    "formTips": "Eliminates lower back fatigue and cheating momentum completely.",
    "commonMistakes": "Lifting chest off pad during row.",
    "defaultSets": 3,
    "defaultReps": 12,
    "defaultWeight": 14
  },
  {
    "id": "straight-arm-pulldown",
    "name": "Straight-Arm Cable Pulldown",
    "target": "Back",
    "categories": [
      "Back"
    ],
    "secondary": "Lats, Serratus Anterior, Triceps",
    "equipment": "Cable Machine",
    "level": "Beginner",
    "videoUrl": "https://www.youtube.com/embed/G9stb_e5h1U",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Rope_Straight-Arm_Pulldown/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Rope_Straight-Arm_Pulldown/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Rope_Straight-Arm_Pulldown/1.jpg",
    "instructions": [
      "Stand facing high cable pulley with wide or straight bar. Grip shoulder-width.",
      "Hinge forward slightly at hips with arms almost straight (slight elbow bend).",
      "Pull bar down in wide arc to thighs using purely lat strength.",
      "Slowly return bar upward feeling full stretch in lats."
    ],
    "formTips": "Pure lat isolation exercise without bicep involvement.",
    "commonMistakes": "Bending elbows into a tricep pushdown.",
    "defaultSets": 3,
    "defaultReps": 12,
    "defaultWeight": 20
  },
  {
    "id": "hyperextensions",
    "name": "Back Hyperextensions",
    "target": "Back",
    "categories": [
      "Back"
    ],
    "secondary": "Lower Back, Glutes, Hamstrings",
    "equipment": "Bodyweight",
    "level": "Beginner",
    "videoUrl": "https://www.youtube.com/embed/ph3pddpKzzw",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Hyperextensions_Back_Extensions/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Hyperextensions_Back_Extensions/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Hyperextensions_Back_Extensions/1.jpg",
    "instructions": [
      "Lock ankles into 45-degree hyperextension bench, placing thighs on pad.",
      "Cross arms over chest. Lower upper body forward bending at waist.",
      "Raise torso back up until body forms straight line.",
      "Contract glutes and lower back at top."
    ],
    "formTips": "Reinforces spinal erector strength and posterior chain health.",
    "commonMistakes": "Hyper-arching spine excessively past straight line at top.",
    "defaultSets": 3,
    "defaultReps": 15,
    "defaultWeight": 0
  },
  {
    "id": "barbell-shrugs",
    "name": "Heavy Barbell Shrugs",
    "target": "Back",
    "categories": [
      "Back",
      "Shoulders"
    ],
    "secondary": "Upper Trapezius, Forearms",
    "equipment": "Barbell",
    "level": "Beginner",
    "videoUrl": "https://www.youtube.com/embed/cJRVVxmytaM",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Deadlift/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Deadlift/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Deadlift/1.jpg",
    "instructions": [
      "Hold barbell in front of thighs with shoulder-width overhand grip.",
      "Elevate shoulders straight up towards ears as high as possible.",
      "Hold peak squeeze in upper traps for 1-2 seconds.",
      "Lower shoulders down smoothly to full stretch."
    ],
    "formTips": "Shrug straight up and down; avoid rolling shoulders which stresses rotator cuff.",
    "commonMistakes": "Using neck jerk to assist lift.",
    "defaultSets": 4,
    "defaultReps": 12,
    "defaultWeight": 60
  },
  {
    "id": "standing-barbell-curl",
    "name": "Standing Barbell Bicep Curl",
    "target": "Biceps",
    "categories": [
      "Biceps"
    ],
    "secondary": "Forearms, Brachialis",
    "equipment": "Barbell",
    "level": "Intermediate",
    "videoUrl": "https://www.youtube.com/embed/QZEqB6wUPxQ",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Close-Grip_Standing_Barbell_Curl/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Close-Grip_Standing_Barbell_Curl/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Close-Grip_Standing_Barbell_Curl/1.jpg",
    "instructions": [
      "Stand tall holding barbell with shoulder-width underhand grip.",
      "Keep elbows pinned near ribs. Curl barbell up towards collarbones.",
      "Squeeze biceps hard at top.",
      "Lower bar with 2-second eccentric phase to complete arm extension."
    ],
    "formTips": "Do not swing hips or lean back to hoist the barbell up.",
    "commonMistakes": "Elbows drifting forward during the curl.",
    "defaultSets": 4,
    "defaultReps": 8,
    "defaultWeight": 25
  },
  {
    "id": "db-bicep-curl",
    "name": "Dumbbell Alternating Bicep Curl",
    "target": "Biceps",
    "categories": [
      "Biceps"
    ],
    "secondary": "Forearms",
    "equipment": "Dumbbells",
    "level": "Beginner",
    "videoUrl": "https://www.youtube.com/embed/sAq_ocpRh_I",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Alternate_Bicep_Curl/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Alternate_Bicep_Curl/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Alternate_Bicep_Curl/1.jpg",
    "instructions": [
      "Stand with dumbbells hanging at sides, palms facing inward.",
      "Curl one dumbbell up, rotating wrist outwards (supinating) as you lift.",
      "Squeeze bicep at peak with palm facing shoulder.",
      "Lower slowly and repeat with other arm."
    ],
    "formTips": "Supinate wrist forcefully at the top to recruit both bicep heads.",
    "commonMistakes": "Rocking torso side to side.",
    "defaultSets": 3,
    "defaultReps": 10,
    "defaultWeight": 12
  },
  {
    "id": "ez-preacher-curl",
    "name": "EZ-Bar Preacher Curl",
    "target": "Biceps",
    "categories": [
      "Biceps"
    ],
    "secondary": "Lower Bicep, Brachialis",
    "equipment": "EZ-Bar",
    "level": "Intermediate",
    "videoUrl": "https://www.youtube.com/embed/fIWP-FRFNU0",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Preacher_Curl/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Preacher_Curl/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Preacher_Curl/1.jpg",
    "instructions": [
      "Sit on preacher bench with armpits rested comfortably on top of slanted pad.",
      "Grip inner cambered handles of EZ-bar.",
      "Curl bar up until forearms are vertical.",
      "Lower bar slowly under strict control until arms are almost fully extended."
    ],
    "formTips": "Pad locks upper arms in place, eliminating shoulder assistance completely.",
    "commonMistakes": "Hyperextending and snapping elbows violently at bottom.",
    "defaultSets": 3,
    "defaultReps": 10,
    "defaultWeight": 20
  },
  {
    "id": "db-hammer-curl",
    "name": "Dumbbell Hammer Curl",
    "target": "Biceps",
    "categories": [
      "Biceps",
      "Forearms"
    ],
    "secondary": "Brachialis, Brachioradialis (Forearm)",
    "equipment": "Dumbbells",
    "level": "Beginner",
    "videoUrl": "https://www.youtube.com/embed/zC3nLlEvin4",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Preacher_Hammer_Dumbbell_Curl/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Preacher_Hammer_Dumbbell_Curl/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Preacher_Hammer_Dumbbell_Curl/1.jpg",
    "instructions": [
      "Stand tall holding dumbbells with palms facing each other (neutral grip).",
      "Keep elbows tight to your sides, curl weights up maintaining neutral palms.",
      "Squeeze brachialis and forearms at the top.",
      "Lower down under control."
    ],
    "formTips": "Builds arm thickness and forearm size significantly.",
    "commonMistakes": "Swinging weights with shoulders.",
    "defaultSets": 3,
    "defaultReps": 12,
    "defaultWeight": 12
  },
  {
    "id": "incline-db-curl",
    "name": "Incline Dumbbell Bicep Curl",
    "target": "Biceps",
    "categories": [
      "Biceps"
    ],
    "secondary": "Long Head of Bicep",
    "equipment": "Dumbbells",
    "level": "Intermediate",
    "videoUrl": "https://www.youtube.com/embed/soxrZlIl35U",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Alternate_Incline_Dumbbell_Curl/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Alternate_Incline_Dumbbell_Curl/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Alternate_Incline_Dumbbell_Curl/1.jpg",
    "instructions": [
      "Sit on 45-degree incline bench with dumbbells hanging straight down behind torso.",
      "Curl dumbbells upward while keeping elbows back.",
      "Supinate wrists and squeeze biceps at peak.",
      "Lower down slowly to full stretch behind body."
    ],
    "formTips": "Places long head of bicep under extreme stretch for maximum bicep peak.",
    "commonMistakes": "Letting elbows move forward during lift.",
    "defaultSets": 3,
    "defaultReps": 10,
    "defaultWeight": 10
  },
  {
    "id": "concentration-curl",
    "name": "Seated Dumbbell Concentration Curl",
    "target": "Biceps",
    "categories": [
      "Biceps"
    ],
    "secondary": "Bicep Peak",
    "equipment": "Dumbbells",
    "level": "Beginner",
    "videoUrl": "https://www.youtube.com/embed/Jvj2wV0vOYU",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Close-Grip_Concentration_Barbell_Curl/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Close-Grip_Concentration_Barbell_Curl/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Close-Grip_Concentration_Barbell_Curl/1.jpg",
    "instructions": [
      "Sit on edge of bench with legs open. Rest tricep of working arm against inner thigh.",
      "Hold dumbbell with arm extended towards floor.",
      "Curl dumbbell up towards face without moving upper arm off thigh.",
      "Squeeze bicep peak hard for 1 second, then lower slowly."
    ],
    "formTips": "True bicep isolation; avoid swinging torso.",
    "commonMistakes": "Lifting elbow off inner thigh.",
    "defaultSets": 3,
    "defaultReps": 12,
    "defaultWeight": 10
  },
  {
    "id": "cable-bicep-curl",
    "name": "Standing Cable Bicep Curl",
    "target": "Biceps",
    "categories": [
      "Biceps"
    ],
    "secondary": "Forearms",
    "equipment": "Cable Machine",
    "level": "Beginner",
    "videoUrl": "https://www.youtube.com/embed/opF4DOcuCyc",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Biceps_Cable_Curl/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Biceps_Cable_Curl/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Biceps_Cable_Curl/1.jpg",
    "instructions": [
      "Attach straight or EZ-bar to lowest cable pulley. Stand upright holding bar.",
      "Curl bar towards shoulders with constant cable tension throughout whole path.",
      "Squeeze biceps at top, then lower with control."
    ],
    "formTips": "Provides continuous tension on biceps even at the very bottom and top of rep.",
    "commonMistakes": "Leaning torso back.",
    "defaultSets": 3,
    "defaultReps": 12,
    "defaultWeight": 20
  },
  {
    "id": "high-cable-curl",
    "name": "High Cable Overhead Bicep Curl",
    "target": "Biceps",
    "categories": [
      "Biceps"
    ],
    "secondary": "Bicep Peak",
    "equipment": "Cable Machine",
    "level": "Intermediate",
    "videoUrl": "https://www.youtube.com/embed/v9q3c-rZJ9w",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Overhead_Cable_Curl/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Overhead_Cable_Curl/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Overhead_Cable_Curl/1.jpg",
    "instructions": [
      "Stand centered between two high cable pulleys, holding handles in both hands (arms out in T-shape).",
      "Curl handles inwards towards ears while keeping upper arms parallel to floor.",
      "Squeeze bicep peaks firmly, then extend arms back out."
    ],
    "formTips": "Hercules curl variation targeting maximum bicep contraction.",
    "commonMistakes": "Dropping elbows below shoulder level.",
    "defaultSets": 3,
    "defaultReps": 12,
    "defaultWeight": 10
  },
  {
    "id": "spider-curl",
    "name": "Incline Spider Curl",
    "target": "Biceps",
    "categories": [
      "Biceps"
    ],
    "secondary": "Short Head of Bicep",
    "equipment": "EZ-Bar",
    "level": "Intermediate",
    "videoUrl": "https://www.youtube.com/embed/nuhFm_0Zq8A",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Alternate_Incline_Dumbbell_Curl/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Alternate_Incline_Dumbbell_Curl/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Alternate_Incline_Dumbbell_Curl/1.jpg",
    "instructions": [
      "Lie chest-down on 45-degree incline bench with arms hanging over straight vertical edge.",
      "Grip EZ-bar with underhand grip.",
      "Curl bar upwards towards forehead, keeping elbows stationary.",
      "Squeeze bicep peak at top and lower smoothly."
    ],
    "formTips": "Overcomes gravity at top of movement for massive bicep pump.",
    "commonMistakes": "Swinging elbows back towards ribs.",
    "defaultSets": 3,
    "defaultReps": 10,
    "defaultWeight": 15
  },
  {
    "id": "zottman-curl",
    "name": "Dumbbell Zottman Curl",
    "target": "Biceps",
    "categories": [
      "Biceps",
      "Forearms"
    ],
    "secondary": "Forearms, Brachioradialis",
    "equipment": "Dumbbells",
    "level": "Intermediate",
    "videoUrl": "https://www.youtube.com/embed/ZrpRBg5hyKA",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Alternate_Incline_Dumbbell_Curl/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Alternate_Incline_Dumbbell_Curl/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Alternate_Incline_Dumbbell_Curl/1.jpg",
    "instructions": [
      "Stand holding dumbbells at sides. Curl upwards with palms facing up (supinated).",
      "At top of rep, rotate wrists 180 degrees so palms face down (pronated).",
      "Lower dumbbells slowly down with pronated grip to work forearms.",
      "Rotate wrists back to start position at bottom."
    ],
    "formTips": "Hits bicep concentric contraction and forearm eccentric overload in one movement.",
    "commonMistakes": "Dropping dumbbells quickly on eccentric phase.",
    "defaultSets": 3,
    "defaultReps": 10,
    "defaultWeight": 10
  },
  {
    "id": "barbell-21s",
    "name": "Barbell 21s Bicep Curl",
    "target": "Biceps",
    "categories": [
      "Biceps"
    ],
    "secondary": "Forearms",
    "equipment": "Barbell",
    "level": "Advanced",
    "videoUrl": "https://www.youtube.com/embed/qaoPtwGomjY",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Curl/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Curl/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Curl/1.jpg",
    "instructions": [
      "Perform 7 reps from bottom to halfway point (elbows at 90 degrees).",
      "Immediately perform 7 reps from halfway point to top contraction.",
      "Immediately perform 7 full range-of-motion repetitions without pausing (21 total)."
    ],
    "formTips": "Intense metabolic burn routine; use lighter weight than normal curls.",
    "commonMistakes": "Cheating with back on final 7 reps.",
    "defaultSets": 3,
    "defaultReps": 21,
    "defaultWeight": 15
  },
  {
    "id": "tricep-pushdown",
    "name": "Cable Tricep Rope Pushdown",
    "target": "Triceps",
    "categories": [
      "Triceps"
    ],
    "secondary": "Lateral & Medial Tricep Heads",
    "equipment": "Cable Machine",
    "level": "Beginner",
    "videoUrl": "https://www.youtube.com/embed/vB5OHsJ3EME",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Rope_Overhead_Triceps_Extension/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Rope_Overhead_Triceps_Extension/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Rope_Overhead_Triceps_Extension/1.jpg",
    "instructions": [
      "Attach rope to high pulley. Grip rope ends with neutral palms.",
      "Pin elbows to sides of ribs and lean forward slightly.",
      "Push rope downwards, spreading ends apart at bottom for full lockout.",
      "Squeeze triceps for 1 second, then return to 90 degree elbow bend."
    ],
    "formTips": "Spreading the rope ends at bottom maximizes lateral tricep contraction.",
    "commonMistakes": "Allowing elbows to drift forward and back.",
    "defaultSets": 3,
    "defaultReps": 12,
    "defaultWeight": 20
  },
  {
    "id": "straight-bar-pushdown",
    "name": "Straight-Bar Tricep Pushdown",
    "target": "Triceps",
    "categories": [
      "Triceps"
    ],
    "secondary": "Triceps Outer Head",
    "equipment": "Cable Machine",
    "level": "Beginner",
    "videoUrl": "https://www.youtube.com/embed/2-LAMcpzODU",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Triceps_Pushdown_-_V-Bar_Attachment/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Triceps_Pushdown_-_V-Bar_Attachment/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Triceps_Pushdown_-_V-Bar_Attachment/1.jpg",
    "instructions": [
      "Attach straight bar to top cable. Grip with overhand grip 6 inches apart.",
      "Keep elbows fixed at sides. Push bar straight down to thighs.",
      "Lock out elbows and flex triceps.",
      "Control the return to chest level."
    ],
    "formTips": "Allows for heavier load pushing than the rope attachment.",
    "commonMistakes": "Using chest and body weight to press bar down.",
    "defaultSets": 3,
    "defaultReps": 10,
    "defaultWeight": 25
  },
  {
    "id": "skull-crushers",
    "name": "EZ-Bar Lying Tricep Extension (Skull Crushers)",
    "target": "Triceps",
    "categories": [
      "Triceps"
    ],
    "secondary": "Triceps Long Head",
    "equipment": "EZ-Bar",
    "level": "Intermediate",
    "videoUrl": "https://www.youtube.com/embed/d_KZxkY_0cM",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Lying_Triceps_Extension/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Lying_Triceps_Extension/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Lying_Triceps_Extension/1.jpg",
    "instructions": [
      "Lie flat on bench holding EZ-bar over chest with narrow overhand grip.",
      "Angle upper arms slightly back towards head (about 75-80 degrees to floor).",
      "Hinge at elbows to lower bar smoothly down to forehead or top of head.",
      "Extend elbows back up to lock out triceps."
    ],
    "formTips": "Angling upper arms slightly backwards maintains tension on long head throughout entire rep.",
    "commonMistakes": "Flaring elbows wide out to sides.",
    "defaultSets": 4,
    "defaultReps": 10,
    "defaultWeight": 22
  },
  {
    "id": "overhead-db-extension",
    "name": "Seated Overhead Dumbbell Tricep Extension",
    "target": "Triceps",
    "categories": [
      "Triceps"
    ],
    "secondary": "Long Head of Triceps",
    "equipment": "Dumbbells",
    "level": "Intermediate",
    "videoUrl": "https://www.youtube.com/embed/_gsUck-7M74",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Bent-Over_One-Arm_Dumbbell_Triceps_Extension/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Bent-Over_One-Arm_Dumbbell_Triceps_Extension/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Bent-Over_One-Arm_Dumbbell_Triceps_Extension/1.jpg",
    "instructions": [
      "Sit on bench with short back support. Hold heavy dumbbell with both hands in diamond grip under top plate.",
      "Press dumbbell directly overhead.",
      "Lower dumbbell slowly behind head by bending elbows.",
      "Extend arms back overhead, squeezing triceps."
    ],
    "formTips": "Keep elbows pointing forward as much as possible rather than flaring out.",
    "commonMistakes": "Arching lower back excessively.",
    "defaultSets": 3,
    "defaultReps": 10,
    "defaultWeight": 18
  },
  {
    "id": "cable-overhead-extension",
    "name": "Overhead Cable Rope Tricep Extension",
    "target": "Triceps",
    "categories": [
      "Triceps"
    ],
    "secondary": "Long Head of Triceps",
    "equipment": "Cable Machine",
    "level": "Intermediate",
    "videoUrl": "https://www.youtube.com/embed/ns-RGsbYeKA",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Rope_Overhead_Triceps_Extension/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Rope_Overhead_Triceps_Extension/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Rope_Overhead_Triceps_Extension/1.jpg",
    "instructions": [
      "Attach rope to mid-high pulley. Turn body away from machine holding rope behind head.",
      "Step into split stance and lean forward.",
      "Extend arms straight forward and out over head.",
      "Squeeze triceps at lockout, then lower rope back behind head."
    ],
    "formTips": "Constant cable stretch on long head throughout range.",
    "commonMistakes": "Allowing body to move with cable.",
    "defaultSets": 3,
    "defaultReps": 12,
    "defaultWeight": 18
  },
  {
    "id": "close-grip-bench",
    "name": "Close-Grip Barbell Bench Press",
    "target": "Triceps",
    "categories": [
      "Triceps",
      "Chest"
    ],
    "secondary": "Inner Chest, Front Shoulders",
    "equipment": "Barbell",
    "level": "Intermediate",
    "videoUrl": "https://www.youtube.com/embed/nEF0bv2FW94",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Close-Grip_Barbell_Bench_Press/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Close-Grip_Barbell_Bench_Press/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Close-Grip_Barbell_Bench_Press/1.jpg",
    "instructions": [
      "Lie on flat bench. Grip barbell with hands shoulder-width apart (not too narrow).",
      "Unrack bar and lower to lower sternum while keeping elbows tucked tightly to ribs.",
      "Press up explosively through palms, locking out triceps at top."
    ],
    "formTips": "Hands should be shoulder-width apart; overly narrow grips cause wrist pain.",
    "commonMistakes": "Flaring elbows outwards.",
    "defaultSets": 4,
    "defaultReps": 8,
    "defaultWeight": 45
  },
  {
    "id": "bench-dips",
    "name": "Bench Tricep Dips",
    "target": "Triceps",
    "categories": [
      "Triceps"
    ],
    "secondary": "Front Deltoids",
    "equipment": "Bodyweight",
    "level": "Beginner",
    "videoUrl": "https://www.youtube.com/embed/0326dy_-CzM",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bench_Dips/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bench_Dips/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bench_Dips/1.jpg",
    "instructions": [
      "Place hands on bench behind you shoulder-width apart with fingers forward.",
      "Extend legs in front on floor (or elevate on second bench).",
      "Lower hips down by bending elbows to 90 degrees.",
      "Press through palms back to top, squeezing triceps."
    ],
    "formTips": "Keep back close to bench to avoid shoulder joint impingement.",
    "commonMistakes": "Lowering hips too far forward away from bench.",
    "defaultSets": 3,
    "defaultReps": 15,
    "defaultWeight": 0
  },
  {
    "id": "parallel-bar-dips",
    "name": "Parallel Bar Tricep Dips (Upright)",
    "target": "Triceps",
    "categories": [
      "Triceps",
      "Chest"
    ],
    "secondary": "Chest, Shoulders",
    "equipment": "Bodyweight",
    "level": "Intermediate",
    "videoUrl": "https://www.youtube.com/embed/2z8JmcrW-As",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Parallel_Bar_Dip/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Parallel_Bar_Dip/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Parallel_Bar_Dip/1.jpg",
    "instructions": [
      "Mount dip bars and keep torso completely vertical (upright).",
      "Lower body straight down with elbows pointing straight back.",
      "Stop when elbows reach 90 degrees.",
      "Press up to complete lockout, squeezing triceps."
    ],
    "formTips": "Keeping torso vertical shifts tension directly to triceps rather than chest.",
    "commonMistakes": "Leaning forward into chest dip.",
    "defaultSets": 3,
    "defaultReps": 10,
    "defaultWeight": 0
  },
  {
    "id": "tricep-kickback",
    "name": "Dumbbell Tricep Kickback",
    "target": "Triceps",
    "categories": [
      "Triceps"
    ],
    "secondary": "Lateral Tricep Head",
    "equipment": "Dumbbells",
    "level": "Beginner",
    "videoUrl": "https://www.youtube.com/embed/6SS6KT26ae8",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Tricep_Dumbbell_Kickback/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Tricep_Dumbbell_Kickback/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Tricep_Dumbbell_Kickback/1.jpg",
    "instructions": [
      "Place one knee and hand on flat bench with torso horizontal.",
      "Pin upper arm of working arm parallel to torso.",
      "Extend forearm straight back until arm is fully straight.",
      "Squeeze tricep for 1 second, then lower forearm back to 90 degrees."
    ],
    "formTips": "Do not drop upper arm; keep upper arm stationary parallel to torso.",
    "commonMistakes": "Swinging dumbbell with shoulder.",
    "defaultSets": 3,
    "defaultReps": 12,
    "defaultWeight": 8
  },
  {
    "id": "single-cable-kickback",
    "name": "Single-Arm Cable Tricep Kickback",
    "target": "Triceps",
    "categories": [
      "Triceps"
    ],
    "secondary": "Triceps Lateral Head",
    "equipment": "Cable Machine",
    "level": "Intermediate",
    "videoUrl": "https://www.youtube.com/embed/v9q3c-rZJ9w",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_One_Arm_Tricep_Extension/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_One_Arm_Tricep_Extension/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_One_Arm_Tricep_Extension/1.jpg",
    "instructions": [
      "Set cable pulley to mid-height without attachment (grip rubber ball).",
      "Hinge forward with elbow pinned to side.",
      "Extend arm straight back against cable tension.",
      "Hold peak squeeze, then return smoothly."
    ],
    "formTips": "Continuous cable tension overcomes the dead zone of dumbbell kickbacks.",
    "commonMistakes": "Moving shoulder up and down.",
    "defaultSets": 3,
    "defaultReps": 12,
    "defaultWeight": 8
  },
  {
    "id": "jm-press",
    "name": "Barbell JM Press",
    "target": "Triceps",
    "categories": [
      "Triceps"
    ],
    "secondary": "Chest, Shoulders",
    "equipment": "Barbell",
    "level": "Advanced",
    "videoUrl": "https://www.youtube.com/embed/1kL_mKvhc2E",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Close-Grip_Barbell_Bench_Press/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Close-Grip_Barbell_Bench_Press/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Close-Grip_Barbell_Bench_Press/1.jpg",
    "instructions": [
      "Lie flat on bench gripping barbell with close grip.",
      "Lower bar straight down towards throat/upper chest by bending elbows while keeping them angled at 45 degrees.",
      "Press barbell back up into lockout position."
    ],
    "formTips": "Hybrid between close-grip bench press and skull crusher for maximum tricep mass.",
    "commonMistakes": "Dropping bar too quickly.",
    "defaultSets": 3,
    "defaultReps": 8,
    "defaultWeight": 35
  },
  {
    "id": "plank",
    "name": "Forearm Plank Hold",
    "target": "Abs & Core",
    "categories": [
      "Abs & Core"
    ],
    "secondary": "Transverse Abdominis, Shoulders, Glutes",
    "equipment": "Bodyweight",
    "level": "Beginner",
    "videoUrl": "https://www.youtube.com/embed/ASdvN_XEl_c",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Kneeling_Forearm_Stretch/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Kneeling_Forearm_Stretch/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Kneeling_Forearm_Stretch/1.jpg",
    "instructions": [
      "Rest on forearms with elbows directly under shoulders, legs extended straight back on toes.",
      "Tighten glutes, pull belly button towards spine, and maintain straight rigid line.",
      "Breathe steadily without letting hips sag or rise."
    ],
    "formTips": "Focus on full-body tension: squeeze glutes, quads, and abdominal wall simultaneously.",
    "commonMistakes": "Sagging lower back or looking up (craning neck).",
    "defaultSets": 3,
    "defaultReps": 45,
    "defaultWeight": 0
  },
  {
    "id": "side-plank",
    "name": "Side Plank Hold",
    "target": "Abs & Core",
    "categories": [
      "Abs & Core"
    ],
    "secondary": "Obliques, Hip Abductors, Quadratus Lumborum",
    "equipment": "Bodyweight",
    "level": "Beginner",
    "videoUrl": "https://www.youtube.com/embed/K2VljzCC16g",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Push_Up_to_Side_Plank/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Push_Up_to_Side_Plank/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Push_Up_to_Side_Plank/1.jpg",
    "instructions": [
      "Lie on side, propping upper body on forearm directly beneath shoulder.",
      "Stack feet and elevate hips until body forms straight diagonal line.",
      "Hold position with top hand on hip or reaching towards ceiling.",
      "Switch sides after timed hold."
    ],
    "formTips": "Do not allow bottom hip to sag towards the floor.",
    "commonMistakes": "Rotating torso forward.",
    "defaultSets": 3,
    "defaultReps": 30,
    "defaultWeight": 0
  },
  {
    "id": "ab-crunch",
    "name": "Decline Core Crunch",
    "target": "Abs & Core",
    "categories": [
      "Abs & Core"
    ],
    "secondary": "Rectus Abdominis (Upper Abs)",
    "equipment": "Bodyweight",
    "level": "Beginner",
    "videoUrl": "https://www.youtube.com/embed/Xyd_fa5zoEU",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Decline_Crunch/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Decline_Crunch/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Decline_Crunch/1.jpg",
    "instructions": [
      "Secure feet under decline bench rollers, lie back with hands across chest or by ears.",
      "Curl shoulders off bench, flexing upper abs towards pelvis.",
      "Hold contraction at top for 1 second.",
      "Lower back down under control without resting completely at bottom."
    ],
    "formTips": "Curl spine forward rather than pulling on neck with hands.",
    "commonMistakes": "Yanking head forward with hands.",
    "defaultSets": 3,
    "defaultReps": 15,
    "defaultWeight": 0
  },
  {
    "id": "hanging-leg-raise",
    "name": "Hanging Straight Leg Raise",
    "target": "Abs & Core",
    "categories": [
      "Abs & Core"
    ],
    "secondary": "Lower Abs, Hip Flexors, Grip",
    "equipment": "Bodyweight",
    "level": "Advanced",
    "videoUrl": "https://www.youtube.com/embed/Pr1ieGZ5atk",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Hanging_Leg_Raise/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Hanging_Leg_Raise/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Hanging_Leg_Raise/1.jpg",
    "instructions": [
      "Hang from pull-up bar with overhand grip and legs straight.",
      "Engage core and raise straight legs upwards until parallel to floor (or higher).",
      "Pause for 1 second at parallel.",
      "Lower legs smoothly back down without swinging body."
    ],
    "formTips": "Roll pelvis upward at top of movement to fully engage rectus abdominis.",
    "commonMistakes": "Swinging legs with momentum (kipping).",
    "defaultSets": 3,
    "defaultReps": 10,
    "defaultWeight": 0
  },
  {
    "id": "captains-chair-raise",
    "name": "Captain's Chair Knee Raise",
    "target": "Abs & Core",
    "categories": [
      "Abs & Core"
    ],
    "secondary": "Lower Abs, Obliques",
    "equipment": "Machine",
    "level": "Beginner",
    "videoUrl": "https://www.youtube.com/embed/YpXq4j1bWq8",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bent-Knee_Hip_Raise/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bent-Knee_Hip_Raise/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bent-Knee_Hip_Raise/1.jpg",
    "instructions": [
      "Step into captain's chair tower, resting forearms on pads and holding handles.",
      "Back pressed flat against backrest.",
      "Raise knees up towards chest smoothly.",
      "Pause, then lower legs down with control."
    ],
    "formTips": "Great entry movement for lower abs before progressing to hanging leg raises.",
    "commonMistakes": "Arching back off pad.",
    "defaultSets": 3,
    "defaultReps": 12,
    "defaultWeight": 0
  },
  {
    "id": "russian-twists",
    "name": "Seated Russian Twists",
    "target": "Abs & Core",
    "categories": [
      "Abs & Core"
    ],
    "secondary": "Obliques, Rotational Core",
    "equipment": "Bodyweight",
    "level": "Beginner",
    "videoUrl": "https://www.youtube.com/embed/wkD8rjkodUI",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Russian_Twists/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Russian_Twists/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Russian_Twists/1.jpg",
    "instructions": [
      "Sit on floor, bend knees, and elevate feet slightly off ground in V-position.",
      "Lean torso back 45 degrees holding hands together (or holding dumbbell/plate).",
      "Rotate torso side to side, touching hands to floor on each side in rhythmic tempo."
    ],
    "formTips": "Rotate from ribcage and shoulders, not just moving arms.",
    "commonMistakes": "Slouching spine or moving only arms without rotating torso.",
    "defaultSets": 3,
    "defaultReps": 20,
    "defaultWeight": 0
  },
  {
    "id": "bicycle-crunches",
    "name": "Bicycle Crunches",
    "target": "Abs & Core",
    "categories": [
      "Abs & Core"
    ],
    "secondary": "Obliques, Rectus Abdominis",
    "equipment": "Bodyweight",
    "level": "Beginner",
    "videoUrl": "https://www.youtube.com/embed/9FGilxCbdz8",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Crunches/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Crunches/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Crunches/1.jpg",
    "instructions": [
      "Lie flat on back, hands lightly behind head, knees bent at 90 degrees.",
      "Bring right elbow and left knee towards each other while extending right leg straight.",
      "Alternate smoothly bringing left elbow to right knee in continuous cycling motion."
    ],
    "formTips": "Perform reps slowly with full rotation for maximum oblique activation.",
    "commonMistakes": "Yanking on neck with hands.",
    "defaultSets": 3,
    "defaultReps": 20,
    "defaultWeight": 0
  },
  {
    "id": "mountain-climbers",
    "name": "Mountain Climbers",
    "target": "Abs & Core",
    "categories": [
      "Abs & Core",
      "Warm-ups"
    ],
    "secondary": "Core Conditioning, Hip Flexors, Shoulders",
    "equipment": "Bodyweight",
    "level": "Beginner",
    "videoUrl": "https://www.youtube.com/embed/nmwgirgXLYM",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Mountain_Climbers/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Mountain_Climbers/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Mountain_Climbers/1.jpg",
    "instructions": [
      "Start in high push-up plank position with hands directly under shoulders.",
      "Drive right knee forward towards chest.",
      "Quickly switch legs, extending right leg back while driving left knee forward in running rhythm."
    ],
    "formTips": "Keep hips level with shoulders; do not let hips bounce high in the air.",
    "commonMistakes": "Pounding feet heavily or bouncing hips up.",
    "defaultSets": 3,
    "defaultReps": 30,
    "defaultWeight": 0
  },
  {
    "id": "ab-roller",
    "name": "Ab Wheel Rollout",
    "target": "Abs & Core",
    "categories": [
      "Abs & Core"
    ],
    "secondary": "Full Anterior Core, Lats, Shoulders",
    "equipment": "Ab Wheel",
    "level": "Advanced",
    "videoUrl": "https://www.youtube.com/embed/rqiTPdK1c_I",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Ab_Rollout/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Ab_Rollout/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Ab_Rollout/1.jpg",
    "instructions": [
      "Kneel on floor holding ab wheel handles directly beneath shoulders.",
      "Roll wheel forward smoothly, extending body out into straight horizontal line.",
      "Descend as far as core strength permits without sagging lower back.",
      "Contract abs and lats to pull wheel back to starting position."
    ],
    "formTips": "Maintain slight posterior pelvic tilt throughout rollout to protect lumbar spine.",
    "commonMistakes": "Allowing lower back to hyperextend/sag towards floor.",
    "defaultSets": 3,
    "defaultReps": 8,
    "defaultWeight": 0
  },
  {
    "id": "cable-woodchopper",
    "name": "Cable Core Woodchoppers",
    "target": "Abs & Core",
    "categories": [
      "Abs & Core"
    ],
    "secondary": "Obliques, Rotational Power",
    "equipment": "Cable Machine",
    "level": "Intermediate",
    "videoUrl": "https://www.youtube.com/embed/pAplQXk3dkU",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Alternating_Cable_Shoulder_Press/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Alternating_Cable_Shoulder_Press/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Alternating_Cable_Shoulder_Press/1.jpg",
    "instructions": [
      "Set cable pulley at high position. Stand sideways holding single handle with both hands.",
      "Pull cable diagonally down across body to opposite hip with arms extended.",
      "Rotate through torso and pivot back foot.",
      "Slowly return to start under control."
    ],
    "formTips": "Drive rotation from the core and hips, not arms.",
    "commonMistakes": "Bending arms into a pull instead of rotational chop.",
    "defaultSets": 3,
    "defaultReps": 12,
    "defaultWeight": 15
  },
  {
    "id": "cable-kneeling-crunch",
    "name": "Kneeling Cable Rope Crunch",
    "target": "Abs & Core",
    "categories": [
      "Abs & Core"
    ],
    "secondary": "Rectus Abdominis (Upper & Lower)",
    "equipment": "Cable Machine",
    "level": "Intermediate",
    "videoUrl": "https://www.youtube.com/embed/2fO5a9_2n7M",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Kneeling_Cable_Crunch_With_Alternating_Oblique_Twists/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Kneeling_Cable_Crunch_With_Alternating_Oblique_Twists/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Kneeling_Cable_Crunch_With_Alternating_Oblique_Twists/1.jpg",
    "instructions": [
      "Kneel below high pulley with rope attachment. Hold rope ends beside ears.",
      "Hips locked in place. Crunch torso downwards, pulling elbows towards knees.",
      "Contract abs hard at bottom.",
      "Slowly return up feeling abdominal stretch."
    ],
    "formTips": "Keep hips stationary; curl spine like rolling up a poster.",
    "commonMistakes": "Sitting back onto heels instead of flexing abs.",
    "defaultSets": 3,
    "defaultReps": 12,
    "defaultWeight": 25
  },
  {
    "id": "dead-bug",
    "name": "Dead Bug Core Exercise",
    "target": "Abs & Core",
    "categories": [
      "Abs & Core",
      "Warm-ups"
    ],
    "secondary": "Deep Core, Spinal Stability",
    "equipment": "Bodyweight",
    "level": "Beginner",
    "videoUrl": "https://www.youtube.com/embed/g_BYB0R-4Ws",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dead_Bug/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dead_Bug/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dead_Bug/1.jpg",
    "instructions": [
      "Lie on back with arms pointing straight up and knees bent at 90 degrees.",
      "Press lower back firmly into floor.",
      "Slowly lower right arm overhead and extend left leg straight out hovering above floor.",
      "Return to center and alternate opposite arm and leg."
    ],
    "formTips": "Crucial that lower back never arches off floor.",
    "commonMistakes": "Letting lower back arch as limbs extend.",
    "defaultSets": 3,
    "defaultReps": 12,
    "defaultWeight": 0
  },
  {
    "id": "bird-dog",
    "name": "Bird-Dog Core Stability",
    "target": "Abs & Core",
    "categories": [
      "Abs & Core",
      "Warm-ups"
    ],
    "secondary": "Glutes, Lower Back, Core",
    "equipment": "Bodyweight",
    "level": "Beginner",
    "videoUrl": "https://www.youtube.com/embed/wiFNA3sqjCA",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Chest_Stretch_on_Stability_Ball/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Chest_Stretch_on_Stability_Ball/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Chest_Stretch_on_Stability_Ball/1.jpg",
    "instructions": [
      "Start on all fours with hands under shoulders and knees under hips.",
      "Simultaneously extend right arm forward and left leg straight back.",
      "Hold for 2 seconds in straight line.",
      "Return to all fours and alternate opposite sides."
    ],
    "formTips": "Keep hips level without rotating pelvis.",
    "commonMistakes": "Lifting leg too high causing lower back to arch.",
    "defaultSets": 3,
    "defaultReps": 12,
    "defaultWeight": 0
  },
  {
    "id": "hollow-body-hold",
    "name": "Hollow Body Core Hold",
    "target": "Abs & Core",
    "categories": [
      "Abs & Core"
    ],
    "secondary": "Full Anterior Core",
    "equipment": "Bodyweight",
    "level": "Intermediate",
    "videoUrl": "https://www.youtube.com/embed/44ScXWFaVBs",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Body-Up/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Body-Up/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Body-Up/1.jpg",
    "instructions": [
      "Lie on back, extend arms overhead and legs straight out.",
      "Press lower back into floor and lift shoulders and legs 6 inches off ground.",
      "Hold banana shape with tight abs and glutes."
    ],
    "formTips": "Gymnastics benchmark for abdominal bracing and isometric strength.",
    "commonMistakes": "Lower back peeling off floor.",
    "defaultSets": 3,
    "defaultReps": 30,
    "defaultWeight": 0
  },
  {
    "id": "v-ups",
    "name": "V-Ups Jackknife Crunches",
    "target": "Abs & Core",
    "categories": [
      "Abs & Core"
    ],
    "secondary": "Upper & Lower Abs, Hip Flexors",
    "equipment": "Bodyweight",
    "level": "Intermediate",
    "videoUrl": "https://www.youtube.com/embed/7UVgs18Y1P4",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Step_Ups/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Step_Ups/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Step_Ups/1.jpg",
    "instructions": [
      "Lie flat on back with arms extended overhead.",
      "Simultaneously lift torso and straight legs, reaching hands to touch toes at top of V.",
      "Lower smoothly back down to floor."
    ],
    "formTips": "Move in synchronized rhythm with explosive lift and controlled descent.",
    "commonMistakes": "Bending knees excessively.",
    "defaultSets": 3,
    "defaultReps": 12,
    "defaultWeight": 0
  },
  {
    "id": "dragon-flag",
    "name": "Dragon Flag Core Raise",
    "target": "Abs & Core",
    "categories": [
      "Abs & Core"
    ],
    "secondary": "Advanced Core, Lats",
    "equipment": "Bodyweight",
    "level": "Advanced",
    "videoUrl": "https://www.youtube.com/embed/moyFIvrrS0s",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Alternating_Deltoid_Raise/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Alternating_Deltoid_Raise/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Alternating_Deltoid_Raise/1.jpg",
    "instructions": [
      "Lie on flat bench gripping bench behind head.",
      "Lift entire body up on shoulder blades into straight vertical candlestick line.",
      "Slowly lower body down as a single rigid board.",
      "Hover right above bench before raising back up."
    ],
    "formTips": "Legendary Bruce Lee core exercise requiring immense whole-body tension.",
    "commonMistakes": "Bending at hips on descent.",
    "defaultSets": 3,
    "defaultReps": 6,
    "defaultWeight": 0
  },
  {
    "id": "overhead-press",
    "name": "Barbell Overhead Press (Military Press)",
    "target": "Shoulders",
    "categories": [
      "Shoulders"
    ],
    "secondary": "Triceps, Upper Chest, Core",
    "equipment": "Barbell",
    "level": "Intermediate",
    "videoUrl": "https://www.youtube.com/embed/2yjwXTZQDDI",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Barbell_Military_Press/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Barbell_Military_Press/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Barbell_Military_Press/1.jpg",
    "instructions": [
      "Stand with feet shoulder-width, bar resting across front shoulders/clavicle.",
      "Brace core and glutes. Press barbell vertically overhead.",
      "Tilt head slightly back as bar passes face, then push head through under bar at lockout.",
      "Lower bar with control back to collarbones."
    ],
    "formTips": "Squeeze glutes and abs tight to prevent hyperextending lower back.",
    "commonMistakes": "Using leg drive (turning it into a push press) or excessive back arch.",
    "defaultSets": 4,
    "defaultReps": 8,
    "defaultWeight": 35
  },
  {
    "id": "db-overhead-press",
    "name": "Seated Dumbbell Overhead Shoulder Press",
    "target": "Shoulders",
    "categories": [
      "Shoulders"
    ],
    "secondary": "Front Deltoids, Triceps",
    "equipment": "Dumbbells",
    "level": "Beginner",
    "videoUrl": "https://www.youtube.com/embed/qEwKCR5JCog",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_One-Arm_Shoulder_Press/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_One-Arm_Shoulder_Press/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_One-Arm_Shoulder_Press/1.jpg",
    "instructions": [
      "Sit on upright bench with back support. Hold dumbbells at shoulder height with palms forward.",
      "Press dumbbells smoothly straight up overhead until arms extend.",
      "Slowly lower dumbbells back to ear level."
    ],
    "formTips": "Keep elbows angled slightly forward (roughly 60 degrees) rather than completely out to sides.",
    "commonMistakes": "Letting weights drop too fast.",
    "defaultSets": 3,
    "defaultReps": 10,
    "defaultWeight": 14
  },
  {
    "id": "arnold-press",
    "name": "Dumbbell Arnold Press",
    "target": "Shoulders",
    "categories": [
      "Shoulders"
    ],
    "secondary": "All Three Deltoid Heads, Triceps",
    "equipment": "Dumbbells",
    "level": "Intermediate",
    "videoUrl": "https://www.youtube.com/embed/6Z15_WdXmVw",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Arnold_Dumbbell_Press/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Arnold_Dumbbell_Press/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Arnold_Dumbbell_Press/1.jpg",
    "instructions": [
      "Sit holding dumbbells in front of shoulders with palms facing you (supinated).",
      "As you press upwards, rotate wrists 180 degrees so palms face forward at top lockout.",
      "Reverse rotation smoothly as you lower dumbbells back to starting position."
    ],
    "formTips": "Created by Arnold Schwarzenegger to recruit all 3 deltoid heads through rotation.",
    "commonMistakes": "Rushing rotation before starting press.",
    "defaultSets": 3,
    "defaultReps": 10,
    "defaultWeight": 12
  },
  {
    "id": "lateral-raise",
    "name": "Dumbbell Lateral Raise (Side Delts)",
    "target": "Shoulders",
    "categories": [
      "Shoulders"
    ],
    "secondary": "Side Deltoids, Trapezius",
    "equipment": "Dumbbells",
    "level": "Beginner",
    "videoUrl": "https://www.youtube.com/embed/3VcKaXpzqRo",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Lying_One-Arm_Rear_Lateral_Raise/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Lying_One-Arm_Rear_Lateral_Raise/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Lying_One-Arm_Rear_Lateral_Raise/1.jpg",
    "instructions": [
      "Stand tall holding dumbbells at sides with slight forward torso lean.",
      "Raise arms out to sides until elbows reach shoulder height.",
      "Lead with elbows and keep pinkies slightly elevated.",
      "Lower down slowly under strict control."
    ],
    "formTips": "Key exercise for shoulder width; use moderate weight and eliminate swinging.",
    "commonMistakes": "Shrugging traps to heave dumbbells up.",
    "defaultSets": 4,
    "defaultReps": 12,
    "defaultWeight": 8
  },
  {
    "id": "cable-lateral-raise",
    "name": "Single-Arm Cable Lateral Raise",
    "target": "Shoulders",
    "categories": [
      "Shoulders"
    ],
    "secondary": "Lateral Deltoids",
    "equipment": "Cable Machine",
    "level": "Intermediate",
    "videoUrl": "https://www.youtube.com/embed/PPrzBWZDOhA",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Seated_Lateral_Raise/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Seated_Lateral_Raise/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Seated_Lateral_Raise/1.jpg",
    "instructions": [
      "Set cable pulley to lowest setting. Stand beside machine and hold handle across body.",
      "Raise arm out to side until parallel to floor.",
      "Pause for 1 second at top.",
      "Lower slowly against continuous cable tension."
    ],
    "formTips": "Provides resistance right from the very bottom of the lift.",
    "commonMistakes": "Leaning body away from cable.",
    "defaultSets": 3,
    "defaultReps": 12,
    "defaultWeight": 6
  },
  {
    "id": "front-raise",
    "name": "Front Dumbbell Raise",
    "target": "Shoulders",
    "categories": [
      "Shoulders"
    ],
    "secondary": "Anterior Deltoids, Upper Chest",
    "equipment": "Dumbbells",
    "level": "Beginner",
    "videoUrl": "https://www.youtube.com/embed/-t7fuZ0KhDA",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Front_Dumbbell_Raise/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Front_Dumbbell_Raise/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Front_Dumbbell_Raise/1.jpg",
    "instructions": [
      "Stand holding dumbbells across front of thighs.",
      "Raise one or both dumbbells straight forward to shoulder level.",
      "Hold peak squeeze for 1 second.",
      "Lower down smoothly."
    ],
    "formTips": "Keep core braced and avoid rocking back.",
    "commonMistakes": "Swinging torso.",
    "defaultSets": 3,
    "defaultReps": 12,
    "defaultWeight": 8
  },
  {
    "id": "barbell-front-raise",
    "name": "Barbell Front Raise",
    "target": "Shoulders",
    "categories": [
      "Shoulders"
    ],
    "secondary": "Anterior Deltoids",
    "equipment": "Barbell",
    "level": "Beginner",
    "videoUrl": "https://www.youtube.com/embed/2q79B_7_v5U",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Front_Barbell_Raise_Over_Head/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Front_Barbell_Raise_Over_Head/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Front_Barbell_Raise_Over_Head/1.jpg",
    "instructions": [
      "Hold barbell with overhand grip resting on thighs.",
      "Raise barbell straight forward to eye level with straight arms.",
      "Lower slowly back down."
    ],
    "formTips": "Emphasizes front deltoid isolated power.",
    "commonMistakes": "Using back extension momentum.",
    "defaultSets": 3,
    "defaultReps": 10,
    "defaultWeight": 15
  },
  {
    "id": "rear-delt-fly",
    "name": "Reverse Dumbbell Flys",
    "target": "Shoulders",
    "categories": [
      "Shoulders",
      "Back"
    ],
    "secondary": "Posterior Deltoids, Rhomboids",
    "equipment": "Dumbbells",
    "level": "Beginner",
    "videoUrl": "https://www.youtube.com/embed/ttvfGg9d76c",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Dumbbell_Reverse_Curl/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Dumbbell_Reverse_Curl/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Dumbbell_Reverse_Curl/1.jpg",
    "instructions": [
      "Hinge at hips with torso parallel to floor, holding dumbbells hanging down.",
      "Raise dumbbells out to sides in wide arc leading with elbows.",
      "Squeeze rear delts at top, then lower slowly."
    ],
    "formTips": "Essential for balanced 3D shoulder shape and healthy shoulder posture.",
    "commonMistakes": "Shrugging shoulders into traps.",
    "defaultSets": 4,
    "defaultReps": 12,
    "defaultWeight": 8
  },
  {
    "id": "face-pulls",
    "name": "Cable Rope Face Pulls",
    "target": "Shoulders",
    "categories": [
      "Shoulders",
      "Back",
      "Warm-ups"
    ],
    "secondary": "Rear Deltoids, Rotator Cuff, Upper Traps",
    "equipment": "Cable Machine",
    "level": "Beginner",
    "videoUrl": "https://www.youtube.com/embed/V8dZ3pyiCBo",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Rope_Rear-Delt_Rows/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Rope_Rear-Delt_Rows/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Rope_Rear-Delt_Rows/1.jpg",
    "instructions": [
      "Set cable pulley at eye height with rope attachment. Grip with thumbs pointing back.",
      "Step back, pull rope directly towards bridge of nose/eyes.",
      "Externally rotate shoulders pulling hands back past ears.",
      "Squeeze rear delts and rotator cuff for 2 seconds, then return."
    ],
    "formTips": "One of the best bulletproofing exercises for shoulder health and posture.",
    "commonMistakes": "Pulling too low towards chin or neck.",
    "defaultSets": 4,
    "defaultReps": 15,
    "defaultWeight": 15
  },
  {
    "id": "upright-row",
    "name": "Barbell Upright Row",
    "target": "Shoulders",
    "categories": [
      "Shoulders",
      "Back"
    ],
    "secondary": "Side Delts, Upper Traps",
    "equipment": "Barbell",
    "level": "Intermediate",
    "videoUrl": "https://www.youtube.com/embed/amCU-ziHITM",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Upright_Barbell_Row/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Upright_Barbell_Row/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Upright_Barbell_Row/1.jpg",
    "instructions": [
      "Hold barbell with shoulder-width overhand grip resting on thighs.",
      "Pull barbell vertically upwards along body, leading with elbows.",
      "Stop when elbows reach shoulder height.",
      "Lower smoothly back down."
    ],
    "formTips": "Use a wide shoulder-width grip to protect the shoulder joint.",
    "commonMistakes": "Using a super narrow grip that impinges wrists and shoulders.",
    "defaultSets": 3,
    "defaultReps": 10,
    "defaultWeight": 25
  },
  {
    "id": "db-upright-row",
    "name": "Dumbbell Upright Row",
    "target": "Shoulders",
    "categories": [
      "Shoulders"
    ],
    "secondary": "Lateral Deltoids, Trapezius",
    "equipment": "Dumbbells",
    "level": "Beginner",
    "videoUrl": "https://www.youtube.com/embed/ubkGuh4hY4Q",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_One-Arm_Upright_Row/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_One-Arm_Upright_Row/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_One-Arm_Upright_Row/1.jpg",
    "instructions": [
      "Hold dumbbells in front of thighs.",
      "Pull dumbbells straight up along body leading with elbows until chest height.",
      "Lower smoothly."
    ],
    "formTips": "Independent dumbbell movement is gentler on wrist joints.",
    "commonMistakes": "Raising elbows higher than shoulders.",
    "defaultSets": 3,
    "defaultReps": 12,
    "defaultWeight": 10
  },
  {
    "id": "machine-shoulder-press",
    "name": "Seated Machine Shoulder Press",
    "target": "Shoulders",
    "categories": [
      "Shoulders"
    ],
    "secondary": "Front Deltoids, Triceps",
    "equipment": "Machine",
    "level": "Beginner",
    "videoUrl": "https://www.youtube.com/embed/WvLMauqrnK8",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Machine_Shoulder_Military_Press/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Machine_Shoulder_Military_Press/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Machine_Shoulder_Military_Press/1.jpg",
    "instructions": [
      "Adjust seat so handles are at shoulder height. Grip handles firmly.",
      "Press handles upwards overhead to full extension without locking elbows.",
      "Lower handles with control back to shoulder level."
    ],
    "formTips": "Great for overloading shoulder deltoids safely.",
    "commonMistakes": "Arching back off the seat backrest.",
    "defaultSets": 3,
    "defaultReps": 10,
    "defaultWeight": 30
  },
  {
    "id": "wrist-curl",
    "name": "Seated Barbell Wrist Curl (Palms Up)",
    "target": "Forearms",
    "categories": [
      "Forearms"
    ],
    "secondary": "Forearm Flexors, Grip Strength",
    "equipment": "Barbell",
    "level": "Beginner",
    "videoUrl": "https://www.youtube.com/embed/3VXRJ_Kqf9I",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Palms-Down_Barbell_Wrist_Curl/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Palms-Down_Barbell_Wrist_Curl/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Palms-Down_Barbell_Wrist_Curl/1.jpg",
    "instructions": [
      "Sit on bench, rest forearms flat on thighs or bench with wrists hanging over edge, palms facing up.",
      "Hold barbell, let it roll down into fingers slightly.",
      "Curl fingers and wrists upward as high as possible.",
      "Hold peak squeeze for 1 second, then lower down."
    ],
    "formTips": "Isolates inner forearm flexor muscles responsible for grip closing power.",
    "commonMistakes": "Lifting forearms off bench/thighs.",
    "defaultSets": 3,
    "defaultReps": 15,
    "defaultWeight": 15
  },
  {
    "id": "reverse-wrist-curl",
    "name": "Barbell Reverse Wrist Curl (Palms Down)",
    "target": "Forearms",
    "categories": [
      "Forearms"
    ],
    "secondary": "Forearm Extensors",
    "equipment": "Barbell",
    "level": "Beginner",
    "videoUrl": "https://www.youtube.com/embed/yT1mE77n9gY",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Palms-Down_Barbell_Wrist_Curl/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Palms-Down_Barbell_Wrist_Curl/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Palms-Down_Barbell_Wrist_Curl/1.jpg",
    "instructions": [
      "Rest forearms on bench with wrists hanging over edge, palms facing down (pronated).",
      "Hold barbell and curl wrists upwards towards ceiling.",
      "Hold peak contraction in top forearm extensors, then lower slowly."
    ],
    "formTips": "Builds upper forearm thickness and prevents wrist tendonitis.",
    "commonMistakes": "Using too much weight causing jerky motions.",
    "defaultSets": 3,
    "defaultReps": 15,
    "defaultWeight": 10
  },
  {
    "id": "db-wrist-curl",
    "name": "Seated Dumbbell Wrist Curl",
    "target": "Forearms",
    "categories": [
      "Forearms"
    ],
    "secondary": "Forearm Flexors",
    "equipment": "Dumbbells",
    "level": "Beginner",
    "videoUrl": "https://www.youtube.com/embed/kYg4_2e3qgU",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Dumbbell_Palms-Down_Wrist_Curl/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Dumbbell_Palms-Down_Wrist_Curl/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Dumbbell_Palms-Down_Wrist_Curl/1.jpg",
    "instructions": [
      "Rest forearm on bench holding dumbbell with palm up.",
      "Curl wrist upwards to maximum contraction.",
      "Lower back down slowly."
    ],
    "formTips": "Allows each wrist to work independently to fix forearm imbalances.",
    "commonMistakes": "Rushing reps.",
    "defaultSets": 3,
    "defaultReps": 15,
    "defaultWeight": 8
  },
  {
    "id": "farmers-walk",
    "name": "Heavy Farmer's Walk Carry",
    "target": "Forearms",
    "categories": [
      "Forearms"
    ],
    "secondary": "Grip Strength, Traps, Core, Full Body",
    "equipment": "Dumbbells",
    "level": "Intermediate",
    "videoUrl": "https://www.youtube.com/embed/rt17lmnaLSM",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Farmers_Walk/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Farmers_Walk/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Farmers_Walk/1.jpg",
    "instructions": [
      "Pick up two heavy dumbbells or kettlebells with tight crushing grip.",
      "Stand tall with shoulders back and core locked.",
      "Walk forward with short, measured steps for timed interval or distance.",
      "Maintain upright posture without swaying."
    ],
    "formTips": "Builds crushing grip strength, massive traps, and indestructible core endurance.",
    "commonMistakes": "Slouching shoulders or letting weights bang against thighs.",
    "defaultSets": 3,
    "defaultReps": 45,
    "defaultWeight": 24
  },
  {
    "id": "reverse-grip-curl",
    "name": "Barbell Reverse Grip Curl",
    "target": "Forearms",
    "categories": [
      "Forearms",
      "Biceps"
    ],
    "secondary": "Brachioradialis, Biceps",
    "equipment": "Barbell",
    "level": "Beginner",
    "videoUrl": "https://www.youtube.com/embed/nuhFm_0Zq8A",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Close-Grip_Standing_Barbell_Curl/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Close-Grip_Standing_Barbell_Curl/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Close-Grip_Standing_Barbell_Curl/1.jpg",
    "instructions": [
      "Stand holding barbell with shoulder-width overhand (pronated) grip.",
      "Keep elbows pinned at sides. Curl bar upwards towards shoulders.",
      "Squeeze top of forearms hard, then lower under control."
    ],
    "formTips": "Targets brachioradialis muscle on outer forearm for thick arm aesthetics.",
    "commonMistakes": "Flaring elbows outward.",
    "defaultSets": 3,
    "defaultReps": 12,
    "defaultWeight": 18
  },
  {
    "id": "ez-reverse-curl",
    "name": "EZ-Bar Reverse Bicep Curl",
    "target": "Forearms",
    "categories": [
      "Forearms",
      "Biceps"
    ],
    "secondary": "Forearms, Brachialis",
    "equipment": "EZ-Bar",
    "level": "Beginner",
    "videoUrl": "https://www.youtube.com/embed/8-r22eP3L3c",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Reverse_Barbell_Curl/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Reverse_Barbell_Curl/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Reverse_Barbell_Curl/1.jpg",
    "instructions": [
      "Grip EZ-bar with overhand pronated grip on outer angles.",
      "Curl bar up to chest level.",
      "Lower down slowly resisting gravity."
    ],
    "formTips": "Cambered EZ-bar reduces wrist strain compared to straight bar.",
    "commonMistakes": "Using hip momentum.",
    "defaultSets": 3,
    "defaultReps": 12,
    "defaultWeight": 16
  },
  {
    "id": "pinch-plate-hold",
    "name": "Pinch Plate Grip Hold",
    "target": "Forearms",
    "categories": [
      "Forearms"
    ],
    "secondary": "Pinch Grip, Finger Strength",
    "equipment": "Barbell",
    "level": "Intermediate",
    "videoUrl": "https://www.youtube.com/embed/rV1c75q25p4",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Plate_Pinch/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Plate_Pinch/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Plate_Pinch/1.jpg",
    "instructions": [
      "Place two smooth weight plates smooth-side out together (or one heavy wide plate).",
      "Pinch plates together between thumb and fingers.",
      "Stand up holding plates at side for maximum time.",
      "Switch hands and repeat."
    ],
    "formTips": "Builds thumb and finger pinch strength crucial for deadlifts and rock climbing.",
    "commonMistakes": "Resting plates against leg.",
    "defaultSets": 3,
    "defaultReps": 30,
    "defaultWeight": 10
  },
  {
    "id": "dead-hang",
    "name": "Dead Hang on Pull-up Bar",
    "target": "Forearms",
    "categories": [
      "Forearms",
      "Pull-ups",
      "Warm-ups"
    ],
    "secondary": "Grip Endurance, Shoulder Decompression, Lats",
    "equipment": "Bodyweight",
    "level": "Beginner",
    "videoUrl": "https://www.youtube.com/embed/7dIwh7J8J8A",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bottoms-Up_Clean_From_The_Hang_Position/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bottoms-Up_Clean_From_The_Hang_Position/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bottoms-Up_Clean_From_The_Hang_Position/1.jpg",
    "instructions": [
      "Grip pull-up bar with overhand grip shoulder-width apart.",
      "Hang with feet off floor and arms fully straight.",
      "Breathe deeply while holding for maximum duration.",
      "Step down safely."
    ],
    "formTips": "Decompresses spine while building exceptional forearm grip endurance.",
    "commonMistakes": "Shrugging shoulders into ears with tension.",
    "defaultSets": 3,
    "defaultReps": 45,
    "defaultWeight": 0
  },
  {
    "id": "towel-hang",
    "name": "Towel Grip Pull-up Hang",
    "target": "Forearms",
    "categories": [
      "Forearms",
      "Pull-ups"
    ],
    "secondary": "Crush Grip, Forearms, Core",
    "equipment": "Bodyweight",
    "level": "Advanced",
    "videoUrl": "https://www.youtube.com/embed/eGo4IYlbE5g",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Wide-Grip_Rear_Pull-Up/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Wide-Grip_Rear_Pull-Up/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Wide-Grip_Rear_Pull-Up/1.jpg",
    "instructions": [
      "Drape two towels over pull-up bar.",
      "Grip towels tightly in fists.",
      "Hang with feet off floor for timed endurance hold."
    ],
    "formTips": "Extreme grip strengthener used by combat athletes.",
    "commonMistakes": "Letting grip slip without controlled dismount.",
    "defaultSets": 3,
    "defaultReps": 25,
    "defaultWeight": 0
  },
  {
    "id": "behind-back-wrist-curl",
    "name": "Standing Behind-the-Back Barbell Wrist Curl",
    "target": "Forearms",
    "categories": [
      "Forearms"
    ],
    "secondary": "Forearm Flexors",
    "equipment": "Barbell",
    "level": "Intermediate",
    "videoUrl": "https://www.youtube.com/embed/5F_C140k6rA",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Palms-Up_Barbell_Behind_The_Back_Wrist_Curl/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Palms-Up_Barbell_Behind_The_Back_Wrist_Curl/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Palms-Up_Barbell_Behind_The_Back_Wrist_Curl/1.jpg",
    "instructions": [
      "Stand holding barbell behind glutes with palms facing backwards.",
      "Let bar roll down into fingers.",
      "Curl wrists upwards towards ceiling, squeezing inner forearms.",
      "Lower down smoothly."
    ],
    "formTips": "Allows for heavy load on forearm flexors in standing posture.",
    "commonMistakes": "Bending elbows into a reverse row.",
    "defaultSets": 3,
    "defaultReps": 15,
    "defaultWeight": 25
  },
  {
    "id": "arm-circles",
    "name": "Standing Arm Circles & Shoulder Rolls",
    "target": "Warm-ups",
    "categories": [
      "Warm-ups"
    ],
    "secondary": "Rotator Cuff, Shoulders, Chest",
    "equipment": "Bodyweight",
    "level": "Beginner",
    "videoUrl": "https://www.youtube.com/embed/140RTxuhGsg",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Arm_Circles/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Arm_Circles/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Arm_Circles/1.jpg",
    "instructions": [
      "Stand with feet shoulder-width and arms extended out to sides at shoulder height.",
      "Make small forward circles, gradually increasing circle diameter.",
      "Reverse direction after 15 seconds.",
      "Finish with 10 backward shoulder rolls."
    ],
    "formTips": "Warms up shoulder joint synovial fluid and rotator cuff tendons before pressing.",
    "commonMistakes": "Rushing through motion with stiff shoulders.",
    "defaultSets": 2,
    "defaultReps": 20,
    "defaultWeight": 0
  },
  {
    "id": "cat-cow",
    "name": "Cat-Cow Spine Stretch",
    "target": "Warm-ups",
    "categories": [
      "Warm-ups",
      "Abs & Core"
    ],
    "secondary": "Spinal Mobility, Core, Thoracic Extension",
    "equipment": "Bodyweight",
    "level": "Beginner",
    "videoUrl": "https://www.youtube.com/embed/kqnua4rHVVA",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cat_Stretch/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cat_Stretch/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cat_Stretch/1.jpg",
    "instructions": [
      "Start on all fours with hands under shoulders and knees under hips.",
      "Inhale: arch spine down, lift chest and gaze upwards (Cow).",
      "Exhale: round spine upwards towards ceiling, tuck chin to chest (Cat).",
      "Flow smoothly between positions with breath."
    ],
    "formTips": "Decompresses vertebral discs before heavy squats and deadlifts.",
    "commonMistakes": "Forcing range of motion with sudden jerks.",
    "defaultSets": 2,
    "defaultReps": 12,
    "defaultWeight": 0
  },
  {
    "id": "dynamic-leg-swings",
    "name": "Dynamic Leg Swings (Front/Back & Lateral)",
    "target": "Warm-ups",
    "categories": [
      "Warm-ups"
    ],
    "secondary": "Hips, Hamstrings, Adductors, Glutes",
    "equipment": "Bodyweight",
    "level": "Beginner",
    "videoUrl": "https://www.youtube.com/embed/4y_kI-V2_XQ",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dynamic_Back_Stretch/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dynamic_Back_Stretch/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dynamic_Back_Stretch/1.jpg",
    "instructions": [
      "Hold onto wall or rack for support.",
      "Swing one leg forward and backward smoothly in fluid controlled pendulum motion.",
      "Switch to swinging side-to-side across body.",
      "Repeat on opposite leg."
    ],
    "formTips": "Lubricates hip joints and dynamically stretches hamstrings and adductors.",
    "commonMistakes": "Swinging violently past comfortable stretch.",
    "defaultSets": 2,
    "defaultReps": 15,
    "defaultWeight": 0
  },
  {
    "id": "jumping-jacks",
    "name": "Jumping Jacks",
    "target": "Warm-ups",
    "categories": [
      "Warm-ups"
    ],
    "secondary": "Full Body Cardio, Calves, Shoulders",
    "equipment": "Bodyweight",
    "level": "Beginner",
    "videoUrl": "https://www.youtube.com/embed/iSSAk4XCsRA",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Rope_Jumping/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Rope_Jumping/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Rope_Jumping/1.jpg",
    "instructions": [
      "Stand feet together with arms at sides.",
      "Jump feet out to sides while raising arms overhead in clapping motion.",
      "Jump back to start position in continuous steady rhythm."
    ],
    "formTips": "Increases core body temperature, heart rate, and metabolic blood flow.",
    "commonMistakes": "Landing heavy on flat heels.",
    "defaultSets": 2,
    "defaultReps": 30,
    "defaultWeight": 0
  },
  {
    "id": "high-knees",
    "name": "High Knees Running in Place",
    "target": "Warm-ups",
    "categories": [
      "Warm-ups"
    ],
    "secondary": "Cardio, Hip Flexors, Calves, Core",
    "equipment": "Bodyweight",
    "level": "Beginner",
    "videoUrl": "https://www.youtube.com/embed/ZZZoCNMCl4U",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Ab_Rollout_-_On_Knees/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Ab_Rollout_-_On_Knees/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Ab_Rollout_-_On_Knees/1.jpg",
    "instructions": [
      "Stand tall. Run in place bringing knees up to hip height.",
      "Pump arms in rhythm with knees.",
      "Stay light on balls of feet."
    ],
    "formTips": "Engage core to drive knees up rapidly.",
    "commonMistakes": "Leaning torso backwards.",
    "defaultSets": 2,
    "defaultReps": 30,
    "defaultWeight": 0
  },
  {
    "id": "butt-kicks",
    "name": "Butt Kicks Cardio Warm-up",
    "target": "Warm-ups",
    "categories": [
      "Warm-ups"
    ],
    "secondary": "Hamstrings, Quads, Cardio",
    "equipment": "Bodyweight",
    "level": "Beginner",
    "videoUrl": "https://www.youtube.com/embed/vXp_Qp_K_bA",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Butt-Ups/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Butt-Ups/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Butt-Ups/1.jpg",
    "instructions": [
      "Jog in place kicking heels straight up towards glutes.",
      "Maintain upright posture with slight forward lean.",
      "Pump arms rhythmically."
    ],
    "formTips": "Dynamically stretches quadriceps while warming up hamstrings.",
    "commonMistakes": "Kicking feet outward.",
    "defaultSets": 2,
    "defaultReps": 30,
    "defaultWeight": 0
  },
  {
    "id": "worlds-greatest-stretch",
    "name": "World's Greatest Stretch",
    "target": "Warm-ups",
    "categories": [
      "Warm-ups"
    ],
    "secondary": "Hips, Thoracic Spine, Hamstrings, Ankles",
    "equipment": "Bodyweight",
    "level": "Beginner",
    "videoUrl": "https://www.youtube.com/embed/2GLrKr54yA0",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Worlds_Greatest_Stretch/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Worlds_Greatest_Stretch/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Worlds_Greatest_Stretch/1.jpg",
    "instructions": [
      "Step forward into deep lunge with back leg straight.",
      "Place inside hand on floor and rotate opposite arm towards ceiling.",
      "Pause, bring elbow down inside front instep, then rock back to stretch front hamstring.",
      "Step forward and alternate sides."
    ],
    "formTips": "Comprehensive full-body mobility flow opening hips, spine, and hamstrings.",
    "commonMistakes": "Rushing without breathing into the rotational stretch.",
    "defaultSets": 2,
    "defaultReps": 6,
    "defaultWeight": 0
  },
  {
    "id": "inchworm-plank",
    "name": "Inchworm Walkout to Plank",
    "target": "Warm-ups",
    "categories": [
      "Warm-ups",
      "Abs & Core"
    ],
    "secondary": "Hamstrings, Shoulders, Core",
    "equipment": "Bodyweight",
    "level": "Beginner",
    "videoUrl": "https://www.youtube.com/embed/VSp0zF9NXzE",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Inchworm/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Inchworm/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Inchworm/1.jpg",
    "instructions": [
      "Stand tall, hinge at waist and place hands on floor with legs straight.",
      "Walk hands forward until body reaches high push-up plank position.",
      "Pause in tight plank for 1 second.",
      "Walk hands back towards feet and stand tall."
    ],
    "formTips": "Keep legs as straight as possible to stretch posterior hamstrings.",
    "commonMistakes": "Bending knees excessively.",
    "defaultSets": 2,
    "defaultReps": 8,
    "defaultWeight": 0
  },
  {
    "id": "hip-openers",
    "name": "Dynamic Hip Openers (Gate Openers)",
    "target": "Warm-ups",
    "categories": [
      "Warm-ups"
    ],
    "secondary": "Hip Mobility, Glutes, Adductors",
    "equipment": "Bodyweight",
    "level": "Beginner",
    "videoUrl": "https://www.youtube.com/embed/7V8nZ7rK5k8",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Band_Hip_Adductions/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Band_Hip_Adductions/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Band_Hip_Adductions/1.jpg",
    "instructions": [
      "Stand tall. Lift knee to chest height and rotate outward in wide arc (Open the Gate).",
      "Step down and repeat in reverse motion (Close the Gate).",
      "Alternate legs in walking cadence."
    ],
    "formTips": "Increases pelvic mobility and prevents groin strains.",
    "commonMistakes": "Tilting torso side to side.",
    "defaultSets": 2,
    "defaultReps": 12,
    "defaultWeight": 0
  },
  {
    "id": "band-pull-aparts",
    "name": "Resistance Band Pull-Aparts",
    "target": "Warm-ups",
    "categories": [
      "Warm-ups",
      "Shoulders",
      "Back"
    ],
    "secondary": "Rear Delts, Rotator Cuff, Upper Back",
    "equipment": "Resistance Band",
    "level": "Beginner",
    "videoUrl": "https://www.youtube.com/embed/foP_bU8pA2M",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Band_Assisted_Pull-Up/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Band_Assisted_Pull-Up/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Band_Assisted_Pull-Up/1.jpg",
    "instructions": [
      "Hold resistance band shoulder-width with straight arms at chest height.",
      "Pull band apart by squeezing shoulder blades together until band touches chest.",
      "Pause for 1 second, then slowly return."
    ],
    "formTips": "Activates postural muscles and rear shoulders prior to upper body lifting.",
    "commonMistakes": "Shrugging shoulders into ears.",
    "defaultSets": 2,
    "defaultReps": 15,
    "defaultWeight": 0
  },
  {
    "id": "bodyweight-squat-warmup",
    "name": "Bodyweight Air Squats",
    "target": "Warm-ups",
    "categories": [
      "Warm-ups"
    ],
    "secondary": "Quads, Glutes, Knees, Ankles",
    "equipment": "Bodyweight",
    "level": "Beginner",
    "videoUrl": "https://www.youtube.com/embed/C_VtOYc6j5c",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Air_Bike/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Air_Bike/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Air_Bike/1.jpg",
    "instructions": [
      "Stand with feet shoulder-width, toes turned slightly out.",
      "Hinge hips back and bend knees into deep parallel squat.",
      "Drive through heels to stand back up."
    ],
    "formTips": "Warms up knee synovial fluid and activates gluteal firing.",
    "commonMistakes": "Heels rising off ground.",
    "defaultSets": 2,
    "defaultReps": 15,
    "defaultWeight": 0
  },
  {
    "id": "standing-torso-twists",
    "name": "Standing Torso Twists",
    "target": "Warm-ups",
    "categories": [
      "Warm-ups"
    ],
    "secondary": "Spinal Rotation, Obliques",
    "equipment": "Bodyweight",
    "level": "Beginner",
    "videoUrl": "https://www.youtube.com/embed/4y_kI-V2_XQ",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Russian_Twists/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Russian_Twists/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Russian_Twists/1.jpg",
    "instructions": [
      "Stand with feet shoulder-width, arms bent in front of chest.",
      "Rotate torso smoothly side to side, pivoting on back foot with each turn."
    ],
    "formTips": "Gentle dynamic rotation to loosen thoracic spine.",
    "commonMistakes": "Forcing rotation past natural range.",
    "defaultSets": 2,
    "defaultReps": 20,
    "defaultWeight": 0
  },
  {
    "id": "standard-pushup",
    "name": "Standard Bodyweight Push-up",
    "target": "Push-ups",
    "categories": [
      "Push-ups",
      "Chest"
    ],
    "secondary": "Chest, Triceps, Anterior Deltoids, Core",
    "equipment": "Bodyweight",
    "level": "Beginner",
    "videoUrl": "https://www.youtube.com/embed/IODxDxX7oi4",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bodyweight_Flyes/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bodyweight_Flyes/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bodyweight_Flyes/1.jpg",
    "instructions": [
      "Set hands shoulder-width apart on floor with fingers spread, legs straight back on toes.",
      "Lower body as a rigid plank until chest is 1 inch off floor.",
      "Keep elbows tucked at roughly 45 degrees to torso.",
      "Press through palms back to full arm lockout."
    ],
    "formTips": "Squeeze glutes and brace core to maintain straight line from head to heels.",
    "commonMistakes": "Sagging hips or flaring elbows straight out to 90 degrees.",
    "defaultSets": 3,
    "defaultReps": 15,
    "defaultWeight": 0
  },
  {
    "id": "wide-grip-pushup",
    "name": "Wide-Grip Push-up",
    "target": "Push-ups",
    "categories": [
      "Push-ups",
      "Chest"
    ],
    "secondary": "Outer Chest, Shoulders",
    "equipment": "Bodyweight",
    "level": "Beginner",
    "videoUrl": "https://www.youtube.com/embed/rr6eFNNDQdU",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Close-Grip_Push-Up_off_of_a_Dumbbell/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Close-Grip_Push-Up_off_of_a_Dumbbell/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Close-Grip_Push-Up_off_of_a_Dumbbell/1.jpg",
    "instructions": [
      "Position hands 1.5 times shoulder-width apart on floor.",
      "Lower chest down to floor keeping core tight.",
      "Push forcefully through palms back to top."
    ],
    "formTips": "Increases pectoral stretch on the outer chest fibers.",
    "commonMistakes": "Flaring elbows completely perpendicular.",
    "defaultSets": 3,
    "defaultReps": 12,
    "defaultWeight": 0
  },
  {
    "id": "diamond-pushup",
    "name": "Diamond Push-up",
    "target": "Push-ups",
    "categories": [
      "Push-ups",
      "Triceps",
      "Chest"
    ],
    "secondary": "Triceps, Inner Chest, Front Delts",
    "equipment": "Bodyweight",
    "level": "Intermediate",
    "videoUrl": "https://www.youtube.com/embed/J0DnG1_S92I",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Chest_Push_from_3_point_stance/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Chest_Push_from_3_point_stance/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Chest_Push_from_3_point_stance/1.jpg",
    "instructions": [
      "Place hands together under chest, touching index fingers and thumbs to form a diamond.",
      "Lower chest down to touch the diamond shape, keeping elbows tucked close to ribs.",
      "Press up powerfully, squeezing triceps at top."
    ],
    "formTips": "Exceptional bodyweight builder for tricep thickness and inner pectoral line.",
    "commonMistakes": "Allowing elbows to wing out wide.",
    "defaultSets": 3,
    "defaultReps": 10,
    "defaultWeight": 0
  },
  {
    "id": "incline-pushup",
    "name": "Incline Bench Push-up",
    "target": "Push-ups",
    "categories": [
      "Push-ups",
      "Chest",
      "Warm-ups"
    ],
    "secondary": "Lower Chest, Triceps",
    "equipment": "Bodyweight",
    "level": "Beginner",
    "videoUrl": "https://www.youtube.com/embed/Z0bRiVhnO8Q",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Incline_Bench_Press_-_Medium_Grip/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Incline_Bench_Press_-_Medium_Grip/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Incline_Bench_Press_-_Medium_Grip/1.jpg",
    "instructions": [
      "Place hands on bench or elevated surface shoulder-width apart, feet on floor.",
      "Lower chest to touch bench under control.",
      "Press back up to full extension."
    ],
    "formTips": "Great entry push-up progression and warm-up before heavier chest work.",
    "commonMistakes": "Arching spine.",
    "defaultSets": 3,
    "defaultReps": 15,
    "defaultWeight": 0
  },
  {
    "id": "decline-pushup",
    "name": "Feet-Elevated Decline Push-up",
    "target": "Push-ups",
    "categories": [
      "Push-ups",
      "Chest"
    ],
    "secondary": "Upper Chest, Anterior Deltoids",
    "equipment": "Bodyweight",
    "level": "Intermediate",
    "videoUrl": "https://www.youtube.com/embed/SKPab2YC8BE",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Push-Ups_With_Feet_Elevated/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Push-Ups_With_Feet_Elevated/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Push-Ups_With_Feet_Elevated/1.jpg",
    "instructions": [
      "Place feet on bench and hands on floor shoulder-width apart.",
      "Lower upper chest down towards floor.",
      "Press up explosively through palms."
    ],
    "formTips": "Elevating feet shifts load onto upper clavicular chest and shoulders.",
    "commonMistakes": "Sagging hips.",
    "defaultSets": 3,
    "defaultReps": 12,
    "defaultWeight": 0
  },
  {
    "id": "pike-pushup",
    "name": "Pike Push-up",
    "target": "Push-ups",
    "categories": [
      "Push-ups",
      "Shoulders"
    ],
    "secondary": "Front Deltoids, Upper Chest, Triceps",
    "equipment": "Bodyweight",
    "level": "Intermediate",
    "videoUrl": "https://www.youtube.com/embed/sposDXWEB0A",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Chest_Push_from_3_point_stance/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Chest_Push_from_3_point_stance/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Chest_Push_from_3_point_stance/1.jpg",
    "instructions": [
      "Start in downward dog position with hips pushed high into an inverted V.",
      "Lower head diagonally forward towards floor between hands.",
      "Press back diagonally up into starting high-hip V position."
    ],
    "formTips": "Best bodyweight exercise for building overhead shoulder strength without weights.",
    "commonMistakes": "Flattening hips down into regular push-up.",
    "defaultSets": 3,
    "defaultReps": 10,
    "defaultWeight": 0
  },
  {
    "id": "explosive-clap-pushup",
    "name": "Explosive Clapping Push-up",
    "target": "Push-ups",
    "categories": [
      "Push-ups",
      "Chest"
    ],
    "secondary": "Fast-Twitch Pectorals, Explosive Triceps",
    "equipment": "Bodyweight",
    "level": "Advanced",
    "videoUrl": "https://www.youtube.com/embed/EY9Auh_s4Dk",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Chest_Push_from_3_point_stance/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Chest_Push_from_3_point_stance/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Chest_Push_from_3_point_stance/1.jpg",
    "instructions": [
      "Lower into bottom of standard push-up.",
      "Explode upwards with maximum power so hands leave floor.",
      "Clap hands quickly in air and land softly absorbing drop back into next rep."
    ],
    "formTips": "Builds explosive upper-body rate of force development.",
    "commonMistakes": "Landing with stiff, locked elbows.",
    "defaultSets": 3,
    "defaultReps": 8,
    "defaultWeight": 0
  },
  {
    "id": "archer-pushup",
    "name": "Archer Push-up (Side-to-Side)",
    "target": "Push-ups",
    "categories": [
      "Push-ups",
      "Chest"
    ],
    "secondary": "Unilateral Chest, Core, Triceps",
    "equipment": "Bodyweight",
    "level": "Advanced",
    "videoUrl": "https://www.youtube.com/embed/2_8rN3Z5z1k",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Push_Up_to_Side_Plank/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Push_Up_to_Side_Plank/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Push_Up_to_Side_Plank/1.jpg",
    "instructions": [
      "Place hands extra wide on floor.",
      "Lower body towards right hand while extending left arm straight out to side.",
      "Press back to center, then lower towards left hand."
    ],
    "formTips": "Stepping stone towards single-arm push-up with heavy unilateral chest loading.",
    "commonMistakes": "Bending the extended arm.",
    "defaultSets": 3,
    "defaultReps": 8,
    "defaultWeight": 0
  },
  {
    "id": "spiderman-pushup",
    "name": "Spider-Man Knee-to-Elbow Push-up",
    "target": "Push-ups",
    "categories": [
      "Push-ups",
      "Abs & Core",
      "Chest"
    ],
    "secondary": "Obliques, Chest, Core",
    "equipment": "Bodyweight",
    "level": "Intermediate",
    "videoUrl": "https://www.youtube.com/embed/6iI-7X46aT8",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Elbow_to_Knee/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Elbow_to_Knee/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Elbow_to_Knee/1.jpg",
    "instructions": [
      "As you lower into push-up, bring right knee up and outward to touch right elbow.",
      "Press back up while returning foot to floor.",
      "Alternate with left knee on next rep."
    ],
    "formTips": "Combines chest pressing with intense rotational oblique engagement.",
    "commonMistakes": "Rotating hips out of alignment.",
    "defaultSets": 3,
    "defaultReps": 10,
    "defaultWeight": 0
  },
  {
    "id": "deficit-pushup",
    "name": "Deficit Push-up on Blocks/Handles",
    "target": "Push-ups",
    "categories": [
      "Push-ups",
      "Chest"
    ],
    "secondary": "Deep Pectoral Stretch, Shoulders",
    "equipment": "Bodyweight",
    "level": "Intermediate",
    "videoUrl": "https://www.youtube.com/embed/IODxDxX7oi4",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Chest_Push_from_3_point_stance/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Chest_Push_from_3_point_stance/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Chest_Push_from_3_point_stance/1.jpg",
    "instructions": [
      "Place hands on push-up handles, dumbbells, or blocks.",
      "Lower chest past the level of hands to achieve deep stretch in pectorals.",
      "Press forcefully back to top."
    ],
    "formTips": "Increases active hypertrophy stretch without shoulder discomfort.",
    "commonMistakes": "Rushing out of the bottom stretch.",
    "defaultSets": 3,
    "defaultReps": 12,
    "defaultWeight": 0
  },
  {
    "id": "handstand-pushup",
    "name": "Wall Handstand Push-up",
    "target": "Push-ups",
    "categories": [
      "Push-ups",
      "Shoulders"
    ],
    "secondary": "Deltoids, Upper Traps, Triceps",
    "equipment": "Bodyweight",
    "level": "Advanced",
    "videoUrl": "https://www.youtube.com/embed/Z0bRiVhnO8Q",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Handstand_Push-Ups/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Handstand_Push-Ups/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Handstand_Push-Ups/1.jpg",
    "instructions": [
      "Kick up into handstand against sturdy wall with arms extended.",
      "Lower head slowly until top of head touches floor or mat.",
      "Press through palms forcefully to push body back up to locked arms."
    ],
    "formTips": "Ultimate bodyweight vertical pushing test.",
    "commonMistakes": "Over-arching spine like a scorpion.",
    "defaultSets": 3,
    "defaultReps": 6,
    "defaultWeight": 0
  },
  {
    "id": "kneeling-pushup",
    "name": "Kneeling Beginner Push-up",
    "target": "Push-ups",
    "categories": [
      "Push-ups",
      "Chest"
    ],
    "secondary": "Chest, Triceps, Shoulders",
    "equipment": "Bodyweight",
    "level": "Beginner",
    "videoUrl": "https://www.youtube.com/embed/jWxvty2Kks8",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Chest_Push_from_3_point_stance/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Chest_Push_from_3_point_stance/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Chest_Push_from_3_point_stance/1.jpg",
    "instructions": [
      "Rest on knees and hands placed shoulder-width apart on floor.",
      "Maintain straight line from shoulders to knees.",
      "Lower chest down to 1 inch above floor, then press back up."
    ],
    "formTips": "Perfect starting variation for building foundational pushing mechanics.",
    "commonMistakes": "Bending only at hips.",
    "defaultSets": 3,
    "defaultReps": 15,
    "defaultWeight": 0
  },
  {
    "id": "standard-pullup",
    "name": "Wide-Grip Pull-up",
    "target": "Pull-ups",
    "categories": [
      "Pull-ups",
      "Back"
    ],
    "secondary": "Lats, Rhomboids, Biceps, Forearms",
    "equipment": "Bodyweight",
    "level": "Intermediate",
    "videoUrl": "https://www.youtube.com/embed/eGo4IYlbE5g",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Wide-Grip_Rear_Pull-Up/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Wide-Grip_Rear_Pull-Up/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Wide-Grip_Rear_Pull-Up/1.jpg",
    "instructions": [
      "Grip pull-up bar with overhand (pronated) grip wider than shoulders.",
      "Start from dead hang with arms fully extended.",
      "Pull chest up towards bar by driving elbows down and back.",
      "Clear bar with chin, squeeze lats, then lower with control to dead hang."
    ],
    "formTips": "Depress shoulder blades before pulling to engage lats properly.",
    "commonMistakes": "Kipping legs or performing partial reps.",
    "defaultSets": 4,
    "defaultReps": 8,
    "defaultWeight": 0
  },
  {
    "id": "chin-up",
    "name": "Underhand Grip Chin-up",
    "target": "Pull-ups",
    "categories": [
      "Pull-ups",
      "Biceps",
      "Back"
    ],
    "secondary": "Biceps, Lower Lats, Forearms",
    "equipment": "Bodyweight",
    "level": "Intermediate",
    "videoUrl": "https://www.youtube.com/embed/brhrxlUs420",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Lying_Close-Grip_Barbell_Triceps_Press_To_Chin/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Lying_Close-Grip_Barbell_Triceps_Press_To_Chin/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Lying_Close-Grip_Barbell_Triceps_Press_To_Chin/1.jpg",
    "instructions": [
      "Grip bar with underhand (supinated) grip shoulder-width apart.",
      "Pull chest up until chin clears the bar, squeezing biceps hard.",
      "Lower slowly to full arm extension."
    ],
    "formTips": "Heavier bicep recruitment than standard overhand pull-ups.",
    "commonMistakes": "Swinging torso.",
    "defaultSets": 3,
    "defaultReps": 10,
    "defaultWeight": 0
  },
  {
    "id": "neutral-grip-pullup",
    "name": "Neutral Grip Pull-up",
    "target": "Pull-ups",
    "categories": [
      "Pull-ups",
      "Back"
    ],
    "secondary": "Lats, Brachialis, Biceps",
    "equipment": "Bodyweight",
    "level": "Intermediate",
    "videoUrl": "https://www.youtube.com/embed/8-r22eP3L3c",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Bench_Press_with_Neutral_Grip/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Bench_Press_with_Neutral_Grip/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Bench_Press_with_Neutral_Grip/1.jpg",
    "instructions": [
      "Grip parallel handles with palms facing each other.",
      "Pull chest up to handle level.",
      "Lower smoothly to full extension."
    ],
    "formTips": "Easier on shoulders and wrists while heavily engaging the lats and brachialis.",
    "commonMistakes": "Cutting range short at bottom.",
    "defaultSets": 3,
    "defaultReps": 10,
    "defaultWeight": 0
  },
  {
    "id": "assisted-pullup",
    "name": "Resistance Band Assisted Pull-up",
    "target": "Pull-ups",
    "categories": [
      "Pull-ups",
      "Back"
    ],
    "secondary": "Lats, Biceps",
    "equipment": "Bodyweight",
    "level": "Beginner",
    "videoUrl": "https://www.youtube.com/embed/6iWUpX788mE",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Band_Assisted_Pull-Up/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Band_Assisted_Pull-Up/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Band_Assisted_Pull-Up/1.jpg",
    "instructions": [
      "Loop heavy resistance band around pull-up bar.",
      "Place one foot in band loop and grip bar overhand.",
      "Pull chin over bar with assistance, then lower under control."
    ],
    "formTips": "Best exercise to build strength required for unassisted pull-ups.",
    "commonMistakes": "Kicking leg wildly in band.",
    "defaultSets": 3,
    "defaultReps": 10,
    "defaultWeight": 0
  },
  {
    "id": "negative-pullup",
    "name": "Slow Eccentric Negative Pull-up",
    "target": "Pull-ups",
    "categories": [
      "Pull-ups",
      "Back"
    ],
    "secondary": "Lats, Grip Strength",
    "equipment": "Bodyweight",
    "level": "Beginner",
    "videoUrl": "https://www.youtube.com/embed/y5wsJdbL_3U",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Band_Assisted_Pull-Up/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Band_Assisted_Pull-Up/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Band_Assisted_Pull-Up/1.jpg",
    "instructions": [
      "Step on box or bench to jump chin over pull-up bar.",
      "Lower body down as slowly as possible (5-second descent) fighting gravity.",
      "Step back on box and repeat."
    ],
    "formTips": "Builds rapid pulling strength through eccentric overload.",
    "commonMistakes": "Dropping down fast without resisting.",
    "defaultSets": 3,
    "defaultReps": 5,
    "defaultWeight": 0
  },
  {
    "id": "weighted-pullup",
    "name": "Weighted Barbell/Belt Pull-up",
    "target": "Pull-ups",
    "categories": [
      "Pull-ups",
      "Back"
    ],
    "secondary": "Lats, Biceps, Core",
    "equipment": "Bodyweight",
    "level": "Advanced",
    "videoUrl": "https://www.youtube.com/embed/hu1CU0v573Q",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Weighted_Pull_Ups/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Weighted_Pull_Ups/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Weighted_Pull_Ups/1.jpg",
    "instructions": [
      "Attach weight plate to dip belt or hold dumbbell between feet.",
      "Grip bar and pull chin smoothly over bar.",
      "Lower under control to full dead hang."
    ],
    "formTips": "Apex upper body pulling strength developer.",
    "commonMistakes": "Swinging legs to generate momentum.",
    "defaultSets": 4,
    "defaultReps": 6,
    "defaultWeight": 10
  },
  {
    "id": "australian-pullup",
    "name": "Inverted Row / Australian Pull-up",
    "target": "Pull-ups",
    "categories": [
      "Pull-ups",
      "Back"
    ],
    "secondary": "Rhomboids, Lats, Biceps, Rear Delts",
    "equipment": "Bodyweight",
    "level": "Beginner",
    "videoUrl": "https://www.youtube.com/embed/XZV9IwluPjw",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Inverted_Row/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Inverted_Row/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Inverted_Row/1.jpg",
    "instructions": [
      "Set bar on Smith machine or rack at waist height. Lie underneath and grip overhand.",
      "Hang with heels on floor and body in rigid plank.",
      "Pull chest up to touch bar, squeezing shoulder blades.",
      "Lower down smoothly."
    ],
    "formTips": "Adjust difficulty by elevating or lowering bar height.",
    "commonMistakes": "Sagging hips.",
    "defaultSets": 3,
    "defaultReps": 12,
    "defaultWeight": 0
  },
  {
    "id": "l-sit-pullup",
    "name": "L-Sit Strict Pull-up",
    "target": "Pull-ups",
    "categories": [
      "Pull-ups",
      "Abs & Core",
      "Back"
    ],
    "secondary": "Lats, Core, Hip Flexors",
    "equipment": "Bodyweight",
    "level": "Advanced",
    "videoUrl": "https://www.youtube.com/embed/eGo4IYlbE5g",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/3_4_Sit-Up/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/3_4_Sit-Up/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/3_4_Sit-Up/1.jpg",
    "instructions": [
      "Hang from bar and hold legs straight out at 90 degrees in L-sit.",
      "Perform strict pull-up while holding L-sit position without dropping legs.",
      "Lower to dead hang."
    ],
    "formTips": "Demands immense core compression and strict pulling control.",
    "commonMistakes": "Dropping legs during pull.",
    "defaultSets": 3,
    "defaultReps": 6,
    "defaultWeight": 0
  },
  {
    "id": "barbell-squat",
    "name": "Barbell Back Squat",
    "target": "Legs",
    "categories": [
      "Legs"
    ],
    "secondary": "Glutes, Hamstrings, Core",
    "equipment": "Barbell",
    "level": "Advanced",
    "videoUrl": "https://www.youtube.com/embed/bEv6CCg2BC8",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Full_Squat/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Full_Squat/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Full_Squat/1.jpg",
    "instructions": [
      "Rest barbell on upper traps. Set feet slightly wider than shoulder-width, toes turned outward.",
      "Hinge hips backward, bend knees, and lower hips down as if sitting in a low chair.",
      "Keep knees tracked with toes. Descend until thighs are parallel or below.",
      "Drive upwards through heels, extending hips and knees back to stand."
    ],
    "formTips": "Keep your chest tall and avoid letting your knees cave inward.",
    "commonMistakes": "Lifting heels off the floor, rounding lower back.",
    "defaultSets": 4,
    "defaultReps": 8,
    "defaultWeight": 60
  },
  {
    "id": "leg-press",
    "name": "Machine Leg Press",
    "target": "Legs",
    "categories": [
      "Legs"
    ],
    "secondary": "Quads, Hamstrings, Glutes",
    "equipment": "Machine",
    "level": "Beginner",
    "videoUrl": "https://www.youtube.com/embed/IZxyjW7MPJQ",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Calf_Press_On_The_Leg_Press_Machine/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Calf_Press_On_The_Leg_Press_Machine/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Calf_Press_On_The_Leg_Press_Machine/1.jpg",
    "instructions": [
      "Sit back in machine seat, place feet flat on sled platform hip-width apart.",
      "Unlock safety handles. Bend knees slowly to bring weight down under control.",
      "Drive through feet to push platform back up without locking knees."
    ],
    "formTips": "Keep lower back pressed firmly against seat backrest.",
    "commonMistakes": "Locking out knees violently at top.",
    "defaultSets": 3,
    "defaultReps": 12,
    "defaultWeight": 90
  },
  {
    "id": "bodyweight-lunge",
    "name": "Walking Lunges",
    "target": "Legs",
    "categories": [
      "Legs",
      "Warm-ups"
    ],
    "secondary": "Glutes, Calves",
    "equipment": "Bodyweight",
    "level": "Beginner",
    "videoUrl": "https://www.youtube.com/embed/L8fvypPrzzs",
    "gifUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Walking_Lunge/0.jpg",
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Walking_Lunge/0.jpg",
    "image2Url": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Walking_Lunge/1.jpg",
    "instructions": [
      "Stand with feet hip-width. Step forward with one foot, lowering hips.",
      "Bend both knees to 90 degrees with back knee hovering just above floor.",
      "Drive off front foot to return to stand and step forward with other leg."
    ],
    "formTips": "Keep front knee aligned directly over front ankle.",
    "commonMistakes": "Slamming back knee onto ground.",
    "defaultSets": 3,
    "defaultReps": 12,
    "defaultWeight": 0
  }
]

export const workoutCategories = [
  {
    "id": "push-power",
    "name": "Chest, Shoulders & Triceps (Push Day)",
    "level": "Intermediate",
    "duration": "40-45 min",
    "color": "#39FF6A",
    "caloriesEst": 330,
    "tags": ["Chest", "Shoulders", "Triceps"],
    "coverImage": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Bench_Press_-_Medium_Grip/0.jpg",
    "exercises": [
      "bench-press",
      "db-incline-press",
      "overhead-press",
      "lateral-raise",
      "tricep-pushdown",
      "diamond-pushup"
    ]
  },
  {
    "id": "pull-power",
    "name": "Back, Biceps & Forearms (Pull Day)",
    "level": "Intermediate",
    "duration": "40-45 min",
    "color": "#B6FF3C",
    "caloriesEst": 340,
    "tags": ["Back", "Biceps", "Forearms"],
    "coverImage": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Deadlift/0.jpg",
    "exercises": [
      "deadlift",
      "bent-over-row",
      "lat-pulldown",
      "standing-barbell-curl",
      "db-hammer-curl",
      "farmers-walk"
    ]
  },
  {
    "id": "home-shred",
    "name": "Home Bodyweight & Core Shred",
    "level": "All Levels",
    "duration": "20-25 min",
    "color": "#FF7A00",
    "caloriesEst": 220,
    "tags": ["Abs & Core", "Push-ups", "Warm-ups"],
    "coverImage": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Plank/0.jpg",
    "exercises": [
      "jumping-jacks",
      "standard-pushup",
      "mountain-climbers",
      "plank",
      "bicycle-crunches",
      "bodyweight-lunge"
    ]
  },
  {
    "id": "arm-pump",
    "name": "Arm Hypertrophy & Peak Pump",
    "level": "Intermediate",
    "duration": "30-35 min",
    "color": "#39FF6A",
    "caloriesEst": 270,
    "tags": ["Biceps", "Triceps"],
    "coverImage": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Curl/0.jpg",
    "exercises": [
      "standing-barbell-curl",
      "ez-preacher-curl",
      "skull-crushers",
      "tricep-pushdown",
      "db-hammer-curl",
      "bench-dips"
    ]
  },
  {
    "id": "core-sculpt",
    "name": "Six-Pack Abs & Core Sculpt",
    "level": "All Levels",
    "duration": "20-25 min",
    "color": "#00F0FF",
    "caloriesEst": 190,
    "tags": ["Abs & Core"],
    "coverImage": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Air_Bike/0.jpg",
    "exercises": [
      "hanging-leg-raise",
      "ab-roller",
      "russian-twists",
      "plank",
      "side-plank",
      "dead-bug"
    ]
  },
  {
    "id": "upper-compound",
    "name": "Upper Body Compound Power",
    "level": "Advanced",
    "duration": "45-50 min",
    "color": "#B6FF3C",
    "caloriesEst": 380,
    "tags": ["Chest", "Back", "Shoulders"],
    "coverImage": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Military_Press/0.jpg",
    "exercises": [
      "bench-press",
      "bent-over-row",
      "overhead-press",
      "standard-pullup",
      "close-grip-bench",
      "face-pulls"
    ]
  },
  {
    "id": "beginner-kickstart",
    "name": "Beginner Full Body Kickstart",
    "level": "Beginner",
    "duration": "20-25 min",
    "color": "#39FF6A",
    "caloriesEst": 210,
    "tags": ["Full Body", "Beginner"],
    "coverImage": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Walking_Lunge/0.jpg",
    "exercises": [
      "bodyweight-lunge",
      "standard-pushup",
      "lat-pulldown",
      "db-bicep-curl",
      "plank"
    ]
  },
  {
    "id": "beginner",
    "name": "Beginner Routine",
    "level": "Beginner",
    "duration": "15-20 min",
    "color": "#39FF6A",
    "caloriesEst": 180,
    "tags": ["Full Body"],
    "coverImage": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Walking_Lunge/0.jpg",
    "exercises": [
      "bodyweight-lunge",
      "lat-pulldown",
      "db-bicep-curl",
      "plank"
    ]
  },
  {
    "id": "home",
    "name": "Home Workout Plan",
    "level": "All Levels",
    "duration": "25-30 min",
    "color": "#B6FF3C",
    "caloriesEst": 230,
    "tags": ["Home", "Bodyweight"],
    "coverImage": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Plank/0.jpg",
    "exercises": [
      "bodyweight-lunge",
      "plank",
      "ab-crunch",
      "standard-pushup"
    ]
  },
  {
    "id": "gym",
    "name": "Hypertrophy Gym Plan",
    "level": "Intermediate",
    "duration": "45-60 min",
    "color": "#39FF6A",
    "caloriesEst": 360,
    "tags": ["Gym", "Hypertrophy"],
    "coverImage": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Bench_Press_-_Medium_Grip/0.jpg",
    "exercises": [
      "bench-press",
      "deadlift",
      "overhead-press",
      "db-bicep-curl"
    ]
  },
  {
    "id": "chest-blast",
    "name": "Chest & Tricep Blast",
    "level": "Intermediate",
    "duration": "35-40 min",
    "color": "#B6FF3C",
    "caloriesEst": 310,
    "tags": ["Chest", "Triceps"],
    "coverImage": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Incline_Press/0.jpg",
    "exercises": [
      "bench-press",
      "db-incline-press",
      "cable-flys",
      "tricep-pushdown",
      "diamond-pushup"
    ]
  },
  {
    "id": "back-builder",
    "name": "Back & Core Builder",
    "level": "Intermediate",
    "duration": "40-45 min",
    "color": "#39FF6A",
    "caloriesEst": 330,
    "tags": ["Back", "Core"],
    "coverImage": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Deadlift/0.jpg",
    "exercises": [
      "deadlift",
      "lat-pulldown",
      "db-row",
      "standard-pullup",
      "plank"
    ]
  }
]
