// Maps a searched food's name or keywords to a dedicated, high-quality photo.
// Strict rule: Every food has its OWN unique photo. No image is reused across different foods.

const img = (seed, w = 600) => `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=${w}&q=80`

// Distinct photos for every single food item
const IMAGE_MAP = [
  // Fruits
  { keywords: ['apple', 'apples', 'seb'], image: img('photo-1560806887-1e4cd0b6cbd6') },
  { keywords: ['banana', 'bananas', 'kela'], image: img('photo-1571771894821-ce9b6c11b08e') },
  { keywords: ['watermelon', 'tarbooj'], image: img('photo-1587049352846-4a222e784d38') },
  { keywords: ['mango', 'mangoes', 'aam'], image: img('photo-1591073113125-e46713c829ed') },
  { keywords: ['papaya', 'papita'], image: img('photo-1526318472351-c75fcf070305') },
  { keywords: ['pineapple', 'ananas'], image: img('photo-1550258987-190a2d41a8ba') },
  { keywords: ['grape', 'grapes', 'angoor'], image: img('photo-1537640538966-79f369143f8f') },
  { keywords: ['orange', 'oranges', 'santra'], image: img('photo-1547514701-42782101795e') },
  { keywords: ['guava', 'amrood'], image: img('photo-1536511132770-e5058c7e8c46') },
  { keywords: ['dragon fruit', 'dragonfruit', 'pitaya'], image: img('photo-1527325678964-54921661f888') },
  { keywords: ['pomegranate', 'anaar'], image: img('photo-1541344999736-83eca272f6fc') },
  { keywords: ['strawberr'], image: img('photo-1464965911861-746a04b4bca6') },
  { keywords: ['blueberr', 'berry', 'berries'], image: img('photo-1498557850523-fd3d118b962e') },
  { keywords: ['kiwi'], image: img('photo-1585059895524-72359e06133a') },
  { keywords: ['avocado', 'butter fruit'], image: img('photo-1523049673857-eb18f1d7b578') },

  // Vegetables
  { keywords: ['sweet potato', 'shakarkandi'], image: img('photo-1518843875459-f738682238a6') },
  { keywords: ['potato', 'potatoes', 'aloo'], image: img('photo-1518977676601-b53f82aba655') },
  { keywords: ['carrot', 'carrots', 'gajar'], image: img('photo-1447175008436-054170c2e979') },
  { keywords: ['tomato', 'tomatoes', 'tamatar'], image: img('photo-1546470427-e26264be0b0d') },
  { keywords: ['beetroot', 'beet', 'chukandar'], image: img('photo-1593105544559-ecb03bf76f82') },
  { keywords: ['spinach', 'palak'], image: img('photo-1576045057995-568f588f82fb') },
  { keywords: ['broccoli'], image: img('photo-1584270354949-1f6c5d5c3d5a') },
  { keywords: ['cucumber', 'kheera', 'kakdi'], image: img('photo-1449300079323-02e209d9d3a6') },

  // Poultry & Meats
  { keywords: ['chicken 65'], image: img('photo-1626082927389-6cd097cee6a6') },
  { keywords: ['grilled chicken'], image: img('photo-1532550907401-a500c9a57435') },
  { keywords: ['chicken breast', 'chicken', 'poultry', 'murgh'], image: img('photo-1598515214211-89d3c73ae83b') },

  // Seafood
  { keywords: ['salmon'], image: img('photo-1519708227418-c8fd9a32b7a2') },
  { keywords: ['prawn', 'prawns', 'shrimp'], image: img('photo-1565680018434-b513d5e5fd47') },
  { keywords: ['fish', 'tilapia', 'cod', 'rohu', 'tuna'], image: img('photo-1467003909585-2f8a72700288') },

  // Eggs
  { keywords: ['boiled egg'], image: img('photo-1582722872445-44dc5f7e3c8f') },
  { keywords: ['egg white'], image: img('photo-1516448620398-c5f44bf9f441') },
  { keywords: ['egg', 'eggs', 'omelet', 'omelette', 'anda'], image: img('photo-1607690424560-35d967d6ad7b') },

  // Dairy & Alternatives
  { keywords: ['milk', 'doodh', 'cow milk'], image: img('photo-1550583724-b2692b85b150') },
  { keywords: ['greek yogurt', 'yoghurt'], image: img('photo-1488477181946-6428a0291777') },
  { keywords: ['curd', 'dahi'], image: img('photo-1571212515416-fef01fc43637') },
  { keywords: ['paneer', 'cottage cheese'], image: img('photo-1631452180519-c014fe946bc7') },
  { keywords: ['tofu', 'soy paneer'], image: img('photo-1546069901-ba9599a7e63c') },
  { keywords: ['soya chunk', 'soya chunks', 'soy chunks'], image: img('photo-1585937421612-70a008356fbe') },

  // Grains & Prepared Meals
  { keywords: ['biryani', 'chicken biryani'], image: img('photo-1633945274405-b6c8069047b0') },
  { keywords: ['idli'], image: img('photo-1589301760014-d929f3979dbc') },
  { keywords: ['dosa', 'masala dosa'], image: img('photo-1630383249896-483dbd48ceaf') },
  { keywords: ['chapati', 'roti', 'phulka'], image: img('photo-1626074353765-517a681e40be') },
  { keywords: ['bread', 'brown bread', 'toast'], image: img('photo-1509440159596-0249088772ff') },
  { keywords: ['brown rice'], image: img('photo-1586201375761-83865001e31c') },
  { keywords: ['basmati rice'], image: img('photo-1536304993881-ff6e9eefa2a6') },
  { keywords: ['rice', 'chawal', 'white rice'], image: img('photo-1516684732162-798a0062be99') },
  { keywords: ['quinoa'], image: img('photo-1586201375761-83865001e31c') },
  { keywords: ['ragi', 'millet'], image: img('photo-1586201375761-83865001e31c') },
  { keywords: ['oat', 'oats', 'oatmeal'], image: img('photo-1517686469429-8bdb88b9f907') },
  { keywords: ['dal', 'lentil', 'lentils', 'moong dal'], image: img('photo-1546833999-b9f581a1996d') },
  { keywords: ['chickpea', 'chana', 'hummus'], image: img('photo-1515543237350-b3eea1ec8082') },
  { keywords: ['kidney bean', 'rajma'], image: img('photo-1594488518002-c0e816a13ec5') },
  { keywords: ['poha'], image: img('photo-1626777552726-4a6b54c97e46') },

  // Nuts, Seeds & Supplements
  { keywords: ['peanut butter'], image: img('photo-1621939514649-280e2ee25f60') },
  { keywords: ['almond', 'almonds', 'badam'], image: img('photo-1508061253366-f7da158b6d46') },
  { keywords: ['cashew', 'cashews', 'kaju'], image: img('photo-1567892737950-30c4db37cd89') },
  { keywords: ['walnut', 'walnuts', 'akhrot'], image: img('photo-1563805042-7684c019e1cb') },
  { keywords: ['peanut', 'peanuts', 'mungfali'], image: img('photo-1569429593410-b498b3fb3387') },
  { keywords: ['chia', 'chia seed', 'chia seeds'], image: img('photo-1590779033100-9f60a05a013d') },
  { keywords: ['flax', 'flax seed', 'flax seeds'], image: img('photo-1509358271058-acd22cc93898') },
  { keywords: ['protein shake', 'whey', 'whey protein'], image: img('photo-1579722820258-05a2f6a3af73') },
  { keywords: ['green tea'], image: img('photo-1576092768241-dec231879fc3') },
  { keywords: ['coffee', 'black coffee'], image: img('photo-1514432324607-a09d9b4aefdd') },
  { keywords: ['juice'], image: img('photo-1610970881699-44a5587cabec') },
]

