// Open Food Facts external nutrition search controller

function round1(val) {
  if (val === null || val === undefined || isNaN(val)) return 0;
  return Math.round(Number(val) * 10) / 10;
}

function cleanProductName(name) {
  if (!name) return '';
  return name.trim().replace(/\s+/g, ' ');
}

export const searchExternalNutrition = async (req, res) => {
  try {
    const query = (req.query.query || req.query.q || '').trim();
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 10, 1), 25);

    if (!query || query.length < 2) {
      return res.json({ success: true, count: 0, foods: [] });
    }

    const mirrors = [
      `https://world.openfoodfacts.net/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page_size=${limit}`,
      `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page_size=${limit}`
    ];

    let products = [];

    for (const url of mirrors) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);

        const response = await fetch(url, {
          signal: controller.signal,
          headers: {
            'User-Agent': 'FitKartApp - Web/Mobile Tracker - Version 1.0 (contact@fitkart.app)'
          }
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          const text = await response.text();
          const data = JSON.parse(text);
          if (data && Array.isArray(data.products) && data.products.length > 0) {
            products = data.products;
            break;
          }
        }
      } catch (mirrorErr) {
        console.warn(`[Open Food Facts Mirror Error] for ${url}:`, mirrorErr.message);
      }
    }

    const foods = products
      .filter((p) => {
        const name = p.product_name || p.product_name_en || p.generic_name;
        return name && name.trim().length > 1;
      })
      .map((p) => {
        const name = cleanProductName(p.product_name || p.product_name_en || p.generic_name || 'Food Item');
        
        let category = 'Food & Groceries';
        if (p.categories) {
          category = p.categories.split(',')[0].trim();
        } else if (p.categories_tags && p.categories_tags.length > 0) {
          category = p.categories_tags[0].replace(/^[a-z]+:/, '').replace(/-/g, ' ');
        }

        // Images: prioritize high-res front images
        const image = p.image_front_url || p.image_url || p.image_front_small_url || p.image_small_url || null;

        // Serving size
        const servingSize = p.serving_size || (p.serving_quantity ? `${p.serving_quantity}g` : '100g serving');

        // Nutriments extraction (calories in kcal)
        const calories = Math.round(
          p.nutriments?.['energy-kcal_100g'] ??
          p.nutriments?.['energy-kcal_serving'] ??
          p.nutriments?.['energy-kcal'] ??
          (p.nutriments?.['energy_100g'] ? p.nutriments['energy_100g'] / 4.184 : 0)
        );

        const protein = round1(p.nutriments?.proteins_100g ?? p.nutriments?.proteins_serving ?? p.nutriments?.proteins ?? 0);
        const carbs = round1(p.nutriments?.carbohydrates_100g ?? p.nutriments?.carbohydrates_serving ?? p.nutriments?.carbohydrates ?? 0);
        const fat = round1(p.nutriments?.fat_100g ?? p.nutriments?.fat_serving ?? p.nutriments?.fat ?? 0);
        const saturatedFat = round1(p.nutriments?.['saturated-fat_100g'] ?? p.nutriments?.['saturated-fat_serving'] ?? p.nutriments?.['saturated-fat'] ?? 0);
        const fiber = round1(p.nutriments?.fiber_100g ?? p.nutriments?.fiber_serving ?? p.nutriments?.fiber ?? 0);
        const sugar = round1(p.nutriments?.sugars_100g ?? p.nutriments?.sugars_serving ?? p.nutriments?.sugars ?? 0);
        
        const sodium = p.nutriments?.sodium_100g !== undefined
          ? Math.round(p.nutriments.sodium_100g * 1000)
          : (p.nutriments?.sodium_serving !== undefined ? Math.round(p.nutriments.sodium_serving * 1000) : 0);

        const potassium = p.nutriments?.potassium_100g !== undefined
          ? Math.round(p.nutriments.potassium_100g * 1000)
          : 0;

        const calcium = p.nutriments?.calcium_100g !== undefined
          ? Math.round(p.nutriments.calcium_100g * 1000)
          : 0;

        const iron = p.nutriments?.iron_100g !== undefined
          ? Math.round(p.nutriments.iron_100g * 1000)
          : 0;

        const cholesterol = p.nutriments?.cholesterol_100g !== undefined
          ? Math.round(p.nutriments.cholesterol_100g * 1000)
          : 0;

        return {
          fdcId: p.code || p._id || `off_${Math.random().toString(36).substring(2, 9)}`,
          name,
          category,
          servingSize,
          calories,
          protein,
          carbs,
          fat,
          saturatedFat,
          fiber,
          sugar,
          sodium,
          potassium,
          calcium,
          iron,
          cholesterol,
          image,
          source: 'OpenFoodFacts',
          isLocal: false
        };
      })
      .slice(0, limit);

    return res.json({
      success: true,
      count: foods.length,
      foods
    });
  } catch (error) {
    console.error('[External Nutrition Search Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to search external nutrition database',
      error: error.message
    });
  }
};
