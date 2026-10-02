// Comprehensive, accurate per-serving & per-100g nutrition data for FitKart
// Values curated from USDA FoodData Central and standard clinical nutritional benchmarks.
const img = (seed, w = 600) => `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=${w}&q=80`

export const foodNutritionData = [
  // ================= PROTEINS & EGGS =================
  {
    id: 'egg',
    name: 'Egg (Whole)',
    aliases: ['egg', 'boiled egg', 'whole egg', 'eggs', 'anda'],
    image: img('photo-1607690424560-35d967d6ad7b'),
    servingSize: '1 Large (50g)',
    basisGrams: 50,
    category: 'Proteins & Eggs',
    calories: 74,
    protein: 6.3,
    carbs: 0.4,
    fat: 5.0,
    saturatedFat: 1.6,
    fiber: 0,
    sugar: 0.4,
    sodium: 71,
    potassium: 69,
    calcium: 28,
    iron: 0.9,
    cholesterol: 186,
    per100g: {
      calories: 148, protein: 12.6, carbs: 0.8, fat: 10.0, saturatedFat: 3.2, fiber: 0, sugar: 0.8,
      sodium: 142, potassium: 138, calcium: 56, iron: 1.8, cholesterol: 372
    },
    goodFor: ['Muscle Gain', 'Ketogenic Diet', 'General Fitness']
  },
  {
    id: 'boiled-egg',
    name: 'Hard Boiled Egg',
    aliases: ['boiled egg', 'hard boiled egg', 'soft boiled egg'],
    image: img('photo-1582722872445-44dc5f7e3c8f'),
    servingSize: '1 Large (50g)',
    basisGrams: 50,
    category: 'Proteins & Eggs',
    calories: 78,
    protein: 6.3,
    carbs: 0.6,
    fat: 5.3,
    saturatedFat: 1.6,
    fiber: 0,
    sugar: 0.6,
    sodium: 62,
    potassium: 63,
    calcium: 25,
    iron: 0.6,
    cholesterol: 187,
    per100g: {
      calories: 155, protein: 12.6, carbs: 1.1, fat: 10.6, saturatedFat: 3.3, fiber: 0, sugar: 1.1,
      sodium: 124, potassium: 126, calcium: 50, iron: 1.2, cholesterol: 373
    },
    goodFor: ['Muscle Gain', 'Weight Loss', 'Meal Prep']
  },
  {
    id: 'egg-white',
    name: 'Egg White',
    aliases: ['egg white', 'egg whites', 'boiled egg white'],
    image: img('photo-1516448620398-c5f44bf9f441'),
    servingSize: '1 Large Egg White (33g)',
    basisGrams: 33,
    category: 'Proteins & Eggs',
    calories: 17,
    protein: 3.6,
    carbs: 0.2,
    fat: 0.1,
    saturatedFat: 0,
    fiber: 0,
    sugar: 0.2,
    sodium: 55,
    potassium: 54,
    calcium: 2,
    iron: 0.1,
    cholesterol: 0,
    per100g: {
      calories: 52, protein: 10.9, carbs: 0.7, fat: 0.2, saturatedFat: 0, fiber: 0, sugar: 0.7,
      sodium: 166, potassium: 163, calcium: 7, iron: 0.2, cholesterol: 0
    },
    goodFor: ['Fat Loss', 'Lean Muscle', 'High Protein']
  },
  {
    id: 'chicken-breast',
    name: 'Chicken Breast (Boneless, Cooked)',
    aliases: ['chicken', 'chicken breast', 'grilled chicken', 'cooked chicken', 'murgh'],
    image: img('photo-1598515214211-89d3c73ae83b'),
    servingSize: '100g Cooked',
    basisGrams: 100,
    category: 'Proteins & Poultry',
    calories: 165,
    protein: 31.0,
    carbs: 0,
    fat: 3.6,
    saturatedFat: 1.0,
    fiber: 0,
    sugar: 0,
    sodium: 74,
    potassium: 256,
    calcium: 15,
    iron: 1.0,
    cholesterol: 85,
    per100g: {
      calories: 165, protein: 31.0, carbs: 0, fat: 3.6, saturatedFat: 1.0, fiber: 0, sugar: 0,
      sodium: 74, potassium: 256, calcium: 15, iron: 1.0, cholesterol: 85
    },
    goodFor: ['Lean Muscle', 'Fat Loss', 'Bodybuilding']
  },
  {
    id: 'chicken-65',
    name: 'Chicken 65',
    aliases: ['chicken 65', 'fried chicken', 'spicy chicken'],
    image: img('photo-1626082927389-6cd097cee6a6'),
    servingSize: '100g Serving',
    basisGrams: 100,
    category: 'Proteins & Poultry',
    calories: 245,
    protein: 24.5,
    carbs: 8.2,
    fat: 13.0,
    saturatedFat: 3.2,
    fiber: 0.8,
    sugar: 0.5,
    sodium: 480,
    potassium: 290,
    calcium: 22,
    iron: 1.4,
    cholesterol: 78,
    per100g: {
      calories: 245, protein: 24.5, carbs: 8.2, fat: 13.0, saturatedFat: 3.2, fiber: 0.8, sugar: 0.5,
      sodium: 480, potassium: 290, calcium: 22, iron: 1.4, cholesterol: 78
    },
    goodFor: ['High Protein', 'Post-Workout']
  },
  {
    id: 'salmon',
    name: 'Atlantic Salmon (Cooked)',
    aliases: ['salmon', 'salmon fish', 'grilled salmon', 'fish fillet'],
    image: img('photo-1519708227418-c8fd9a32b7a2'),
    servingSize: '1 Fillet (100g)',
    basisGrams: 100,
    category: 'Fish & Seafood',
    calories: 206,
    protein: 22.1,
    carbs: 0,
    fat: 12.4,
    saturatedFat: 2.5,
    fiber: 0,
    sugar: 0,
    sodium: 60,
    potassium: 384,
    calcium: 12,
    iron: 0.8,
    cholesterol: 63,
    per100g: {
      calories: 206, protein: 22.1, carbs: 0, fat: 12.4, saturatedFat: 2.5, fiber: 0, sugar: 0,
      sodium: 60, potassium: 384, calcium: 12, iron: 0.8, cholesterol: 63
    },
    goodFor: ['Omega-3', 'Heart Health', 'Muscle Recovery']
  },
  {
    id: 'fish',
    name: 'White Fish (Tilapia / Cod, Cooked)',
    aliases: ['fish', 'white fish', 'tilapia', 'cod', 'rohu', 'catla'],
    image: img('photo-1467003909585-2f8a72700288'),
    servingSize: '1 Fillet (100g)',
    basisGrams: 100,
    category: 'Fish & Seafood',
    calories: 128,
    protein: 26.0,
    carbs: 0,
    fat: 2.7,
    saturatedFat: 0.9,
    fiber: 0,
    sugar: 0,
    sodium: 56,
    potassium: 380,
    calcium: 14,
    iron: 0.6,
    cholesterol: 57,
    per100g: {
      calories: 128, protein: 26.0, carbs: 0, fat: 2.7, saturatedFat: 0.9, fiber: 0, sugar: 0,
      sodium: 56, potassium: 380, calcium: 14, iron: 0.6, cholesterol: 57
    },
    goodFor: ['Lean Protein', 'Low Calorie', 'Weight Loss']
  },
  {
    id: 'prawns',
    name: 'Prawns / Shrimp (Cooked)',
    aliases: ['prawns', 'shrimp', 'cooked shrimp', 'jheenga'],
    image: img('photo-1565680018434-b513d5e5fd47'),
    servingSize: '100g Cooked',
    basisGrams: 100,
    category: 'Fish & Seafood',
    calories: 99,
    protein: 24.0,
    carbs: 0.2,
    fat: 0.3,
    saturatedFat: 0.1,
    fiber: 0,
    sugar: 0,
    sodium: 111,
    potassium: 259,
    calcium: 70,
    iron: 0.5,
    cholesterol: 189,
    per100g: {
      calories: 99, protein: 24.0, carbs: 0.2, fat: 0.3, saturatedFat: 0.1, fiber: 0, sugar: 0,
      sodium: 111, potassium: 259, calcium: 70, iron: 0.5, cholesterol: 189
    },
    goodFor: ['Lean Protein', 'Keto', 'Fat Loss']
  },
  {
    id: 'paneer',
    name: 'Paneer (Cottage Cheese)',
    aliases: ['paneer', 'cottage cheese', 'raw paneer', 'indian cottage cheese'],
    image: img('photo-1631452180519-c014fe946bc7'),
    servingSize: '100g Serving',
    basisGrams: 100,
    category: 'Dairy & Vegetarian Protein',
    calories: 265,
    protein: 18.3,
    carbs: 3.2,
    fat: 20.8,
    saturatedFat: 13.0,
    fiber: 0,
    sugar: 2.8,
    sodium: 22,
    potassium: 138,
    calcium: 208,
    iron: 0.2,
    cholesterol: 56,
    per100g: {
      calories: 265, protein: 18.3, carbs: 3.2, fat: 20.8, saturatedFat: 13.0, fiber: 0, sugar: 2.8,
      sodium: 22, potassium: 138, calcium: 208, iron: 0.2, cholesterol: 56
    },
    goodFor: ['Vegetarian Muscle Gain', 'Calcium Support', 'Slow Release Protein']
  },
  {
    id: 'tofu',
    name: 'Tofu (Firm)',
    aliases: ['tofu', 'soy paneer', 'firm tofu'],
    image: img('photo-1546069901-ba9599a7e63c'),
    servingSize: '100g Serving',
    basisGrams: 100,
    category: 'Plant Protein',
    calories: 83,
    protein: 10.0,
    carbs: 1.9,
    fat: 5.3,
    saturatedFat: 0.8,
    fiber: 1.0,
    sugar: 0.6,
    sodium: 14,
    potassium: 121,
    calcium: 350,
    iron: 2.7,
    cholesterol: 0,
    per100g: {
      calories: 83, protein: 10.0, carbs: 1.9, fat: 5.3, saturatedFat: 0.8, fiber: 1.0, sugar: 0.6,
      sodium: 14, potassium: 121, calcium: 350, iron: 2.7, cholesterol: 0
    },
    goodFor: ['Vegan Protein', 'Heart Health', 'Low Calorie']
  },
  {
    id: 'soya-chunks',
    name: 'Soya Chunks (Raw / Dried)',
    aliases: ['soya chunks', 'soya meal maker', 'soy chunks', 'soya vadi'],
    image: img('photo-1585937421612-70a008356fbe'),
    servingSize: '50g Raw (1 Serving)',
    basisGrams: 50,
    category: 'Plant Protein',
    calories: 172,
    protein: 26.0,
    carbs: 16.5,
    fat: 0.25,
    saturatedFat: 0.05,
    fiber: 6.5,
    sugar: 3.5,
    sodium: 10,
    potassium: 850,
    calcium: 175,
    iron: 10.0,
    cholesterol: 0,
    per100g: {
      calories: 345, protein: 52.0, carbs: 33.0, fat: 0.5, saturatedFat: 0.1, fiber: 13.0, sugar: 7.0,
      sodium: 20, potassium: 1700, calcium: 350, iron: 20.0, cholesterol: 0
    },
    goodFor: ['Maximum Vegan Protein', 'Affordable Fitness', 'Iron Source']
  },
  {
    id: 'whey-protein',
    name: 'Whey Protein Powder',
    aliases: ['protein shake', 'whey', 'whey protein', 'protein powder'],
    image: img('photo-1579722820258-05a2f6a3af73'),
    servingSize: '1 Scoop (30g)',
    basisGrams: 30,
    category: 'Supplements',
    calories: 120,
    protein: 24.0,
    carbs: 3.0,
    fat: 1.5,
    saturatedFat: 0.8,
    fiber: 0.5,
    sugar: 1.5,
    sodium: 130,
    potassium: 160,
    calcium: 140,
    iron: 0.6,
    cholesterol: 45,
    per100g: {
      calories: 400, protein: 80.0, carbs: 10.0, fat: 5.0, saturatedFat: 2.7, fiber: 1.7, sugar: 5.0,
      sodium: 433, potassium: 533, calcium: 467, iron: 2.0, cholesterol: 150
    },
    goodFor: ['Fast Muscle Recovery', 'Post-Workout', 'Convenient Protein']
  },

  // ================= DAIRY & YOGURTS =================
  {
    id: 'milk',
    name: 'Cow Milk (Whole)',
    aliases: ['milk', 'cow milk', 'whole milk', 'doodh'],
    image: img('photo-1550583724-b2692b85b150'),
    servingSize: '1 Cup (240ml)',
    basisGrams: 240,
    category: 'Dairy',
    calories: 149,
    protein: 7.7,
    carbs: 11.7,
    fat: 7.9,
    saturatedFat: 4.6,
    fiber: 0,
    sugar: 12.3,
    sodium: 105,
    potassium: 322,
    calcium: 276,
    iron: 0.1,
    cholesterol: 24,
    per100g: {
      calories: 62, protein: 3.2, carbs: 4.9, fat: 3.3, saturatedFat: 1.9, fiber: 0, sugar: 5.1,
      sodium: 44, potassium: 134, calcium: 115, iron: 0.04, cholesterol: 10
    },
    goodFor: ['Bone Density', 'Hydration', 'Pre-Bed Recovery']
  },
  {
    id: 'curd',
    name: 'Curd / Dahi (Plain)',
    aliases: ['curd', 'dahi', 'plain curd', 'yogurt'],
    image: img('photo-1571212515416-fef01fc43637'),
    servingSize: '1 Cup (200g)',
    basisGrams: 200,
    category: 'Dairy',
    calories: 122,
    protein: 6.8,
    carbs: 9.4,
    fat: 6.0,
    saturatedFat: 3.8,
    fiber: 0,
    sugar: 9.0,
    sodium: 92,
    potassium: 282,
    calcium: 242,
    iron: 0.1,
    cholesterol: 20,
    per100g: {
      calories: 61, protein: 3.4, carbs: 4.7, fat: 3.0, saturatedFat: 1.9, fiber: 0, sugar: 4.5,
      sodium: 46, potassium: 141, calcium: 121, iron: 0.05, cholesterol: 10
    },
    goodFor: ['Gut Health', 'Probiotics', 'Digestion']
  },
  {
    id: 'greek-yogurt',
    name: 'Greek Yogurt (Plain, Low Fat)',
    aliases: ['greek yogurt', 'strained yogurt', 'high protein yogurt'],
    image: img('photo-1488477181946-6428a0291777'),
    servingSize: '1 Cup (170g)',
    basisGrams: 170,
    category: 'Dairy',
    calories: 100,
    protein: 17.3,
    carbs: 6.1,
    fat: 0.7,
    saturatedFat: 0.2,
    fiber: 0,
    sugar: 6.1,
    sodium: 61,
    potassium: 240,
    calcium: 187,
    iron: 0.1,
    cholesterol: 10,
    per100g: {
      calories: 59, protein: 10.2, carbs: 3.6, fat: 0.4, saturatedFat: 0.1, fiber: 0, sugar: 3.6,
      sodium: 36, potassium: 141, calcium: 110, iron: 0.06, cholesterol: 6
    },
    goodFor: ['High Protein Snack', 'Satiety', 'Weight Loss']
  },

  // ================= GRAINS, RICE & ROTI =================
  {
    id: 'white-rice',
    name: 'White Rice (Cooked)',
    aliases: ['rice', 'white rice', 'cooked rice', 'steamed rice', 'chawal'],
    image: img('photo-1516684732162-798a0062be99'),
    servingSize: '1 Cup Cooked (158g)',
    basisGrams: 158,
    category: 'Grains & Complex Carbs',
    calories: 205,
    protein: 4.3,
    carbs: 44.5,
    fat: 0.4,
    saturatedFat: 0.1,
    fiber: 0.6,
    sugar: 0.1,
    sodium: 2,
    potassium: 55,
    calcium: 16,
    iron: 1.9,
    cholesterol: 0,
    per100g: {
      calories: 130, protein: 2.7, carbs: 28.2, fat: 0.3, saturatedFat: 0.1, fiber: 0.4, sugar: 0.1,
      sodium: 1, potassium: 35, calcium: 10, iron: 1.2, cholesterol: 0
    },
    goodFor: ['Quick Energy', 'Easy Digestion', 'Post-Workout Glycogen']
  },
  {
    id: 'brown-rice',
    name: 'Brown Rice (Cooked)',
    aliases: ['brown rice', 'cooked brown rice', 'whole grain rice'],
    image: img('photo-1586201375761-83865001e31c'),
    servingSize: '1 Cup Cooked (195g)',
    basisGrams: 195,
    category: 'Grains & Complex Carbs',
    calories: 216,
    protein: 5.0,
    carbs: 44.8,
    fat: 1.8,
    saturatedFat: 0.4,
    fiber: 3.5,
    sugar: 0.7,
    sodium: 10,
    potassium: 84,
    calcium: 20,
    iron: 0.8,
    cholesterol: 0,
    per100g: {
      calories: 111, protein: 2.6, carbs: 23.0, fat: 0.9, saturatedFat: 0.2, fiber: 1.8, sugar: 0.4,
      sodium: 5, potassium: 43, calcium: 10, iron: 0.4, cholesterol: 0
    },
    goodFor: ['Fiber Rich', 'Low Glycemic Index', 'Sustained Energy']
  },
  {
    id: 'oats',
    name: 'Rolled Oats (Dry)',
    aliases: ['oats', 'oatmeal', 'rolled oats', 'instant oats', 'quaker oats'],
    image: img('photo-1517686469429-8bdb88b9f907'),
    servingSize: '1/2 Cup Dry (40g)',
    basisGrams: 40,
    category: 'Grains & Complex Carbs',
    calories: 156,
    protein: 6.8,
    carbs: 26.4,
    fat: 2.8,
    saturatedFat: 0.5,
    fiber: 4.2,
    sugar: 0.4,
    sodium: 2,
    potassium: 172,
    calcium: 22,
    iron: 1.9,
    cholesterol: 0,
    per100g: {
      calories: 389, protein: 16.9, carbs: 66.0, fat: 6.9, saturatedFat: 1.2, fiber: 10.6, sugar: 1.0,
      sodium: 5, potassium: 429, calcium: 54, iron: 4.7, cholesterol: 0
    },
    goodFor: ['Cholesterol Reduction', 'Breakfast Fuel', 'Beta-Glucan Fiber']
  },
  {
    id: 'roti',
    name: 'Whole Wheat Roti / Chapati',
    aliases: ['roti', 'chapati', 'phulka', 'whole wheat roti'],
    image: img('photo-1626074353765-517a681e40be'),
    servingSize: '1 Medium Roti (40g)',
    basisGrams: 40,
    category: 'Grains & Complex Carbs',
    calories: 104,
    protein: 3.6,
    carbs: 20.8,
    fat: 0.8,
    saturatedFat: 0.2,
    fiber: 2.8,
    sugar: 0.4,
    sodium: 120,
    potassium: 110,
    calcium: 18,
    iron: 1.4,
    cholesterol: 0,
    per100g: {
      calories: 260, protein: 9.0, carbs: 52.0, fat: 2.0, saturatedFat: 0.5, fiber: 7.0, sugar: 1.0,
      sodium: 300, potassium: 275, calcium: 45, iron: 3.5, cholesterol: 0
    },
    goodFor: ['Everyday Energy', 'Diet Staple', 'Fiber']
  },
  {
    id: 'brown-bread',
    name: 'Whole Wheat Bread',
    aliases: ['bread', 'brown bread', 'whole wheat bread', 'toast'],
    image: img('photo-1509440159596-0249088772ff'),
    servingSize: '1 Slice (32g)',
    basisGrams: 32,
    category: 'Grains & Complex Carbs',
    calories: 82,
    protein: 4.0,
    carbs: 13.8,
    fat: 1.1,
    saturatedFat: 0.2,
    fiber: 1.9,
    sugar: 1.4,
    sodium: 144,
    potassium: 78,
    calcium: 40,
    iron: 0.9,
    cholesterol: 0,
    per100g: {
      calories: 256, protein: 12.5, carbs: 43.1, fat: 3.4, saturatedFat: 0.6, fiber: 5.9, sugar: 4.4,
      sodium: 450, potassium: 244, calcium: 125, iron: 2.8, cholesterol: 0
    },
    goodFor: ['Quick Sandwiches', 'Complex Carbs']
  },
  {
    id: 'quinoa',
    name: 'Quinoa (Cooked)',
    aliases: ['quinoa', 'cooked quinoa'],
    image: img('photo-1586201375761-83865001e31c'),
    servingSize: '1 Cup Cooked (185g)',
    basisGrams: 185,
    category: 'Grains & Complex Carbs',
    calories: 222,
    protein: 8.1,
    carbs: 39.4,
    fat: 3.6,
    saturatedFat: 0.4,
    fiber: 5.2,
    sugar: 1.6,
    sodium: 13,
    potassium: 318,
    calcium: 31,
    iron: 2.8,
    cholesterol: 0,
    per100g: {
      calories: 120, protein: 4.4, carbs: 21.3, fat: 1.9, saturatedFat: 0.2, fiber: 2.8, sugar: 0.9,
      sodium: 7, potassium: 172, calcium: 17, iron: 1.5, cholesterol: 0
    },
    goodFor: ['Complete Amino Acid Profile', 'Gluten Free', 'Superfood']
  },
  {
    id: 'idli',
    name: 'Steamed Idli',
    aliases: ['idli', 'steamed idli', 'rice cake'],
    image: img('photo-1589301760014-d929f3979dbc'),
    servingSize: '2 Pieces (80g)',
    basisGrams: 80,
    category: 'South Indian Staples',
    calories: 130,
    protein: 4.2,
    carbs: 26.4,
    fat: 0.4,
    saturatedFat: 0.1,
    fiber: 1.6,
    sugar: 0.2,
    sodium: 180,
    potassium: 70,
    calcium: 15,
    iron: 0.8,
    cholesterol: 0,
    per100g: {
      calories: 162, protein: 5.2, carbs: 33.0, fat: 0.5, saturatedFat: 0.1, fiber: 2.0, sugar: 0.3,
      sodium: 225, potassium: 88, calcium: 19, iron: 1.0, cholesterol: 0
    },
    goodFor: ['Light Breakfast', 'Fermented Nutrition', 'Low Fat']
  },
  {
    id: 'dosa',
    name: 'Plain Dosa',
    aliases: ['dosa', 'plain dosa', 'crispy dosa', 'sada dosa'],
    image: img('photo-1630383249896-483dbd48ceaf'),
    servingSize: '1 Medium Dosa (90g)',
    basisGrams: 90,
    category: 'South Indian Staples',
    calories: 168,
    protein: 3.9,
    carbs: 28.5,
    fat: 4.2,
    saturatedFat: 0.9,
    fiber: 1.4,
    sugar: 0.3,
    sodium: 240,
    potassium: 85,
    calcium: 18,
    iron: 1.2,
    cholesterol: 0,
    per100g: {
      calories: 187, protein: 4.3, carbs: 31.7, fat: 4.7, saturatedFat: 1.0, fiber: 1.6, sugar: 0.3,
      sodium: 267, potassium: 94, calcium: 20, iron: 1.3, cholesterol: 0
    },
    goodFor: ['Morning Energy', 'Fermented Gut Health']
  },
  {
    id: 'biryani',
    name: 'Chicken Biryani',
    aliases: ['biryani', 'chicken biryani', 'dum biryani'],
    image: img('photo-1633945274405-b6c8069047b0'),
    servingSize: '1 Plate (300g)',
    basisGrams: 300,
    category: 'Indian Meals',
    calories: 460,
    protein: 26.0,
    carbs: 58.0,
    fat: 14.0,
    saturatedFat: 3.5,
    fiber: 3.2,
    sugar: 1.8,
    sodium: 620,
    potassium: 340,
    calcium: 45,
    iron: 2.4,
    cholesterol: 55,
    per100g: {
      calories: 153, protein: 8.7, carbs: 19.3, fat: 4.7, saturatedFat: 1.2, fiber: 1.1, sugar: 0.6,
      sodium: 207, potassium: 113, calcium: 15, iron: 0.8, cholesterol: 18
    },
    goodFor: ['Balanced Protein & Carbs', 'Post-Workout Feast']
  },
  {
    id: 'dal',
    name: 'Yellow Dal / Moong Dal (Cooked)',
    aliases: ['dal', 'yellow dal', 'moong dal', 'tadka dal', 'lentils'],
    image: img('photo-1546833999-b9f581a1996d'),
    servingSize: '1 Bowl (180g)',
    basisGrams: 180,
    category: 'Legumes & Dal',
    calories: 198,
    protein: 12.6,
    carbs: 32.4,
    fat: 2.2,
    saturatedFat: 0.4,
    fiber: 7.2,
    sugar: 1.2,
    sodium: 320,
    potassium: 410,
    calcium: 42,
    iron: 3.1,
    cholesterol: 0,
    per100g: {
      calories: 110, protein: 7.0, carbs: 18.0, fat: 1.2, saturatedFat: 0.2, fiber: 4.0, sugar: 0.7,
      sodium: 178, potassium: 228, calcium: 23, iron: 1.7, cholesterol: 0
    },
    goodFor: ['Plant Protein', 'High Fiber', 'Daily Vitality']
  },

  // ================= NUTS & SEEDS =================
  {
    id: 'almonds',
    name: 'Almonds (Raw)',
    aliases: ['almond', 'almonds', 'badam', 'raw almonds'],
    image: img('photo-1508061253366-f7da158b6d46'),
    servingSize: '1 Handful (28g / ~23 nuts)',
    basisGrams: 28,
    category: 'Nuts & Healthy Fats',
    calories: 164,
    protein: 6.0,
    carbs: 6.1,
    fat: 14.2,
    saturatedFat: 1.1,
    fiber: 3.5,
    sugar: 1.2,
    sodium: 1,
    potassium: 208,
    calcium: 76,
    iron: 1.1,
    cholesterol: 0,
    per100g: {
      calories: 579, protein: 21.2, carbs: 21.6, fat: 49.9, saturatedFat: 3.8, fiber: 12.5, sugar: 4.4,
      sodium: 1, potassium: 733, calcium: 269, iron: 3.7, cholesterol: 0
    },
    goodFor: ['Vitamin E', 'Brain Health', 'Heart Health', 'Healthy Snacking']
  },
  {
    id: 'peanuts',
    name: 'Peanuts (Roasted, Unsalted)',
    aliases: ['peanut', 'peanuts', 'groundnuts', 'mungfali'],
    image: img('photo-1569429593410-b498b3fb3387'),
    servingSize: '1 Handful (28g)',
    basisGrams: 28,
    category: 'Nuts & Healthy Fats',
    calories: 161,
    protein: 7.3,
    carbs: 4.6,
    fat: 14.0,
    saturatedFat: 2.0,
    fiber: 2.4,
    sugar: 1.1,
    sodium: 5,
    potassium: 200,
    calcium: 26,
    iron: 1.3,
    cholesterol: 0,
    per100g: {
      calories: 567, protein: 25.8, carbs: 16.1, fat: 49.2, saturatedFat: 6.8, fiber: 8.5, sugar: 4.0,
      sodium: 18, potassium: 705, calcium: 92, iron: 4.6, cholesterol: 0
    },
    goodFor: ['Plant Protein', 'Affordable Snacking', 'Energy']
  },
  {
    id: 'peanut-butter',
    name: 'Peanut Butter (Natural)',
    aliases: ['peanut butter', 'natural peanut butter', 'pb'],
    image: img('photo-1621939514649-280e2ee25f60'),
    servingSize: '2 Tbsp (32g)',
    basisGrams: 32,
    category: 'Nuts & Healthy Fats',
    calories: 188,
    protein: 8.0,
    carbs: 6.4,
    fat: 16.0,
    saturatedFat: 3.1,
    fiber: 1.9,
    sugar: 2.8,
    sodium: 147,
    potassium: 208,
    calcium: 14,
    iron: 0.6,
    cholesterol: 0,
    per100g: {
      calories: 588, protein: 25.0, carbs: 20.0, fat: 50.0, saturatedFat: 9.7, fiber: 6.0, sugar: 8.8,
      sodium: 459, potassium: 649, calcium: 43, iron: 1.9, cholesterol: 0
    },
    goodFor: ['Bulking', 'Pre-Workout Snack', 'Healthy Fats']
  },
  {
    id: 'walnuts',
    name: 'Walnuts (Raw Halves)',
    aliases: ['walnut', 'walnuts', 'akhrot'],
    image: img('photo-1563805042-7684c019e1cb'),
    servingSize: '1 Handful (28g / ~14 halves)',
    basisGrams: 28,
    category: 'Nuts & Healthy Fats',
    calories: 185,
    protein: 4.3,
    carbs: 3.9,
    fat: 18.5,
    saturatedFat: 1.7,
    fiber: 1.9,
    sugar: 0.7,
    sodium: 1,
    potassium: 125,
    calcium: 28,
    iron: 0.8,
    cholesterol: 0,
    per100g: {
      calories: 654, protein: 15.2, carbs: 13.7, fat: 65.2, saturatedFat: 6.1, fiber: 6.7, sugar: 2.6,
      sodium: 2, potassium: 441, calcium: 98, iron: 2.9, cholesterol: 0
    },
    goodFor: ['Omega-3 ALA', 'Cognitive Health', 'Anti-Inflammatory']
  },
  {
    id: 'cashews',
    name: 'Cashew Nuts (Raw)',
    aliases: ['cashew', 'cashews', 'kaju'],
    image: img('photo-1567892737950-30c4db37cd89'),
    servingSize: '1 Handful (28g / ~18 nuts)',
    basisGrams: 28,
    category: 'Nuts & Healthy Fats',
    calories: 157,
    protein: 5.1,
    carbs: 8.6,
    fat: 12.4,
    saturatedFat: 2.2,
    fiber: 0.9,
    sugar: 1.7,
    sodium: 3,
    potassium: 187,
    calcium: 10,
    iron: 1.9,
    cholesterol: 0,
    per100g: {
      calories: 553, protein: 18.2, carbs: 30.2, fat: 43.8, saturatedFat: 7.8, fiber: 3.3, sugar: 5.9,
      sodium: 12, potassium: 660, calcium: 37, iron: 6.7, cholesterol: 0
    },
    goodFor: ['Copper & Magnesium', 'Smooth Energy']
  },
  {
    id: 'chia-seeds',
    name: 'Chia Seeds',
    aliases: ['chia', 'chia seeds', 'sabja'],
    image: img('photo-1590779033100-9f60a05a013d'),
    servingSize: '1 Tbsp (15g)',
    basisGrams: 15,
    category: 'Nuts & Seeds',
    calories: 73,
    protein: 2.5,
    carbs: 6.3,
    fat: 4.6,
    saturatedFat: 0.5,
    fiber: 5.1,
    sugar: 0,
    sodium: 2,
    potassium: 61,
    calcium: 95,
    iron: 1.2,
    cholesterol: 0,
    per100g: {
      calories: 486, protein: 16.5, carbs: 42.1, fat: 30.7, saturatedFat: 3.3, fiber: 34.4, sugar: 0,
      sodium: 16, potassium: 407, calcium: 631, iron: 7.7, cholesterol: 0
    },
    goodFor: ['Ultra High Fiber', 'Omega-3', 'Hydration Retention']
  },

  // ================= FRUITS =================
  {
    id: 'banana',
    name: 'Banana (Fresh, Ripe)',
    aliases: ['banana', 'bananas', 'kela', 'ripe banana'],
    image: img('photo-1571771894821-ce9b6c11b08e'),
    servingSize: '1 Medium (118g)',
    basisGrams: 118,
    category: 'Fruits',
    calories: 105,
    protein: 1.3,
    carbs: 27.0,
    fat: 0.3,
    saturatedFat: 0.1,
    fiber: 3.1,
    sugar: 14.4,
    sodium: 1,
    potassium: 422,
    calcium: 6,
    iron: 0.3,
    cholesterol: 0,
    per100g: {
      calories: 89, protein: 1.1, carbs: 22.8, fat: 0.3, saturatedFat: 0.1, fiber: 2.6, sugar: 12.2,
      sodium: 1, potassium: 358, calcium: 5, iron: 0.3, cholesterol: 0
    },
    goodFor: ['Pre-Workout Energy', 'Electrolytes & Potassium', 'Cramp Prevention']
  },
  {
    id: 'apple',
    name: 'Apple (Fresh with Skin)',
    aliases: ['apple', 'apples', 'seb', 'red apple', 'green apple'],
    image: img('photo-1560806887-1e4cd0b6cbd6'),
    servingSize: '1 Medium Apple (182g)',
    basisGrams: 182,
    category: 'Fruits',
    calories: 95,
    protein: 0.5,
    carbs: 25.1,
    fat: 0.3,
    saturatedFat: 0.1,
    fiber: 4.4,
    sugar: 18.9,
    sodium: 2,
    potassium: 195,
    calcium: 11,
    iron: 0.2,
    cholesterol: 0,
    per100g: {
      calories: 52, protein: 0.3, carbs: 13.8, fat: 0.2, saturatedFat: 0.05, fiber: 2.4, sugar: 10.4,
      sodium: 1, potassium: 107, calcium: 6, iron: 0.1, cholesterol: 0
    },
    goodFor: ['Weight Loss', 'Heart Health', 'Pectin Fiber']
  },
  {
    id: 'orange',
    name: 'Orange (Fresh)',
    aliases: ['orange', 'oranges', 'santra', 'citrus'],
    image: img('photo-1547514701-42782101795e'),
    servingSize: '1 Medium (131g)',
    basisGrams: 131,
    category: 'Fruits',
    calories: 62,
    protein: 1.2,
    carbs: 15.4,
    fat: 0.2,
    saturatedFat: 0,
    fiber: 3.1,
    sugar: 12.2,
    sodium: 0,
    potassium: 237,
    calcium: 52,
    iron: 0.1,
    cholesterol: 0,
    per100g: {
      calories: 47, protein: 0.9, carbs: 11.8, fat: 0.1, saturatedFat: 0, fiber: 2.4, sugar: 9.3,
      sodium: 0, potassium: 181, calcium: 40, iron: 0.1, cholesterol: 0
    },
    goodFor: ['Vitamin C Immunity', 'Hydration', 'Antioxidants']
  },
  {
    id: 'mango',
    name: 'Mango (Fresh Sliced)',
    aliases: ['mango', 'mangoes', 'aam', 'alphonso'],
    image: img('photo-1591073113125-e46713c829ed'),
    servingSize: '1 Cup Sliced (165g)',
    basisGrams: 165,
    category: 'Fruits',
    calories: 99,
    protein: 1.4,
    carbs: 24.7,
    fat: 0.6,
    saturatedFat: 0.1,
    fiber: 2.6,
    sugar: 22.5,
    sodium: 2,
    potassium: 277,
    calcium: 18,
    iron: 0.3,
    cholesterol: 0,
    per100g: {
      calories: 60, protein: 0.8, carbs: 15.0, fat: 0.4, saturatedFat: 0.1, fiber: 1.6, sugar: 13.7,
      sodium: 1, potassium: 168, calcium: 11, iron: 0.2, cholesterol: 0
    },
    goodFor: ['Eye Health', 'Vitamin A', 'Natural Sweetness']
  },
  {
    id: 'watermelon',
    name: 'Watermelon (Fresh Diced)',
    aliases: ['watermelon', 'tarbooj', 'melon'],
    image: img('photo-1587049352846-4a222e784d38'),
    servingSize: '1 Wedge / 1 Cup (152g)',
    basisGrams: 152,
    category: 'Fruits',
    calories: 46,
    protein: 0.9,
    carbs: 11.5,
    fat: 0.2,
    saturatedFat: 0,
    fiber: 0.6,
    sugar: 9.4,
    sodium: 2,
    potassium: 170,
    calcium: 11,
    iron: 0.4,
    cholesterol: 0,
    per100g: {
      calories: 30, protein: 0.6, carbs: 7.6, fat: 0.2, saturatedFat: 0, fiber: 0.4, sugar: 6.2,
      sodium: 1, potassium: 112, calcium: 7, iron: 0.2, cholesterol: 0
    },
    goodFor: ['Citrulline Blood Flow', 'Hydration (92% water)', 'Fat Loss Snack']
  },
  {
    id: 'papaya',
    name: 'Papaya (Fresh Cubed)',
    aliases: ['papaya', 'papita'],
    image: img('photo-1526318472351-c75fcf070305'),
    servingSize: '1 Cup Cubed (145g)',
    basisGrams: 145,
    category: 'Fruits',
    calories: 62,
    protein: 0.7,
    carbs: 15.7,
    fat: 0.4,
    saturatedFat: 0.1,
    fiber: 2.5,
    sugar: 11.3,
    sodium: 12,
    potassium: 264,
    calcium: 29,
    iron: 0.4,
    cholesterol: 0,
    per100g: {
      calories: 43, protein: 0.5, carbs: 10.8, fat: 0.3, saturatedFat: 0.1, fiber: 1.7, sugar: 7.8,
      sodium: 8, potassium: 182, calcium: 20, iron: 0.3, cholesterol: 0
    },
    goodFor: ['Papain Digestive Enzymes', 'Skin Glow', 'Low Calorie']
  },
  {
    id: 'strawberries',
    name: 'Strawberries (Fresh)',
    aliases: ['strawberry', 'strawberries', 'berries'],
    image: img('photo-1464965911861-746a04b4bca6'),
    servingSize: '1 Cup Halves (152g)',
    basisGrams: 152,
    category: 'Fruits',
    calories: 49,
    protein: 1.0,
    carbs: 11.7,
    fat: 0.5,
    saturatedFat: 0,
    fiber: 3.0,
    sugar: 7.4,
    sodium: 1,
    potassium: 233,
    calcium: 24,
    iron: 0.6,
    cholesterol: 0,
    per100g: {
      calories: 32, protein: 0.7, carbs: 7.7, fat: 0.3, saturatedFat: 0, fiber: 2.0, sugar: 4.9,
      sodium: 1, potassium: 153, calcium: 16, iron: 0.4, cholesterol: 0
    },
    goodFor: ['Low Calorie Sweet Treat', 'Antioxidants', 'Keto Friendly']
  },
  {
    id: 'avocado',
    name: 'Avocado (Fresh)',
    aliases: ['avocado', 'butter fruit', 'guacamole'],
    image: img('photo-1523049673857-eb18f1d7b578'),
    servingSize: '1/2 Medium (100g)',
    basisGrams: 100,
    category: 'Fruits & Healthy Fats',
    calories: 160,
    protein: 2.0,
    carbs: 8.5,
    fat: 14.7,
    saturatedFat: 2.1,
    fiber: 6.7,
    sugar: 0.7,
    sodium: 7,
    potassium: 485,
    calcium: 12,
    iron: 0.6,
    cholesterol: 0,
    per100g: {
      calories: 160, protein: 2.0, carbs: 8.5, fat: 14.7, saturatedFat: 2.1, fiber: 6.7, sugar: 0.7,
      sodium: 7, potassium: 485, calcium: 12, iron: 0.6, cholesterol: 0
    },
    goodFor: ['Monounsaturated Healthy Fats', 'High Potassium', 'Nutrient Absorption']
  },

  // ================= VEGETABLES =================
  {
    id: 'sweet-potato',
    name: 'Sweet Potato (Baked / Boiled)',
    aliases: ['sweet potato', 'shakarkandi', 'yam'],
    image: img('photo-1518843875459-f738682238a6'),
    servingSize: '1 Medium (130g)',
    basisGrams: 130,
    category: 'Vegetables & Complex Carbs',
    calories: 112,
    protein: 2.1,
    carbs: 26.0,
    fat: 0.1,
    saturatedFat: 0,
    fiber: 3.9,
    sugar: 5.5,
    sodium: 72,
    potassium: 438,
    calcium: 39,
    iron: 0.8,
    cholesterol: 0,
    per100g: {
      calories: 86, protein: 1.6, carbs: 20.0, fat: 0.1, saturatedFat: 0, fiber: 3.0, sugar: 4.2,
      sodium: 55, potassium: 337, calcium: 30, iron: 0.6, cholesterol: 0
    },
    goodFor: ['Beta-Carotene', 'Pre-Workout Fuel', 'Low Glycemic Carbs']
  },
  {
    id: 'broccoli',
    name: 'Broccoli (Fresh / Steamed)',
    aliases: ['broccoli', 'steamed broccoli'],
    image: img('photo-1584270354949-1f6c5d5c3d5a'),
    servingSize: '1 Cup Chopped (91g)',
    basisGrams: 91,
    category: 'Vegetables',
    calories: 31,
    protein: 2.5,
    carbs: 6.0,
    fat: 0.3,
    saturatedFat: 0.1,
    fiber: 2.4,
    sugar: 1.5,
    sodium: 30,
    potassium: 288,
    calcium: 43,
    iron: 0.6,
    cholesterol: 0,
    per100g: {
      calories: 34, protein: 2.8, carbs: 6.6, fat: 0.4, saturatedFat: 0.1, fiber: 2.6, sugar: 1.7,
      sodium: 33, potassium: 316, calcium: 47, iron: 0.7, cholesterol: 0
    },
    goodFor: ['Estrogen Balance', 'Sulforaphane Antioxidant', 'Fat Loss Filler']
  },
  {
    id: 'spinach',
    name: 'Spinach (Fresh Baby Spinach / Palak)',
    aliases: ['spinach', 'palak', 'baby spinach'],
    image: img('photo-1576045057995-568f588f82fb'),
    servingSize: '1 Cup Raw (30g)',
    basisGrams: 30,
    category: 'Vegetables',
    calories: 7,
    protein: 0.9,
    carbs: 1.1,
    fat: 0.1,
    saturatedFat: 0,
    fiber: 0.7,
    sugar: 0.1,
    sodium: 24,
    potassium: 167,
    calcium: 30,
    iron: 0.8,
    cholesterol: 0,
    per100g: {
      calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, saturatedFat: 0.1, fiber: 2.2, sugar: 0.4,
      sodium: 79, potassium: 558, calcium: 99, iron: 2.7, cholesterol: 0
    },
    goodFor: ['Nitrates & Pumps', 'Iron & Foliate', 'Micronutrient Powerhouse']
  },
  {
    id: 'carrot',
    name: 'Carrot (Fresh)',
    aliases: ['carrot', 'carrots', 'gajar'],
    image: img('photo-1447175008436-054170c2e979'),
    servingSize: '1 Medium Carrot (61g)',
    basisGrams: 61,
    category: 'Vegetables',
    calories: 25,
    protein: 0.6,
    carbs: 5.8,
    fat: 0.1,
    saturatedFat: 0,
    fiber: 1.7,
    sugar: 2.9,
    sodium: 42,
    potassium: 195,
    calcium: 20,
    iron: 0.2,
    cholesterol: 0,
    per100g: {
      calories: 41, protein: 0.9, carbs: 9.6, fat: 0.2, saturatedFat: 0, fiber: 2.8, sugar: 4.7,
      sodium: 69, potassium: 320, calcium: 33, iron: 0.3, cholesterol: 0
    },
    goodFor: ['Vision Health', 'Crunchy Low Calorie Snack']
  },
  {
    id: 'cucumber',
    name: 'Cucumber (Fresh with Peel)',
    aliases: ['cucumber', 'kheera', 'kakdi'],
    image: img('photo-1449300079323-02e209d9d3a6'),
    servingSize: '1 Cup Sliced (104g)',
    basisGrams: 104,
    category: 'Vegetables',
    calories: 16,
    protein: 0.7,
    carbs: 3.8,
    fat: 0.1,
    saturatedFat: 0,
    fiber: 0.5,
    sugar: 1.8,
    sodium: 2,
    potassium: 153,
    calcium: 17,
    iron: 0.3,
    cholesterol: 0,
    per100g: {
      calories: 15, protein: 0.7, carbs: 3.6, fat: 0.1, saturatedFat: 0, fiber: 0.5, sugar: 1.7,
      sodium: 2, potassium: 147, calcium: 16, iron: 0.3, cholesterol: 0
    },
    goodFor: ['Hydration', 'Zero Calorie Salad Base']
  }
]

