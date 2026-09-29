// USDA FoodData Central returns serving info as raw internal codes like
// "44MLT" or "100GRM" — meaningless to normal users. This module converts
// that into a friendly household serving (e.g. "1 large egg (about 50 g)")
// wherever we have a sensible standard for the food, and otherwise cleans
// up whatever unit USDA did provide into plain text, clearly marked as
// approximate.

// USDA's raw unit codes -> plain, lowercase units.
const UNIT_MAP = {
  GRM: 'g', G: 'g', GM: 'g',
  MLT: 'ml', ML: 'ml',
  MG: 'mg',
  OZ: 'oz',
  LB: 'lb',
  KG: 'kg',
  L: 'l', LTR: 'l',
  IU: 'IU',
}

export function cleanUnit(rawUnit) {
  if (!rawUnit) return 'g'
  const key = rawUnit.toUpperCase().trim()
  return UNIT_MAP[key] || rawUnit.toLowerCase()
}

// Ordered by keyword specificity — sorted by length at lookup time so more
// specific phrases ("sweet potato") win over broader ones ("potato").
const HOUSEHOLD_SERVINGS = [
  { keywords: ['egg'], label: '1 large egg (about 50 g)', grams: 50 },
  { keywords: ['apple'], label: '1 medium apple (about 182 g)', grams: 182 },
  { keywords: ['banana'], label: '1 medium banana (about 118 g)', grams: 118 },
  { keywords: ['orange'], label: '1 medium orange (about 131 g)', grams: 131 },
  { keywords: ['mango'], label: '1 cup sliced (about 165 g)', grams: 165 },
  { keywords: ['watermelon'], label: '1 cup diced (about 152 g)', grams: 152 },
  { keywords: ['grape'], label: '1 cup (about 151 g)', grams: 151 },
  { keywords: ['guava'], label: '1 medium guava (about 55 g)', grams: 55 },
  { keywords: ['dragon fruit', 'dragonfruit'], label: '1 cup diced (about 227 g)', grams: 227 },
  { keywords: ['pomegranate'], label: '1 cup arils (about 174 g)', grams: 174 },
  { keywords: ['strawberr'], label: '1 cup halves (about 152 g)', grams: 152 },
  { keywords: ['kiwi'], label: '1 medium kiwi (about 69 g)', grams: 69 },
  { keywords: ['pineapple'], label: '1 cup chunks (about 165 g)', grams: 165 },
  { keywords: ['papaya'], label: '1 cup cubed (about 145 g)', grams: 145 },
  { keywords: ['sweet potato'], label: '1 medium (about 130 g)', grams: 130 },
  { keywords: ['potato'], label: '1 medium potato (about 173 g)', grams: 173 },
  { keywords: ['carrot'], label: '1 medium carrot (about 61 g)', grams: 61 },
  { keywords: ['tomato'], label: '1 medium tomato (about 123 g)', grams: 123 },
  { keywords: ['beetroot', 'beet'], label: '1 cup diced (about 136 g)', grams: 136 },
  { keywords: ['spinach'], label: '1 cup raw (about 30 g)', grams: 30 },
  { keywords: ['broccoli'], label: '1 cup chopped (about 91 g)', grams: 91 },
  { keywords: ['avocado'], label: '1/2 medium avocado (about 100 g)', grams: 100 },
  { keywords: ['chicken 65'], label: '100 g serving', grams: 100 },
  { keywords: ['chicken'], label: '100 g serving (about 3.5 oz)', grams: 100 },
  { keywords: ['salmon'], label: '100 g serving (about 3.5 oz fillet)', grams: 100 },
  { keywords: ['fish'], label: '100 g serving (about 3.5 oz fillet)', grams: 100 },
  { keywords: ['milk'], label: '1 cup (about 240 ml)', grams: 240 },
  { keywords: ['greek yogurt', 'yoghurt', 'yogurt'], label: '1 cup (about 245 g)', grams: 245 },
  { keywords: ['curd'], label: '1 cup (about 245 g)', grams: 245 },
  { keywords: ['paneer'], label: '100 g serving', grams: 100 },
  { keywords: ['biryani'], label: '1 cup cooked (about 200 g)', grams: 200 },
  { keywords: ['idli'], label: '1 piece (about 40 g)', grams: 40 },
  { keywords: ['dosa'], label: '1 piece (about 75 g)', grams: 75 },
  { keywords: ['chapati', 'roti'], label: '1 piece (about 40 g)', grams: 40 },
  { keywords: ['bread'], label: '1 slice (about 28 g)', grams: 28 },
  { keywords: ['brown rice'], label: '1 cup cooked (about 195 g)', grams: 195 },
  { keywords: ['rice'], label: '1 cup cooked (about 158 g)', grams: 158 },
  { keywords: ['ragi', 'millet'], label: '1 cup cooked (about 200 g)', grams: 200 },
  { keywords: ['quinoa'], label: '1 cup cooked (about 185 g)', grams: 185 },
  { keywords: ['oat'], label: '1 cup cooked (about 234 g)', grams: 234 },
  { keywords: ['peanut butter'], label: '2 tbsp (about 32 g)', grams: 32 },
  { keywords: ['almond'], label: '1 oz (about 28 g, ~23 almonds)', grams: 28 },
  { keywords: ['cashew'], label: '1 oz (about 28 g, ~18 cashews)', grams: 28 },
  { keywords: ['walnut'], label: '1 oz (about 28 g, ~14 halves)', grams: 28 },
  { keywords: ['peanut'], label: '1 oz (about 28 g)', grams: 28 },
  { keywords: ['protein shake', 'whey'], label: '1 scoop (about 30 g)', grams: 30 },
  { keywords: ['juice'], label: '1 cup (about 240 ml)', grams: 240 },
]

const SORTED_SERVINGS = [...HOUSEHOLD_SERVINGS].sort((a, b) => {
  const aMax = Math.max(...a.keywords.map((k) => k.length))
  const bMax = Math.max(...b.keywords.map((k) => k.length))
  return bMax - aMax
})

export function findHouseholdServing(name) {
  const n = (name || '').toLowerCase()
  const match = SORTED_SERVINGS.find((entry) => entry.keywords.some((k) => n.includes(k)))
  if (match) {
    return { label: match.label, grams: match.grams }
  }
  return null
}

export function formatServingSize(name, apiServingSize, apiServingSizeUnit) {
  const household = findHouseholdServing(name)
  if (household) return household.label

  if (apiServingSize) {
    return `${apiServingSize} ${cleanUnit(apiServingSizeUnit)} serving (approx.)`
  }
  return '100 g serving'
}

/**
 * Returns a friendly, human-readable serving-size string for a food.
 * Prefers a known household serving; falls back to whatever USDA provided
 * (with its unit cleaned up) or a plain "100 g serving" default — never a
 * raw code like "44MLT".
 */
export function getServingLabel(name, apiServingSize, apiServingSizeUnit) {
  return formatServingSize(name, apiServingSize, apiServingSizeUnit)
}