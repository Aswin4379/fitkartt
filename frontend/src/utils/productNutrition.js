/**
 * FitKart Intelligent Nutrition Engine
 * Dynamically scales calories, protein, carbs, fat, fiber and micronutrients
 * based on selected product variant pack size (250g, 500g, 1kg, 2kg, 25 Bags, etc.)
 */

/**
 * Parses pack size strings like "250g", "500g", "1kg", "2kg", "500ml", "1L", "25 Bags", "60 Capsules"
 * Returns the numeric quantity, unit, and equivalent grams / units for relative scaling.
 */
export function parsePackSize(sizeStr) {
  if (!sizeStr || typeof sizeStr !== 'string') {
    return { value: 1, unit: 'pack', rawGrams: 500, multiplier: 1, label: 'Standard Pack' }
  }

  const str = sizeStr.trim().toLowerCase()

  // Match Kilograms (e.g., "1kg", "2 kg", "2.5kg", "5kgs")
  const kgMatch = str.match(/^([\d.]+)\s*(?:kg|kgs|kilo|kilogram|kilograms)$/i)
  if (kgMatch) {
    const val = parseFloat(kgMatch[1])
    return {
      value: val,
      unit: 'kg',
      rawGrams: val * 1000,
      label: `${val}kg Pack`,
      isWeight: true,
    }
  }

  // Match Grams (e.g., "250g", "500 g", "100gm", "750 grams")
  const gMatch = str.match(/^([\d.]+)\s*(?:g|gm|gms|gram|grams)$/i)
  if (gMatch) {
    const val = parseFloat(gMatch[1])
    return {
      value: val,
      unit: 'g',
      rawGrams: val,
      label: `${val}g Pack`,
      isWeight: true,
    }
  }

  // Match Liters (e.g., "1l", "1.5 l", "2 litres", "2L")
  const lMatch = str.match(/^([\d.]+)\s*(?:l|ltr|ltrs|liter|liters|litre|litres)$/i)
  if (lMatch) {
    const val = parseFloat(lMatch[1])
    return {
      value: val,
      unit: 'L',
      rawGrams: val * 1000,
      label: `${val}L Bottle`,
      isVolume: true,
    }
  }

  // Match Milliliters (e.g., "250ml", "500 ml", "330ml")
  const mlMatch = str.match(/^([\d.]+)\s*(?:ml|mls|milliliter|milliliters)$/i)
  if (mlMatch) {
    const val = parseFloat(mlMatch[1])
    return {
      value: val,
      unit: 'ml',
      rawGrams: val,
      label: `${val}ml Bottle`,
      isVolume: true,
    }
  }

  // Match Pounds (e.g., "1 lb", "2 lbs", "5 lbs")
  const lbMatch = str.match(/^([\d.]+)\s*(?:lb|lbs|pound|pounds)$/i)
  if (lbMatch) {
    const val = parseFloat(lbMatch[1])
    return {
      value: val,
      unit: 'lbs',
      rawGrams: Math.round(val * 453.6),
      label: `${val} lbs Tub`,
      isWeight: true,
    }
  }

  // Match Count / Items (e.g., "25 bags", "50 bags", "60 capsules", "30 tablets", "30 servings", "4 bars")
  const countMatch = str.match(/^([\d.]+)\s*(?:bags|bag|capsules|capsule|tablets|tablet|servings|serving|bars|bar|pieces|pcs|sachets|sachet)$/i)
  if (countMatch) {
    const val = parseFloat(countMatch[1])
    const unitWord = str.replace(/[\d.\s]/g, '') || 'units'
    return {
      value: val,
      unit: unitWord,
      rawCount: val,
      label: `${val} ${unitWord}`,
      isCount: true,
    }
  }

  // Match Pack of X (e.g., "pack of 2", "pack of 4")
  const packOfMatch = str.match(/pack\s+of\s+([\d.]+)/i)
  if (packOfMatch) {
    const val = parseFloat(packOfMatch[1])
    return {
      value: val,
      unit: 'pack',
      rawCount: val,
      label: `Pack of ${val}`,
      isCount: true,
    }
  }

  // Default fallback
  return { value: 1, unit: 'pack', rawGrams: 500, label: sizeStr }
}

/**
 * Calculates base nutrition per 100g (or per unit) for a specific product.
 */
