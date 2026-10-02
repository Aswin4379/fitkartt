import { getProductNutrition } from './productNutrition.js'

export { getProductNutrition }

export function estimateNutrition(calories, protein, variantSize = '500g') {
  if (!calories || calories <= 0) {
    return { calories: 0, protein: protein || 0, carbs: 0, fat: 0, fiber: 0 }
  }

  // Create a synthetic product mock to calculate full scaled nutrition
  const mockProduct = {
    variants: [{ size: variantSize, calories, protein }]
  }

  return getProductNutrition(mockProduct, { size: variantSize, calories, protein }, 'pack')
}