export const popularFoods = [
  'Egg',
  'Chicken',
  'Rice',
  'Oats',
  'Paneer',
  'Banana',
  'Almonds',
  'Milk',
  'Greek Yogurt',
  'Sweet Potato',
  'Salmon',
  'Whey Protein'
]

export const searchFood = (query) => {
  const q = (query || '').trim().toLowerCase()
  if (!q) return null

  // 1. Exact alias or ID match
  const exact = foodNutritionData.find(
    (f) => f.id === q || f.name.toLowerCase() === q || (f.aliases && f.aliases.includes(q))
  )
  if (exact) return exact

  // 2. Contains match
  const matched = foodNutritionData.find((f) => {
    if (f.name.toLowerCase().includes(q)) return true
    if (f.aliases && f.aliases.some((a) => a.includes(q) || q.includes(a))) return true
    return false
  })

  return matched || null
}

export const searchFoodsLocal = (query, limit = 8) => {
  const q = (query || '').trim().toLowerCase()
  if (!q) return []

  const queryTokens = q.split(/\s+/).filter(Boolean)

  const scored = foodNutritionData.map((f) => {
    let score = 0
    const nameLower = f.name.toLowerCase()
    const idLower = f.id.toLowerCase()
    const aliases = (f.aliases || []).map((a) => a.toLowerCase())

    if (nameLower === q || idLower === q || aliases.includes(q)) {
      score += 100
    }
    if (nameLower.startsWith(q)) {
      score += 50
    }
    if (queryTokens.every((t) => nameLower.includes(t) || aliases.some((a) => a.includes(t)))) {
      score += 30
    }
    if (aliases.some((a) => a.startsWith(q))) {
      score += 25
    }

    return { ...f, _score: score }
  })

  return scored
    .filter((f) => f._score > 0)
    .sort((a, b) => b._score - a._score)
    .slice(0, limit)
}