function getProductBasePer100g(product, variant) {
  // If product has explicit database nutrition
  if (product?.nutrition && (product.nutrition.calories > 0 || product.nutrition.protein > 0)) {
    return {
      calories: Number(product.nutrition.calories) || 0,
      protein: Number(product.nutrition.protein) || 0,
      carbs: Number(product.nutrition.carbs) || 0,
      fat: Number(product.nutrition.fats || product.nutrition.fat) || 0,
      fiber: Number(product.nutrition.fiber) || 0,
    }
  }

  // If variant or product variants have baseline numbers
  const rawCalories = Number(variant?.calories ?? product?.variants?.[0]?.calories ?? 0)
  const rawProtein = Number(variant?.protein ?? product?.variants?.[0]?.protein ?? 0)

  if (rawCalories <= 0 && rawProtein <= 0) {
    return { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }
  }

  // In the catalogue, rawCalories/rawProtein are defined for a typical serving (approx 40g for grains/meals, 30g for whey, 1 bag for tea)
  // Let's determine if the category is low-calorie tea, supplement, or standard food:
  const isTea = product?.name?.toLowerCase().includes('tea') || product?.category === 'weight-loss' && rawCalories <= 5
  if (isTea) {
    return {
      calories: rawCalories,
      protein: rawProtein,
      carbs: 0.5,
      fat: 0,
      fiber: 0.2,
      perBag: true,
    }
  }

  // For high-protein supplements (e.g. Whey, Plant Protein)
  if (product?.category === 'protein-supplements' || rawProtein >= 15) {
    // 30g scoop typically has ~120 kcal, 24g protein -> per 100g = ~400 kcal, ~80g protein
    const per100Multiplier = rawCalories > 0 && rawCalories < 200 ? 100 / 30 : 1
    const calories100 = Math.round(rawCalories * per100Multiplier)
    const protein100 = Math.round(rawProtein * per100Multiplier)
    const proteinCals = protein100 * 4
    const remainingCals = Math.max(0, calories100 - proteinCals)
    const carbs100 = Math.round((remainingCals * 0.45) / 4)
    const fat100 = Math.round((remainingCals * 0.55) / 9)
    const fiber100 = Math.max(1, Math.round(carbs100 * 0.15))

    return {
      calories: calories100,
      protein: protein100,
      carbs: carbs100,
      fat: fat100,
      fiber: fiber100,
    }
  }

  // For standard whole foods, oats, grains, meals (serving is ~40g)
  // E.g. Rolled Oats: 150 kcal / 6g protein per 40g -> per 100g = 375 kcal, 15g protein, 66g carbs, 7g fat, 10g fiber
  const isPerServing = rawCalories < 250
  const per100Factor = isPerServing ? 100 / 40 : 1
  const cals100 = Math.round(rawCalories * per100Factor)
  const prot100 = Math.round(rawProtein * per100Factor)
  const protCals = prot100 * 4
  const remCals = Math.max(0, cals100 - protCals)
  const carbs100 = Math.round((remCals * 0.7) / 4)
  const fat100 = Math.round((remCals * 0.3) / 9)
  const fiber100 = Math.max(1, Math.round(carbs100 * 0.14))

  return {
    calories: cals100,
    protein: prot100,
    carbs: carbs100,
    fat: fat100,
    fiber: fiber100,
  }
}

/**
 * Calculates the exact dynamic scaled nutrition for any selected variant.
 * Supports:
 * - Selected pack scale (e.g. 250g = 0.5× 500g, 500g = 1×, 1kg = 2× 500g, 2kg = 4× 500g)
 * - Standard 100g reference values
 * - Serving count and breakdown
 *
 * @param {Object} product - The product object
 * @param {Object} variant - The selected variant object
 * @param {String} mode - 'pack' (entire selected pack) | 'serving' (standard 1 serving / 100g)
 */