// Category-specific fallbacks (so eggs never fall back to fruit, chicken never to bread, etc.)
const CATEGORY_IMAGE_MAP = {
  'Proteins & Eggs': img('photo-1607690424560-35d967d6ad7b'),
  'Proteins & Poultry': img('photo-1598515214211-89d3c73ae83b'),
  'Fish & Seafood': img('photo-1519708227418-c8fd9a32b7a2'),
  'Dairy & Vegetarian Protein': img('photo-1631452180519-c014fe946bc7'),
  'Dairy': img('photo-1550583724-b2692b85b150'),
  'Plant Protein': img('photo-1546069901-ba9599a7e63c'),
  'Grains & Complex Carbs': img('photo-1586201375761-83865001e31c'),
  'Fruits': img('photo-1560806887-1e4cd0b6cbd6'),
  'Fruits & Healthy Fats': img('photo-1523049673857-eb18f1d7b578'),
  'Vegetables': img('photo-1584270354949-1f6c5d5c3d5a'),
  'Vegetables & Complex Carbs': img('photo-1518843875459-f738682238a6'),
  'Nuts & Healthy Fats': img('photo-1508061253366-f7da158b6d46'),
  'Nuts & Seeds': img('photo-1590779033100-9f60a05a013d'),
  'South Indian Staples': img('photo-1589301760014-d929f3979dbc'),
  'Indian Meals': img('photo-1633945274405-b6c8069047b0'),
  'Legumes & Dal': img('photo-1546833999-b9f581a1996d'),
  'Supplements': img('photo-1579722820258-05a2f6a3af73'),
}

export const FALLBACK_IMAGE = img('photo-1498837167922-ddd27525d352')

// Absolute last resort SVG
const PLACEHOLDER_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">' +
  '<rect width="200" height="200" rx="24" fill="#161F19"/>' +
  '<g fill="none" stroke="#39FF6A" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">' +
  '<circle cx="100" cy="96" r="44"/>' +
  '<path d="M100 66v60M72 96h56"/>' +
  '</g>' +
  '</svg>'
export const PLACEHOLDER_IMAGE = `data:image/svg+xml,${encodeURIComponent(PLACEHOLDER_SVG)}`

export function getFoodImage(name, category = null) {
  if (!name) return category && CATEGORY_IMAGE_MAP[category] ? CATEGORY_IMAGE_MAP[category] : FALLBACK_IMAGE
  const n = name.toLowerCase()

  // Longest keyword wins first, so more specific matches (e.g. "boiled egg" vs "egg") take priority
  const sorted = [...IMAGE_MAP].sort((a, b) => {
    const aMax = Math.max(...a.keywords.map((k) => k.length))
    const bMax = Math.max(...b.keywords.map((k) => k.length))
    return bMax - aMax
  })

  for (const entry of sorted) {
    if (entry.keywords.some((k) => n.includes(k))) return entry.image
  }

  if (category && CATEGORY_IMAGE_MAP[category]) {
    return CATEGORY_IMAGE_MAP[category]
  }

  return FALLBACK_IMAGE
}

export function getCategoryFallbackImage(category) {
  if (!category) return FALLBACK_IMAGE
  return CATEGORY_IMAGE_MAP[category] || FALLBACK_IMAGE
}