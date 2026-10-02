// Live nutrition search against verified curated dataset + Open Food Facts API Fallback.
import { findHouseholdServing, formatServingSize, cleanUnit } from './servingSize.js'
import { foodNutritionData, searchFoodsLocal } from '../data/foodNutrition.js'
import { getFoodImage } from './foodImageMap.js'
import { nutritionApi } from '../services/api.js'

// In-memory cache for external Open Food Facts items fetched during session
const externalFoodsCache = new Map()

function cleanFoodName(raw) {
  if (!raw) return 'Unknown food'
  const trimmed = raw.trim()
  const isShouting = trimmed === trimmed.toUpperCase() && /[A-Z]/.test(trimmed)
  if (!isShouting) return trimmed
  return trimmed.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())
}

/**
 * Search foods combining local verified database (primary source)
 * with Open Food Facts API fallback via backend.
 * Returns clean, deduplicated, rich items with proper names, images and macros.
 */
export async function searchFoods(query, resultLimit = 10) {
  const q = (query || '').trim()
  if (q.length < 2) return []

  // 1. Search high-quality verified local dataset first (Primary Source)
  const localMatches = searchFoodsLocal(q, resultLimit)
  const localResults = localMatches.map((f) => ({
    fdcId: f.id,
    id: f.id,
    name: f.name,
    category: f.category,
    servingSize: f.servingSize,
    calories: f.calories,
    protein: f.protein,
    carbs: f.carbs,
    fat: f.fat,
    saturatedFat: f.saturatedFat || 0,
    fiber: f.fiber || 0,
    sugar: f.sugar || 0,
    sodium: f.sodium || 0,
    potassium: f.potassium || 0,
    calcium: f.calcium || 0,
    iron: f.iron || 0,
    cholesterol: f.cholesterol || 0,
    image: f.image || getFoodImage(f.name, f.category),
    goodFor: f.goodFor || ['Health & Fitness'],
    per100g: f.per100g,
    isLocal: true,
  }))

  // If local results satisfy the search query, return them immediately
  if (localResults.length >= 3) {
    return localResults.slice(0, resultLimit)
  }

  // 2. Query Open Food Facts API through backend fallback
  let externalResults = []
  try {
    const response = await nutritionApi.searchFood(q, resultLimit)
    if (response && response.success && Array.isArray(response.foods)) {
      externalResults = response.foods.map((f) => {
        const item = {
          fdcId: String(f.fdcId),
          id: String(f.fdcId),
          name: cleanFoodName(f.name),
          category: f.category || 'Food & Grocery',
          servingSize: f.servingSize || '100g serving',
          calories: f.calories ?? 0,
          protein: f.protein ?? 0,
          carbs: f.carbs ?? 0,
          fat: f.fat ?? 0,
          saturatedFat: f.saturatedFat ?? 0,
          fiber: f.fiber ?? 0,
          sugar: f.sugar ?? 0,
          sodium: f.sodium ?? 0,
          potassium: f.potassium ?? 0,
          calcium: f.calcium ?? 0,
          iron: f.iron ?? 0,
          cholesterol: f.cholesterol ?? 0,
          image: f.image || getFoodImage(f.name, f.category),
          source: 'OpenFoodFacts',
          isLocal: false,
        }
        // Cache external item for fast getFoodDetails lookup
        externalFoodsCache.set(String(item.fdcId), item)
        externalFoodsCache.set(item.name.toLowerCase(), item)
        return item
      })
    }
  } catch (err) {
    console.warn('[Open Food Facts fallback search notice]:', err.message)
  }

  // 3. Combine local results (primary) with external results (fallback)
  const combined = [...localResults]
  const existingNames = new Set(localResults.map((r) => r.name.toLowerCase()))

  for (const item of externalResults) {
    if (!existingNames.has(item.name.toLowerCase())) {
      existingNames.add(item.name.toLowerCase())
      combined.push(item)
    }
  }

  return combined.slice(0, resultLimit)
}

/**
 * Fetch detailed nutrition for a specific food.
 * Supports both local curated foods and Open Food Facts external foods.
 */
export async function getFoodDetails(id) {
  if (!id) return null

  const idStr = String(id).toLowerCase()

  // 1. Check if it's a local curated food
  const local = foodNutritionData.find(
    (f) => String(f.id).toLowerCase() === idStr || f.name.toLowerCase() === idStr
  )
  if (local) {
    return {
      fdcId: local.id,
      id: local.id,
      name: local.name,
      category: local.category,
      servingSize: local.servingSize,
      calories: local.calories,
      protein: local.protein,
      carbs: local.carbs,
      fat: local.fat,
      saturatedFat: local.saturatedFat || 0,
      fiber: local.fiber || 0,
      sugar: local.sugar || 0,
      sodium: local.sodium || 0,
      potassium: local.potassium || 0,
      calcium: local.calcium || 0,
      iron: local.iron || 0,
      cholesterol: local.cholesterol || 0,
      image: local.image || getFoodImage(local.name, local.category),
      goodFor: local.goodFor || ['Health & Fitness'],
      per100g: local.per100g,
      isLocal: true,
    }
  }

  // 2. Check external foods cache
  if (externalFoodsCache.has(idStr) || externalFoodsCache.has(String(id))) {
    const cached = externalFoodsCache.get(idStr) || externalFoodsCache.get(String(id))
    return { ...cached }
  }

  // 3. If not cached, query Open Food Facts via backend
  try {
    const response = await nutritionApi.searchFood(String(id), 1)
    if (response && response.success && response.foods && response.foods.length > 0) {
      const f = response.foods[0]
      const item = {
        fdcId: String(f.fdcId),
        id: String(f.fdcId),
        name: cleanFoodName(f.name),
        category: f.category || 'Food & Grocery',
        servingSize: f.servingSize || '100g serving',
        calories: f.calories ?? 0,
        protein: f.protein ?? 0,
        carbs: f.carbs ?? 0,
        fat: f.fat ?? 0,
        saturatedFat: f.saturatedFat ?? 0,
        fiber: f.fiber ?? 0,
        sugar: f.sugar ?? 0,
        sodium: f.sodium ?? 0,
        potassium: f.potassium ?? 0,
        calcium: f.calcium ?? 0,
        iron: f.iron ?? 0,
        cholesterol: f.cholesterol ?? 0,
        image: f.image || getFoodImage(f.name, f.category),
        source: 'OpenFoodFacts',
        isLocal: false,
      }
      externalFoodsCache.set(String(item.fdcId), item)
      externalFoodsCache.set(item.name.toLowerCase(), item)
      return item
    }
  } catch (err) {
    console.warn('[Open Food Facts detail lookup notice]:', err.message)
  }

  // Fallback to local default if food not found anywhere
  const fallbackLocal = foodNutritionData[0]
  return {
    fdcId: fallbackLocal.id,
    id: fallbackLocal.id,
    name: fallbackLocal.name,
    category: fallbackLocal.category,
    servingSize: fallbackLocal.servingSize,
    calories: fallbackLocal.calories,
    protein: fallbackLocal.protein,
    carbs: fallbackLocal.carbs,
    fat: fallbackLocal.fat,
    saturatedFat: fallbackLocal.saturatedFat || 0,
    fiber: fallbackLocal.fiber || 0,
    sugar: fallbackLocal.sugar || 0,
    sodium: fallbackLocal.sodium || 0,
    potassium: fallbackLocal.potassium || 0,
    calcium: fallbackLocal.calcium || 0,
    iron: fallbackLocal.iron || 0,
    cholesterol: fallbackLocal.cholesterol || 0,
    image: fallbackLocal.image,
    isLocal: true,
  }
}