export function getProductNutrition(product, variant, mode = 'pack') {
  if (!product) {
    return {
      calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0,
      packLabel: 'Pack', servingLabel: '1 Serving', servingsCount: 1,
      isEdible: false,
    }
  }

  const selectedVariant = variant || product.variants?.[0] || {}
  const parsedSize = parsePackSize(selectedVariant.size || selectedVariant.unit || '')
  const base100g = getProductBasePer100g(product, selectedVariant)

  if (base100g.calories === 0 && base100g.protein === 0) {
    return {
      calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0,
      packLabel: parsedSize.label,
      servingLabel: '1 Unit',
      servingsCount: 1,
      isEdible: false,
    }
  }

  // Handle Count-based products (e.g. 25 Bags, 50 Bags, 60 Capsules)
  if (parsedSize.isCount) {
    const count = parsedSize.rawCount || 1
    const singleBag = {
      calories: Math.round(base100g.calories * 10) / 10 || 2,
      protein: Math.round(base100g.protein * 10) / 10 || 0,
      carbs: Math.round(base100g.carbs * 10) / 10 || 0.5,
      fat: Math.round(base100g.fat * 10) / 10 || 0,
      fiber: Math.round(base100g.fiber * 10) / 10 || 0.1,
    }

    if (mode === 'serving') {
      return {
        ...singleBag,
        packLabel: parsedSize.label,
        servingLabel: `1 ${parsedSize.unit || 'Item'}`,
        servingsCount: count,
        isEdible: true,
        dailyValues: {
          calories: Math.round((singleBag.calories / 2000) * 100),
          protein: Math.round((singleBag.protein / 50) * 100),
          carbs: Math.round((singleBag.carbs / 300) * 100),
          fat: Math.round((singleBag.fat / 78) * 100),
          fiber: Math.round((singleBag.fiber / 28) * 100),
        }
      }
    }

    // Entire pack total
    const totalPack = {
      calories: Math.round(singleBag.calories * count),
      protein: Math.round(singleBag.protein * count * 10) / 10,
      carbs: Math.round(singleBag.carbs * count * 10) / 10,
      fat: Math.round(singleBag.fat * count * 10) / 10,
      fiber: Math.round(singleBag.fiber * count * 10) / 10,
    }

    return {
      ...totalPack,
      packLabel: `Entire Pack (${parsedSize.label})`,
      servingLabel: `Values for entire ${parsedSize.label} · ${count} Servings`,
      servingsCount: count,
      isEdible: true,
      dailyValues: {
        calories: Math.min(100, Math.round((totalPack.calories / 2000) * 100)),
        protein: Math.min(100, Math.round((totalPack.protein / 50) * 100)),
        carbs: Math.min(100, Math.round((totalPack.carbs / 300) * 100)),
        fat: Math.min(100, Math.round((totalPack.fat / 78) * 100)),
        fiber: Math.min(100, Math.round((totalPack.fiber / 28) * 100)),
      }
    }
  }

  // Handle Weight & Volume products (250g, 500g, 1kg, 2kg, 500ml, 1L, etc.)
  const weightInGrams = parsedSize.rawGrams || 500
  const packMultiplier = weightInGrams / 100 // Scale from 100g base

  // Serving size is standard 40g (grains/snacks) or 30g (powders)
  const singleServingGrams = product.category === 'protein-supplements' ? 30 : 40
  const servingsInPack = Math.round((weightInGrams / singleServingGrams) * 10) / 10

  if (mode === 'serving') {
    const servingFactor = singleServingGrams / 100
    const servingNutrition = {
      calories: Math.round(base100g.calories * servingFactor),
      protein: Math.round(base100g.protein * servingFactor * 10) / 10,
      carbs: Math.round(base100g.carbs * servingFactor * 10) / 10,
      fat: Math.round(base100g.fat * servingFactor * 10) / 10,
      fiber: Math.round(base100g.fiber * servingFactor * 10) / 10,
    }

    return {
      ...servingNutrition,
      packLabel: parsedSize.label,
      servingLabel: `1 Serving (${singleServingGrams}g)`,
      servingsCount: servingsInPack,
      isEdible: true,
      dailyValues: {
        calories: Math.round((servingNutrition.calories / 2000) * 100),
        protein: Math.round((servingNutrition.protein / 50) * 100),
        carbs: Math.round((servingNutrition.carbs / 300) * 100),
        fat: Math.round((servingNutrition.fat / 78) * 100),
        fiber: Math.round((servingNutrition.fiber / 28) * 100),
      }
    }
  }

  // Mode === 'pack' (Entire pack total - dynamically scales 250g -> 500g -> 1kg -> 2kg)
  const packNutrition = {
    calories: Math.round(base100g.calories * packMultiplier),
    protein: Math.round(base100g.protein * packMultiplier * 10) / 10,
    carbs: Math.round(base100g.carbs * packMultiplier * 10) / 10,
    fat: Math.round(base100g.fat * packMultiplier * 10) / 10,
    fiber: Math.round(base100g.fiber * packMultiplier * 10) / 10,
  }

  return {
    ...packNutrition,
    packLabel: `Selected Pack (${parsedSize.label})`,
    servingLabel: `Values for ${parsedSize.label} · ~${servingsInPack} servings (${singleServingGrams}g/serving)`,
    servingsCount: servingsInPack,
    isEdible: true,
    dailyValues: {
      calories: Math.round((packNutrition.calories / 2000) * 100),
      protein: Math.round((packNutrition.protein / 50) * 100),
      carbs: Math.round((packNutrition.carbs / 300) * 100),
      fat: Math.round((packNutrition.fat / 78) * 100),
      fiber: Math.round((packNutrition.fiber / 28) * 100),
    }
  }
}
