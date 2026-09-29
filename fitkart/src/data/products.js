// FitKart product catalogue — variant-based structure.
// ONE product = ONE card. Sizes/flavours live inside `variants`.
// Shape: { id, name, category, image, description, ingredients, rating, reviewCount, tags, variants: [{ id, size, flavor, unit, price, mrp, calories, protein, stock }] }

export const categories = [
  {
    "id": "weight-loss",
    "name": "Weight Loss",
    "icon": "🥗",
    "color": "#39FF6A",
    "image": "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=600&q=80",
    "subtitle": "Low-cal meals & detox"
  },
  {
    "id": "weight-gain",
    "name": "Weight Gain",
    "icon": "💪",
    "color": "#B6FF3C",
    "image": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=600&q=80",
    "subtitle": "High calorie & protein"
  },
  {
    "id": "fitness-maintenance",
    "name": "Fitness Maintenance",
    "icon": "⚖️",
    "color": "#39FF6A",
    "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
    "subtitle": "Balanced daily nutrition"
  },
  {
    "id": "protein-supplements",
    "name": "Protein Supplements",
    "icon": "🥤",
    "color": "#B6FF3C",
    "image": "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=600&q=80",
    "subtitle": "Whey, plant & BCAAs"
  },
  {
    "id": "healthy-snacks",
    "name": "Healthy Snacks",
    "icon": "🍿",
    "color": "#39FF6A",
    "image": "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=600&q=80",
    "subtitle": "Clean bites & bars"
  },
  {
    "id": "diet-meals",
    "name": "Diet Meals",
    "icon": "🍱",
    "color": "#B6FF3C",
    "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
    "subtitle": "Macro-counted bowls"
  },
  {
    "id": "fruits",
    "name": "Fruits",
    "icon": "🍎",
    "color": "#39FF6A",
    "image": "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&q=80",
    "subtitle": "Fresh seasonal produce"
  },
  {
    "id": "workout-products",
    "name": "Workout Products",
    "icon": "🏋️",
    "color": "#B6FF3C",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
    "subtitle": "Gears & gym essentials"
  }
];

export const products = [
  {
    "id": "wl-1",
    "name": "Gluten-Free Rolled Oats",
    "brand": "True Elements",
    "category": "weight-loss",
    "subCategory": "Oats & Cereals",
    "image": "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "100% whole grain rolled oats packed with soluble dietary fiber (beta-glucan) to promote satiety and help manage healthy cholesterol.",
    "ingredients": [
      "100% Whole Grain Rolled Oats"
    ],
    "rating": 4.8,
    "reviewCount": 742,
    "inStock": true,
    "tags": [
      "bestseller",
      "high-fiber",
      "sugar-free"
    ],
    "variants": [
      {
        "id": "wl-1-500g",
        "size": "500g",
        "flavor": "Natural Plain",
        "unit": "500g",
        "price": 179,
        "mrp": 225,
        "calories": 190,
        "protein": 7,
        "stock": 120
      },
      {
        "id": "wl-1-1kg",
        "size": "1kg",
        "flavor": "Natural Plain",
        "unit": "1kg",
        "price": 329,
        "mrp": 425,
        "calories": 190,
        "protein": 7,
        "stock": 95
      }
    ],
    "nutrition": {
      "calories": 380,
      "protein": 13,
      "carbs": 68,
      "fats": 7,
      "servingSize": "50g"
    }
  },
  {
    "id": "wl-2",
    "name": "Organic Steel Cut Oats",
    "brand": "Urban Platter",
    "category": "weight-loss",
    "subCategory": "Oats & Cereals",
    "image": "https://images.unsplash.com/photo-1614961233913-a5113a4a34ed?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1614961233913-a5113a4a34ed?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Minimally processed coarse-cut oat groats providing sustained energy, low glycemic response, and long-lasting fullness.",
    "ingredients": [
      "100% Organic Steel Cut Oat Groats"
    ],
    "rating": 4.7,
    "reviewCount": 512,
    "inStock": true,
    "tags": [
      "low-gi",
      "whole-grain"
    ],
    "variants": [
      {
        "id": "wl-2-500g",
        "size": "500g",
        "flavor": "Natural",
        "unit": "500g",
        "price": 219,
        "mrp": 275,
        "calories": 185,
        "protein": 6,
        "stock": 80
      },
      {
        "id": "wl-2-1kg",
        "size": "1kg",
        "flavor": "Natural",
        "unit": "1kg",
        "price": 399,
        "mrp": 499,
        "calories": 185,
        "protein": 6,
        "stock": 65
      }
    ],
    "nutrition": {
      "calories": 370,
      "protein": 12,
      "carbs": 66,
      "fats": 6.5,
      "servingSize": "50g"
    }
  },
  {
    "id": "wl-3",
    "name": "Royal White Quinoa Grain",
    "brand": "India Gate",
    "category": "weight-loss",
    "subCategory": "Superfoods",
    "image": "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "A complete plant-based protein superfood containing all 9 essential amino acids, fiber, and iron to power clean diet meals.",
    "ingredients": [
      "100% Raw White Quinoa Seeds"
    ],
    "rating": 4.8,
    "reviewCount": 680,
    "inStock": true,
    "tags": [
      "superfood",
      "gluten-free",
      "high-protein"
    ],
    "variants": [
      {
        "id": "wl-3-500g",
        "size": "500g",
        "flavor": "Natural",
        "unit": "500g",
        "price": 249,
        "mrp": 320,
        "calories": 180,
        "protein": 8,
        "stock": 90
      },
      {
        "id": "wl-3-1kg",
        "size": "1kg",
        "flavor": "Natural",
        "unit": "1kg",
        "price": 449,
        "mrp": 599,
        "calories": 180,
        "protein": 8,
        "stock": 55
      }
    ],
    "nutrition": {
      "calories": 368,
      "protein": 14,
      "carbs": 64,
      "fats": 6,
      "servingSize": "50g"
    }
  },
  {
    "id": "wl-4",
    "name": "Quick Cooking Brown Rice",
    "brand": "Daawat",
    "category": "weight-loss",
    "subCategory": "Healthy Grains",
    "image": "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Aromatic long-grain unpolished brown basmati rice retaining the bran layer for enhanced fiber and essential B-vitamins.",
    "ingredients": [
      "100% Unpolished Brown Basmati Rice"
    ],
    "rating": 4.6,
    "reviewCount": 430,
    "inStock": true,
    "tags": [
      "fiber-rich",
      "low-gi"
    ],
    "variants": [
      {
        "id": "wl-4-1kg",
        "size": "1kg",
        "flavor": "Original",
        "unit": "1kg",
        "price": 149,
        "mrp": 190,
        "calories": 170,
        "protein": 4,
        "stock": 150
      },
      {
        "id": "wl-4-5kg",
        "size": "5kg",
        "flavor": "Original",
        "unit": "5kg",
        "price": 679,
        "mrp": 890,
        "calories": 170,
        "protein": 4,
        "stock": 40
      }
    ],
    "nutrition": {
      "calories": 360,
      "protein": 8,
      "carbs": 77,
      "fats": 2.8,
      "servingSize": "50g"
    }
  },
  {
    "id": "wl-5",
    "name": "Classic Organic Green Tea (100 Bags)",
    "brand": "Organic India",
    "category": "weight-loss",
    "subCategory": "Detox Drinks",
    "image": "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Certified organic green tea leaves rich in antioxidant EGCG to boost basal metabolic rate and support active fat oxidation.",
    "ingredients": [
      "100% Certified Organic Camellia Sinensis Green Tea Leaves"
    ],
    "rating": 4.9,
    "reviewCount": 920,
    "inStock": true,
    "tags": [
      "bestseller",
      "antioxidant",
      "zero-calorie"
    ],
    "variants": [
      {
        "id": "wl-5-25bags",
        "size": "25 Bags",
        "flavor": "Classic Pure",
        "unit": "25 Tea Bags",
        "price": 185,
        "mrp": 220,
        "calories": 2,
        "protein": 0,
        "stock": 110
      },
      {
        "id": "wl-5-100bags",
        "size": "100 Bags",
        "flavor": "Classic Pure",
        "unit": "100 Tea Bags",
        "price": 479,
        "mrp": 595,
        "calories": 2,
        "protein": 0,
        "stock": 85
      }
    ],
    "nutrition": {
      "calories": 2,
      "protein": 0,
      "carbs": 0.2,
      "fats": 0,
      "servingSize": "1 Cup (200ml)"
    }
  },
  {
    "id": "wl-6",
    "name": "Kashmiri Kahwa Detox Herbal Green Tea",
    "brand": "Girnar",
    "category": "weight-loss",
    "subCategory": "Detox Drinks",
    "image": "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Traditional Himalayan spiced herbal green tea blended with saffron, green cardamom, cinnamon, clove, and crushed almonds for digestion.",
    "ingredients": [
      "Green Tea",
      "Cardamom",
      "Cinnamon",
      "Clove",
      "Saffron",
      "Almond Bits"
    ],
    "rating": 4.8,
    "reviewCount": 654,
    "inStock": true,
    "tags": [
      "herbal",
      "detox",
      "digestive"
    ],
    "variants": [
      {
        "id": "wl-6-36bags",
        "size": "36 Bags",
        "flavor": "Spiced Kahwa",
        "unit": "36 Tea Bags",
        "price": 340,
        "mrp": 390,
        "calories": 4,
        "protein": 0.2,
        "stock": 75
      },
      {
        "id": "wl-6-100g",
        "size": "100g Loose",
        "flavor": "Spiced Kahwa",
        "unit": "100g Jar",
        "price": 299,
        "mrp": 360,
        "calories": 4,
        "protein": 0.2,
        "stock": 60
      }
    ],
    "nutrition": {
      "calories": 5,
      "protein": 0.2,
      "carbs": 0.8,
      "fats": 0.1,
      "servingSize": "1 Cup (200ml)"
    }
  },
  {
    "id": "wl-7",
    "name": "Organic Sprouted Whole Moong",
    "brand": "Organic Tattva",
    "category": "weight-loss",
    "subCategory": "Healthy Grains",
    "image": "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Bio-activated sprouted green moong beans with enhanced enzymatic bioavailability, high dietary fiber, and clean plant protein.",
    "ingredients": [
      "100% Organic Sprouted Green Gram Moong"
    ],
    "rating": 4.6,
    "reviewCount": 310,
    "inStock": true,
    "tags": [
      "high-protein",
      "organic",
      "vegan"
    ],
    "variants": [
      {
        "id": "wl-7-500g",
        "size": "500g",
        "flavor": "Raw",
        "unit": "500g",
        "price": 125,
        "mrp": 155,
        "calories": 170,
        "protein": 12,
        "stock": 100
      },
      {
        "id": "wl-7-1kg",
        "size": "1kg",
        "flavor": "Raw",
        "unit": "1kg",
        "price": 235,
        "mrp": 295,
        "calories": 170,
        "protein": 12,
        "stock": 70
      }
    ],
    "nutrition": {
      "calories": 347,
      "protein": 24,
      "carbs": 60,
      "fats": 1.2,
      "servingSize": "50g"
    }
  },
  {
    "id": "wl-8",
    "name": "Zero Added Sugar Dark Chocolate Muesli",
    "brand": "Yogabar",
    "category": "weight-loss",
    "subCategory": "Oats & Cereals",
    "image": "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Crunchy multigrain flakes, premium roasted pumpkin seeds, chia seeds, and raw cocoa with zero artificial sweeteners or added sugar.",
    "ingredients": [
      "Rolled Oats",
      "Brown Rice Flakes",
      "Raw Cocoa",
      "Pumpkin Seeds",
      "Chia Seeds",
      "Almonds"
    ],
    "rating": 4.7,
    "reviewCount": 880,
    "inStock": true,
    "tags": [
      "sugar-free",
      "crunchy",
      "high-fiber"
    ],
    "variants": [
      {
        "id": "wl-8-400g",
        "size": "400g",
        "flavor": "Dark Chocolate & Cranberry",
        "unit": "400g",
        "price": 299,
        "mrp": 375,
        "calories": 175,
        "protein": 6,
        "stock": 95
      },
      {
        "id": "wl-8-850g",
        "size": "850g",
        "flavor": "Dark Chocolate & Cranberry",
        "unit": "850g",
        "price": 549,
        "mrp": 699,
        "calories": 175,
        "protein": 6,
        "stock": 50
      }
    ],
    "nutrition": {
      "calories": 420,
      "protein": 14,
      "carbs": 62,
      "fats": 12,
      "servingSize": "40g"
    }
  },
  {
    "id": "wl-9",
    "name": "Fresh Antioxidant Berry & Melon Fruit Bowl",
    "brand": "Pluckk",
    "category": "weight-loss",
    "subCategory": "Fresh Produce",
    "image": "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Daily fresh-cut bowl of low-calorie hydrating fruits including blueberries, watermelon, kiwi, and pomegranate with zero added sugar.",
    "ingredients": [
      "Fresh Watermelon",
      "Blueberries",
      "Kiwi Slices",
      "Pomegranate Seeds",
      "Mint Leaves"
    ],
    "rating": 4.8,
    "reviewCount": 420,
    "inStock": true,
    "tags": [
      "fresh",
      "hydrating",
      "low-calorie"
    ],
    "variants": [
      {
        "id": "wl-9-300g",
        "size": "300g Bowl",
        "flavor": "Fresh Mixed",
        "unit": "300g",
        "price": 149,
        "mrp": 199,
        "calories": 110,
        "protein": 2,
        "stock": 45
      },
      {
        "id": "wl-9-500g",
        "size": "500g Bowl",
        "flavor": "Fresh Mixed",
        "unit": "500g",
        "price": 229,
        "mrp": 299,
        "calories": 180,
        "protein": 3,
        "stock": 30
      }
    ],
    "nutrition": {
      "calories": 110,
      "protein": 2,
      "carbs": 26,
      "fats": 0.5,
      "servingSize": "300g"
    }
  },
  {
    "id": "wl-10",
    "name": "Mediterranean Garden Detox Salad Bowl",
    "brand": "Salad Days",
    "category": "weight-loss",
    "subCategory": "Fresh Produce",
    "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Crisp romaine lettuce, cherry tomatoes, cucumbers, bell peppers, kalamata olives, and feta cheese with lemon herb vinaigrette.",
    "ingredients": [
      "Romaine Lettuce",
      "Cherry Tomatoes",
      "English Cucumber",
      "Bell Peppers",
      "Black Olives",
      "Feta",
      "Lemon Herb Dressing"
    ],
    "rating": 4.7,
    "reviewCount": 390,
    "inStock": true,
    "tags": [
      "fresh",
      "keto-friendly",
      "low-carb"
    ],
    "variants": [
      {
        "id": "wl-10-350g",
        "size": "350g Bowl",
        "flavor": "Lemon Herb",
        "unit": "350g",
        "price": 199,
        "mrp": 260,
        "calories": 160,
        "protein": 5,
        "stock": 40
      },
      {
        "id": "wl-10-500g",
        "size": "500g Large",
        "flavor": "Lemon Herb",
        "unit": "500g",
        "price": 289,
        "mrp": 360,
        "calories": 230,
        "protein": 7,
        "stock": 25
      }
    ],
    "nutrition": {
      "calories": 160,
      "protein": 5,
      "carbs": 12,
      "fats": 10,
      "servingSize": "350g"
    }
  },
  {
    "id": "wl-11",
    "name": "Sugar Release Control Multigrain Atta",
    "brand": "Aashirvaad",
    "category": "weight-loss",
    "subCategory": "Healthy Grains",
    "image": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Clinically tested low glycemic index flour blend with oats, fenugreek (methi), psyllium husk, and soy to prevent post-meal sugar spikes.",
    "ingredients": [
      "Whole Wheat",
      "Oats",
      "Fenugreek",
      "Psyllium Husk",
      "Bengal Gram",
      "Soy"
    ],
    "rating": 4.8,
    "reviewCount": 890,
    "inStock": true,
    "tags": [
      "diabetic-friendly",
      "high-fiber",
      "low-gi"
    ],
    "variants": [
      {
        "id": "wl-11-1kg",
        "size": "1kg",
        "flavor": "Multigrain",
        "unit": "1kg",
        "price": 120,
        "mrp": 145,
        "calories": 165,
        "protein": 6,
        "stock": 120
      },
      {
        "id": "wl-11-5kg",
        "size": "5kg",
        "flavor": "Multigrain",
        "unit": "5kg",
        "price": 499,
        "mrp": 620,
        "calories": 165,
        "protein": 6,
        "stock": 65
      }
    ],
    "nutrition": {
      "calories": 355,
      "protein": 14.5,
      "carbs": 64,
      "fats": 2.6,
      "servingSize": "50g"
    }
  },
  {
    "id": "wl-12",
    "name": "Raw Organic White & Black Chia Seeds",
    "brand": "Neuherbs",
    "category": "weight-loss",
    "subCategory": "Superfoods",
    "image": "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Nutrient-dense powerhouse seeds providing plant Omega-3 ALA, gel-forming soluble fiber, calcium, and sustained appetite suppression.",
    "ingredients": [
      "100% Raw Chia Seeds (Salvia Hispanica)"
    ],
    "rating": 4.9,
    "reviewCount": 950,
    "inStock": true,
    "tags": [
      "omega-3",
      "superfood",
      "keto"
    ],
    "variants": [
      {
        "id": "wl-12-250g",
        "size": "250g",
        "flavor": "Natural",
        "unit": "250g",
        "price": 189,
        "mrp": 250,
        "calories": 140,
        "protein": 5,
        "stock": 140
      },
      {
        "id": "wl-12-500g",
        "size": "500g",
        "flavor": "Natural",
        "unit": "500g",
        "price": 349,
        "mrp": 480,
        "calories": 140,
        "protein": 5,
        "stock": 90
      }
    ],
    "nutrition": {
      "calories": 486,
      "protein": 17,
      "carbs": 42,
      "fats": 31,
      "servingSize": "30g"
    }
  },
  {
    "id": "wl-13",
    "name": "Slow Roasted Golden Flax Seeds",
    "brand": "True Elements",
    "category": "weight-loss",
    "subCategory": "Superfoods",
    "image": "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Crispy dry-roasted whole flax seeds rich in dietary lignans and heart-healthy alpha-linolenic fatty acids for metabolic balance.",
    "ingredients": [
      "100% Roasted Golden Flax Seeds"
    ],
    "rating": 4.7,
    "reviewCount": 620,
    "inStock": true,
    "tags": [
      "high-fiber",
      "heart-health",
      "vegan"
    ],
    "variants": [
      {
        "id": "wl-13-250g",
        "size": "250g",
        "flavor": "Roasted Plain",
        "unit": "250g",
        "price": 139,
        "mrp": 185,
        "calories": 150,
        "protein": 5,
        "stock": 110
      },
      {
        "id": "wl-13-500g",
        "size": "500g",
        "flavor": "Roasted Plain",
        "unit": "500g",
        "price": 249,
        "mrp": 350,
        "calories": 150,
        "protein": 5,
        "stock": 85
      }
    ],
    "nutrition": {
      "calories": 534,
      "protein": 18,
      "carbs": 29,
      "fats": 42,
      "servingSize": "30g"
    }
  },
  {
    "id": "wl-14",
    "name": "Cold-Pressed Lean Green Juice (Pack of 4)",
    "brand": "Raw Pressery",
    "category": "weight-loss",
    "subCategory": "Detox Drinks",
    "image": "https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "High Pressure Processed (HPP) raw green elixir made with celery, spinach, cucumber, green apple, ginger, and lemon with zero added sugar.",
    "ingredients": [
      "Spinach",
      "Cucumber",
      "Celery",
      "Green Apple",
      "Ginger",
      "Lemon"
    ],
    "rating": 4.8,
    "reviewCount": 540,
    "inStock": true,
    "tags": [
      "cold-pressed",
      "no-sugar-added",
      "detox"
    ],
    "variants": [
      {
        "id": "wl-14-250ml",
        "size": "250ml x 1",
        "flavor": "Lean Green",
        "unit": "250ml Bottle",
        "price": 120,
        "mrp": 140,
        "calories": 55,
        "protein": 1.5,
        "stock": 60
      },
      {
        "id": "wl-14-pack4",
        "size": "250ml x 4",
        "flavor": "Lean Green",
        "unit": "Pack of 4 Bottles",
        "price": 449,
        "mrp": 560,
        "calories": 55,
        "protein": 1.5,
        "stock": 35
      }
    ],
    "nutrition": {
      "calories": 55,
      "protein": 1.5,
      "carbs": 12,
      "fats": 0.2,
      "servingSize": "250ml"
    }
  },
  {
    "id": "wg-1",
    "name": "All-Natural Crunchy Peanut Butter",
    "brand": "Pintola",
    "category": "weight-gain",
    "subCategory": "Peanut Butter & Spreads",
    "price": 425,
    "originalPrice": 549,
    "image": "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "100% roasted bold peanuts providing 30g protein per 100g with zero added sugar, hydrogenated oils, or trans fats for healthy caloric surplus.",
    "ingredients": [
      "100% Roasted Peanuts"
    ],
    "rating": 4.8,
    "reviewCount": 1420,
    "inStock": true,
    "tags": [
      "bestseller",
      "high-protein",
      "zero-sugar"
    ],
    "variants": [
      {
        "id": "wg-1-1kg",
        "size": "1kg",
        "flavor": "Crunchy",
        "unit": "1kg",
        "price": 425,
        "mrp": 549,
        "calories": 625,
        "protein": 30,
        "stock": 150
      },
      {
        "id": "wg-1-2.5kg",
        "size": "2.5kg",
        "flavor": "Crunchy",
        "unit": "2.5kg",
        "price": 999,
        "mrp": 1299,
        "calories": 625,
        "protein": 30,
        "stock": 75
      }
    ],
    "nutrition": {
      "calories": 625,
      "protein": 30,
      "carbs": 18,
      "fats": 48,
      "servingSize": "32g"
    }
  },
  {
    "id": "wg-2",
    "name": "High Protein Dark Chocolate Peanut Butter",
    "brand": "Alpino",
    "category": "weight-gain",
    "subCategory": "Peanut Butter & Spreads",
    "price": 499,
    "originalPrice": 649,
    "image": "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Crafted with roasted peanuts, imported cocoa, and whey protein isolate delivering 30g protein and clean fats for muscle mass.",
    "ingredients": [
      "Roasted Peanuts",
      "Whey Protein Isolate",
      "Dark Cocoa",
      "Brown Sugar"
    ],
    "rating": 4.7,
    "reviewCount": 890,
    "inStock": true,
    "tags": [
      "high-protein",
      "whey-infused",
      "gourmet-choco"
    ],
    "variants": [
      {
        "id": "wg-2-1kg",
        "size": "1kg",
        "flavor": "Dark Chocolate Super Crunch",
        "unit": "1kg",
        "price": 499,
        "mrp": 649,
        "calories": 610,
        "protein": 30,
        "stock": 120
      },
      {
        "id": "wg-2-500g",
        "size": "500g",
        "flavor": "Dark Chocolate Smooth",
        "unit": "500g",
        "price": 289,
        "mrp": 375,
        "calories": 610,
        "protein": 30,
        "stock": 90
      }
    ],
    "nutrition": {
      "calories": 610,
      "protein": 30,
      "carbs": 22,
      "fats": 45,
      "servingSize": "32g"
    }
  },
  {
    "id": "wg-3",
    "name": "Super Gainer XXL High Calorie Mass Gainer",
    "brand": "MuscleBlaze",
    "category": "weight-gain",
    "subCategory": "Mass Gainers",
    "price": 2299,
    "originalPrice": 3599,
    "image": "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "High calorie mass gainer formulated with a 1:5 protein to carb ratio, enriched with 27 vital vitamins and minerals for bulk muscle gains.",
    "ingredients": [
      "Maltodextrin",
      "Whey Protein Concentrate",
      "Cocoa",
      "Digestive Enzymes (DigeZyme)",
      "Micronutrient Blend"
    ],
    "rating": 4.8,
    "reviewCount": 3150,
    "inStock": true,
    "tags": [
      "bestseller",
      "hardgainer-formula",
      "digezyme"
    ],
    "variants": [
      {
        "id": "wg-3-3kg-choco",
        "size": "3kg",
        "flavor": "Chocolate",
        "unit": "3kg",
        "price": 2299,
        "mrp": 3599,
        "calories": 1125,
        "protein": 45,
        "stock": 110
      },
      {
        "id": "wg-3-5kg-choco",
        "size": "5kg",
        "flavor": "Chocolate",
        "unit": "5kg",
        "price": 3499,
        "mrp": 5499,
        "calories": 1125,
        "protein": 45,
        "stock": 60
      }
    ],
    "nutrition": {
      "calories": 1125,
      "protein": 45,
      "carbs": 225,
      "fats": 6,
      "servingSize": "100g"
    }
  },
  {
    "id": "wg-4",
    "name": "Serious Mass High Protein Weight Gainer",
    "brand": "Optimum Nutrition",
    "category": "weight-gain",
    "subCategory": "Mass Gainers",
    "price": 3199,
    "originalPrice": 4499,
    "image": "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "The ultimate weight gain formula packing 50g blended protein, 250g+ energizing carbs, creatine monohydrate and glutamine per serving.",
    "ingredients": [
      "Maltodextrin",
      "Protein Blend (Whey Concentrate, Calcium Caseinate, Egg Albumen)",
      "Creatine Monohydrate",
      "L-Glutamine"
    ],
    "rating": 4.9,
    "reviewCount": 2780,
    "inStock": true,
    "tags": [
      "international-gold-standard",
      "high-calorie",
      "creatine-boosted"
    ],
    "variants": [
      {
        "id": "wg-4-3kg-choco",
        "size": "3kg",
        "flavor": "Rich Chocolate",
        "unit": "3kg",
        "price": 3199,
        "mrp": 4499,
        "calories": 1250,
        "protein": 50,
        "stock": 85
      },
      {
        "id": "wg-4-1.36kg-vanilla",
        "size": "1.36kg",
        "flavor": "Vanilla",
        "unit": "1.36kg",
        "price": 1799,
        "mrp": 2499,
        "calories": 1250,
        "protein": 50,
        "stock": 65
      }
    ],
    "nutrition": {
      "calories": 1250,
      "protein": 50,
      "carbs": 252,
      "fats": 4.5,
      "servingSize": "100g"
    }
  },
  {
    "id": "wg-5",
    "name": "Roasted California Almonds & Cashews Mix",
    "brand": "Happilo",
    "category": "weight-gain",
    "subCategory": "Dry Fruits & Healthy Fats",
    "price": 499,
    "originalPrice": 675,
    "image": "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Premium jumbo California almonds and whole cashews slow-roasted to perfection, delivering clean dense calories and healthy fats.",
    "ingredients": [
      "Roasted California Almonds (50%)",
      "Whole Cashews (50%)"
    ],
    "rating": 4.8,
    "reviewCount": 940,
    "inStock": true,
    "tags": [
      "healthy-fats",
      "omega-dense",
      "zero-preservatives"
    ],
    "variants": [
      {
        "id": "wg-5-500g",
        "size": "500g",
        "flavor": "Natural Roasted",
        "unit": "500g",
        "price": 499,
        "mrp": 675,
        "calories": 590,
        "protein": 21,
        "stock": 140
      },
      {
        "id": "wg-5-1kg",
        "size": "1kg",
        "flavor": "Natural Roasted",
        "unit": "1kg",
        "price": 949,
        "mrp": 1299,
        "calories": 590,
        "protein": 21,
        "stock": 80
      }
    ],
    "nutrition": {
      "calories": 590,
      "protein": 21,
      "carbs": 24,
      "fats": 49,
      "servingSize": "40g"
    }
  },
  {
    "id": "wg-6",
    "name": "Pure Traditional Desi Cow Ghee",
    "brand": "Tata Sampann",
    "category": "weight-gain",
    "subCategory": "Healthy Fats & Oils",
    "price": 699,
    "originalPrice": 850,
    "image": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Aromatic pure cow ghee prepared using traditional methods, rich in short and medium chain fatty acids for healthy digestion and natural mass building.",
    "ingredients": [
      "100% Pure Milk Fat (Cow Milk Ghee)"
    ],
    "rating": 4.9,
    "reviewCount": 1120,
    "inStock": true,
    "tags": [
      "pure-desi-ghee",
      "ayurvedic-fat",
      "aromatic"
    ],
    "variants": [
      {
        "id": "wg-6-1L",
        "size": "1L",
        "flavor": "Original Aroma",
        "unit": "1L",
        "price": 699,
        "mrp": 850,
        "calories": 900,
        "protein": 0,
        "stock": 100
      },
      {
        "id": "wg-6-500ml",
        "size": "500ml",
        "flavor": "Original Aroma",
        "unit": "500ml",
        "price": 369,
        "mrp": 450,
        "calories": 900,
        "protein": 0,
        "stock": 90
      }
    ],
    "nutrition": {
      "calories": 900,
      "protein": 0,
      "carbs": 0,
      "fats": 100,
      "servingSize": "15ml"
    }
  },
  {
    "id": "wg-7",
    "name": "Muscle Mass Gainer High Calorie Powder",
    "brand": "Labrada",
    "category": "weight-gain",
    "subCategory": "Mass Gainers",
    "price": 3299,
    "originalPrice": 4699,
    "image": "https://images.unsplash.com/photo-1546483875-ad9014c88eba?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1546483875-ad9014c88eba?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Anabolic mass gainer delivering 52g protein, 250g complex carbohydrates, and 1240 calories to help build thick muscle density.",
    "ingredients": [
      "Cross-flow Micro Ultra-Filtered Whey Protein Concentrate",
      "Maltodextrin",
      "Dutch Cocoa",
      "MCT Oil Powder"
    ],
    "rating": 4.8,
    "reviewCount": 1870,
    "inStock": true,
    "tags": [
      "hardcore-builder",
      "leee-labrada",
      "ultra-filtered"
    ],
    "variants": [
      {
        "id": "wg-7-3kg-choco",
        "size": "3kg",
        "flavor": "Gourmet Chocolate",
        "unit": "3kg",
        "price": 3299,
        "mrp": 4699,
        "calories": 1240,
        "protein": 52,
        "stock": 95
      },
      {
        "id": "wg-7-1kg-kulfi",
        "size": "1kg",
        "flavor": "Royal Kulfi",
        "unit": "1kg",
        "price": 1399,
        "mrp": 1999,
        "calories": 1240,
        "protein": 52,
        "stock": 70
      }
    ],
    "nutrition": {
      "calories": 1240,
      "protein": 52,
      "carbs": 250,
      "fats": 5,
      "servingSize": "100g"
    }
  },
  {
    "id": "wg-8",
    "name": "Crispy Chocolate Peanut Butter",
    "brand": "MyFitness",
    "category": "weight-gain",
    "subCategory": "Peanut Butter & Spreads",
    "price": 599,
    "originalPrice": 749,
    "image": "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Delicious crispy peanut butter made with premium grade roasted peanuts, Belgian dark chocolate and crispy rice balls for high calorie snacks.",
    "ingredients": [
      "Roasted Peanuts (80%)",
      "Dark Chocolate",
      "Rice Crispies",
      "Brown Sugar",
      "Pink Himalayan Salt"
    ],
    "rating": 4.9,
    "reviewCount": 3890,
    "inStock": true,
    "tags": [
      "celebrity-choice",
      "crispy-texture",
      "rich-cocoa"
    ],
    "variants": [
      {
        "id": "wg-8-1.25kg",
        "size": "1.25kg",
        "flavor": "Crispy Chocolate",
        "unit": "1.25kg",
        "price": 599,
        "mrp": 749,
        "calories": 605,
        "protein": 26,
        "stock": 200
      },
      {
        "id": "wg-8-510g",
        "size": "510g",
        "flavor": "Crispy Chocolate",
        "unit": "510g",
        "price": 299,
        "mrp": 399,
        "calories": 605,
        "protein": 26,
        "stock": 120
      }
    ],
    "nutrition": {
      "calories": 605,
      "protein": 26,
      "carbs": 28,
      "fats": 44,
      "servingSize": "32g"
    }
  },
  {
    "id": "wg-9",
    "name": "CreAMP Micronized Creatine Monohydrate",
    "brand": "MuscleBlaze",
    "category": "weight-gain",
    "subCategory": "Muscle & Mass Boosters",
    "price": 699,
    "originalPrice": 999,
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "100% pure CreAMP micronized creatine monohydrate to enhance intracellular hydration, ATP regeneration, and explosive muscle volume.",
    "ingredients": [
      "100% Micronized Creatine Monohydrate (CreAMP)"
    ],
    "rating": 4.9,
    "reviewCount": 4210,
    "inStock": true,
    "tags": [
      "bestseller",
      "labdoor-certified",
      "unflavored"
    ],
    "variants": [
      {
        "id": "wg-9-250g",
        "size": "250g",
        "flavor": "Unflavored",
        "unit": "250g",
        "price": 699,
        "mrp": 999,
        "calories": 0,
        "protein": 0,
        "stock": 180
      },
      {
        "id": "wg-9-100g",
        "size": "100g",
        "flavor": "Unflavored",
        "unit": "100g",
        "price": 349,
        "mrp": 499,
        "calories": 0,
        "protein": 0,
        "stock": 130
      }
    ],
    "nutrition": {
      "calories": 0,
      "protein": 0,
      "carbs": 0,
      "fats": 0,
      "servingSize": "3g"
    }
  },
  {
    "id": "wg-10",
    "name": "Organic Whole Milk Malai Paneer",
    "brand": "Akshayakalpa",
    "category": "weight-gain",
    "subCategory": "High Calorie Dairy",
    "price": 235,
    "originalPrice": 260,
    "image": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Farm-fresh organic whole milk paneer offering dense casein protein and healthy fats for sustained overnight muscle growth and mass.",
    "ingredients": [
      "Organic Whole Cow Milk",
      "Organic Lemon Juice/Curd"
    ],
    "rating": 4.8,
    "reviewCount": 520,
    "inStock": true,
    "tags": [
      "organic",
      "fresh-dairy",
      "slow-release-casein"
    ],
    "variants": [
      {
        "id": "wg-10-400g",
        "size": "400g",
        "flavor": "Fresh Organic",
        "unit": "400g",
        "price": 235,
        "mrp": 260,
        "calories": 295,
        "protein": 18,
        "stock": 80
      },
      {
        "id": "wg-10-200g",
        "size": "200g",
        "flavor": "Fresh Organic",
        "unit": "200g",
        "price": 125,
        "mrp": 140,
        "calories": 295,
        "protein": 18,
        "stock": 100
      }
    ],
    "nutrition": {
      "calories": 295,
      "protein": 18,
      "carbs": 2.5,
      "fats": 23,
      "servingSize": "100g"
    }
  },
  {
    "id": "wg-11",
    "name": "Royal Arabian Seedless Dates (Khajoor)",
    "brand": "Nutraj",
    "category": "weight-gain",
    "subCategory": "Energy & Dry Fruits",
    "price": 249,
    "originalPrice": 349,
    "image": "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Natural soft Arabian seedless dates rich in glucose, fructose, potassium and iron to easily fuel high-calorie weight gain shakes.",
    "ingredients": [
      "100% Natural Arabian Seedless Dates"
    ],
    "rating": 4.8,
    "reviewCount": 860,
    "inStock": true,
    "tags": [
      "natural-energy",
      "rich-in-iron",
      "pre-workout-fuel"
    ],
    "variants": [
      {
        "id": "wg-11-500g",
        "size": "500g",
        "flavor": "Natural Sweet",
        "unit": "500g",
        "price": 249,
        "mrp": 349,
        "calories": 282,
        "protein": 2.5,
        "stock": 140
      },
      {
        "id": "wg-11-1kg",
        "size": "1kg",
        "flavor": "Natural Sweet",
        "unit": "1kg",
        "price": 469,
        "mrp": 649,
        "calories": 282,
        "protein": 2.5,
        "stock": 95
      }
    ],
    "nutrition": {
      "calories": 282,
      "protein": 2.5,
      "carbs": 75,
      "fats": 0.4,
      "servingSize": "50g"
    }
  },
  {
    "id": "wg-12",
    "name": "Super Mass Gainer Protein Powder",
    "brand": "Dymatize",
    "category": "weight-gain",
    "subCategory": "Mass Gainers",
    "price": 3799,
    "originalPrice": 5299,
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Formulated with 52g fast and slow digesting proteins, 10.9g BCAAs and 1280 calories per serving for serious muscle growth.",
    "ingredients": [
      "Maltodextrin",
      "Protein Blend (Whey Isolate, Whey Hydrolysate, Micellar Casein)",
      "Sunflower Creamer",
      "Cocoa"
    ],
    "rating": 4.9,
    "reviewCount": 1650,
    "inStock": true,
    "tags": [
      "premium-us-import",
      "bcaa-rich",
      "gourmet-taste"
    ],
    "variants": [
      {
        "id": "wg-12-2.7kg-choco",
        "size": "2.7kg",
        "flavor": "Rich Chocolate",
        "unit": "2.7kg",
        "price": 3799,
        "mrp": 5299,
        "calories": 1280,
        "protein": 52,
        "stock": 65
      },
      {
        "id": "wg-12-5.4kg-vanilla",
        "size": "5.4kg",
        "flavor": "Gourmet Vanilla",
        "unit": "5.4kg",
        "price": 6899,
        "mrp": 9499,
        "calories": 1280,
        "protein": 52,
        "stock": 35
      }
    ],
    "nutrition": {
      "calories": 1280,
      "protein": 52,
      "carbs": 246,
      "fats": 9,
      "servingSize": "100g"
    }
  },
  {
    "id": "wg-13",
    "name": "Gold Full Cream UHT Milk Carton (12 x 1L)",
    "brand": "Amul",
    "category": "weight-gain",
    "subCategory": "High Calorie Dairy",
    "price": 840,
    "originalPrice": 900,
    "image": "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Homogenized standard full cream milk with 6% fat and 9% SNF, providing bioavailable calcium, vitamins A & D, and high calories for mass shakes.",
    "ingredients": [
      "Standardised Whole Milk",
      "Vitamin A & D Fortification"
    ],
    "rating": 4.8,
    "reviewCount": 2100,
    "inStock": true,
    "tags": [
      "full-cream",
      "uht-carton",
      "calcium-rich"
    ],
    "variants": [
      {
        "id": "wg-13-12x1L",
        "size": "12 x 1L",
        "flavor": "Pure Milk",
        "unit": "12L",
        "price": 840,
        "mrp": 900,
        "calories": 88,
        "protein": 3.5,
        "stock": 50
      },
      {
        "id": "wg-13-6x1L",
        "size": "6 x 1L",
        "flavor": "Pure Milk",
        "unit": "6L",
        "price": 430,
        "mrp": 460,
        "calories": 88,
        "protein": 3.5,
        "stock": 75
      }
    ],
    "nutrition": {
      "calories": 88,
      "protein": 3.5,
      "carbs": 5,
      "fats": 6,
      "servingSize": "100ml"
    }
  },
  {
    "id": "wg-14",
    "name": "Dark Chocolate Peanut Butter (No Added Sugar)",
    "brand": "The Whole Truth",
    "category": "weight-gain",
    "subCategory": "Peanut Butter & Spreads",
    "price": 549,
    "originalPrice": 699,
    "image": "https://images.unsplash.com/photo-1607897225703-b3b1e4c63063?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1607897225703-b3b1e4c63063?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Made with only 3 real ingredients: slow-roasted peanuts, raw cacao nibs, and organic dates. 100% clean calorie density with zero emulsifiers.",
    "ingredients": [
      "Roasted Peanuts (80%)",
      "Raw Cacao (12%)",
      "Dates (8%)"
    ],
    "rating": 4.9,
    "reviewCount": 1540,
    "inStock": true,
    "tags": [
      "clean-label",
      "no-added-sugar",
      "vegan"
    ],
    "variants": [
      {
        "id": "wg-14-1kg",
        "size": "1kg",
        "flavor": "Dark Chocolate",
        "unit": "1kg",
        "price": 549,
        "mrp": 699,
        "calories": 598,
        "protein": 26,
        "stock": 110
      },
      {
        "id": "wg-14-500g",
        "size": "500g",
        "flavor": "Dark Chocolate",
        "unit": "500g",
        "price": 299,
        "mrp": 375,
        "calories": 598,
        "protein": 26,
        "stock": 85
      }
    ],
    "nutrition": {
      "calories": 598,
      "protein": 26,
      "carbs": 24,
      "fats": 46,
      "servingSize": "32g"
    }
  },
  {
    "id": "fm-1",
    "name": "Boiled Egg Meal",
    "category": "fitness-maintenance",
    "image": "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=500&q=80",
    "description": "Freshly prepared boiled egg meal, portioned and balanced for a satisfying, goal-friendly meal.",
    "ingredients": [
      "Boiled Egg Meal"
    ],
    "rating": 4.9,
    "reviewCount": 689,
    "tags": [],
    "variants": [
      {
        "id": "regular",
        "size": "Regular",
        "flavor": null,
        "unit": "1 box",
        "price": 89,
        "mrp": 124,
        "calories": 220,
        "protein": 18,
        "stock": 37
      },
      {
        "id": "large",
        "size": "Large",
        "flavor": null,
        "unit": "1 large box",
        "price": 119,
        "mrp": 158,
        "calories": 220,
        "protein": 18,
        "stock": 77
      },
      {
        "id": "family-pack",
        "size": "Family Pack",
        "flavor": null,
        "unit": "Family pack (3 boxes)",
        "price": 219,
        "mrp": 292,
        "calories": 220,
        "protein": 18,
        "stock": 45
      },
      {
        "id": "combo-pack",
        "size": "Combo Pack",
        "flavor": null,
        "unit": "Combo (2 boxes)",
        "price": 159,
        "mrp": 209,
        "calories": 220,
        "protein": 18,
        "stock": 44
      }
    ]
  },
  {
    "id": "fm-2",
    "name": "Egg White Bowl",
    "category": "fitness-maintenance",
    "image": "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=500&q=80",
    "description": "Freshly prepared egg white bowl, portioned and balanced for a satisfying, goal-friendly meal.",
    "ingredients": [
      "Egg White Bowl"
    ],
    "rating": 4.4,
    "reviewCount": 375,
    "tags": [],
    "variants": [
      {
        "id": "regular",
        "size": "Regular",
        "flavor": null,
        "unit": "1 box",
        "price": 179,
        "mrp": 209,
        "calories": 260,
        "protein": 28,
        "stock": 23
      },
      {
        "id": "large",
        "size": "Large",
        "flavor": null,
        "unit": "1 large box",
        "price": 239,
        "mrp": 273,
        "calories": 260,
        "protein": 28,
        "stock": 108
      },
      {
        "id": "family-pack",
        "size": "Family Pack",
        "flavor": null,
        "unit": "Family pack (3 boxes)",
        "price": 449,
        "mrp": 526,
        "calories": 260,
        "protein": 28,
        "stock": 34
      },
      {
        "id": "combo-pack",
        "size": "Combo Pack",
        "flavor": null,
        "unit": "Combo (2 boxes)",
        "price": 319,
        "mrp": 430,
        "calories": 260,
        "protein": 28,
        "stock": 83
      }
    ]
  },
  {
    "id": "fm-3",
    "name": "Greek Yogurt Cup",
    "category": "fitness-maintenance",
    "image": "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality greek yogurt cup, carefully sourced and packed fresh to support your daily nutrition goals.",
    "ingredients": [
      "Greek Yogurt Cup"
    ],
    "rating": 4.7,
    "reviewCount": 807,
    "tags": [],
    "variants": [
      {
        "id": "250g-plain",
        "size": "250g",
        "flavor": "Plain",
        "unit": "250g",
        "price": 129,
        "mrp": 176,
        "calories": 120,
        "protein": 12,
        "stock": 46
      },
      {
        "id": "250g-honey",
        "size": "250g",
        "flavor": "Honey",
        "unit": "250g",
        "price": 139,
        "mrp": 194,
        "calories": 120,
        "protein": 12,
        "stock": 48
      },
      {
        "id": "250g-mixed-berry",
        "size": "250g",
        "flavor": "Mixed Berry",
        "unit": "250g",
        "price": 129,
        "mrp": 150,
        "calories": 120,
        "protein": 12,
        "stock": 23
      },
      {
        "id": "250g-mango",
        "size": "250g",
        "flavor": "Mango",
        "unit": "250g",
        "price": 129,
        "mrp": 157,
        "calories": 120,
        "protein": 12,
        "stock": 57
      },
      {
        "id": "500g-plain",
        "size": "500g",
        "flavor": "Plain",
        "unit": "500g",
        "price": 229,
        "mrp": 260,
        "calories": 120,
        "protein": 12,
        "stock": 59
      },
      {
        "id": "500g-honey",
        "size": "500g",
        "flavor": "Honey",
        "unit": "500g",
        "price": 209,
        "mrp": 263,
        "calories": 120,
        "protein": 12,
        "stock": 49
      },
      {
        "id": "500g-mixed-berry",
        "size": "500g",
        "flavor": "Mixed Berry",
        "unit": "500g",
        "price": 219,
        "mrp": 302,
        "calories": 120,
        "protein": 12,
        "stock": 103
      },
      {
        "id": "500g-mango",
        "size": "500g",
        "flavor": "Mango",
        "unit": "500g",
        "price": 229,
        "mrp": 277,
        "calories": 120,
        "protein": 12,
        "stock": 45
      },
      {
        "id": "1kg-plain",
        "size": "1kg",
        "flavor": "Plain",
        "unit": "1kg",
        "price": 409,
        "mrp": 554,
        "calories": 120,
        "protein": 12,
        "stock": 63
      },
      {
        "id": "1kg-honey",
        "size": "1kg",
        "flavor": "Honey",
        "unit": "1kg",
        "price": 419,
        "mrp": 579,
        "calories": 120,
        "protein": 12,
        "stock": 112
      },
      {
        "id": "1kg-mixed-berry",
        "size": "1kg",
        "flavor": "Mixed Berry",
        "unit": "1kg",
        "price": 429,
        "mrp": 497,
        "calories": 120,
        "protein": 12,
        "stock": 43
      },
      {
        "id": "1kg-mango",
        "size": "1kg",
        "flavor": "Mango",
        "unit": "1kg",
        "price": 409,
        "mrp": 516,
        "calories": 120,
        "protein": 12,
        "stock": 99
      },
      {
        "id": "2kg-plain",
        "size": "2kg",
        "flavor": "Plain",
        "unit": "2kg",
        "price": 749,
        "mrp": 987,
        "calories": 120,
        "protein": 12,
        "stock": 15
      },
      {
        "id": "2kg-honey",
        "size": "2kg",
        "flavor": "Honey",
        "unit": "2kg",
        "price": 769,
        "mrp": 1041,
        "calories": 120,
        "protein": 12,
        "stock": 86
      },
      {
        "id": "2kg-mixed-berry",
        "size": "2kg",
        "flavor": "Mixed Berry",
        "unit": "2kg",
        "price": 729,
        "mrp": 986,
        "calories": 120,
        "protein": 12,
        "stock": 87
      },
      {
        "id": "2kg-mango",
        "size": "2kg",
        "flavor": "Mango",
        "unit": "2kg",
        "price": 749,
        "mrp": 961,
        "calories": 120,
        "protein": 12,
        "stock": 57
      }
    ]
  },
  {
    "id": "fm-4",
    "name": "Balanced Grain Bowl",
    "category": "fitness-maintenance",
    "image": "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=500&q=80",
    "description": "Freshly prepared balanced grain bowl, portioned and balanced for a satisfying, goal-friendly meal.",
    "ingredients": [
      "Balanced Grain Bowl"
    ],
    "rating": 5,
    "reviewCount": 502,
    "tags": [
      "trending"
    ],
    "variants": [
      {
        "id": "regular",
        "size": "Regular",
        "flavor": null,
        "unit": "1 box",
        "price": 199,
        "mrp": 231,
        "calories": 360,
        "protein": 15,
        "stock": 62
      },
      {
        "id": "large",
        "size": "Large",
        "flavor": null,
        "unit": "1 large box",
        "price": 269,
        "mrp": 369,
        "calories": 360,
        "protein": 15,
        "stock": 64
      },
      {
        "id": "family-pack",
        "size": "Family Pack",
        "flavor": null,
        "unit": "Family pack (3 boxes)",
        "price": 499,
        "mrp": 587,
        "calories": 360,
        "protein": 15,
        "stock": 29
      },
      {
        "id": "combo-pack",
        "size": "Combo Pack",
        "flavor": null,
        "unit": "Combo (2 boxes)",
        "price": 359,
        "mrp": 481,
        "calories": 360,
        "protein": 15,
        "stock": 60
      }
    ]
  },
  {
    "id": "fm-5",
    "name": "Berry Smoothie",
    "category": "fitness-maintenance",
    "image": "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=500&q=80",
    "description": "Refreshing berry smoothie, ready to drink and packed with nutrients for your active lifestyle.",
    "ingredients": [
      "Berry Smoothie"
    ],
    "rating": 4.4,
    "reviewCount": 364,
    "tags": [
      "bestseller"
    ],
    "variants": [
      {
        "id": "250ml",
        "size": "250ml",
        "flavor": null,
        "unit": "250ml",
        "price": 89,
        "mrp": 113,
        "calories": 210,
        "protein": 6,
        "stock": 104
      },
      {
        "id": "500ml",
        "size": "500ml",
        "flavor": null,
        "unit": "500ml",
        "price": 149,
        "mrp": 170,
        "calories": 210,
        "protein": 6,
        "stock": 116
      },
      {
        "id": "1l",
        "size": "1L",
        "flavor": null,
        "unit": "1L",
        "price": 269,
        "mrp": 313,
        "calories": 210,
        "protein": 6,
        "stock": 109
      },
      {
        "id": "6-x-250ml",
        "size": "6 x 250ml",
        "flavor": null,
        "unit": "6 x 250ml",
        "price": 769,
        "mrp": 881,
        "calories": 210,
        "protein": 6,
        "stock": 49
      }
    ]
  },
  {
    "id": "fm-6",
    "name": "Green Smoothie",
    "category": "fitness-maintenance",
    "image": "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=500&q=80",
    "description": "Refreshing green smoothie, ready to drink and packed with nutrients for your active lifestyle.",
    "ingredients": [
      "Green Smoothie"
    ],
    "rating": 4.2,
    "reviewCount": 882,
    "tags": [],
    "variants": [
      {
        "id": "250ml",
        "size": "250ml",
        "flavor": null,
        "unit": "250ml",
        "price": 79,
        "mrp": 106,
        "calories": 150,
        "protein": 4,
        "stock": 112
      },
      {
        "id": "500ml",
        "size": "500ml",
        "flavor": null,
        "unit": "500ml",
        "price": 139,
        "mrp": 163,
        "calories": 150,
        "protein": 4,
        "stock": 111
      },
      {
        "id": "1l",
        "size": "1L",
        "flavor": null,
        "unit": "1L",
        "price": 249,
        "mrp": 347,
        "calories": 150,
        "protein": 4,
        "stock": 118
      },
      {
        "id": "6-x-250ml",
        "size": "6 x 250ml",
        "flavor": null,
        "unit": "6 x 250ml",
        "price": 719,
        "mrp": 838,
        "calories": 150,
        "protein": 4,
        "stock": 115
      }
    ]
  },
  {
    "id": "fm-7",
    "name": "Roasted Makhana",
    "category": "fitness-maintenance",
    "image": "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality roasted makhana, carefully sourced and packed fresh to support your daily nutrition goals.",
    "ingredients": [
      "Roasted Makhana"
    ],
    "rating": 4.3,
    "reviewCount": 542,
    "tags": [
      "new"
    ],
    "variants": [
      {
        "id": "250g-classic-salted",
        "size": "250g",
        "flavor": "Classic Salted",
        "unit": "250g",
        "price": 119,
        "mrp": 141,
        "calories": 130,
        "protein": 4,
        "stock": 30
      },
      {
        "id": "250g-peri-peri",
        "size": "250g",
        "flavor": "Peri Peri",
        "unit": "250g",
        "price": 119,
        "mrp": 155,
        "calories": 130,
        "protein": 4,
        "stock": 46
      },
      {
        "id": "250g-cheese",
        "size": "250g",
        "flavor": "Cheese",
        "unit": "250g",
        "price": 119,
        "mrp": 145,
        "calories": 130,
        "protein": 4,
        "stock": 91
      },
      {
        "id": "250g-pudina",
        "size": "250g",
        "flavor": "Pudina",
        "unit": "250g",
        "price": 119,
        "mrp": 150,
        "calories": 130,
        "protein": 4,
        "stock": 35
      },
      {
        "id": "500g-classic-salted",
        "size": "500g",
        "flavor": "Classic Salted",
        "unit": "500g",
        "price": 199,
        "mrp": 255,
        "calories": 130,
        "protein": 4,
        "stock": 46
      },
      {
        "id": "500g-peri-peri",
        "size": "500g",
        "flavor": "Peri Peri",
        "unit": "500g",
        "price": 189,
        "mrp": 216,
        "calories": 130,
        "protein": 4,
        "stock": 80
      },
      {
        "id": "500g-cheese",
        "size": "500g",
        "flavor": "Cheese",
        "unit": "500g",
        "price": 199,
        "mrp": 228,
        "calories": 130,
        "protein": 4,
        "stock": 62
      },
      {
        "id": "500g-pudina",
        "size": "500g",
        "flavor": "Pudina",
        "unit": "500g",
        "price": 199,
        "mrp": 238,
        "calories": 130,
        "protein": 4,
        "stock": 46
      },
      {
        "id": "1kg-classic-salted",
        "size": "1kg",
        "flavor": "Classic Salted",
        "unit": "1kg",
        "price": 369,
        "mrp": 486,
        "calories": 130,
        "protein": 4,
        "stock": 114
      },
      {
        "id": "1kg-peri-peri",
        "size": "1kg",
        "flavor": "Peri Peri",
        "unit": "1kg",
        "price": 379,
        "mrp": 459,
        "calories": 130,
        "protein": 4,
        "stock": 41
      },
      {
        "id": "1kg-cheese",
        "size": "1kg",
        "flavor": "Cheese",
        "unit": "1kg",
        "price": 389,
        "mrp": 442,
        "calories": 130,
        "protein": 4,
        "stock": 80
      },
      {
        "id": "1kg-pudina",
        "size": "1kg",
        "flavor": "Pudina",
        "unit": "1kg",
        "price": 369,
        "mrp": 468,
        "calories": 130,
        "protein": 4,
        "stock": 18
      },
      {
        "id": "2kg-classic-salted",
        "size": "2kg",
        "flavor": "Classic Salted",
        "unit": "2kg",
        "price": 679,
        "mrp": 867,
        "calories": 130,
        "protein": 4,
        "stock": 114
      },
      {
        "id": "2kg-peri-peri",
        "size": "2kg",
        "flavor": "Peri Peri",
        "unit": "2kg",
        "price": 699,
        "mrp": 839,
        "calories": 130,
        "protein": 4,
        "stock": 77
      },
      {
        "id": "2kg-cheese",
        "size": "2kg",
        "flavor": "Cheese",
        "unit": "2kg",
        "price": 659,
        "mrp": 904,
        "calories": 130,
        "protein": 4,
        "stock": 39
      },
      {
        "id": "2kg-pudina",
        "size": "2kg",
        "flavor": "Pudina",
        "unit": "2kg",
        "price": 679,
        "mrp": 783,
        "calories": 130,
        "protein": 4,
        "stock": 103
      }
    ]
  },
  {
    "id": "fm-8",
    "name": "Multivitamin Tablets",
    "category": "fitness-maintenance",
    "image": "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=500&q=80",
    "description": "High-quality multivitamin tablets formulated to support muscle recovery and performance.",
    "ingredients": [
      "Multivitamin Tablets"
    ],
    "rating": 4.5,
    "reviewCount": 579,
    "tags": [
      "trending"
    ],
    "variants": [
      {
        "id": "250g",
        "size": "250g",
        "flavor": null,
        "unit": "250g",
        "price": 269,
        "mrp": 313,
        "calories": 0,
        "protein": 0,
        "stock": 106
      },
      {
        "id": "500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 449,
        "mrp": 544,
        "calories": 0,
        "protein": 0,
        "stock": 44
      },
      {
        "id": "1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 849,
        "mrp": 1042,
        "calories": 0,
        "protein": 0,
        "stock": 105
      },
      {
        "id": "2kg",
        "size": "2kg",
        "flavor": null,
        "unit": "2kg",
        "price": 1529,
        "mrp": 1978,
        "calories": 0,
        "protein": 0,
        "stock": 42
      }
    ]
  },
  {
    "id": "fm-9",
    "name": "Vitamin D3 + K2",
    "category": "fitness-maintenance",
    "image": "https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&w=500&q=80",
    "description": "High-quality vitamin d3 + k2 formulated to support muscle recovery and performance.",
    "ingredients": [
      "Vitamin D3 + K2"
    ],
    "rating": 4.5,
    "reviewCount": 670,
    "tags": [],
    "variants": [
      {
        "id": "250g",
        "size": "250g",
        "flavor": null,
        "unit": "250g",
        "price": 239,
        "mrp": 329,
        "calories": 0,
        "protein": 0,
        "stock": 99
      },
      {
        "id": "500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 399,
        "mrp": 517,
        "calories": 0,
        "protein": 0,
        "stock": 95
      },
      {
        "id": "1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 759,
        "mrp": 863,
        "calories": 0,
        "protein": 0,
        "stock": 29
      },
      {
        "id": "2kg",
        "size": "2kg",
        "flavor": null,
        "unit": "2kg",
        "price": 1359,
        "mrp": 1606,
        "calories": 0,
        "protein": 0,
        "stock": 93
      }
    ]
  },
  {
    "id": "fm-10",
    "name": "Omega-3 Fish Oil",
    "category": "fitness-maintenance",
    "image": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=500&q=80",
    "description": "High-quality omega-3 fish oil formulated to support muscle recovery and performance.",
    "ingredients": [
      "Omega-3 Fish Oil"
    ],
    "rating": 4.5,
    "reviewCount": 873,
    "tags": [
      "bestseller"
    ],
    "variants": [
      {
        "id": "250g",
        "size": "250g",
        "flavor": null,
        "unit": "250g",
        "price": 329,
        "mrp": 391,
        "calories": 10,
        "protein": 0,
        "stock": 37
      },
      {
        "id": "500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 549,
        "mrp": 711,
        "calories": 10,
        "protein": 0,
        "stock": 15
      },
      {
        "id": "1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 1039,
        "mrp": 1347,
        "calories": 10,
        "protein": 0,
        "stock": 58
      },
      {
        "id": "2kg",
        "size": "2kg",
        "flavor": null,
        "unit": "2kg",
        "price": 1869,
        "mrp": 2315,
        "calories": 10,
        "protein": 0,
        "stock": 33
      }
    ]
  },
  {
    "id": "fm-11",
    "name": "Electrolyte Hydration Mix",
    "category": "fitness-maintenance",
    "image": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=500&q=80",
    "description": "High-quality electrolyte hydration mix formulated to support muscle recovery and performance.",
    "ingredients": [
      "Electrolyte Hydration Mix"
    ],
    "rating": 5,
    "reviewCount": 116,
    "tags": [],
    "variants": [
      {
        "id": "250g-orange",
        "size": "250g",
        "flavor": "Orange",
        "unit": "250g",
        "price": 179,
        "mrp": 215,
        "calories": 15,
        "protein": 0,
        "stock": 37
      },
      {
        "id": "250g-lemon",
        "size": "250g",
        "flavor": "Lemon",
        "unit": "250g",
        "price": 179,
        "mrp": 247,
        "calories": 15,
        "protein": 0,
        "stock": 52
      },
      {
        "id": "250g-berry",
        "size": "250g",
        "flavor": "Berry",
        "unit": "250g",
        "price": 169,
        "mrp": 193,
        "calories": 15,
        "protein": 0,
        "stock": 103
      },
      {
        "id": "250g-watermelon",
        "size": "250g",
        "flavor": "Watermelon",
        "unit": "250g",
        "price": 179,
        "mrp": 241,
        "calories": 15,
        "protein": 0,
        "stock": 63
      },
      {
        "id": "500g-orange",
        "size": "500g",
        "flavor": "Orange",
        "unit": "500g",
        "price": 309,
        "mrp": 353,
        "calories": 15,
        "protein": 0,
        "stock": 22
      },
      {
        "id": "500g-lemon",
        "size": "500g",
        "flavor": "Lemon",
        "unit": "500g",
        "price": 289,
        "mrp": 387,
        "calories": 15,
        "protein": 0,
        "stock": 22
      },
      {
        "id": "500g-berry",
        "size": "500g",
        "flavor": "Berry",
        "unit": "500g",
        "price": 299,
        "mrp": 381,
        "calories": 15,
        "protein": 0,
        "stock": 64
      },
      {
        "id": "500g-watermelon",
        "size": "500g",
        "flavor": "Watermelon",
        "unit": "500g",
        "price": 309,
        "mrp": 366,
        "calories": 15,
        "protein": 0,
        "stock": 86
      },
      {
        "id": "1kg-orange",
        "size": "1kg",
        "flavor": "Orange",
        "unit": "1kg",
        "price": 549,
        "mrp": 757,
        "calories": 15,
        "protein": 0,
        "stock": 117
      },
      {
        "id": "1kg-lemon",
        "size": "1kg",
        "flavor": "Lemon",
        "unit": "1kg",
        "price": 569,
        "mrp": 772,
        "calories": 15,
        "protein": 0,
        "stock": 76
      },
      {
        "id": "1kg-berry",
        "size": "1kg",
        "flavor": "Berry",
        "unit": "1kg",
        "price": 589,
        "mrp": 775,
        "calories": 15,
        "protein": 0,
        "stock": 66
      },
      {
        "id": "1kg-watermelon",
        "size": "1kg",
        "flavor": "Watermelon",
        "unit": "1kg",
        "price": 549,
        "mrp": 744,
        "calories": 15,
        "protein": 0,
        "stock": 105
      },
      {
        "id": "2kg-orange",
        "size": "2kg",
        "flavor": "Orange",
        "unit": "2kg",
        "price": 1019,
        "mrp": 1146,
        "calories": 15,
        "protein": 0,
        "stock": 28
      },
      {
        "id": "2kg-lemon",
        "size": "2kg",
        "flavor": "Lemon",
        "unit": "2kg",
        "price": 1049,
        "mrp": 1419,
        "calories": 15,
        "protein": 0,
        "stock": 104
      },
      {
        "id": "2kg-berry",
        "size": "2kg",
        "flavor": "Berry",
        "unit": "2kg",
        "price": 989,
        "mrp": 1345,
        "calories": 15,
        "protein": 0,
        "stock": 21
      },
      {
        "id": "2kg-watermelon",
        "size": "2kg",
        "flavor": "Watermelon",
        "unit": "2kg",
        "price": 1019,
        "mrp": 1255,
        "calories": 15,
        "protein": 0,
        "stock": 62
      }
    ]
  },
  {
    "id": "fm-12",
    "name": "Whole Grain Toast Pack",
    "category": "fitness-maintenance",
    "image": "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality whole grain toast pack, carefully sourced and packed fresh to support your daily nutrition goals.",
    "ingredients": [
      "Whole Grain Toast Pack"
    ],
    "rating": 4.1,
    "reviewCount": 684,
    "tags": [
      "trending"
    ],
    "variants": [
      {
        "id": "250g",
        "size": "250g",
        "flavor": null,
        "unit": "250g",
        "price": 59,
        "mrp": 74,
        "calories": 260,
        "protein": 9,
        "stock": 113
      },
      {
        "id": "500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 99,
        "mrp": 120,
        "calories": 260,
        "protein": 9,
        "stock": 106
      },
      {
        "id": "1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 189,
        "mrp": 233,
        "calories": 260,
        "protein": 9,
        "stock": 72
      },
      {
        "id": "2kg",
        "size": "2kg",
        "flavor": null,
        "unit": "2kg",
        "price": 339,
        "mrp": 430,
        "calories": 260,
        "protein": 9,
        "stock": 97
      }
    ]
  },
  {
    "id": "fm-13",
    "name": "Mixed Vegetable Box",
    "category": "fitness-maintenance",
    "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80",
    "description": "Farm-fresh mixed vegetable box, hand-picked for quality and flavor.",
    "ingredients": [
      "Mixed Vegetable Box"
    ],
    "rating": 4.6,
    "reviewCount": 761,
    "tags": [],
    "variants": [
      {
        "id": "500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 49,
        "mrp": 64,
        "calories": 60,
        "protein": 3,
        "stock": 72
      },
      {
        "id": "1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 99,
        "mrp": 134,
        "calories": 60,
        "protein": 3,
        "stock": 117
      },
      {
        "id": "2kg",
        "size": "2kg",
        "flavor": null,
        "unit": "2kg",
        "price": 189,
        "mrp": 220,
        "calories": 60,
        "protein": 3,
        "stock": 50
      },
      {
        "id": "family-box-3kg-",
        "size": "Family Box (3kg)",
        "flavor": null,
        "unit": "3kg",
        "price": 269,
        "mrp": 346,
        "calories": 60,
        "protein": 3,
        "stock": 59
      }
    ]
  },
  {
    "id": "fm-14",
    "name": "Herbal Immunity Drink",
    "category": "fitness-maintenance",
    "image": "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=500&q=80",
    "description": "Refreshing herbal immunity drink, ready to drink and packed with nutrients for your active lifestyle.",
    "ingredients": [
      "Herbal Immunity Drink"
    ],
    "rating": 4.1,
    "reviewCount": 168,
    "tags": [
      "new"
    ],
    "variants": [
      {
        "id": "250ml",
        "size": "250ml",
        "flavor": null,
        "unit": "250ml",
        "price": 79,
        "mrp": 105,
        "calories": 45,
        "protein": 0,
        "stock": 21
      },
      {
        "id": "500ml",
        "size": "500ml",
        "flavor": null,
        "unit": "500ml",
        "price": 129,
        "mrp": 145,
        "calories": 45,
        "protein": 0,
        "stock": 68
      },
      {
        "id": "1l",
        "size": "1L",
        "flavor": null,
        "unit": "1L",
        "price": 229,
        "mrp": 265,
        "calories": 45,
        "protein": 0,
        "stock": 81
      },
      {
        "id": "6-x-250ml",
        "size": "6 x 250ml",
        "flavor": null,
        "unit": "6 x 250ml",
        "price": 669,
        "mrp": 782,
        "calories": 45,
        "protein": 0,
        "stock": 38
      }
    ]
  },
  {
    "id": "ps-1",
    "name": "Whey Protein Isolate",
    "category": "protein-supplements",
    "image": "https://images.unsplash.com/photo-1579126038374-6064e9370f0f?auto=format&fit=crop&w=500&q=80",
    "description": "High-quality whey protein isolate formulated to support muscle recovery and performance.",
    "ingredients": [
      "Whey Protein Isolate"
    ],
    "rating": 5,
    "reviewCount": 924,
    "tags": [],
    "variants": [
      {
        "id": "250g-chocolate",
        "size": "250g",
        "flavor": "Chocolate",
        "unit": "250g",
        "price": 1379,
        "mrp": 1836,
        "calories": 120,
        "protein": 25,
        "stock": 98
      },
      {
        "id": "250g-vanilla",
        "size": "250g",
        "flavor": "Vanilla",
        "unit": "250g",
        "price": 1419,
        "mrp": 1921,
        "calories": 120,
        "protein": 25,
        "stock": 30
      },
      {
        "id": "250g-cookies-cream",
        "size": "250g",
        "flavor": "Cookies & Cream",
        "unit": "250g",
        "price": 1339,
        "mrp": 1555,
        "calories": 120,
        "protein": 25,
        "stock": 85
      },
      {
        "id": "250g-unflavored",
        "size": "250g",
        "flavor": "Unflavored",
        "unit": "250g",
        "price": 1239,
        "mrp": 1671,
        "calories": 120,
        "protein": 25,
        "stock": 77
      },
      {
        "id": "500g-chocolate",
        "size": "500g",
        "flavor": "Chocolate",
        "unit": "500g",
        "price": 2369,
        "mrp": 2681,
        "calories": 120,
        "protein": 25,
        "stock": 33
      },
      {
        "id": "500g-vanilla",
        "size": "500g",
        "flavor": "Vanilla",
        "unit": "500g",
        "price": 2229,
        "mrp": 2832,
        "calories": 120,
        "protein": 25,
        "stock": 56
      },
      {
        "id": "500g-cookies-cream",
        "size": "500g",
        "flavor": "Cookies & Cream",
        "unit": "500g",
        "price": 2299,
        "mrp": 2992,
        "calories": 120,
        "protein": 25,
        "stock": 56
      },
      {
        "id": "500g-unflavored",
        "size": "500g",
        "flavor": "Unflavored",
        "unit": "500g",
        "price": 2069,
        "mrp": 2392,
        "calories": 120,
        "protein": 25,
        "stock": 83
      },
      {
        "id": "1kg-chocolate",
        "size": "1kg",
        "flavor": "Chocolate",
        "unit": "1kg",
        "price": 4239,
        "mrp": 5440,
        "calories": 120,
        "protein": 25,
        "stock": 85
      },
      {
        "id": "1kg-vanilla",
        "size": "1kg",
        "flavor": "Vanilla",
        "unit": "1kg",
        "price": 4369,
        "mrp": 5603,
        "calories": 120,
        "protein": 25,
        "stock": 70
      },
      {
        "id": "1kg-cookies-cream",
        "size": "1kg",
        "flavor": "Cookies & Cream",
        "unit": "1kg",
        "price": 4499,
        "mrp": 5578,
        "calories": 120,
        "protein": 25,
        "stock": 107
      },
      {
        "id": "1kg-unflavored",
        "size": "1kg",
        "flavor": "Unflavored",
        "unit": "1kg",
        "price": 3929,
        "mrp": 5083,
        "calories": 120,
        "protein": 25,
        "stock": 102
      },
      {
        "id": "2kg-chocolate",
        "size": "2kg",
        "flavor": "Chocolate",
        "unit": "2kg",
        "price": 7819,
        "mrp": 10833,
        "calories": 120,
        "protein": 25,
        "stock": 47
      },
      {
        "id": "2kg-vanilla",
        "size": "2kg",
        "flavor": "Vanilla",
        "unit": "2kg",
        "price": 8049,
        "mrp": 9633,
        "calories": 120,
        "protein": 25,
        "stock": 37
      },
      {
        "id": "2kg-cookies-cream",
        "size": "2kg",
        "flavor": "Cookies & Cream",
        "unit": "2kg",
        "price": 7579,
        "mrp": 10572,
        "calories": 120,
        "protein": 25,
        "stock": 35
      },
      {
        "id": "2kg-unflavored",
        "size": "2kg",
        "flavor": "Unflavored",
        "unit": "2kg",
        "price": 7029,
        "mrp": 8038,
        "calories": 120,
        "protein": 25,
        "stock": 23
      }
    ]
  },
  {
    "id": "ps-2",
    "name": "Whey Protein Concentrate",
    "category": "protein-supplements",
    "image": "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=500&q=80",
    "description": "High-quality whey protein concentrate formulated to support muscle recovery and performance.",
    "ingredients": [
      "Whey Protein Concentrate"
    ],
    "rating": 4.7,
    "reviewCount": 207,
    "tags": [],
    "variants": [
      {
        "id": "250g-chocolate",
        "size": "250g",
        "flavor": "Chocolate",
        "unit": "250g",
        "price": 1319,
        "mrp": 1478,
        "calories": 118,
        "protein": 24,
        "stock": 26
      },
      {
        "id": "250g-vanilla",
        "size": "250g",
        "flavor": "Vanilla",
        "unit": "250g",
        "price": 1359,
        "mrp": 1645,
        "calories": 118,
        "protein": 24,
        "stock": 33
      },
      {
        "id": "250g-cookies-cream",
        "size": "250g",
        "flavor": "Cookies & Cream",
        "unit": "250g",
        "price": 1279,
        "mrp": 1768,
        "calories": 118,
        "protein": 24,
        "stock": 70
      },
      {
        "id": "250g-unflavored",
        "size": "250g",
        "flavor": "Unflavored",
        "unit": "250g",
        "price": 1189,
        "mrp": 1335,
        "calories": 118,
        "protein": 24,
        "stock": 110
      },
      {
        "id": "500g-chocolate",
        "size": "500g",
        "flavor": "Chocolate",
        "unit": "500g",
        "price": 2259,
        "mrp": 3159,
        "calories": 118,
        "protein": 24,
        "stock": 113
      },
      {
        "id": "500g-vanilla",
        "size": "500g",
        "flavor": "Vanilla",
        "unit": "500g",
        "price": 2129,
        "mrp": 2637,
        "calories": 118,
        "protein": 24,
        "stock": 32
      },
      {
        "id": "500g-cookies-cream",
        "size": "500g",
        "flavor": "Cookies & Cream",
        "unit": "500g",
        "price": 2199,
        "mrp": 2674,
        "calories": 118,
        "protein": 24,
        "stock": 111
      },
      {
        "id": "500g-unflavored",
        "size": "500g",
        "flavor": "Unflavored",
        "unit": "500g",
        "price": 1979,
        "mrp": 2458,
        "calories": 118,
        "protein": 24,
        "stock": 86
      },
      {
        "id": "1kg-chocolate",
        "size": "1kg",
        "flavor": "Chocolate",
        "unit": "1kg",
        "price": 4049,
        "mrp": 5427,
        "calories": 118,
        "protein": 24,
        "stock": 40
      },
      {
        "id": "1kg-vanilla",
        "size": "1kg",
        "flavor": "Vanilla",
        "unit": "1kg",
        "price": 4179,
        "mrp": 5072,
        "calories": 118,
        "protein": 24,
        "stock": 64
      },
      {
        "id": "1kg-cookies-cream",
        "size": "1kg",
        "flavor": "Cookies & Cream",
        "unit": "1kg",
        "price": 4299,
        "mrp": 5994,
        "calories": 118,
        "protein": 24,
        "stock": 93
      },
      {
        "id": "1kg-unflavored",
        "size": "1kg",
        "flavor": "Unflavored",
        "unit": "1kg",
        "price": 3759,
        "mrp": 4594,
        "calories": 118,
        "protein": 24,
        "stock": 23
      },
      {
        "id": "2kg-chocolate",
        "size": "2kg",
        "flavor": "Chocolate",
        "unit": "2kg",
        "price": 7479,
        "mrp": 9039,
        "calories": 118,
        "protein": 24,
        "stock": 110
      },
      {
        "id": "2kg-vanilla",
        "size": "2kg",
        "flavor": "Vanilla",
        "unit": "2kg",
        "price": 7699,
        "mrp": 10689,
        "calories": 118,
        "protein": 24,
        "stock": 64
      },
      {
        "id": "2kg-cookies-cream",
        "size": "2kg",
        "flavor": "Cookies & Cream",
        "unit": "2kg",
        "price": 7249,
        "mrp": 9110,
        "calories": 118,
        "protein": 24,
        "stock": 17
      },
      {
        "id": "2kg-unflavored",
        "size": "2kg",
        "flavor": "Unflavored",
        "unit": "2kg",
        "price": 6729,
        "mrp": 8708,
        "calories": 118,
        "protein": 24,
        "stock": 72
      }
    ]
  },
  {
    "id": "ps-3",
    "name": "Plant Protein Blend",
    "category": "protein-supplements",
    "image": "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&w=480&q=80",
    "description": "High-quality plant protein blend formulated to support muscle recovery and performance.",
    "ingredients": [
      "Plant Protein Blend"
    ],
    "rating": 4.9,
    "reviewCount": 549,
    "tags": [],
    "variants": [
      {
        "id": "250g-chocolate",
        "size": "250g",
        "flavor": "Chocolate",
        "unit": "250g",
        "price": 1139,
        "mrp": 1432,
        "calories": 110,
        "protein": 22,
        "stock": 58
      },
      {
        "id": "250g-vanilla",
        "size": "250g",
        "flavor": "Vanilla",
        "unit": "250g",
        "price": 1169,
        "mrp": 1501,
        "calories": 110,
        "protein": 22,
        "stock": 93
      },
      {
        "id": "250g-cookies-cream",
        "size": "250g",
        "flavor": "Cookies & Cream",
        "unit": "250g",
        "price": 1109,
        "mrp": 1414,
        "calories": 110,
        "protein": 22,
        "stock": 39
      },
      {
        "id": "250g-unflavored",
        "size": "250g",
        "flavor": "Unflavored",
        "unit": "250g",
        "price": 1029,
        "mrp": 1356,
        "calories": 110,
        "protein": 22,
        "stock": 74
      },
      {
        "id": "500g-chocolate",
        "size": "500g",
        "flavor": "Chocolate",
        "unit": "500g",
        "price": 1959,
        "mrp": 2490,
        "calories": 110,
        "protein": 22,
        "stock": 101
      },
      {
        "id": "500g-vanilla",
        "size": "500g",
        "flavor": "Vanilla",
        "unit": "500g",
        "price": 1839,
        "mrp": 2491,
        "calories": 110,
        "protein": 22,
        "stock": 113
      },
      {
        "id": "500g-cookies-cream",
        "size": "500g",
        "flavor": "Cookies & Cream",
        "unit": "500g",
        "price": 1899,
        "mrp": 2377,
        "calories": 110,
        "protein": 22,
        "stock": 100
      },
      {
        "id": "500g-unflavored",
        "size": "500g",
        "flavor": "Unflavored",
        "unit": "500g",
        "price": 1709,
        "mrp": 2305,
        "calories": 110,
        "protein": 22,
        "stock": 25
      },
      {
        "id": "1kg-chocolate",
        "size": "1kg",
        "flavor": "Chocolate",
        "unit": "1kg",
        "price": 3499,
        "mrp": 4792,
        "calories": 110,
        "protein": 22,
        "stock": 80
      },
      {
        "id": "1kg-vanilla",
        "size": "1kg",
        "flavor": "Vanilla",
        "unit": "1kg",
        "price": 3609,
        "mrp": 4156,
        "calories": 110,
        "protein": 22,
        "stock": 67
      },
      {
        "id": "1kg-cookies-cream",
        "size": "1kg",
        "flavor": "Cookies & Cream",
        "unit": "1kg",
        "price": 3719,
        "mrp": 4949,
        "calories": 110,
        "protein": 22,
        "stock": 113
      },
      {
        "id": "1kg-unflavored",
        "size": "1kg",
        "flavor": "Unflavored",
        "unit": "1kg",
        "price": 3249,
        "mrp": 3680,
        "calories": 110,
        "protein": 22,
        "stock": 82
      },
      {
        "id": "2kg-chocolate",
        "size": "2kg",
        "flavor": "Chocolate",
        "unit": "2kg",
        "price": 6459,
        "mrp": 8984,
        "calories": 110,
        "protein": 22,
        "stock": 115
      },
      {
        "id": "2kg-vanilla",
        "size": "2kg",
        "flavor": "Vanilla",
        "unit": "2kg",
        "price": 6649,
        "mrp": 8710,
        "calories": 110,
        "protein": 22,
        "stock": 83
      },
      {
        "id": "2kg-cookies-cream",
        "size": "2kg",
        "flavor": "Cookies & Cream",
        "unit": "2kg",
        "price": 6259,
        "mrp": 8123,
        "calories": 110,
        "protein": 22,
        "stock": 47
      },
      {
        "id": "2kg-unflavored",
        "size": "2kg",
        "flavor": "Unflavored",
        "unit": "2kg",
        "price": 5809,
        "mrp": 7106,
        "calories": 110,
        "protein": 22,
        "stock": 69
      }
    ]
  },
  {
    "id": "ps-4",
    "name": "Casein Protein",
    "category": "protein-supplements",
    "image": "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=500&q=80",
    "description": "High-quality casein protein formulated to support muscle recovery and performance.",
    "ingredients": [
      "Casein Protein"
    ],
    "rating": 4.9,
    "reviewCount": 633,
    "tags": [
      "trending"
    ],
    "variants": [
      {
        "id": "250g-chocolate",
        "size": "250g",
        "flavor": "Chocolate",
        "unit": "250g",
        "price": 1499,
        "mrp": 2096,
        "calories": 130,
        "protein": 24,
        "stock": 117
      },
      {
        "id": "250g-vanilla",
        "size": "250g",
        "flavor": "Vanilla",
        "unit": "250g",
        "price": 1539,
        "mrp": 2004,
        "calories": 130,
        "protein": 24,
        "stock": 68
      },
      {
        "id": "250g-cookies-cream",
        "size": "250g",
        "flavor": "Cookies & Cream",
        "unit": "250g",
        "price": 1449,
        "mrp": 1962,
        "calories": 130,
        "protein": 24,
        "stock": 18
      },
      {
        "id": "250g-unflavored",
        "size": "250g",
        "flavor": "Unflavored",
        "unit": "250g",
        "price": 1349,
        "mrp": 1682,
        "calories": 130,
        "protein": 24,
        "stock": 116
      },
      {
        "id": "500g-chocolate",
        "size": "500g",
        "flavor": "Chocolate",
        "unit": "500g",
        "price": 2569,
        "mrp": 2981,
        "calories": 130,
        "protein": 24,
        "stock": 42
      },
      {
        "id": "500g-vanilla",
        "size": "500g",
        "flavor": "Vanilla",
        "unit": "500g",
        "price": 2419,
        "mrp": 3207,
        "calories": 130,
        "protein": 24,
        "stock": 56
      },
      {
        "id": "500g-cookies-cream",
        "size": "500g",
        "flavor": "Cookies & Cream",
        "unit": "500g",
        "price": 2499,
        "mrp": 3043,
        "calories": 130,
        "protein": 24,
        "stock": 78
      },
      {
        "id": "500g-unflavored",
        "size": "500g",
        "flavor": "Unflavored",
        "unit": "500g",
        "price": 2249,
        "mrp": 2635,
        "calories": 130,
        "protein": 24,
        "stock": 28
      },
      {
        "id": "1kg-chocolate",
        "size": "1kg",
        "flavor": "Chocolate",
        "unit": "1kg",
        "price": 4609,
        "mrp": 6397,
        "calories": 130,
        "protein": 24,
        "stock": 115
      },
      {
        "id": "1kg-vanilla",
        "size": "1kg",
        "flavor": "Vanilla",
        "unit": "1kg",
        "price": 4749,
        "mrp": 5336,
        "calories": 130,
        "protein": 24,
        "stock": 39
      },
      {
        "id": "1kg-cookies-cream",
        "size": "1kg",
        "flavor": "Cookies & Cream",
        "unit": "1kg",
        "price": 4889,
        "mrp": 5618,
        "calories": 130,
        "protein": 24,
        "stock": 59
      },
      {
        "id": "1kg-unflavored",
        "size": "1kg",
        "flavor": "Unflavored",
        "unit": "1kg",
        "price": 4269,
        "mrp": 5781,
        "calories": 130,
        "protein": 24,
        "stock": 21
      },
      {
        "id": "2kg-chocolate",
        "size": "2kg",
        "flavor": "Chocolate",
        "unit": "2kg",
        "price": 8499,
        "mrp": 11371,
        "calories": 130,
        "protein": 24,
        "stock": 35
      },
      {
        "id": "2kg-vanilla",
        "size": "2kg",
        "flavor": "Vanilla",
        "unit": "2kg",
        "price": 8749,
        "mrp": 10380,
        "calories": 130,
        "protein": 24,
        "stock": 67
      },
      {
        "id": "2kg-cookies-cream",
        "size": "2kg",
        "flavor": "Cookies & Cream",
        "unit": "2kg",
        "price": 8239,
        "mrp": 10859,
        "calories": 130,
        "protein": 24,
        "stock": 20
      },
      {
        "id": "2kg-unflavored",
        "size": "2kg",
        "flavor": "Unflavored",
        "unit": "2kg",
        "price": 7649,
        "mrp": 10664,
        "calories": 130,
        "protein": 24,
        "stock": 100
      }
    ]
  },
  {
    "id": "ps-5",
    "name": "Protein Blend Mass",
    "category": "protein-supplements",
    "image": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=500&q=80",
    "description": "High-quality protein blend mass formulated to support muscle recovery and performance.",
    "ingredients": [
      "Protein Blend Mass"
    ],
    "rating": 5,
    "reviewCount": 917,
    "tags": [
      "bestseller"
    ],
    "variants": [
      {
        "id": "250g-chocolate",
        "size": "250g",
        "flavor": "Chocolate",
        "unit": "250g",
        "price": 1079,
        "mrp": 1481,
        "calories": 400,
        "protein": 30,
        "stock": 41
      },
      {
        "id": "250g-vanilla",
        "size": "250g",
        "flavor": "Vanilla",
        "unit": "250g",
        "price": 1109,
        "mrp": 1537,
        "calories": 400,
        "protein": 30,
        "stock": 58
      },
      {
        "id": "250g-cookies-cream",
        "size": "250g",
        "flavor": "Cookies & Cream",
        "unit": "250g",
        "price": 1049,
        "mrp": 1314,
        "calories": 400,
        "protein": 30,
        "stock": 42
      },
      {
        "id": "250g-unflavored",
        "size": "250g",
        "flavor": "Unflavored",
        "unit": "250g",
        "price": 969,
        "mrp": 1290,
        "calories": 400,
        "protein": 30,
        "stock": 15
      },
      {
        "id": "500g-chocolate",
        "size": "500g",
        "flavor": "Chocolate",
        "unit": "500g",
        "price": 1849,
        "mrp": 2081,
        "calories": 400,
        "protein": 30,
        "stock": 51
      },
      {
        "id": "500g-vanilla",
        "size": "500g",
        "flavor": "Vanilla",
        "unit": "500g",
        "price": 1749,
        "mrp": 2080,
        "calories": 400,
        "protein": 30,
        "stock": 82
      },
      {
        "id": "500g-cookies-cream",
        "size": "500g",
        "flavor": "Cookies & Cream",
        "unit": "500g",
        "price": 1799,
        "mrp": 2315,
        "calories": 400,
        "protein": 30,
        "stock": 81
      },
      {
        "id": "500g-unflavored",
        "size": "500g",
        "flavor": "Unflavored",
        "unit": "500g",
        "price": 1619,
        "mrp": 2052,
        "calories": 400,
        "protein": 30,
        "stock": 113
      },
      {
        "id": "1kg-chocolate",
        "size": "1kg",
        "flavor": "Chocolate",
        "unit": "1kg",
        "price": 3319,
        "mrp": 4242,
        "calories": 400,
        "protein": 30,
        "stock": 26
      },
      {
        "id": "1kg-vanilla",
        "size": "1kg",
        "flavor": "Vanilla",
        "unit": "1kg",
        "price": 3419,
        "mrp": 4560,
        "calories": 400,
        "protein": 30,
        "stock": 64
      },
      {
        "id": "1kg-cookies-cream",
        "size": "1kg",
        "flavor": "Cookies & Cream",
        "unit": "1kg",
        "price": 3519,
        "mrp": 4730,
        "calories": 400,
        "protein": 30,
        "stock": 69
      },
      {
        "id": "1kg-unflavored",
        "size": "1kg",
        "flavor": "Unflavored",
        "unit": "1kg",
        "price": 3079,
        "mrp": 4106,
        "calories": 400,
        "protein": 30,
        "stock": 16
      },
      {
        "id": "2kg-chocolate",
        "size": "2kg",
        "flavor": "Chocolate",
        "unit": "2kg",
        "price": 6119,
        "mrp": 7860,
        "calories": 400,
        "protein": 30,
        "stock": 105
      },
      {
        "id": "2kg-vanilla",
        "size": "2kg",
        "flavor": "Vanilla",
        "unit": "2kg",
        "price": 6299,
        "mrp": 7368,
        "calories": 400,
        "protein": 30,
        "stock": 58
      },
      {
        "id": "2kg-cookies-cream",
        "size": "2kg",
        "flavor": "Cookies & Cream",
        "unit": "2kg",
        "price": 5929,
        "mrp": 6928,
        "calories": 400,
        "protein": 30,
        "stock": 88
      },
      {
        "id": "2kg-unflavored",
        "size": "2kg",
        "flavor": "Unflavored",
        "unit": "2kg",
        "price": 5499,
        "mrp": 6779,
        "calories": 400,
        "protein": 30,
        "stock": 28
      }
    ]
  },
  {
    "id": "ps-6",
    "name": "Whey Protein Bar",
    "category": "protein-supplements",
    "image": "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=500&q=80",
    "description": "Convenient, great-tasting whey protein bar for fuel on the go.",
    "ingredients": [
      "Whey Protein Bar"
    ],
    "rating": 4.8,
    "reviewCount": 820,
    "tags": [],
    "variants": [
      {
        "id": "single-60g--chocolate",
        "size": "Single (60g)",
        "flavor": "Chocolate",
        "unit": "60g",
        "price": 79,
        "mrp": 94,
        "calories": 200,
        "protein": 20,
        "stock": 65
      },
      {
        "id": "single-60g--peanut-butter",
        "size": "Single (60g)",
        "flavor": "Peanut Butter",
        "unit": "60g",
        "price": 79,
        "mrp": 100,
        "calories": 200,
        "protein": 20,
        "stock": 79
      },
      {
        "id": "single-60g--cookies-cream",
        "size": "Single (60g)",
        "flavor": "Cookies & Cream",
        "unit": "60g",
        "price": 79,
        "mrp": 101,
        "calories": 200,
        "protein": 20,
        "stock": 70
      },
      {
        "id": "single-60g--coconut",
        "size": "Single (60g)",
        "flavor": "Coconut",
        "unit": "60g",
        "price": 79,
        "mrp": 110,
        "calories": 200,
        "protein": 20,
        "stock": 88
      },
      {
        "id": "box-of-6-chocolate",
        "size": "Box of 6",
        "flavor": "Chocolate",
        "unit": "6 bars",
        "price": 439,
        "mrp": 533,
        "calories": 200,
        "protein": 20,
        "stock": 81
      },
      {
        "id": "box-of-6-peanut-butter",
        "size": "Box of 6",
        "flavor": "Peanut Butter",
        "unit": "6 bars",
        "price": 409,
        "mrp": 487,
        "calories": 200,
        "protein": 20,
        "stock": 57
      },
      {
        "id": "box-of-6-cookies-cream",
        "size": "Box of 6",
        "flavor": "Cookies & Cream",
        "unit": "6 bars",
        "price": 429,
        "mrp": 482,
        "calories": 200,
        "protein": 20,
        "stock": 86
      },
      {
        "id": "box-of-6-coconut",
        "size": "Box of 6",
        "flavor": "Coconut",
        "unit": "6 bars",
        "price": 439,
        "mrp": 507,
        "calories": 200,
        "protein": 20,
        "stock": 72
      },
      {
        "id": "box-of-12-chocolate",
        "size": "Box of 12",
        "flavor": "Chocolate",
        "unit": "12 bars",
        "price": 779,
        "mrp": 953,
        "calories": 200,
        "protein": 20,
        "stock": 113
      },
      {
        "id": "box-of-12-peanut-butter",
        "size": "Box of 12",
        "flavor": "Peanut Butter",
        "unit": "12 bars",
        "price": 809,
        "mrp": 1045,
        "calories": 200,
        "protein": 20,
        "stock": 95
      },
      {
        "id": "box-of-12-cookies-cream",
        "size": "Box of 12",
        "flavor": "Cookies & Cream",
        "unit": "12 bars",
        "price": 829,
        "mrp": 983,
        "calories": 200,
        "protein": 20,
        "stock": 84
      },
      {
        "id": "box-of-12-coconut",
        "size": "Box of 12",
        "flavor": "Coconut",
        "unit": "12 bars",
        "price": 779,
        "mrp": 928,
        "calories": 200,
        "protein": 20,
        "stock": 63
      },
      {
        "id": "box-of-24-chocolate",
        "size": "Box of 24",
        "flavor": "Chocolate",
        "unit": "24 bars",
        "price": 1499,
        "mrp": 1716,
        "calories": 200,
        "protein": 20,
        "stock": 44
      },
      {
        "id": "box-of-24-peanut-butter",
        "size": "Box of 24",
        "flavor": "Peanut Butter",
        "unit": "24 bars",
        "price": 1549,
        "mrp": 1737,
        "calories": 200,
        "protein": 20,
        "stock": 49
      },
      {
        "id": "box-of-24-cookies-cream",
        "size": "Box of 24",
        "flavor": "Cookies & Cream",
        "unit": "24 bars",
        "price": 1459,
        "mrp": 1733,
        "calories": 200,
        "protein": 20,
        "stock": 47
      },
      {
        "id": "box-of-24-coconut",
        "size": "Box of 24",
        "flavor": "Coconut",
        "unit": "24 bars",
        "price": 1499,
        "mrp": 2005,
        "calories": 200,
        "protein": 20,
        "stock": 75
      }
    ]
  },
  {
    "id": "ps-7",
    "name": "Protein Cookies",
    "category": "protein-supplements",
    "image": "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=500&q=80",
    "description": "Convenient, great-tasting protein cookies for fuel on the go.",
    "ingredients": [
      "Protein Cookies"
    ],
    "rating": 4,
    "reviewCount": 133,
    "tags": [
      "new"
    ],
    "variants": [
      {
        "id": "single-60g--chocolate-chip",
        "size": "Single (60g)",
        "flavor": "Chocolate Chip",
        "unit": "60g",
        "price": 89,
        "mrp": 116,
        "calories": 180,
        "protein": 14,
        "stock": 100
      },
      {
        "id": "single-60g--double-chocolate",
        "size": "Single (60g)",
        "flavor": "Double Chocolate",
        "unit": "60g",
        "price": 89,
        "mrp": 104,
        "calories": 180,
        "protein": 14,
        "stock": 116
      },
      {
        "id": "single-60g--peanut-butter",
        "size": "Single (60g)",
        "flavor": "Peanut Butter",
        "unit": "60g",
        "price": 89,
        "mrp": 121,
        "calories": 180,
        "protein": 14,
        "stock": 81
      },
      {
        "id": "single-60g--oatmeal",
        "size": "Single (60g)",
        "flavor": "Oatmeal",
        "unit": "60g",
        "price": 89,
        "mrp": 121,
        "calories": 180,
        "protein": 14,
        "stock": 47
      },
      {
        "id": "box-of-6-chocolate-chip",
        "size": "Box of 6",
        "flavor": "Chocolate Chip",
        "unit": "6 bars",
        "price": 499,
        "mrp": 576,
        "calories": 180,
        "protein": 14,
        "stock": 98
      },
      {
        "id": "box-of-6-double-chocolate",
        "size": "Box of 6",
        "flavor": "Double Chocolate",
        "unit": "6 bars",
        "price": 469,
        "mrp": 603,
        "calories": 180,
        "protein": 14,
        "stock": 113
      },
      {
        "id": "box-of-6-peanut-butter",
        "size": "Box of 6",
        "flavor": "Peanut Butter",
        "unit": "6 bars",
        "price": 479,
        "mrp": 557,
        "calories": 180,
        "protein": 14,
        "stock": 28
      },
      {
        "id": "box-of-6-oatmeal",
        "size": "Box of 6",
        "flavor": "Oatmeal",
        "unit": "6 bars",
        "price": 499,
        "mrp": 622,
        "calories": 180,
        "protein": 14,
        "stock": 55
      },
      {
        "id": "box-of-12-chocolate-chip",
        "size": "Box of 12",
        "flavor": "Chocolate Chip",
        "unit": "12 bars",
        "price": 879,
        "mrp": 1064,
        "calories": 180,
        "protein": 14,
        "stock": 26
      },
      {
        "id": "box-of-12-double-chocolate",
        "size": "Box of 12",
        "flavor": "Double Chocolate",
        "unit": "12 bars",
        "price": 909,
        "mrp": 1242,
        "calories": 180,
        "protein": 14,
        "stock": 78
      },
      {
        "id": "box-of-12-peanut-butter",
        "size": "Box of 12",
        "flavor": "Peanut Butter",
        "unit": "12 bars",
        "price": 939,
        "mrp": 1137,
        "calories": 180,
        "protein": 14,
        "stock": 22
      },
      {
        "id": "box-of-12-oatmeal",
        "size": "Box of 12",
        "flavor": "Oatmeal",
        "unit": "12 bars",
        "price": 879,
        "mrp": 1077,
        "calories": 180,
        "protein": 14,
        "stock": 69
      },
      {
        "id": "box-of-24-chocolate-chip",
        "size": "Box of 24",
        "flavor": "Chocolate Chip",
        "unit": "24 bars",
        "price": 1689,
        "mrp": 2070,
        "calories": 180,
        "protein": 14,
        "stock": 22
      },
      {
        "id": "box-of-24-double-chocolate",
        "size": "Box of 24",
        "flavor": "Double Chocolate",
        "unit": "24 bars",
        "price": 1739,
        "mrp": 1986,
        "calories": 180,
        "protein": 14,
        "stock": 36
      },
      {
        "id": "box-of-24-peanut-butter",
        "size": "Box of 24",
        "flavor": "Peanut Butter",
        "unit": "24 bars",
        "price": 1639,
        "mrp": 1877,
        "calories": 180,
        "protein": 14,
        "stock": 62
      },
      {
        "id": "box-of-24-oatmeal",
        "size": "Box of 24",
        "flavor": "Oatmeal",
        "unit": "24 bars",
        "price": 1689,
        "mrp": 2353,
        "calories": 180,
        "protein": 14,
        "stock": 106
      }
    ]
  },
  {
    "id": "ps-8",
    "name": "BCAA Powder",
    "category": "protein-supplements",
    "image": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=500&q=80",
    "description": "High-quality bcaa powder formulated to support muscle recovery and performance.",
    "ingredients": [
      "BCAA Powder"
    ],
    "rating": 4.4,
    "reviewCount": 113,
    "tags": [
      "trending"
    ],
    "variants": [
      {
        "id": "250g-watermelon",
        "size": "250g",
        "flavor": "Watermelon",
        "unit": "250g",
        "price": 599,
        "mrp": 804,
        "calories": 15,
        "protein": 0,
        "stock": 44
      },
      {
        "id": "250g-blue-raspberry",
        "size": "250g",
        "flavor": "Blue Raspberry",
        "unit": "250g",
        "price": 619,
        "mrp": 695,
        "calories": 15,
        "protein": 0,
        "stock": 47
      },
      {
        "id": "250g-green-apple",
        "size": "250g",
        "flavor": "Green Apple",
        "unit": "250g",
        "price": 579,
        "mrp": 739,
        "calories": 15,
        "protein": 0,
        "stock": 26
      },
      {
        "id": "250g-fruit-punch",
        "size": "250g",
        "flavor": "Fruit Punch",
        "unit": "250g",
        "price": 599,
        "mrp": 809,
        "calories": 15,
        "protein": 0,
        "stock": 47
      },
      {
        "id": "500g-watermelon",
        "size": "500g",
        "flavor": "Watermelon",
        "unit": "500g",
        "price": 1029,
        "mrp": 1387,
        "calories": 15,
        "protein": 0,
        "stock": 94
      },
      {
        "id": "500g-blue-raspberry",
        "size": "500g",
        "flavor": "Blue Raspberry",
        "unit": "500g",
        "price": 969,
        "mrp": 1343,
        "calories": 15,
        "protein": 0,
        "stock": 72
      },
      {
        "id": "500g-green-apple",
        "size": "500g",
        "flavor": "Green Apple",
        "unit": "500g",
        "price": 999,
        "mrp": 1261,
        "calories": 15,
        "protein": 0,
        "stock": 109
      },
      {
        "id": "500g-fruit-punch",
        "size": "500g",
        "flavor": "Fruit Punch",
        "unit": "500g",
        "price": 1029,
        "mrp": 1359,
        "calories": 15,
        "protein": 0,
        "stock": 69
      },
      {
        "id": "1kg-watermelon",
        "size": "1kg",
        "flavor": "Watermelon",
        "unit": "1kg",
        "price": 1839,
        "mrp": 2346,
        "calories": 15,
        "protein": 0,
        "stock": 94
      },
      {
        "id": "1kg-blue-raspberry",
        "size": "1kg",
        "flavor": "Blue Raspberry",
        "unit": "1kg",
        "price": 1899,
        "mrp": 2224,
        "calories": 15,
        "protein": 0,
        "stock": 52
      },
      {
        "id": "1kg-green-apple",
        "size": "1kg",
        "flavor": "Green Apple",
        "unit": "1kg",
        "price": 1959,
        "mrp": 2225,
        "calories": 15,
        "protein": 0,
        "stock": 114
      },
      {
        "id": "1kg-fruit-punch",
        "size": "1kg",
        "flavor": "Fruit Punch",
        "unit": "1kg",
        "price": 1839,
        "mrp": 2424,
        "calories": 15,
        "protein": 0,
        "stock": 20
      },
      {
        "id": "2kg-watermelon",
        "size": "2kg",
        "flavor": "Watermelon",
        "unit": "2kg",
        "price": 3399,
        "mrp": 3982,
        "calories": 15,
        "protein": 0,
        "stock": 18
      },
      {
        "id": "2kg-blue-raspberry",
        "size": "2kg",
        "flavor": "Blue Raspberry",
        "unit": "2kg",
        "price": 3499,
        "mrp": 4081,
        "calories": 15,
        "protein": 0,
        "stock": 51
      },
      {
        "id": "2kg-green-apple",
        "size": "2kg",
        "flavor": "Green Apple",
        "unit": "2kg",
        "price": 3289,
        "mrp": 4363,
        "calories": 15,
        "protein": 0,
        "stock": 99
      },
      {
        "id": "2kg-fruit-punch",
        "size": "2kg",
        "flavor": "Fruit Punch",
        "unit": "2kg",
        "price": 3399,
        "mrp": 4607,
        "calories": 15,
        "protein": 0,
        "stock": 41
      }
    ]
  },
  {
    "id": "ps-9",
    "name": "L-Glutamine Powder",
    "category": "protein-supplements",
    "image": "https://images.unsplash.com/photo-1546483875-ad9014c88eba?auto=format&fit=crop&w=500&q=80",
    "description": "High-quality l-glutamine powder formulated to support muscle recovery and performance.",
    "ingredients": [
      "L-Glutamine Powder"
    ],
    "rating": 4.5,
    "reviewCount": 637,
    "tags": [],
    "variants": [
      {
        "id": "250g",
        "size": "250g",
        "flavor": null,
        "unit": "250g",
        "price": 389,
        "mrp": 543,
        "calories": 0,
        "protein": 0,
        "stock": 47
      },
      {
        "id": "500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 649,
        "mrp": 816,
        "calories": 0,
        "protein": 0,
        "stock": 52
      },
      {
        "id": "1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 1229,
        "mrp": 1383,
        "calories": 0,
        "protein": 0,
        "stock": 65
      },
      {
        "id": "2kg",
        "size": "2kg",
        "flavor": null,
        "unit": "2kg",
        "price": 2209,
        "mrp": 2952,
        "calories": 0,
        "protein": 0,
        "stock": 112
      }
    ]
  },
  {
    "id": "ps-10",
    "name": "Pre-Workout Formula",
    "category": "protein-supplements",
    "image": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=500&q=80",
    "description": "High-quality pre-workout formula formulated to support muscle recovery and performance.",
    "ingredients": [
      "Pre-Workout Formula"
    ],
    "rating": 4.7,
    "reviewCount": 404,
    "tags": [
      "bestseller"
    ],
    "variants": [
      {
        "id": "250g-watermelon",
        "size": "250g",
        "flavor": "Watermelon",
        "unit": "250g",
        "price": 779,
        "mrp": 967,
        "calories": 10,
        "protein": 0,
        "stock": 106
      },
      {
        "id": "250g-blue-raspberry",
        "size": "250g",
        "flavor": "Blue Raspberry",
        "unit": "250g",
        "price": 799,
        "mrp": 994,
        "calories": 10,
        "protein": 0,
        "stock": 117
      },
      {
        "id": "250g-green-apple",
        "size": "250g",
        "flavor": "Green Apple",
        "unit": "250g",
        "price": 759,
        "mrp": 870,
        "calories": 10,
        "protein": 0,
        "stock": 70
      },
      {
        "id": "250g-fruit-punch",
        "size": "250g",
        "flavor": "Fruit Punch",
        "unit": "250g",
        "price": 779,
        "mrp": 1080,
        "calories": 10,
        "protein": 0,
        "stock": 75
      },
      {
        "id": "500g-watermelon",
        "size": "500g",
        "flavor": "Watermelon",
        "unit": "500g",
        "price": 1339,
        "mrp": 1622,
        "calories": 10,
        "protein": 0,
        "stock": 98
      },
      {
        "id": "500g-blue-raspberry",
        "size": "500g",
        "flavor": "Blue Raspberry",
        "unit": "500g",
        "price": 1259,
        "mrp": 1661,
        "calories": 10,
        "protein": 0,
        "stock": 42
      },
      {
        "id": "500g-green-apple",
        "size": "500g",
        "flavor": "Green Apple",
        "unit": "500g",
        "price": 1299,
        "mrp": 1782,
        "calories": 10,
        "protein": 0,
        "stock": 114
      },
      {
        "id": "500g-fruit-punch",
        "size": "500g",
        "flavor": "Fruit Punch",
        "unit": "500g",
        "price": 1339,
        "mrp": 1783,
        "calories": 10,
        "protein": 0,
        "stock": 89
      },
      {
        "id": "1kg-watermelon",
        "size": "1kg",
        "flavor": "Watermelon",
        "unit": "1kg",
        "price": 2389,
        "mrp": 3115,
        "calories": 10,
        "protein": 0,
        "stock": 37
      },
      {
        "id": "1kg-blue-raspberry",
        "size": "1kg",
        "flavor": "Blue Raspberry",
        "unit": "1kg",
        "price": 2469,
        "mrp": 3194,
        "calories": 10,
        "protein": 0,
        "stock": 45
      },
      {
        "id": "1kg-green-apple",
        "size": "1kg",
        "flavor": "Green Apple",
        "unit": "1kg",
        "price": 2539,
        "mrp": 2889,
        "calories": 10,
        "protein": 0,
        "stock": 21
      },
      {
        "id": "1kg-fruit-punch",
        "size": "1kg",
        "flavor": "Fruit Punch",
        "unit": "1kg",
        "price": 2389,
        "mrp": 2849,
        "calories": 10,
        "protein": 0,
        "stock": 90
      },
      {
        "id": "2kg-watermelon",
        "size": "2kg",
        "flavor": "Watermelon",
        "unit": "2kg",
        "price": 4419,
        "mrp": 5495,
        "calories": 10,
        "protein": 0,
        "stock": 118
      },
      {
        "id": "2kg-blue-raspberry",
        "size": "2kg",
        "flavor": "Blue Raspberry",
        "unit": "2kg",
        "price": 4549,
        "mrp": 5840,
        "calories": 10,
        "protein": 0,
        "stock": 34
      },
      {
        "id": "2kg-green-apple",
        "size": "2kg",
        "flavor": "Green Apple",
        "unit": "2kg",
        "price": 4279,
        "mrp": 5813,
        "calories": 10,
        "protein": 0,
        "stock": 24
      },
      {
        "id": "2kg-fruit-punch",
        "size": "2kg",
        "flavor": "Fruit Punch",
        "unit": "2kg",
        "price": 4419,
        "mrp": 5812,
        "calories": 10,
        "protein": 0,
        "stock": 47
      }
    ]
  },
  {
    "id": "ps-11",
    "name": "ZMA Recovery Formula",
    "category": "protein-supplements",
    "image": "https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&w=480&q=80",
    "description": "High-quality zma recovery formula formulated to support muscle recovery and performance.",
    "ingredients": [
      "ZMA Recovery Formula"
    ],
    "rating": 4.8,
    "reviewCount": 302,
    "tags": [],
    "variants": [
      {
        "id": "250g",
        "size": "250g",
        "flavor": null,
        "unit": "250g",
        "price": 449,
        "mrp": 599,
        "calories": 0,
        "protein": 0,
        "stock": 87
      },
      {
        "id": "500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 749,
        "mrp": 990,
        "calories": 0,
        "protein": 0,
        "stock": 82
      },
      {
        "id": "1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 1419,
        "mrp": 1828,
        "calories": 0,
        "protein": 0,
        "stock": 21
      },
      {
        "id": "2kg",
        "size": "2kg",
        "flavor": null,
        "unit": "2kg",
        "price": 2549,
        "mrp": 3099,
        "calories": 0,
        "protein": 0,
        "stock": 102
      }
    ]
  },
  {
    "id": "ps-12",
    "name": "Multivitamin for Athletes",
    "category": "protein-supplements",
    "image": "https://images.unsplash.com/photo-1555243896-c709bfa0b564?auto=format&fit=crop&w=500&q=80",
    "description": "High-quality multivitamin for athletes formulated to support muscle recovery and performance.",
    "ingredients": [
      "Multivitamin for Athletes"
    ],
    "rating": 4.8,
    "reviewCount": 99,
    "tags": [
      "trending"
    ],
    "variants": [
      {
        "id": "250g",
        "size": "250g",
        "flavor": null,
        "unit": "250g",
        "price": 359,
        "mrp": 479,
        "calories": 0,
        "protein": 0,
        "stock": 67
      },
      {
        "id": "500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 599,
        "mrp": 823,
        "calories": 0,
        "protein": 0,
        "stock": 103
      },
      {
        "id": "1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 1139,
        "mrp": 1407,
        "calories": 0,
        "protein": 0,
        "stock": 78
      },
      {
        "id": "2kg",
        "size": "2kg",
        "flavor": null,
        "unit": "2kg",
        "price": 2039,
        "mrp": 2551,
        "calories": 0,
        "protein": 0,
        "stock": 17
      }
    ]
  },
  {
    "id": "ps-13",
    "name": "Collagen Protein Powder",
    "category": "protein-supplements",
    "image": "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=500&q=80",
    "description": "High-quality collagen protein powder formulated to support muscle recovery and performance.",
    "ingredients": [
      "Collagen Protein Powder"
    ],
    "rating": 4.8,
    "reviewCount": 41,
    "tags": [],
    "variants": [
      {
        "id": "250g-unflavored",
        "size": "250g",
        "flavor": "Unflavored",
        "unit": "250g",
        "price": 759,
        "mrp": 1008,
        "calories": 70,
        "protein": 18,
        "stock": 110
      },
      {
        "id": "250g-vanilla",
        "size": "250g",
        "flavor": "Vanilla",
        "unit": "250g",
        "price": 859,
        "mrp": 975,
        "calories": 70,
        "protein": 18,
        "stock": 119
      },
      {
        "id": "250g-chocolate",
        "size": "250g",
        "flavor": "Chocolate",
        "unit": "250g",
        "price": 809,
        "mrp": 984,
        "calories": 70,
        "protein": 18,
        "stock": 104
      },
      {
        "id": "250g-coffee",
        "size": "250g",
        "flavor": "Coffee",
        "unit": "250g",
        "price": 839,
        "mrp": 980,
        "calories": 70,
        "protein": 18,
        "stock": 71
      },
      {
        "id": "500g-unflavored",
        "size": "500g",
        "flavor": "Unflavored",
        "unit": "500g",
        "price": 1259,
        "mrp": 1711,
        "calories": 70,
        "protein": 18,
        "stock": 91
      },
      {
        "id": "500g-vanilla",
        "size": "500g",
        "flavor": "Vanilla",
        "unit": "500g",
        "price": 1359,
        "mrp": 1857,
        "calories": 70,
        "protein": 18,
        "stock": 68
      },
      {
        "id": "500g-chocolate",
        "size": "500g",
        "flavor": "Chocolate",
        "unit": "500g",
        "price": 1399,
        "mrp": 1583,
        "calories": 70,
        "protein": 18,
        "stock": 101
      },
      {
        "id": "500g-coffee",
        "size": "500g",
        "flavor": "Coffee",
        "unit": "500g",
        "price": 1439,
        "mrp": 1692,
        "calories": 70,
        "protein": 18,
        "stock": 73
      },
      {
        "id": "1kg-unflavored",
        "size": "1kg",
        "flavor": "Unflavored",
        "unit": "1kg",
        "price": 2389,
        "mrp": 3172,
        "calories": 70,
        "protein": 18,
        "stock": 54
      },
      {
        "id": "1kg-vanilla",
        "size": "1kg",
        "flavor": "Vanilla",
        "unit": "1kg",
        "price": 2659,
        "mrp": 3482,
        "calories": 70,
        "protein": 18,
        "stock": 24
      },
      {
        "id": "1kg-chocolate",
        "size": "1kg",
        "flavor": "Chocolate",
        "unit": "1kg",
        "price": 2739,
        "mrp": 3394,
        "calories": 70,
        "protein": 18,
        "stock": 102
      },
      {
        "id": "1kg-coffee",
        "size": "1kg",
        "flavor": "Coffee",
        "unit": "1kg",
        "price": 2579,
        "mrp": 3077,
        "calories": 70,
        "protein": 18,
        "stock": 98
      },
      {
        "id": "2kg-unflavored",
        "size": "2kg",
        "flavor": "Unflavored",
        "unit": "2kg",
        "price": 4279,
        "mrp": 5290,
        "calories": 70,
        "protein": 18,
        "stock": 87
      },
      {
        "id": "2kg-vanilla",
        "size": "2kg",
        "flavor": "Vanilla",
        "unit": "2kg",
        "price": 4899,
        "mrp": 6673,
        "calories": 70,
        "protein": 18,
        "stock": 106
      },
      {
        "id": "2kg-chocolate",
        "size": "2kg",
        "flavor": "Chocolate",
        "unit": "2kg",
        "price": 4609,
        "mrp": 6156,
        "calories": 70,
        "protein": 18,
        "stock": 23
      },
      {
        "id": "2kg-coffee",
        "size": "2kg",
        "flavor": "Coffee",
        "unit": "2kg",
        "price": 4759,
        "mrp": 6113,
        "calories": 70,
        "protein": 18,
        "stock": 114
      }
    ]
  },
  {
    "id": "ps-14",
    "name": "Protein Water Drink",
    "category": "protein-supplements",
    "image": "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=500&q=80",
    "description": "Refreshing protein water drink, ready to drink and packed with nutrients for your active lifestyle.",
    "ingredients": [
      "Protein Water Drink"
    ],
    "rating": 4.4,
    "reviewCount": 885,
    "tags": [
      "new"
    ],
    "variants": [
      {
        "id": "250ml-lemon",
        "size": "250ml",
        "flavor": "Lemon",
        "unit": "250ml",
        "price": 59,
        "mrp": 76,
        "calories": 90,
        "protein": 20,
        "stock": 77
      },
      {
        "id": "250ml-berry",
        "size": "250ml",
        "flavor": "Berry",
        "unit": "250ml",
        "price": 59,
        "mrp": 75,
        "calories": 90,
        "protein": 20,
        "stock": 34
      },
      {
        "id": "250ml-orange",
        "size": "250ml",
        "flavor": "Orange",
        "unit": "250ml",
        "price": 59,
        "mrp": 78,
        "calories": 90,
        "protein": 20,
        "stock": 76
      },
      {
        "id": "250ml-watermelon",
        "size": "250ml",
        "flavor": "Watermelon",
        "unit": "250ml",
        "price": 59,
        "mrp": 74,
        "calories": 90,
        "protein": 20,
        "stock": 83
      },
      {
        "id": "500ml-lemon",
        "size": "500ml",
        "flavor": "Lemon",
        "unit": "500ml",
        "price": 99,
        "mrp": 127,
        "calories": 90,
        "protein": 20,
        "stock": 94
      },
      {
        "id": "500ml-berry",
        "size": "500ml",
        "flavor": "Berry",
        "unit": "500ml",
        "price": 99,
        "mrp": 133,
        "calories": 90,
        "protein": 20,
        "stock": 112
      },
      {
        "id": "500ml-orange",
        "size": "500ml",
        "flavor": "Orange",
        "unit": "500ml",
        "price": 99,
        "mrp": 127,
        "calories": 90,
        "protein": 20,
        "stock": 76
      },
      {
        "id": "500ml-watermelon",
        "size": "500ml",
        "flavor": "Watermelon",
        "unit": "500ml",
        "price": 99,
        "mrp": 114,
        "calories": 90,
        "protein": 20,
        "stock": 118
      },
      {
        "id": "1l-lemon",
        "size": "1L",
        "flavor": "Lemon",
        "unit": "1L",
        "price": 169,
        "mrp": 209,
        "calories": 90,
        "protein": 20,
        "stock": 54
      },
      {
        "id": "1l-berry",
        "size": "1L",
        "flavor": "Berry",
        "unit": "1L",
        "price": 179,
        "mrp": 220,
        "calories": 90,
        "protein": 20,
        "stock": 91
      },
      {
        "id": "1l-orange",
        "size": "1L",
        "flavor": "Orange",
        "unit": "1L",
        "price": 179,
        "mrp": 215,
        "calories": 90,
        "protein": 20,
        "stock": 35
      },
      {
        "id": "1l-watermelon",
        "size": "1L",
        "flavor": "Watermelon",
        "unit": "1L",
        "price": 169,
        "mrp": 233,
        "calories": 90,
        "protein": 20,
        "stock": 41
      },
      {
        "id": "6-x-250ml-lemon",
        "size": "6 x 250ml",
        "flavor": "Lemon",
        "unit": "6 x 250ml",
        "price": 509,
        "mrp": 690,
        "calories": 90,
        "protein": 20,
        "stock": 59
      },
      {
        "id": "6-x-250ml-berry",
        "size": "6 x 250ml",
        "flavor": "Berry",
        "unit": "6 x 250ml",
        "price": 529,
        "mrp": 688,
        "calories": 90,
        "protein": 20,
        "stock": 93
      },
      {
        "id": "6-x-250ml-orange",
        "size": "6 x 250ml",
        "flavor": "Orange",
        "unit": "6 x 250ml",
        "price": 499,
        "mrp": 647,
        "calories": 90,
        "protein": 20,
        "stock": 110
      },
      {
        "id": "6-x-250ml-watermelon",
        "size": "6 x 250ml",
        "flavor": "Watermelon",
        "unit": "6 x 250ml",
        "price": 509,
        "mrp": 613,
        "calories": 90,
        "protein": 20,
        "stock": 119
      }
    ]
  },
  {
    "id": "hs-1",
    "name": "Chocolate Protein Bar",
    "category": "healthy-snacks",
    "image": "https://images.unsplash.com/photo-1575377427642-087cf684ad5e?auto=format&fit=crop&w=500&q=80",
    "description": "Convenient, great-tasting chocolate protein bar for fuel on the go.",
    "ingredients": [
      "Chocolate Protein Bar"
    ],
    "rating": 4.5,
    "reviewCount": 134,
    "tags": [],
    "variants": [
      {
        "id": "single-60g-",
        "size": "Single (60g)",
        "flavor": null,
        "unit": "60g",
        "price": 79,
        "mrp": 108,
        "calories": 200,
        "protein": 20,
        "stock": 84
      },
      {
        "id": "box-of-6",
        "size": "Box of 6",
        "flavor": null,
        "unit": "6 bars",
        "price": 429,
        "mrp": 490,
        "calories": 200,
        "protein": 20,
        "stock": 97
      },
      {
        "id": "box-of-12",
        "size": "Box of 12",
        "flavor": null,
        "unit": "12 bars",
        "price": 809,
        "mrp": 1129,
        "calories": 200,
        "protein": 20,
        "stock": 28
      },
      {
        "id": "box-of-24",
        "size": "Box of 24",
        "flavor": null,
        "unit": "24 bars",
        "price": 1499,
        "mrp": 1695,
        "calories": 200,
        "protein": 20,
        "stock": 104
      }
    ]
  },
  {
    "id": "hs-2",
    "name": "Peanut Butter Protein Bar",
    "category": "healthy-snacks",
    "image": "https://images.unsplash.com/photo-1568051243851-f9b136146e97?auto=format&fit=crop&w=500&q=80",
    "description": "Convenient, great-tasting peanut butter protein bar for fuel on the go.",
    "ingredients": [
      "Peanut Butter Protein Bar"
    ],
    "rating": 4.3,
    "reviewCount": 808,
    "tags": [],
    "variants": [
      {
        "id": "single-60g-",
        "size": "Single (60g)",
        "flavor": null,
        "unit": "60g",
        "price": 89,
        "mrp": 116,
        "calories": 210,
        "protein": 22,
        "stock": 83
      },
      {
        "id": "box-of-6",
        "size": "Box of 6",
        "flavor": null,
        "unit": "6 bars",
        "price": 459,
        "mrp": 565,
        "calories": 210,
        "protein": 22,
        "stock": 99
      },
      {
        "id": "box-of-12",
        "size": "Box of 12",
        "flavor": null,
        "unit": "12 bars",
        "price": 869,
        "mrp": 1202,
        "calories": 210,
        "protein": 22,
        "stock": 48
      },
      {
        "id": "box-of-24",
        "size": "Box of 24",
        "flavor": null,
        "unit": "24 bars",
        "price": 1619,
        "mrp": 2143,
        "calories": 210,
        "protein": 22,
        "stock": 101
      }
    ]
  },
  {
    "id": "hs-3",
    "name": "Roasted Almonds",
    "category": "healthy-snacks",
    "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=520&q=80",
    "description": "Premium quality roasted almonds, carefully sourced and packed fresh to support your daily nutrition goals.",
    "ingredients": [
      "Roasted Almonds"
    ],
    "rating": 4.1,
    "reviewCount": 322,
    "tags": [],
    "variants": [
      {
        "id": "250g-plain",
        "size": "250g",
        "flavor": "Plain",
        "unit": "250g",
        "price": 269,
        "mrp": 353,
        "calories": 580,
        "protein": 21,
        "stock": 93
      },
      {
        "id": "250g-salted",
        "size": "250g",
        "flavor": "Salted",
        "unit": "250g",
        "price": 279,
        "mrp": 358,
        "calories": 580,
        "protein": 21,
        "stock": 118
      },
      {
        "id": "250g-peri-peri",
        "size": "250g",
        "flavor": "Peri Peri",
        "unit": "250g",
        "price": 259,
        "mrp": 296,
        "calories": 580,
        "protein": 21,
        "stock": 51
      },
      {
        "id": "250g-honey-roasted",
        "size": "250g",
        "flavor": "Honey Roasted",
        "unit": "250g",
        "price": 269,
        "mrp": 309,
        "calories": 580,
        "protein": 21,
        "stock": 90
      },
      {
        "id": "500g-plain",
        "size": "500g",
        "flavor": "Plain",
        "unit": "500g",
        "price": 459,
        "mrp": 584,
        "calories": 580,
        "protein": 21,
        "stock": 64
      },
      {
        "id": "500g-salted",
        "size": "500g",
        "flavor": "Salted",
        "unit": "500g",
        "price": 439,
        "mrp": 500,
        "calories": 580,
        "protein": 21,
        "stock": 79
      },
      {
        "id": "500g-peri-peri",
        "size": "500g",
        "flavor": "Peri Peri",
        "unit": "500g",
        "price": 449,
        "mrp": 565,
        "calories": 580,
        "protein": 21,
        "stock": 74
      },
      {
        "id": "500g-honey-roasted",
        "size": "500g",
        "flavor": "Honey Roasted",
        "unit": "500g",
        "price": 459,
        "mrp": 635,
        "calories": 580,
        "protein": 21,
        "stock": 79
      },
      {
        "id": "1kg-plain",
        "size": "1kg",
        "flavor": "Plain",
        "unit": "1kg",
        "price": 829,
        "mrp": 1070,
        "calories": 580,
        "protein": 21,
        "stock": 117
      },
      {
        "id": "1kg-salted",
        "size": "1kg",
        "flavor": "Salted",
        "unit": "1kg",
        "price": 859,
        "mrp": 1014,
        "calories": 580,
        "protein": 21,
        "stock": 81
      },
      {
        "id": "1kg-peri-peri",
        "size": "1kg",
        "flavor": "Peri Peri",
        "unit": "1kg",
        "price": 879,
        "mrp": 1010,
        "calories": 580,
        "protein": 21,
        "stock": 93
      },
      {
        "id": "1kg-honey-roasted",
        "size": "1kg",
        "flavor": "Honey Roasted",
        "unit": "1kg",
        "price": 829,
        "mrp": 936,
        "calories": 580,
        "protein": 21,
        "stock": 96
      },
      {
        "id": "2kg-plain",
        "size": "2kg",
        "flavor": "Plain",
        "unit": "2kg",
        "price": 1529,
        "mrp": 1968,
        "calories": 580,
        "protein": 21,
        "stock": 40
      },
      {
        "id": "2kg-salted",
        "size": "2kg",
        "flavor": "Salted",
        "unit": "2kg",
        "price": 1579,
        "mrp": 1933,
        "calories": 580,
        "protein": 21,
        "stock": 36
      },
      {
        "id": "2kg-peri-peri",
        "size": "2kg",
        "flavor": "Peri Peri",
        "unit": "2kg",
        "price": 1479,
        "mrp": 1931,
        "calories": 580,
        "protein": 21,
        "stock": 50
      },
      {
        "id": "2kg-honey-roasted",
        "size": "2kg",
        "flavor": "Honey Roasted",
        "unit": "2kg",
        "price": 1529,
        "mrp": 2126,
        "calories": 580,
        "protein": 21,
        "stock": 92
      }
    ]
  },
  {
    "id": "hs-4",
    "name": "Roasted Cashews",
    "category": "healthy-snacks",
    "image": "https://images.unsplash.com/photo-1567892737950-30c4db37cd89?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality roasted cashews, carefully sourced and packed fresh to support your daily nutrition goals.",
    "ingredients": [
      "Roasted Cashews"
    ],
    "rating": 4.7,
    "reviewCount": 761,
    "tags": [
      "trending"
    ],
    "variants": [
      {
        "id": "250g-plain",
        "size": "250g",
        "flavor": "Plain",
        "unit": "250g",
        "price": 289,
        "mrp": 392,
        "calories": 550,
        "protein": 18,
        "stock": 15
      },
      {
        "id": "250g-salted",
        "size": "250g",
        "flavor": "Salted",
        "unit": "250g",
        "price": 299,
        "mrp": 390,
        "calories": 550,
        "protein": 18,
        "stock": 60
      },
      {
        "id": "250g-peri-peri",
        "size": "250g",
        "flavor": "Peri Peri",
        "unit": "250g",
        "price": 279,
        "mrp": 355,
        "calories": 550,
        "protein": 18,
        "stock": 59
      },
      {
        "id": "250g-honey-roasted",
        "size": "250g",
        "flavor": "Honey Roasted",
        "unit": "250g",
        "price": 289,
        "mrp": 397,
        "calories": 550,
        "protein": 18,
        "stock": 26
      },
      {
        "id": "500g-plain",
        "size": "500g",
        "flavor": "Plain",
        "unit": "500g",
        "price": 489,
        "mrp": 550,
        "calories": 550,
        "protein": 18,
        "stock": 86
      },
      {
        "id": "500g-salted",
        "size": "500g",
        "flavor": "Salted",
        "unit": "500g",
        "price": 469,
        "mrp": 540,
        "calories": 550,
        "protein": 18,
        "stock": 105
      },
      {
        "id": "500g-peri-peri",
        "size": "500g",
        "flavor": "Peri Peri",
        "unit": "500g",
        "price": 479,
        "mrp": 560,
        "calories": 550,
        "protein": 18,
        "stock": 118
      },
      {
        "id": "500g-honey-roasted",
        "size": "500g",
        "flavor": "Honey Roasted",
        "unit": "500g",
        "price": 489,
        "mrp": 596,
        "calories": 550,
        "protein": 18,
        "stock": 100
      },
      {
        "id": "1kg-plain",
        "size": "1kg",
        "flavor": "Plain",
        "unit": "1kg",
        "price": 879,
        "mrp": 1014,
        "calories": 550,
        "protein": 18,
        "stock": 114
      },
      {
        "id": "1kg-salted",
        "size": "1kg",
        "flavor": "Salted",
        "unit": "1kg",
        "price": 909,
        "mrp": 1270,
        "calories": 550,
        "protein": 18,
        "stock": 115
      },
      {
        "id": "1kg-peri-peri",
        "size": "1kg",
        "flavor": "Peri Peri",
        "unit": "1kg",
        "price": 939,
        "mrp": 1058,
        "calories": 550,
        "protein": 18,
        "stock": 30
      },
      {
        "id": "1kg-honey-roasted",
        "size": "1kg",
        "flavor": "Honey Roasted",
        "unit": "1kg",
        "price": 879,
        "mrp": 1204,
        "calories": 550,
        "protein": 18,
        "stock": 17
      },
      {
        "id": "2kg-plain",
        "size": "2kg",
        "flavor": "Plain",
        "unit": "2kg",
        "price": 1629,
        "mrp": 2139,
        "calories": 550,
        "protein": 18,
        "stock": 53
      },
      {
        "id": "2kg-salted",
        "size": "2kg",
        "flavor": "Salted",
        "unit": "2kg",
        "price": 1679,
        "mrp": 2044,
        "calories": 550,
        "protein": 18,
        "stock": 18
      },
      {
        "id": "2kg-peri-peri",
        "size": "2kg",
        "flavor": "Peri Peri",
        "unit": "2kg",
        "price": 1579,
        "mrp": 2109,
        "calories": 550,
        "protein": 18,
        "stock": 59
      },
      {
        "id": "2kg-honey-roasted",
        "size": "2kg",
        "flavor": "Honey Roasted",
        "unit": "2kg",
        "price": 1629,
        "mrp": 2098,
        "calories": 550,
        "protein": 18,
        "stock": 72
      }
    ]
  },
  {
    "id": "hs-5",
    "name": "Roasted Chickpeas",
    "category": "healthy-snacks",
    "image": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality roasted chickpeas, carefully sourced and packed fresh to support your daily nutrition goals.",
    "ingredients": [
      "Roasted Chickpeas"
    ],
    "rating": 4.2,
    "reviewCount": 408,
    "tags": [
      "bestseller"
    ],
    "variants": [
      {
        "id": "250g-peri-peri",
        "size": "250g",
        "flavor": "Peri Peri",
        "unit": "250g",
        "price": 89,
        "mrp": 104,
        "calories": 140,
        "protein": 6,
        "stock": 66
      },
      {
        "id": "250g-classic-salted",
        "size": "250g",
        "flavor": "Classic Salted",
        "unit": "250g",
        "price": 89,
        "mrp": 104,
        "calories": 140,
        "protein": 6,
        "stock": 101
      },
      {
        "id": "250g-tangy",
        "size": "250g",
        "flavor": "Tangy",
        "unit": "250g",
        "price": 89,
        "mrp": 107,
        "calories": 140,
        "protein": 6,
        "stock": 97
      },
      {
        "id": "250g-cheese",
        "size": "250g",
        "flavor": "Cheese",
        "unit": "250g",
        "price": 89,
        "mrp": 104,
        "calories": 140,
        "protein": 6,
        "stock": 71
      },
      {
        "id": "500g-peri-peri",
        "size": "500g",
        "flavor": "Peri Peri",
        "unit": "500g",
        "price": 149,
        "mrp": 183,
        "calories": 140,
        "protein": 6,
        "stock": 71
      },
      {
        "id": "500g-classic-salted",
        "size": "500g",
        "flavor": "Classic Salted",
        "unit": "500g",
        "price": 149,
        "mrp": 192,
        "calories": 140,
        "protein": 6,
        "stock": 47
      },
      {
        "id": "500g-tangy",
        "size": "500g",
        "flavor": "Tangy",
        "unit": "500g",
        "price": 149,
        "mrp": 181,
        "calories": 140,
        "protein": 6,
        "stock": 111
      },
      {
        "id": "500g-cheese",
        "size": "500g",
        "flavor": "Cheese",
        "unit": "500g",
        "price": 149,
        "mrp": 206,
        "calories": 140,
        "protein": 6,
        "stock": 16
      },
      {
        "id": "1kg-peri-peri",
        "size": "1kg",
        "flavor": "Peri Peri",
        "unit": "1kg",
        "price": 279,
        "mrp": 382,
        "calories": 140,
        "protein": 6,
        "stock": 90
      },
      {
        "id": "1kg-classic-salted",
        "size": "1kg",
        "flavor": "Classic Salted",
        "unit": "1kg",
        "price": 289,
        "mrp": 402,
        "calories": 140,
        "protein": 6,
        "stock": 114
      },
      {
        "id": "1kg-tangy",
        "size": "1kg",
        "flavor": "Tangy",
        "unit": "1kg",
        "price": 289,
        "mrp": 327,
        "calories": 140,
        "protein": 6,
        "stock": 78
      },
      {
        "id": "1kg-cheese",
        "size": "1kg",
        "flavor": "Cheese",
        "unit": "1kg",
        "price": 279,
        "mrp": 351,
        "calories": 140,
        "protein": 6,
        "stock": 50
      },
      {
        "id": "2kg-peri-peri",
        "size": "2kg",
        "flavor": "Peri Peri",
        "unit": "2kg",
        "price": 509,
        "mrp": 620,
        "calories": 140,
        "protein": 6,
        "stock": 117
      },
      {
        "id": "2kg-classic-salted",
        "size": "2kg",
        "flavor": "Classic Salted",
        "unit": "2kg",
        "price": 529,
        "mrp": 595,
        "calories": 140,
        "protein": 6,
        "stock": 80
      },
      {
        "id": "2kg-tangy",
        "size": "2kg",
        "flavor": "Tangy",
        "unit": "2kg",
        "price": 489,
        "mrp": 652,
        "calories": 140,
        "protein": 6,
        "stock": 67
      },
      {
        "id": "2kg-cheese",
        "size": "2kg",
        "flavor": "Cheese",
        "unit": "2kg",
        "price": 509,
        "mrp": 689,
        "calories": 140,
        "protein": 6,
        "stock": 48
      }
    ]
  },
  {
    "id": "hs-6",
    "name": "Roasted Makhana Snack",
    "category": "healthy-snacks",
    "image": "https://images.unsplash.com/photo-1615485500834-bc10199bc727?auto=format&fit=crop&w=480&q=80",
    "description": "Premium quality roasted makhana snack, carefully sourced and packed fresh to support your daily nutrition goals.",
    "ingredients": [
      "Roasted Makhana Snack"
    ],
    "rating": 4.6,
    "reviewCount": 823,
    "tags": [],
    "variants": [
      {
        "id": "250g-classic-salted",
        "size": "250g",
        "flavor": "Classic Salted",
        "unit": "250g",
        "price": 119,
        "mrp": 134,
        "calories": 130,
        "protein": 4,
        "stock": 72
      },
      {
        "id": "250g-peri-peri",
        "size": "250g",
        "flavor": "Peri Peri",
        "unit": "250g",
        "price": 119,
        "mrp": 159,
        "calories": 130,
        "protein": 4,
        "stock": 48
      },
      {
        "id": "250g-cheese",
        "size": "250g",
        "flavor": "Cheese",
        "unit": "250g",
        "price": 119,
        "mrp": 165,
        "calories": 130,
        "protein": 4,
        "stock": 46
      },
      {
        "id": "250g-pudina",
        "size": "250g",
        "flavor": "Pudina",
        "unit": "250g",
        "price": 119,
        "mrp": 154,
        "calories": 130,
        "protein": 4,
        "stock": 99
      },
      {
        "id": "500g-classic-salted",
        "size": "500g",
        "flavor": "Classic Salted",
        "unit": "500g",
        "price": 199,
        "mrp": 248,
        "calories": 130,
        "protein": 4,
        "stock": 48
      },
      {
        "id": "500g-peri-peri",
        "size": "500g",
        "flavor": "Peri Peri",
        "unit": "500g",
        "price": 189,
        "mrp": 241,
        "calories": 130,
        "protein": 4,
        "stock": 81
      },
      {
        "id": "500g-cheese",
        "size": "500g",
        "flavor": "Cheese",
        "unit": "500g",
        "price": 199,
        "mrp": 270,
        "calories": 130,
        "protein": 4,
        "stock": 79
      },
      {
        "id": "500g-pudina",
        "size": "500g",
        "flavor": "Pudina",
        "unit": "500g",
        "price": 199,
        "mrp": 236,
        "calories": 130,
        "protein": 4,
        "stock": 82
      },
      {
        "id": "1kg-classic-salted",
        "size": "1kg",
        "flavor": "Classic Salted",
        "unit": "1kg",
        "price": 369,
        "mrp": 452,
        "calories": 130,
        "protein": 4,
        "stock": 91
      },
      {
        "id": "1kg-peri-peri",
        "size": "1kg",
        "flavor": "Peri Peri",
        "unit": "1kg",
        "price": 379,
        "mrp": 433,
        "calories": 130,
        "protein": 4,
        "stock": 45
      },
      {
        "id": "1kg-cheese",
        "size": "1kg",
        "flavor": "Cheese",
        "unit": "1kg",
        "price": 389,
        "mrp": 487,
        "calories": 130,
        "protein": 4,
        "stock": 79
      },
      {
        "id": "1kg-pudina",
        "size": "1kg",
        "flavor": "Pudina",
        "unit": "1kg",
        "price": 369,
        "mrp": 491,
        "calories": 130,
        "protein": 4,
        "stock": 112
      },
      {
        "id": "2kg-classic-salted",
        "size": "2kg",
        "flavor": "Classic Salted",
        "unit": "2kg",
        "price": 679,
        "mrp": 882,
        "calories": 130,
        "protein": 4,
        "stock": 34
      },
      {
        "id": "2kg-peri-peri",
        "size": "2kg",
        "flavor": "Peri Peri",
        "unit": "2kg",
        "price": 699,
        "mrp": 875,
        "calories": 130,
        "protein": 4,
        "stock": 76
      },
      {
        "id": "2kg-cheese",
        "size": "2kg",
        "flavor": "Cheese",
        "unit": "2kg",
        "price": 659,
        "mrp": 739,
        "calories": 130,
        "protein": 4,
        "stock": 73
      },
      {
        "id": "2kg-pudina",
        "size": "2kg",
        "flavor": "Pudina",
        "unit": "2kg",
        "price": 679,
        "mrp": 922,
        "calories": 130,
        "protein": 4,
        "stock": 81
      }
    ]
  },
  {
    "id": "hs-7",
    "name": "Trail Mix Deluxe",
    "category": "healthy-snacks",
    "image": "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality trail mix deluxe, carefully sourced and packed fresh to support your daily nutrition goals.",
    "ingredients": [
      "Trail Mix Deluxe"
    ],
    "rating": 4.6,
    "reviewCount": 478,
    "tags": [
      "new"
    ],
    "variants": [
      {
        "id": "250g",
        "size": "250g",
        "flavor": null,
        "unit": "250g",
        "price": 239,
        "mrp": 299,
        "calories": 180,
        "protein": 6,
        "stock": 115
      },
      {
        "id": "500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 399,
        "mrp": 453,
        "calories": 180,
        "protein": 6,
        "stock": 115
      },
      {
        "id": "1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 759,
        "mrp": 872,
        "calories": 180,
        "protein": 6,
        "stock": 101
      },
      {
        "id": "2kg",
        "size": "2kg",
        "flavor": null,
        "unit": "2kg",
        "price": 1359,
        "mrp": 1707,
        "calories": 180,
        "protein": 6,
        "stock": 62
      }
    ]
  },
  {
    "id": "hs-8",
    "name": "Granola Clusters",
    "category": "healthy-snacks",
    "image": "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=480&q=80",
    "description": "Premium quality granola clusters, carefully sourced and packed fresh to support your daily nutrition goals.",
    "ingredients": [
      "Granola Clusters"
    ],
    "rating": 4.7,
    "reviewCount": 278,
    "tags": [
      "trending"
    ],
    "variants": [
      {
        "id": "250g-original",
        "size": "250g",
        "flavor": "Original",
        "unit": "250g",
        "price": 189,
        "mrp": 233,
        "calories": 200,
        "protein": 5,
        "stock": 95
      },
      {
        "id": "250g-chocolate",
        "size": "250g",
        "flavor": "Chocolate",
        "unit": "250g",
        "price": 199,
        "mrp": 244,
        "calories": 200,
        "protein": 5,
        "stock": 56
      },
      {
        "id": "250g-fruit-nut",
        "size": "250g",
        "flavor": "Fruit & Nut",
        "unit": "250g",
        "price": 189,
        "mrp": 252,
        "calories": 200,
        "protein": 5,
        "stock": 75
      },
      {
        "id": "250g-honey",
        "size": "250g",
        "flavor": "Honey",
        "unit": "250g",
        "price": 189,
        "mrp": 255,
        "calories": 200,
        "protein": 5,
        "stock": 17
      },
      {
        "id": "500g-original",
        "size": "500g",
        "flavor": "Original",
        "unit": "500g",
        "price": 329,
        "mrp": 413,
        "calories": 200,
        "protein": 5,
        "stock": 24
      },
      {
        "id": "500g-chocolate",
        "size": "500g",
        "flavor": "Chocolate",
        "unit": "500g",
        "price": 309,
        "mrp": 428,
        "calories": 200,
        "protein": 5,
        "stock": 71
      },
      {
        "id": "500g-fruit-nut",
        "size": "500g",
        "flavor": "Fruit & Nut",
        "unit": "500g",
        "price": 319,
        "mrp": 415,
        "calories": 200,
        "protein": 5,
        "stock": 115
      },
      {
        "id": "500g-honey",
        "size": "500g",
        "flavor": "Honey",
        "unit": "500g",
        "price": 329,
        "mrp": 381,
        "calories": 200,
        "protein": 5,
        "stock": 110
      },
      {
        "id": "1kg-original",
        "size": "1kg",
        "flavor": "Original",
        "unit": "1kg",
        "price": 589,
        "mrp": 733,
        "calories": 200,
        "protein": 5,
        "stock": 89
      },
      {
        "id": "1kg-chocolate",
        "size": "1kg",
        "flavor": "Chocolate",
        "unit": "1kg",
        "price": 609,
        "mrp": 726,
        "calories": 200,
        "protein": 5,
        "stock": 105
      },
      {
        "id": "1kg-fruit-nut",
        "size": "1kg",
        "flavor": "Fruit & Nut",
        "unit": "1kg",
        "price": 629,
        "mrp": 822,
        "calories": 200,
        "protein": 5,
        "stock": 30
      },
      {
        "id": "1kg-honey",
        "size": "1kg",
        "flavor": "Honey",
        "unit": "1kg",
        "price": 589,
        "mrp": 759,
        "calories": 200,
        "protein": 5,
        "stock": 60
      },
      {
        "id": "2kg-original",
        "size": "2kg",
        "flavor": "Original",
        "unit": "2kg",
        "price": 1089,
        "mrp": 1515,
        "calories": 200,
        "protein": 5,
        "stock": 24
      },
      {
        "id": "2kg-chocolate",
        "size": "2kg",
        "flavor": "Chocolate",
        "unit": "2kg",
        "price": 1119,
        "mrp": 1381,
        "calories": 200,
        "protein": 5,
        "stock": 31
      },
      {
        "id": "2kg-fruit-nut",
        "size": "2kg",
        "flavor": "Fruit & Nut",
        "unit": "2kg",
        "price": 1059,
        "mrp": 1408,
        "calories": 200,
        "protein": 5,
        "stock": 17
      },
      {
        "id": "2kg-honey",
        "size": "2kg",
        "flavor": "Honey",
        "unit": "2kg",
        "price": 1089,
        "mrp": 1254,
        "calories": 200,
        "protein": 5,
        "stock": 119
      }
    ]
  },
  {
    "id": "hs-9",
    "name": "Dark Chocolate Bites",
    "category": "healthy-snacks",
    "image": "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality dark chocolate bites, carefully sourced and packed fresh to support your daily nutrition goals.",
    "ingredients": [
      "Dark Chocolate Bites"
    ],
    "rating": 4,
    "reviewCount": 109,
    "tags": [],
    "variants": [
      {
        "id": "250g",
        "size": "250g",
        "flavor": null,
        "unit": "250g",
        "price": 209,
        "mrp": 247,
        "calories": 160,
        "protein": 10,
        "stock": 104
      },
      {
        "id": "500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 349,
        "mrp": 394,
        "calories": 160,
        "protein": 10,
        "stock": 107
      },
      {
        "id": "1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 669,
        "mrp": 912,
        "calories": 160,
        "protein": 10,
        "stock": 101
      },
      {
        "id": "2kg",
        "size": "2kg",
        "flavor": null,
        "unit": "2kg",
        "price": 1189,
        "mrp": 1449,
        "calories": 160,
        "protein": 10,
        "stock": 36
      }
    ]
  },
  {
    "id": "hs-10",
    "name": "Baked Multigrain Chips",
    "category": "healthy-snacks",
    "image": "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=520&q=80",
    "description": "Premium quality baked multigrain chips, carefully sourced and packed fresh to support your daily nutrition goals.",
    "ingredients": [
      "Baked Multigrain Chips"
    ],
    "rating": 4.6,
    "reviewCount": 487,
    "tags": [
      "bestseller"
    ],
    "variants": [
      {
        "id": "250g-classic-salted",
        "size": "250g",
        "flavor": "Classic Salted",
        "unit": "250g",
        "price": 109,
        "mrp": 130,
        "calories": 120,
        "protein": 3,
        "stock": 28
      },
      {
        "id": "250g-peri-peri",
        "size": "250g",
        "flavor": "Peri Peri",
        "unit": "250g",
        "price": 109,
        "mrp": 136,
        "calories": 120,
        "protein": 3,
        "stock": 61
      },
      {
        "id": "250g-sour-cream-onion",
        "size": "250g",
        "flavor": "Sour Cream & Onion",
        "unit": "250g",
        "price": 99,
        "mrp": 125,
        "calories": 120,
        "protein": 3,
        "stock": 115
      },
      {
        "id": "250g-tomato",
        "size": "250g",
        "flavor": "Tomato",
        "unit": "250g",
        "price": 109,
        "mrp": 128,
        "calories": 120,
        "protein": 3,
        "stock": 73
      },
      {
        "id": "500g-classic-salted",
        "size": "500g",
        "flavor": "Classic Salted",
        "unit": "500g",
        "price": 189,
        "mrp": 260,
        "calories": 120,
        "protein": 3,
        "stock": 109
      },
      {
        "id": "500g-peri-peri",
        "size": "500g",
        "flavor": "Peri Peri",
        "unit": "500g",
        "price": 169,
        "mrp": 223,
        "calories": 120,
        "protein": 3,
        "stock": 100
      },
      {
        "id": "500g-sour-cream-onion",
        "size": "500g",
        "flavor": "Sour Cream & Onion",
        "unit": "500g",
        "price": 179,
        "mrp": 250,
        "calories": 120,
        "protein": 3,
        "stock": 57
      },
      {
        "id": "500g-tomato",
        "size": "500g",
        "flavor": "Tomato",
        "unit": "500g",
        "price": 189,
        "mrp": 213,
        "calories": 120,
        "protein": 3,
        "stock": 109
      },
      {
        "id": "1kg-classic-salted",
        "size": "1kg",
        "flavor": "Classic Salted",
        "unit": "1kg",
        "price": 329,
        "mrp": 372,
        "calories": 120,
        "protein": 3,
        "stock": 119
      },
      {
        "id": "1kg-peri-peri",
        "size": "1kg",
        "flavor": "Peri Peri",
        "unit": "1kg",
        "price": 339,
        "mrp": 381,
        "calories": 120,
        "protein": 3,
        "stock": 17
      },
      {
        "id": "1kg-sour-cream-onion",
        "size": "1kg",
        "flavor": "Sour Cream & Onion",
        "unit": "1kg",
        "price": 349,
        "mrp": 402,
        "calories": 120,
        "protein": 3,
        "stock": 96
      },
      {
        "id": "1kg-tomato",
        "size": "1kg",
        "flavor": "Tomato",
        "unit": "1kg",
        "price": 329,
        "mrp": 441,
        "calories": 120,
        "protein": 3,
        "stock": 102
      },
      {
        "id": "2kg-classic-salted",
        "size": "2kg",
        "flavor": "Classic Salted",
        "unit": "2kg",
        "price": 609,
        "mrp": 781,
        "calories": 120,
        "protein": 3,
        "stock": 94
      },
      {
        "id": "2kg-peri-peri",
        "size": "2kg",
        "flavor": "Peri Peri",
        "unit": "2kg",
        "price": 629,
        "mrp": 798,
        "calories": 120,
        "protein": 3,
        "stock": 106
      },
      {
        "id": "2kg-sour-cream-onion",
        "size": "2kg",
        "flavor": "Sour Cream & Onion",
        "unit": "2kg",
        "price": 589,
        "mrp": 712,
        "calories": 120,
        "protein": 3,
        "stock": 83
      },
      {
        "id": "2kg-tomato",
        "size": "2kg",
        "flavor": "Tomato",
        "unit": "2kg",
        "price": 609,
        "mrp": 687,
        "calories": 120,
        "protein": 3,
        "stock": 111
      }
    ]
  },
  {
    "id": "hs-11",
    "name": "Protein Popcorn",
    "category": "healthy-snacks",
    "image": "https://images.unsplash.com/photo-1585647347483-22b66260dfff?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality protein popcorn, carefully sourced and packed fresh to support your daily nutrition goals.",
    "ingredients": [
      "Protein Popcorn"
    ],
    "rating": 4.9,
    "reviewCount": 641,
    "tags": [],
    "variants": [
      {
        "id": "250g-caramel",
        "size": "250g",
        "flavor": "Caramel",
        "unit": "250g",
        "price": 129,
        "mrp": 179,
        "calories": 110,
        "protein": 5,
        "stock": 100
      },
      {
        "id": "250g-cheese",
        "size": "250g",
        "flavor": "Cheese",
        "unit": "250g",
        "price": 139,
        "mrp": 182,
        "calories": 110,
        "protein": 5,
        "stock": 103
      },
      {
        "id": "250g-classic-salted",
        "size": "250g",
        "flavor": "Classic Salted",
        "unit": "250g",
        "price": 129,
        "mrp": 169,
        "calories": 110,
        "protein": 5,
        "stock": 16
      },
      {
        "id": "250g-peri-peri",
        "size": "250g",
        "flavor": "Peri Peri",
        "unit": "250g",
        "price": 129,
        "mrp": 145,
        "calories": 110,
        "protein": 5,
        "stock": 79
      },
      {
        "id": "500g-caramel",
        "size": "500g",
        "flavor": "Caramel",
        "unit": "500g",
        "price": 229,
        "mrp": 314,
        "calories": 110,
        "protein": 5,
        "stock": 106
      },
      {
        "id": "500g-cheese",
        "size": "500g",
        "flavor": "Cheese",
        "unit": "500g",
        "price": 209,
        "mrp": 237,
        "calories": 110,
        "protein": 5,
        "stock": 93
      },
      {
        "id": "500g-classic-salted",
        "size": "500g",
        "flavor": "Classic Salted",
        "unit": "500g",
        "price": 219,
        "mrp": 296,
        "calories": 110,
        "protein": 5,
        "stock": 58
      },
      {
        "id": "500g-peri-peri",
        "size": "500g",
        "flavor": "Peri Peri",
        "unit": "500g",
        "price": 229,
        "mrp": 319,
        "calories": 110,
        "protein": 5,
        "stock": 49
      },
      {
        "id": "1kg-caramel",
        "size": "1kg",
        "flavor": "Caramel",
        "unit": "1kg",
        "price": 409,
        "mrp": 470,
        "calories": 110,
        "protein": 5,
        "stock": 17
      },
      {
        "id": "1kg-cheese",
        "size": "1kg",
        "flavor": "Cheese",
        "unit": "1kg",
        "price": 419,
        "mrp": 559,
        "calories": 110,
        "protein": 5,
        "stock": 72
      },
      {
        "id": "1kg-classic-salted",
        "size": "1kg",
        "flavor": "Classic Salted",
        "unit": "1kg",
        "price": 429,
        "mrp": 514,
        "calories": 110,
        "protein": 5,
        "stock": 74
      },
      {
        "id": "1kg-peri-peri",
        "size": "1kg",
        "flavor": "Peri Peri",
        "unit": "1kg",
        "price": 409,
        "mrp": 474,
        "calories": 110,
        "protein": 5,
        "stock": 33
      },
      {
        "id": "2kg-caramel",
        "size": "2kg",
        "flavor": "Caramel",
        "unit": "2kg",
        "price": 749,
        "mrp": 867,
        "calories": 110,
        "protein": 5,
        "stock": 49
      },
      {
        "id": "2kg-cheese",
        "size": "2kg",
        "flavor": "Cheese",
        "unit": "2kg",
        "price": 769,
        "mrp": 889,
        "calories": 110,
        "protein": 5,
        "stock": 110
      },
      {
        "id": "2kg-classic-salted",
        "size": "2kg",
        "flavor": "Classic Salted",
        "unit": "2kg",
        "price": 729,
        "mrp": 919,
        "calories": 110,
        "protein": 5,
        "stock": 72
      },
      {
        "id": "2kg-peri-peri",
        "size": "2kg",
        "flavor": "Peri Peri",
        "unit": "2kg",
        "price": 749,
        "mrp": 896,
        "calories": 110,
        "protein": 5,
        "stock": 25
      }
    ]
  },
  {
    "id": "hs-12",
    "name": "Energy Balls",
    "category": "healthy-snacks",
    "image": "https://images.unsplash.com/photo-1604908814868-b3d8fb1a0c01?auto=format&fit=crop&w=500&q=80",
    "description": "Convenient, great-tasting energy balls for fuel on the go.",
    "ingredients": [
      "Energy Balls"
    ],
    "rating": 4.2,
    "reviewCount": 893,
    "tags": [
      "trending"
    ],
    "variants": [
      {
        "id": "single-60g-",
        "size": "Single (60g)",
        "flavor": null,
        "unit": "60g",
        "price": 149,
        "mrp": 189,
        "calories": 160,
        "protein": 10,
        "stock": 63
      },
      {
        "id": "box-of-6",
        "size": "Box of 6",
        "flavor": null,
        "unit": "6 bars",
        "price": 799,
        "mrp": 1009,
        "calories": 160,
        "protein": 10,
        "stock": 35
      },
      {
        "id": "box-of-12",
        "size": "Box of 12",
        "flavor": null,
        "unit": "12 bars",
        "price": 1519,
        "mrp": 2038,
        "calories": 160,
        "protein": 10,
        "stock": 36
      },
      {
        "id": "box-of-24",
        "size": "Box of 24",
        "flavor": null,
        "unit": "24 bars",
        "price": 2829,
        "mrp": 3588,
        "calories": 160,
        "protein": 10,
        "stock": 42
      }
    ]
  },
  {
    "id": "hs-13",
    "name": "Roasted Peanuts Masala",
    "category": "healthy-snacks",
    "image": "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality roasted peanuts masala, carefully sourced and packed fresh to support your daily nutrition goals.",
    "ingredients": [
      "Roasted Peanuts Masala"
    ],
    "rating": 4.9,
    "reviewCount": 777,
    "tags": [],
    "variants": [
      {
        "id": "250g",
        "size": "250g",
        "flavor": null,
        "unit": "250g",
        "price": 89,
        "mrp": 107,
        "calories": 160,
        "protein": 7,
        "stock": 104
      },
      {
        "id": "500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 149,
        "mrp": 203,
        "calories": 160,
        "protein": 7,
        "stock": 43
      },
      {
        "id": "1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 289,
        "mrp": 374,
        "calories": 160,
        "protein": 7,
        "stock": 88
      },
      {
        "id": "2kg",
        "size": "2kg",
        "flavor": null,
        "unit": "2kg",
        "price": 509,
        "mrp": 661,
        "calories": 160,
        "protein": 7,
        "stock": 112
      }
    ]
  },
  {
    "id": "hs-14",
    "name": "Seed & Nut Mix",
    "category": "healthy-snacks",
    "image": "https://images.unsplash.com/photo-1630544068741-7de14db0a96c?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality seed & nut mix, carefully sourced and packed fresh to support your daily nutrition goals.",
    "ingredients": [
      "Seed & Nut Mix"
    ],
    "rating": 4.3,
    "reviewCount": 682,
    "tags": [
      "new"
    ],
    "variants": [
      {
        "id": "250g",
        "size": "250g",
        "flavor": null,
        "unit": "250g",
        "price": 239,
        "mrp": 279,
        "calories": 190,
        "protein": 7,
        "stock": 95
      },
      {
        "id": "500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 399,
        "mrp": 471,
        "calories": 190,
        "protein": 7,
        "stock": 96
      },
      {
        "id": "1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 759,
        "mrp": 1028,
        "calories": 190,
        "protein": 7,
        "stock": 41
      },
      {
        "id": "2kg",
        "size": "2kg",
        "flavor": null,
        "unit": "2kg",
        "price": 1359,
        "mrp": 1577,
        "calories": 190,
        "protein": 7,
        "stock": 66
      }
    ]
  },
  {
    "id": "dm-1",
    "name": "Quinoa Buddha Bowl",
    "category": "diet-meals",
    "image": "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=480&q=80",
    "description": "Freshly prepared quinoa buddha bowl, portioned and balanced for a satisfying, goal-friendly meal.",
    "ingredients": [
      "Quinoa Buddha Bowl"
    ],
    "rating": 4.7,
    "reviewCount": 263,
    "tags": [],
    "variants": [
      {
        "id": "regular",
        "size": "Regular",
        "flavor": null,
        "unit": "1 box",
        "price": 219,
        "mrp": 254,
        "calories": 380,
        "protein": 16,
        "stock": 110
      },
      {
        "id": "large",
        "size": "Large",
        "flavor": null,
        "unit": "1 large box",
        "price": 299,
        "mrp": 410,
        "calories": 380,
        "protein": 16,
        "stock": 36
      },
      {
        "id": "family-pack",
        "size": "Family Pack",
        "flavor": null,
        "unit": "Family pack (3 boxes)",
        "price": 549,
        "mrp": 668,
        "calories": 380,
        "protein": 16,
        "stock": 25
      },
      {
        "id": "combo-pack",
        "size": "Combo Pack",
        "flavor": null,
        "unit": "Combo (2 boxes)",
        "price": 389,
        "mrp": 447,
        "calories": 380,
        "protein": 16,
        "stock": 24
      }
    ]
  },
  {
    "id": "dm-2",
    "name": "Paneer Tikka Bowl",
    "category": "diet-meals",
    "image": "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=480&q=80",
    "description": "Freshly prepared paneer tikka bowl, portioned and balanced for a satisfying, goal-friendly meal.",
    "ingredients": [
      "Paneer Tikka Bowl"
    ],
    "rating": 4.3,
    "reviewCount": 445,
    "tags": [],
    "variants": [
      {
        "id": "regular",
        "size": "Regular",
        "flavor": null,
        "unit": "1 box",
        "price": 229,
        "mrp": 292,
        "calories": 410,
        "protein": 22,
        "stock": 40
      },
      {
        "id": "large",
        "size": "Large",
        "flavor": null,
        "unit": "1 large box",
        "price": 309,
        "mrp": 351,
        "calories": 410,
        "protein": 22,
        "stock": 32
      },
      {
        "id": "family-pack",
        "size": "Family Pack",
        "flavor": null,
        "unit": "Family pack (3 boxes)",
        "price": 569,
        "mrp": 641,
        "calories": 410,
        "protein": 22,
        "stock": 115
      },
      {
        "id": "combo-pack",
        "size": "Combo Pack",
        "flavor": null,
        "unit": "Combo (2 boxes)",
        "price": 409,
        "mrp": 495,
        "calories": 410,
        "protein": 22,
        "stock": 67
      }
    ]
  },
  {
    "id": "dm-3",
    "name": "Grilled Fish Meal",
    "category": "diet-meals",
    "image": "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=500&q=80",
    "description": "Freshly prepared grilled fish meal, portioned and balanced for a satisfying, goal-friendly meal.",
    "ingredients": [
      "Grilled Fish Meal"
    ],
    "rating": 4.8,
    "reviewCount": 614,
    "tags": [],
    "variants": [
      {
        "id": "regular",
        "size": "Regular",
        "flavor": null,
        "unit": "1 box",
        "price": 289,
        "mrp": 330,
        "calories": 390,
        "protein": 34,
        "stock": 82
      },
      {
        "id": "large",
        "size": "Large",
        "flavor": null,
        "unit": "1 large box",
        "price": 389,
        "mrp": 541,
        "calories": 390,
        "protein": 34,
        "stock": 34
      },
      {
        "id": "family-pack",
        "size": "Family Pack",
        "flavor": null,
        "unit": "Family pack (3 boxes)",
        "price": 719,
        "mrp": 860,
        "calories": 390,
        "protein": 34,
        "stock": 44
      },
      {
        "id": "combo-pack",
        "size": "Combo Pack",
        "flavor": null,
        "unit": "Combo (2 boxes)",
        "price": 519,
        "mrp": 615,
        "calories": 390,
        "protein": 34,
        "stock": 84
      }
    ]
  },
  {
    "id": "dm-4",
    "name": "Chicken Keto Bowl",
    "category": "diet-meals",
    "image": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=500&q=80",
    "description": "Freshly prepared chicken keto bowl, portioned and balanced for a satisfying, goal-friendly meal.",
    "ingredients": [
      "Chicken Keto Bowl"
    ],
    "rating": 4.2,
    "reviewCount": 928,
    "tags": [
      "trending"
    ],
    "variants": [
      {
        "id": "regular",
        "size": "Regular",
        "flavor": null,
        "unit": "1 box",
        "price": 259,
        "mrp": 304,
        "calories": 420,
        "protein": 36,
        "stock": 120
      },
      {
        "id": "large",
        "size": "Large",
        "flavor": null,
        "unit": "1 large box",
        "price": 349,
        "mrp": 471,
        "calories": 420,
        "protein": 36,
        "stock": 49
      },
      {
        "id": "family-pack",
        "size": "Family Pack",
        "flavor": null,
        "unit": "Family pack (3 boxes)",
        "price": 649,
        "mrp": 767,
        "calories": 420,
        "protein": 36,
        "stock": 35
      },
      {
        "id": "combo-pack",
        "size": "Combo Pack",
        "flavor": null,
        "unit": "Combo (2 boxes)",
        "price": 469,
        "mrp": 584,
        "calories": 420,
        "protein": 36,
        "stock": 112
      }
    ]
  },
  {
    "id": "dm-5",
    "name": "Tofu Stir Fry Meal",
    "category": "diet-meals",
    "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80",
    "description": "Freshly prepared tofu stir fry meal, portioned and balanced for a satisfying, goal-friendly meal.",
    "ingredients": [
      "Tofu Stir Fry Meal"
    ],
    "rating": 4.3,
    "reviewCount": 706,
    "tags": [
      "bestseller"
    ],
    "variants": [
      {
        "id": "regular",
        "size": "Regular",
        "flavor": null,
        "unit": "1 box",
        "price": 199,
        "mrp": 251,
        "calories": 340,
        "protein": 18,
        "stock": 34
      },
      {
        "id": "large",
        "size": "Large",
        "flavor": null,
        "unit": "1 large box",
        "price": 269,
        "mrp": 328,
        "calories": 340,
        "protein": 18,
        "stock": 56
      },
      {
        "id": "family-pack",
        "size": "Family Pack",
        "flavor": null,
        "unit": "Family pack (3 boxes)",
        "price": 499,
        "mrp": 648,
        "calories": 340,
        "protein": 18,
        "stock": 118
      },
      {
        "id": "combo-pack",
        "size": "Combo Pack",
        "flavor": null,
        "unit": "Combo (2 boxes)",
        "price": 359,
        "mrp": 502,
        "calories": 340,
        "protein": 18,
        "stock": 115
      }
    ]
  },
  {
    "id": "dm-6",
    "name": "Egg White Power Bowl",
    "category": "diet-meals",
    "image": "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=480&q=80",
    "description": "Freshly prepared egg white power bowl, portioned and balanced for a satisfying, goal-friendly meal.",
    "ingredients": [
      "Egg White Power Bowl"
    ],
    "rating": 5,
    "reviewCount": 137,
    "tags": [],
    "variants": [
      {
        "id": "regular",
        "size": "Regular",
        "flavor": null,
        "unit": "1 box",
        "price": 179,
        "mrp": 227,
        "calories": 260,
        "protein": 28,
        "stock": 80
      },
      {
        "id": "large",
        "size": "Large",
        "flavor": null,
        "unit": "1 large box",
        "price": 239,
        "mrp": 270,
        "calories": 260,
        "protein": 28,
        "stock": 101
      },
      {
        "id": "family-pack",
        "size": "Family Pack",
        "flavor": null,
        "unit": "Family pack (3 boxes)",
        "price": 449,
        "mrp": 563,
        "calories": 260,
        "protein": 28,
        "stock": 47
      },
      {
        "id": "combo-pack",
        "size": "Combo Pack",
        "flavor": null,
        "unit": "Combo (2 boxes)",
        "price": 319,
        "mrp": 375,
        "calories": 260,
        "protein": 28,
        "stock": 41
      }
    ]
  },
  {
    "id": "dm-7",
    "name": "Mexican Burrito Wrap",
    "category": "diet-meals",
    "image": "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=500&q=80",
    "description": "Freshly prepared mexican burrito wrap, portioned and balanced for a satisfying, goal-friendly meal.",
    "ingredients": [
      "Mexican Burrito Wrap"
    ],
    "rating": 4.2,
    "reviewCount": 783,
    "tags": [
      "new"
    ],
    "variants": [
      {
        "id": "regular",
        "size": "Regular",
        "flavor": null,
        "unit": "1 box",
        "price": 219,
        "mrp": 267,
        "calories": 400,
        "protein": 24,
        "stock": 58
      },
      {
        "id": "large",
        "size": "Large",
        "flavor": null,
        "unit": "1 large box",
        "price": 299,
        "mrp": 416,
        "calories": 400,
        "protein": 24,
        "stock": 37
      },
      {
        "id": "family-pack",
        "size": "Family Pack",
        "flavor": null,
        "unit": "Family pack (3 boxes)",
        "price": 549,
        "mrp": 629,
        "calories": 400,
        "protein": 24,
        "stock": 33
      },
      {
        "id": "combo-pack",
        "size": "Combo Pack",
        "flavor": null,
        "unit": "Combo (2 boxes)",
        "price": 389,
        "mrp": 460,
        "calories": 400,
        "protein": 24,
        "stock": 57
      }
    ]
  },
  {
    "id": "dm-8",
    "name": "Mediterranean Salad Bowl",
    "category": "diet-meals",
    "image": "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=480&q=80",
    "description": "Freshly prepared mediterranean salad bowl, portioned and balanced for a satisfying, goal-friendly meal.",
    "ingredients": [
      "Mediterranean Salad Bowl"
    ],
    "rating": 4.3,
    "reviewCount": 357,
    "tags": [
      "trending"
    ],
    "variants": [
      {
        "id": "regular",
        "size": "Regular",
        "flavor": null,
        "unit": "1 box",
        "price": 199,
        "mrp": 266,
        "calories": 320,
        "protein": 14,
        "stock": 51
      },
      {
        "id": "large",
        "size": "Large",
        "flavor": null,
        "unit": "1 large box",
        "price": 269,
        "mrp": 333,
        "calories": 320,
        "protein": 14,
        "stock": 79
      },
      {
        "id": "family-pack",
        "size": "Family Pack",
        "flavor": null,
        "unit": "Family pack (3 boxes)",
        "price": 499,
        "mrp": 578,
        "calories": 320,
        "protein": 14,
        "stock": 60
      },
      {
        "id": "combo-pack",
        "size": "Combo Pack",
        "flavor": null,
        "unit": "Combo (2 boxes)",
        "price": 359,
        "mrp": 435,
        "calories": 320,
        "protein": 14,
        "stock": 115
      }
    ]
  },
  {
    "id": "dm-9",
    "name": "Brown Rice Chicken Bowl",
    "category": "diet-meals",
    "image": "https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&w=480&q=80",
    "description": "Freshly prepared brown rice chicken bowl, portioned and balanced for a satisfying, goal-friendly meal.",
    "ingredients": [
      "Brown Rice Chicken Bowl"
    ],
    "rating": 4.4,
    "reviewCount": 755,
    "tags": [],
    "variants": [
      {
        "id": "regular",
        "size": "Regular",
        "flavor": null,
        "unit": "1 box",
        "price": 249,
        "mrp": 293,
        "calories": 430,
        "protein": 33,
        "stock": 53
      },
      {
        "id": "large",
        "size": "Large",
        "flavor": null,
        "unit": "1 large box",
        "price": 339,
        "mrp": 389,
        "calories": 430,
        "protein": 33,
        "stock": 49
      },
      {
        "id": "family-pack",
        "size": "Family Pack",
        "flavor": null,
        "unit": "Family pack (3 boxes)",
        "price": 619,
        "mrp": 713,
        "calories": 430,
        "protein": 33,
        "stock": 119
      },
      {
        "id": "combo-pack",
        "size": "Combo Pack",
        "flavor": null,
        "unit": "Combo (2 boxes)",
        "price": 449,
        "mrp": 592,
        "calories": 430,
        "protein": 33,
        "stock": 115
      }
    ]
  },
  {
    "id": "dm-10",
    "name": "Sprout & Veggie Wrap",
    "category": "diet-meals",
    "image": "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=500&q=80",
    "description": "Freshly prepared sprout & veggie wrap, portioned and balanced for a satisfying, goal-friendly meal.",
    "ingredients": [
      "Sprout & Veggie Wrap"
    ],
    "rating": 4.4,
    "reviewCount": 428,
    "tags": [
      "bestseller"
    ],
    "variants": [
      {
        "id": "regular",
        "size": "Regular",
        "flavor": null,
        "unit": "1 box",
        "price": 169,
        "mrp": 203,
        "calories": 280,
        "protein": 12,
        "stock": 102
      },
      {
        "id": "large",
        "size": "Large",
        "flavor": null,
        "unit": "1 large box",
        "price": 229,
        "mrp": 320,
        "calories": 280,
        "protein": 12,
        "stock": 71
      },
      {
        "id": "family-pack",
        "size": "Family Pack",
        "flavor": null,
        "unit": "Family pack (3 boxes)",
        "price": 419,
        "mrp": 541,
        "calories": 280,
        "protein": 12,
        "stock": 89
      },
      {
        "id": "combo-pack",
        "size": "Combo Pack",
        "flavor": null,
        "unit": "Combo (2 boxes)",
        "price": 299,
        "mrp": 344,
        "calories": 280,
        "protein": 12,
        "stock": 37
      }
    ]
  },
  {
    "id": "dm-11",
    "name": "Protein Power Smoothie Meal",
    "category": "diet-meals",
    "image": "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=600&q=80",
    "description": "Refreshing protein power smoothie meal, ready to drink and packed with nutrients for your active lifestyle.",
    "ingredients": [
      "Protein Power Smoothie Meal"
    ],
    "rating": 4.1,
    "reviewCount": 903,
    "tags": [],
    "variants": [
      {
        "id": "250ml",
        "size": "250ml",
        "flavor": null,
        "unit": "250ml",
        "price": 109,
        "mrp": 124,
        "calories": 300,
        "protein": 20,
        "stock": 55
      },
      {
        "id": "500ml",
        "size": "500ml",
        "flavor": null,
        "unit": "500ml",
        "price": 179,
        "mrp": 247,
        "calories": 300,
        "protein": 20,
        "stock": 65
      },
      {
        "id": "1l",
        "size": "1L",
        "flavor": null,
        "unit": "1L",
        "price": 319,
        "mrp": 373,
        "calories": 300,
        "protein": 20,
        "stock": 120
      },
      {
        "id": "6-x-250ml",
        "size": "6 x 250ml",
        "flavor": null,
        "unit": "6 x 250ml",
        "price": 929,
        "mrp": 1296,
        "calories": 300,
        "protein": 20,
        "stock": 32
      }
    ]
  },
  {
    "id": "dm-12",
    "name": "Rajma Rice Bowl",
    "category": "diet-meals",
    "image": "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?auto=format&fit=crop&w=500&q=80",
    "description": "Freshly prepared rajma rice bowl, portioned and balanced for a satisfying, goal-friendly meal.",
    "ingredients": [
      "Rajma Rice Bowl"
    ],
    "rating": 4.9,
    "reviewCount": 362,
    "tags": [
      "trending"
    ],
    "variants": [
      {
        "id": "regular",
        "size": "Regular",
        "flavor": null,
        "unit": "1 box",
        "price": 179,
        "mrp": 238,
        "calories": 390,
        "protein": 15,
        "stock": 72
      },
      {
        "id": "large",
        "size": "Large",
        "flavor": null,
        "unit": "1 large box",
        "price": 239,
        "mrp": 323,
        "calories": 390,
        "protein": 15,
        "stock": 54
      },
      {
        "id": "family-pack",
        "size": "Family Pack",
        "flavor": null,
        "unit": "Family pack (3 boxes)",
        "price": 449,
        "mrp": 611,
        "calories": 390,
        "protein": 15,
        "stock": 119
      },
      {
        "id": "combo-pack",
        "size": "Combo Pack",
        "flavor": null,
        "unit": "Combo (2 boxes)",
        "price": 319,
        "mrp": 396,
        "calories": 390,
        "protein": 15,
        "stock": 59
      }
    ]
  },
  {
    "id": "dm-13",
    "name": "Chole Quinoa Bowl",
    "category": "diet-meals",
    "image": "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=500&q=80",
    "description": "Freshly prepared chole quinoa bowl, portioned and balanced for a satisfying, goal-friendly meal.",
    "ingredients": [
      "Chole Quinoa Bowl"
    ],
    "rating": 4.4,
    "reviewCount": 467,
    "tags": [],
    "variants": [
      {
        "id": "regular",
        "size": "Regular",
        "flavor": null,
        "unit": "1 box",
        "price": 199,
        "mrp": 259,
        "calories": 370,
        "protein": 16,
        "stock": 109
      },
      {
        "id": "large",
        "size": "Large",
        "flavor": null,
        "unit": "1 large box",
        "price": 269,
        "mrp": 343,
        "calories": 370,
        "protein": 16,
        "stock": 115
      },
      {
        "id": "family-pack",
        "size": "Family Pack",
        "flavor": null,
        "unit": "Family pack (3 boxes)",
        "price": 499,
        "mrp": 624,
        "calories": 370,
        "protein": 16,
        "stock": 62
      },
      {
        "id": "combo-pack",
        "size": "Combo Pack",
        "flavor": null,
        "unit": "Combo (2 boxes)",
        "price": 359,
        "mrp": 478,
        "calories": 370,
        "protein": 16,
        "stock": 16
      }
    ]
  },
  {
    "id": "dm-14",
    "name": "Sweet Potato Power Bowl",
    "category": "diet-meals",
    "image": "https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=500&q=80",
    "description": "Freshly prepared sweet potato power bowl, portioned and balanced for a satisfying, goal-friendly meal.",
    "ingredients": [
      "Sweet Potato Power Bowl"
    ],
    "rating": 4.3,
    "reviewCount": 236,
    "tags": [
      "new"
    ],
    "variants": [
      {
        "id": "regular",
        "size": "Regular",
        "flavor": null,
        "unit": "1 box",
        "price": 189,
        "mrp": 261,
        "calories": 350,
        "protein": 12,
        "stock": 117
      },
      {
        "id": "large",
        "size": "Large",
        "flavor": null,
        "unit": "1 large box",
        "price": 259,
        "mrp": 328,
        "calories": 350,
        "protein": 12,
        "stock": 86
      },
      {
        "id": "family-pack",
        "size": "Family Pack",
        "flavor": null,
        "unit": "Family pack (3 boxes)",
        "price": 469,
        "mrp": 582,
        "calories": 350,
        "protein": 12,
        "stock": 49
      },
      {
        "id": "combo-pack",
        "size": "Combo Pack",
        "flavor": null,
        "unit": "Combo (2 boxes)",
        "price": 339,
        "mrp": 439,
        "calories": 350,
        "protein": 12,
        "stock": 41
      }
    ]
  },
  {
    "id": "fr-1",
    "name": "Fresh Bananas",
    "category": "fruits",
    "image": "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=500&q=80",
    "description": "Farm-fresh fresh bananas, hand-picked for quality and flavor.",
    "ingredients": [
      "Fresh Bananas"
    ],
    "rating": 5,
    "reviewCount": 462,
    "tags": [],
    "variants": [
      {
        "id": "500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 29,
        "mrp": 44,
        "calories": 105,
        "protein": 1,
        "stock": 102
      },
      {
        "id": "1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 59,
        "mrp": 80,
        "calories": 105,
        "protein": 1,
        "stock": 83
      },
      {
        "id": "2kg",
        "size": "2kg",
        "flavor": null,
        "unit": "2kg",
        "price": 109,
        "mrp": 133,
        "calories": 105,
        "protein": 1,
        "stock": 118
      },
      {
        "id": "family-box-3kg-",
        "size": "Family Box (3kg)",
        "flavor": null,
        "unit": "3kg",
        "price": 159,
        "mrp": 180,
        "calories": 105,
        "protein": 1,
        "stock": 49
      }
    ]
  },
  {
    "id": "fr-2",
    "name": "Red Apples",
    "category": "fruits",
    "image": "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=500&q=80",
    "description": "Farm-fresh red apples, hand-picked for quality and flavor.",
    "ingredients": [
      "Red Apples"
    ],
    "rating": 4.1,
    "reviewCount": 597,
    "tags": [],
    "variants": [
      {
        "id": "500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 79,
        "mrp": 94,
        "calories": 95,
        "protein": 0,
        "stock": 44
      },
      {
        "id": "1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 149,
        "mrp": 181,
        "calories": 95,
        "protein": 0,
        "stock": 30
      },
      {
        "id": "2kg",
        "size": "2kg",
        "flavor": null,
        "unit": "2kg",
        "price": 279,
        "mrp": 336,
        "calories": 95,
        "protein": 0,
        "stock": 21
      },
      {
        "id": "family-box-3kg-",
        "size": "Family Box (3kg)",
        "flavor": null,
        "unit": "3kg",
        "price": 399,
        "mrp": 541,
        "calories": 95,
        "protein": 0,
        "stock": 64
      }
    ]
  },
  {
    "id": "fr-3",
    "name": "Fresh Oranges",
    "category": "fruits",
    "image": "https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=500&q=80",
    "description": "Farm-fresh fresh oranges, hand-picked for quality and flavor.",
    "ingredients": [
      "Fresh Oranges"
    ],
    "rating": 4.6,
    "reviewCount": 765,
    "tags": [],
    "variants": [
      {
        "id": "500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 59,
        "mrp": 74,
        "calories": 62,
        "protein": 1,
        "stock": 95
      },
      {
        "id": "1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 109,
        "mrp": 149,
        "calories": 62,
        "protein": 1,
        "stock": 106
      },
      {
        "id": "2kg",
        "size": "2kg",
        "flavor": null,
        "unit": "2kg",
        "price": 209,
        "mrp": 267,
        "calories": 62,
        "protein": 1,
        "stock": 24
      },
      {
        "id": "family-box-3kg-",
        "size": "Family Box (3kg)",
        "flavor": null,
        "unit": "3kg",
        "price": 289,
        "mrp": 399,
        "calories": 62,
        "protein": 1,
        "stock": 109
      }
    ]
  },
  {
    "id": "fr-4",
    "name": "Seedless Watermelon",
    "category": "fruits",
    "image": "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=500&q=80",
    "description": "Farm-fresh seedless watermelon, hand-picked for quality and flavor.",
    "ingredients": [
      "Seedless Watermelon"
    ],
    "rating": 4.4,
    "reviewCount": 754,
    "tags": [
      "trending"
    ],
    "variants": [
      {
        "id": "500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 49,
        "mrp": 64,
        "calories": 46,
        "protein": 1,
        "stock": 108
      },
      {
        "id": "1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 89,
        "mrp": 122,
        "calories": 46,
        "protein": 1,
        "stock": 98
      },
      {
        "id": "2kg",
        "size": "2kg",
        "flavor": null,
        "unit": "2kg",
        "price": 169,
        "mrp": 204,
        "calories": 46,
        "protein": 1,
        "stock": 81
      },
      {
        "id": "family-box-3kg-",
        "size": "Family Box (3kg)",
        "flavor": null,
        "unit": "3kg",
        "price": 239,
        "mrp": 281,
        "calories": 46,
        "protein": 1,
        "stock": 49
      }
    ]
  },
  {
    "id": "fr-5",
    "name": "Papaya",
    "category": "fruits",
    "image": "https://images.unsplash.com/photo-1526318472351-c75fcf070305?auto=format&fit=crop&w=500&q=80",
    "description": "Farm-fresh papaya, hand-picked for quality and flavor.",
    "ingredients": [
      "Papaya"
    ],
    "rating": 4.9,
    "reviewCount": 518,
    "tags": [
      "bestseller"
    ],
    "variants": [
      {
        "id": "500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 39,
        "mrp": 54,
        "calories": 59,
        "protein": 1,
        "stock": 85
      },
      {
        "id": "1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 69,
        "mrp": 97,
        "calories": 59,
        "protein": 1,
        "stock": 96
      },
      {
        "id": "2kg",
        "size": "2kg",
        "flavor": null,
        "unit": "2kg",
        "price": 129,
        "mrp": 173,
        "calories": 59,
        "protein": 1,
        "stock": 39
      },
      {
        "id": "family-box-3kg-",
        "size": "Family Box (3kg)",
        "flavor": null,
        "unit": "3kg",
        "price": 189,
        "mrp": 213,
        "calories": 59,
        "protein": 1,
        "stock": 41
      }
    ]
  },
  {
    "id": "fr-6",
    "name": "Pineapple",
    "category": "fruits",
    "image": "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=500&q=80",
    "description": "Farm-fresh pineapple, hand-picked for quality and flavor.",
    "ingredients": [
      "Pineapple"
    ],
    "rating": 4.7,
    "reviewCount": 383,
    "tags": [],
    "variants": [
      {
        "id": "500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 49,
        "mrp": 64,
        "calories": 82,
        "protein": 1,
        "stock": 61
      },
      {
        "id": "1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 89,
        "mrp": 117,
        "calories": 82,
        "protein": 1,
        "stock": 90
      },
      {
        "id": "2kg",
        "size": "2kg",
        "flavor": null,
        "unit": "2kg",
        "price": 169,
        "mrp": 201,
        "calories": 82,
        "protein": 1,
        "stock": 116
      },
      {
        "id": "family-box-3kg-",
        "size": "Family Box (3kg)",
        "flavor": null,
        "unit": "3kg",
        "price": 239,
        "mrp": 305,
        "calories": 82,
        "protein": 1,
        "stock": 93
      }
    ]
  },
  {
    "id": "fr-7",
    "name": "Mixed Berries Pack",
    "category": "fruits",
    "image": "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=500&q=80",
    "description": "Farm-fresh mixed berries pack, hand-picked for quality and flavor.",
    "ingredients": [
      "Mixed Berries Pack"
    ],
    "rating": 4.8,
    "reviewCount": 937,
    "tags": [
      "new"
    ],
    "variants": [
      {
        "id": "500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 159,
        "mrp": 194,
        "calories": 70,
        "protein": 1,
        "stock": 53
      },
      {
        "id": "1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 289,
        "mrp": 371,
        "calories": 70,
        "protein": 1,
        "stock": 66
      },
      {
        "id": "2kg",
        "size": "2kg",
        "flavor": null,
        "unit": "2kg",
        "price": 549,
        "mrp": 670,
        "calories": 70,
        "protein": 1,
        "stock": 78
      },
      {
        "id": "family-box-3kg-",
        "size": "Family Box (3kg)",
        "flavor": null,
        "unit": "3kg",
        "price": 779,
        "mrp": 995,
        "calories": 70,
        "protein": 1,
        "stock": 25
      }
    ]
  },
  {
    "id": "fr-8",
    "name": "Alphonso Mango",
    "category": "fruits",
    "image": "https://images.unsplash.com/photo-1591073113125-e46713c829ed?auto=format&fit=crop&w=500&q=80",
    "description": "Farm-fresh alphonso mango, hand-picked for quality and flavor.",
    "ingredients": [
      "Alphonso Mango"
    ],
    "rating": 4.6,
    "reviewCount": 833,
    "tags": [
      "trending"
    ],
    "variants": [
      {
        "id": "500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 219,
        "mrp": 246,
        "calories": 99,
        "protein": 1,
        "stock": 89
      },
      {
        "id": "1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 399,
        "mrp": 470,
        "calories": 99,
        "protein": 1,
        "stock": 67
      },
      {
        "id": "2kg",
        "size": "2kg",
        "flavor": null,
        "unit": "2kg",
        "price": 759,
        "mrp": 983,
        "calories": 99,
        "protein": 1,
        "stock": 79
      },
      {
        "id": "family-box-3kg-",
        "size": "Family Box (3kg)",
        "flavor": null,
        "unit": "3kg",
        "price": 1079,
        "mrp": 1505,
        "calories": 99,
        "protein": 1,
        "stock": 16
      }
    ]
  },
  {
    "id": "fr-9",
    "name": "Kiwi Fruit",
    "category": "fruits",
    "image": "https://images.unsplash.com/photo-1585059895524-72359e06133a?auto=format&fit=crop&w=500&q=80",
    "description": "Farm-fresh kiwi fruit, hand-picked for quality and flavor.",
    "ingredients": [
      "Kiwi Fruit"
    ],
    "rating": 4.2,
    "reviewCount": 594,
    "tags": [],
    "variants": [
      {
        "id": "500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 189,
        "mrp": 227,
        "calories": 61,
        "protein": 1,
        "stock": 84
      },
      {
        "id": "1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 349,
        "mrp": 451,
        "calories": 61,
        "protein": 1,
        "stock": 107
      },
      {
        "id": "2kg",
        "size": "2kg",
        "flavor": null,
        "unit": "2kg",
        "price": 659,
        "mrp": 763,
        "calories": 61,
        "protein": 1,
        "stock": 77
      },
      {
        "id": "family-box-3kg-",
        "size": "Family Box (3kg)",
        "flavor": null,
        "unit": "3kg",
        "price": 939,
        "mrp": 1098,
        "calories": 61,
        "protein": 1,
        "stock": 65
      }
    ]
  },
  {
    "id": "fr-10",
    "name": "Green Grapes",
    "category": "fruits",
    "image": "https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&w=500&q=80",
    "description": "Farm-fresh green grapes, hand-picked for quality and flavor.",
    "ingredients": [
      "Green Grapes"
    ],
    "rating": 4.9,
    "reviewCount": 711,
    "tags": [
      "bestseller"
    ],
    "variants": [
      {
        "id": "500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 99,
        "mrp": 114,
        "calories": 69,
        "protein": 1,
        "stock": 116
      },
      {
        "id": "1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 179,
        "mrp": 231,
        "calories": 69,
        "protein": 1,
        "stock": 56
      },
      {
        "id": "2kg",
        "size": "2kg",
        "flavor": null,
        "unit": "2kg",
        "price": 339,
        "mrp": 396,
        "calories": 69,
        "protein": 1,
        "stock": 75
      },
      {
        "id": "family-box-3kg-",
        "size": "Family Box (3kg)",
        "flavor": null,
        "unit": "3kg",
        "price": 479,
        "mrp": 645,
        "calories": 69,
        "protein": 1,
        "stock": 48
      }
    ]
  },
  {
    "id": "fr-11",
    "name": "Pomegranate",
    "category": "fruits",
    "image": "https://images.unsplash.com/photo-1541344999736-83eca272f6fc?auto=format&fit=crop&w=500&q=80",
    "description": "Farm-fresh pomegranate, hand-picked for quality and flavor.",
    "ingredients": [
      "Pomegranate"
    ],
    "rating": 4.9,
    "reviewCount": 336,
    "tags": [],
    "variants": [
      {
        "id": "500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 139,
        "mrp": 186,
        "calories": 83,
        "protein": 1,
        "stock": 22
      },
      {
        "id": "1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 249,
        "mrp": 323,
        "calories": 83,
        "protein": 1,
        "stock": 120
      },
      {
        "id": "2kg",
        "size": "2kg",
        "flavor": null,
        "unit": "2kg",
        "price": 469,
        "mrp": 583,
        "calories": 83,
        "protein": 1,
        "stock": 106
      },
      {
        "id": "family-box-3kg-",
        "size": "Family Box (3kg)",
        "flavor": null,
        "unit": "3kg",
        "price": 669,
        "mrp": 819,
        "calories": 83,
        "protein": 1,
        "stock": 62
      }
    ]
  },
  {
    "id": "fr-12",
    "name": "Avocado",
    "category": "fruits",
    "image": "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=500&q=80",
    "description": "Farm-fresh avocado, hand-picked for quality and flavor.",
    "ingredients": [
      "Avocado"
    ],
    "rating": 4.9,
    "reviewCount": 195,
    "tags": [
      "trending"
    ],
    "variants": [
      {
        "id": "500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 109,
        "mrp": 138,
        "calories": 240,
        "protein": 3,
        "stock": 24
      },
      {
        "id": "1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 199,
        "mrp": 239,
        "calories": 240,
        "protein": 3,
        "stock": 18
      },
      {
        "id": "2kg",
        "size": "2kg",
        "flavor": null,
        "unit": "2kg",
        "price": 379,
        "mrp": 521,
        "calories": 240,
        "protein": 3,
        "stock": 84
      },
      {
        "id": "family-box-3kg-",
        "size": "Family Box (3kg)",
        "flavor": null,
        "unit": "3kg",
        "price": 539,
        "mrp": 672,
        "calories": 240,
        "protein": 3,
        "stock": 94
      }
    ]
  },
  {
    "id": "fr-13",
    "name": "Dragon Fruit",
    "category": "fruits",
    "image": "https://images.unsplash.com/photo-1527325678964-54921661f888?auto=format&fit=crop&w=500&q=80",
    "description": "Farm-fresh dragon fruit, hand-picked for quality and flavor.",
    "ingredients": [
      "Dragon Fruit"
    ],
    "rating": 4.3,
    "reviewCount": 677,
    "tags": [],
    "variants": [
      {
        "id": "500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 249,
        "mrp": 281,
        "calories": 60,
        "protein": 1,
        "stock": 48
      },
      {
        "id": "1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 449,
        "mrp": 580,
        "calories": 60,
        "protein": 1,
        "stock": 33
      },
      {
        "id": "2kg",
        "size": "2kg",
        "flavor": null,
        "unit": "2kg",
        "price": 849,
        "mrp": 1052,
        "calories": 60,
        "protein": 1,
        "stock": 35
      },
      {
        "id": "family-box-3kg-",
        "size": "Family Box (3kg)",
        "flavor": null,
        "unit": "3kg",
        "price": 1209,
        "mrp": 1556,
        "calories": 60,
        "protein": 1,
        "stock": 81
      }
    ]
  },
  {
    "id": "fr-14",
    "name": "Seasonal Fruit Basket",
    "category": "fruits",
    "image": "https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=480&q=80",
    "description": "Farm-fresh seasonal fruit basket, hand-picked for quality and flavor.",
    "ingredients": [
      "Seasonal Fruit Basket"
    ],
    "rating": 4.4,
    "reviewCount": 533,
    "tags": [
      "new"
    ],
    "variants": [
      {
        "id": "500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 329,
        "mrp": 398,
        "calories": 90,
        "protein": 1,
        "stock": 59
      },
      {
        "id": "1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 599,
        "mrp": 826,
        "calories": 90,
        "protein": 1,
        "stock": 112
      },
      {
        "id": "2kg",
        "size": "2kg",
        "flavor": null,
        "unit": "2kg",
        "price": 1139,
        "mrp": 1565,
        "calories": 90,
        "protein": 1,
        "stock": 86
      },
      {
        "id": "family-box-3kg-",
        "size": "Family Box (3kg)",
        "flavor": null,
        "unit": "3kg",
        "price": 1619,
        "mrp": 2204,
        "calories": 90,
        "protein": 1,
        "stock": 35
      }
    ]
  },
  {
    "id": "wp-1",
    "name": "Resistance Bands Set",
    "category": "workout-products",
    "image": "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=500&q=80",
    "description": "Durable, gym-ready resistance bands set built for consistent training performance.",
    "ingredients": [],
    "rating": 4.3,
    "reviewCount": 690,
    "tags": [],
    "variants": [
      {
        "id": "standard",
        "size": "Standard",
        "flavor": null,
        "unit": "1 pc",
        "price": 599,
        "mrp": 790,
        "calories": 0,
        "protein": 0,
        "stock": 58
      },
      {
        "id": "pro",
        "size": "Pro",
        "flavor": null,
        "unit": "1 pc (Pro)",
        "price": 779,
        "mrp": 960,
        "calories": 0,
        "protein": 0,
        "stock": 105
      },
      {
        "id": "premium",
        "size": "Premium",
        "flavor": null,
        "unit": "1 pc (Premium)",
        "price": 1019,
        "mrp": 1206,
        "calories": 0,
        "protein": 0,
        "stock": 103
      },
      {
        "id": "set-of-2",
        "size": "Set of 2",
        "flavor": null,
        "unit": "Set of 2",
        "price": 1139,
        "mrp": 1293,
        "calories": 0,
        "protein": 0,
        "stock": 40
      }
    ]
  },
  {
    "id": "wp-2",
    "name": "Adjustable Dumbbells",
    "category": "workout-products",
    "image": "https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?auto=format&fit=crop&w=500&q=80",
    "description": "Durable, gym-ready adjustable dumbbells built for consistent training performance.",
    "ingredients": [],
    "rating": 4.7,
    "reviewCount": 534,
    "tags": [],
    "variants": [
      {
        "id": "standard",
        "size": "Standard",
        "flavor": null,
        "unit": "1 pc",
        "price": 3499,
        "mrp": 4764,
        "calories": 0,
        "protein": 0,
        "stock": 26
      },
      {
        "id": "pro",
        "size": "Pro",
        "flavor": null,
        "unit": "1 pc (Pro)",
        "price": 4549,
        "mrp": 5450,
        "calories": 0,
        "protein": 0,
        "stock": 69
      },
      {
        "id": "premium",
        "size": "Premium",
        "flavor": null,
        "unit": "1 pc (Premium)",
        "price": 5949,
        "mrp": 7962,
        "calories": 0,
        "protein": 0,
        "stock": 29
      },
      {
        "id": "set-of-2",
        "size": "Set of 2",
        "flavor": null,
        "unit": "Set of 2",
        "price": 6649,
        "mrp": 8566,
        "calories": 0,
        "protein": 0,
        "stock": 89
      }
    ]
  },
  {
    "id": "wp-3",
    "name": "Yoga Mat",
    "category": "workout-products",
    "image": "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=500&q=80",
    "description": "Durable, gym-ready yoga mat built for consistent training performance.",
    "ingredients": [],
    "rating": 4.7,
    "reviewCount": 221,
    "tags": [],
    "variants": [
      {
        "id": "standard",
        "size": "Standard",
        "flavor": null,
        "unit": "1 pc",
        "price": 899,
        "mrp": 1080,
        "calories": 0,
        "protein": 0,
        "stock": 60
      },
      {
        "id": "pro",
        "size": "Pro",
        "flavor": null,
        "unit": "1 pc (Pro)",
        "price": 1169,
        "mrp": 1563,
        "calories": 0,
        "protein": 0,
        "stock": 116
      },
      {
        "id": "premium",
        "size": "Premium",
        "flavor": null,
        "unit": "1 pc (Premium)",
        "price": 1529,
        "mrp": 2013,
        "calories": 0,
        "protein": 0,
        "stock": 88
      },
      {
        "id": "set-of-2",
        "size": "Set of 2",
        "flavor": null,
        "unit": "Set of 2",
        "price": 1709,
        "mrp": 1973,
        "calories": 0,
        "protein": 0,
        "stock": 114
      }
    ]
  },
  {
    "id": "wp-4",
    "name": "Shaker Bottle",
    "category": "workout-products",
    "image": "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=480&q=80",
    "description": "Durable, gym-ready shaker bottle built for consistent training performance.",
    "ingredients": [],
    "rating": 4.1,
    "reviewCount": 876,
    "tags": [
      "trending"
    ],
    "variants": [
      {
        "id": "standard",
        "size": "Standard",
        "flavor": null,
        "unit": "1 pc",
        "price": 249,
        "mrp": 318,
        "calories": 0,
        "protein": 0,
        "stock": 43
      },
      {
        "id": "pro",
        "size": "Pro",
        "flavor": null,
        "unit": "1 pc (Pro)",
        "price": 319,
        "mrp": 412,
        "calories": 0,
        "protein": 0,
        "stock": 120
      },
      {
        "id": "premium",
        "size": "Premium",
        "flavor": null,
        "unit": "1 pc (Premium)",
        "price": 419,
        "mrp": 558,
        "calories": 0,
        "protein": 0,
        "stock": 96
      },
      {
        "id": "set-of-2",
        "size": "Set of 2",
        "flavor": null,
        "unit": "Set of 2",
        "price": 469,
        "mrp": 610,
        "calories": 0,
        "protein": 0,
        "stock": 79
      }
    ]
  },
  {
    "id": "wp-5",
    "name": "Foam Roller",
    "category": "workout-products",
    "image": "https://images.unsplash.com/photo-1596357395217-80de13130e92?auto=format&fit=crop&w=500&q=80",
    "description": "Durable, gym-ready foam roller built for consistent training performance.",
    "ingredients": [],
    "rating": 4.8,
    "reviewCount": 884,
    "tags": [
      "bestseller"
    ],
    "variants": [
      {
        "id": "standard",
        "size": "Standard",
        "flavor": null,
        "unit": "1 pc",
        "price": 799,
        "mrp": 948,
        "calories": 0,
        "protein": 0,
        "stock": 120
      },
      {
        "id": "pro",
        "size": "Pro",
        "flavor": null,
        "unit": "1 pc (Pro)",
        "price": 1039,
        "mrp": 1241,
        "calories": 0,
        "protein": 0,
        "stock": 21
      },
      {
        "id": "premium",
        "size": "Premium",
        "flavor": null,
        "unit": "1 pc (Premium)",
        "price": 1359,
        "mrp": 1865,
        "calories": 0,
        "protein": 0,
        "stock": 23
      },
      {
        "id": "set-of-2",
        "size": "Set of 2",
        "flavor": null,
        "unit": "Set of 2",
        "price": 1519,
        "mrp": 1907,
        "calories": 0,
        "protein": 0,
        "stock": 38
      }
    ]
  },
  {
    "id": "wp-6",
    "name": "Gym Gloves",
    "category": "workout-products",
    "image": "https://images.unsplash.com/photo-1517344368193-41552b6ad3f5?auto=format&fit=crop&w=500&q=80",
    "description": "Durable, gym-ready gym gloves built for consistent training performance.",
    "ingredients": [],
    "rating": 4.6,
    "reviewCount": 903,
    "tags": [],
    "variants": [
      {
        "id": "standard",
        "size": "Standard",
        "flavor": null,
        "unit": "1 pc",
        "price": 449,
        "mrp": 549,
        "calories": 0,
        "protein": 0,
        "stock": 96
      },
      {
        "id": "pro",
        "size": "Pro",
        "flavor": null,
        "unit": "1 pc (Pro)",
        "price": 579,
        "mrp": 784,
        "calories": 0,
        "protein": 0,
        "stock": 95
      },
      {
        "id": "premium",
        "size": "Premium",
        "flavor": null,
        "unit": "1 pc (Premium)",
        "price": 759,
        "mrp": 954,
        "calories": 0,
        "protein": 0,
        "stock": 77
      },
      {
        "id": "set-of-2",
        "size": "Set of 2",
        "flavor": null,
        "unit": "Set of 2",
        "price": 849,
        "mrp": 1145,
        "calories": 0,
        "protein": 0,
        "stock": 51
      }
    ]
  },
  {
    "id": "wp-7",
    "name": "Skipping Rope",
    "category": "workout-products",
    "image": "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?auto=format&fit=crop&w=500&q=80",
    "description": "Durable, gym-ready skipping rope built for consistent training performance.",
    "ingredients": [],
    "rating": 4,
    "reviewCount": 452,
    "tags": [
      "new"
    ],
    "variants": [
      {
        "id": "standard",
        "size": "Standard",
        "flavor": null,
        "unit": "1 pc",
        "price": 349,
        "mrp": 464,
        "calories": 0,
        "protein": 0,
        "stock": 50
      },
      {
        "id": "pro",
        "size": "Pro",
        "flavor": null,
        "unit": "1 pc (Pro)",
        "price": 449,
        "mrp": 578,
        "calories": 0,
        "protein": 0,
        "stock": 28
      },
      {
        "id": "premium",
        "size": "Premium",
        "flavor": null,
        "unit": "1 pc (Premium)",
        "price": 589,
        "mrp": 688,
        "calories": 0,
        "protein": 0,
        "stock": 30
      },
      {
        "id": "set-of-2",
        "size": "Set of 2",
        "flavor": null,
        "unit": "Set of 2",
        "price": 659,
        "mrp": 903,
        "calories": 0,
        "protein": 0,
        "stock": 70
      }
    ]
  },
  {
    "id": "wp-8",
    "name": "Lifting Straps",
    "category": "workout-products",
    "image": "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=500&q=80",
    "description": "Durable, gym-ready lifting straps built for consistent training performance.",
    "ingredients": [],
    "rating": 4.1,
    "reviewCount": 524,
    "tags": [
      "trending"
    ],
    "variants": [
      {
        "id": "standard",
        "size": "Standard",
        "flavor": null,
        "unit": "1 pc",
        "price": 399,
        "mrp": 539,
        "calories": 0,
        "protein": 0,
        "stock": 85
      },
      {
        "id": "pro",
        "size": "Pro",
        "flavor": null,
        "unit": "1 pc (Pro)",
        "price": 519,
        "mrp": 617,
        "calories": 0,
        "protein": 0,
        "stock": 66
      },
      {
        "id": "premium",
        "size": "Premium",
        "flavor": null,
        "unit": "1 pc (Premium)",
        "price": 679,
        "mrp": 847,
        "calories": 0,
        "protein": 0,
        "stock": 86
      },
      {
        "id": "set-of-2",
        "size": "Set of 2",
        "flavor": null,
        "unit": "Set of 2",
        "price": 759,
        "mrp": 1044,
        "calories": 0,
        "protein": 0,
        "stock": 103
      }
    ]
  },
  {
    "id": "wp-9",
    "name": "Gym Water Bottle",
    "category": "workout-products",
    "image": "https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?auto=format&fit=crop&w=480&q=80",
    "description": "Durable, gym-ready gym water bottle built for consistent training performance.",
    "ingredients": [],
    "rating": 4.7,
    "reviewCount": 473,
    "tags": [],
    "variants": [
      {
        "id": "standard",
        "size": "Standard",
        "flavor": null,
        "unit": "1 pc",
        "price": 299,
        "mrp": 352,
        "calories": 0,
        "protein": 0,
        "stock": 25
      },
      {
        "id": "pro",
        "size": "Pro",
        "flavor": null,
        "unit": "1 pc (Pro)",
        "price": 389,
        "mrp": 520,
        "calories": 0,
        "protein": 0,
        "stock": 120
      },
      {
        "id": "premium",
        "size": "Premium",
        "flavor": null,
        "unit": "1 pc (Premium)",
        "price": 509,
        "mrp": 702,
        "calories": 0,
        "protein": 0,
        "stock": 18
      },
      {
        "id": "set-of-2",
        "size": "Set of 2",
        "flavor": null,
        "unit": "Set of 2",
        "price": 569,
        "mrp": 735,
        "calories": 0,
        "protein": 0,
        "stock": 22
      }
    ]
  },
  {
    "id": "wp-10",
    "name": "Ab Wheel Roller",
    "category": "workout-products",
    "image": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=500&q=80",
    "description": "Durable, gym-ready ab wheel roller built for consistent training performance.",
    "ingredients": [],
    "rating": 4.7,
    "reviewCount": 923,
    "tags": [
      "bestseller"
    ],
    "variants": [
      {
        "id": "standard",
        "size": "Standard",
        "flavor": null,
        "unit": "1 pc",
        "price": 549,
        "mrp": 757,
        "calories": 0,
        "protein": 0,
        "stock": 46
      },
      {
        "id": "pro",
        "size": "Pro",
        "flavor": null,
        "unit": "1 pc (Pro)",
        "price": 709,
        "mrp": 797,
        "calories": 0,
        "protein": 0,
        "stock": 112
      },
      {
        "id": "premium",
        "size": "Premium",
        "flavor": null,
        "unit": "1 pc (Premium)",
        "price": 929,
        "mrp": 1074,
        "calories": 0,
        "protein": 0,
        "stock": 81
      },
      {
        "id": "set-of-2",
        "size": "Set of 2",
        "flavor": null,
        "unit": "Set of 2",
        "price": 1039,
        "mrp": 1299,
        "calories": 0,
        "protein": 0,
        "stock": 84
      }
    ]
  },
  {
    "id": "wp-11",
    "name": "Kettlebell",
    "category": "workout-products",
    "image": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=500&q=80",
    "description": "Durable, gym-ready kettlebell built for consistent training performance.",
    "ingredients": [],
    "rating": 4.5,
    "reviewCount": 56,
    "tags": [],
    "variants": [
      {
        "id": "standard",
        "size": "Standard",
        "flavor": null,
        "unit": "1 pc",
        "price": 1299,
        "mrp": 1561,
        "calories": 0,
        "protein": 0,
        "stock": 95
      },
      {
        "id": "pro",
        "size": "Pro",
        "flavor": null,
        "unit": "1 pc (Pro)",
        "price": 1689,
        "mrp": 2309,
        "calories": 0,
        "protein": 0,
        "stock": 63
      },
      {
        "id": "premium",
        "size": "Premium",
        "flavor": null,
        "unit": "1 pc (Premium)",
        "price": 2209,
        "mrp": 2546,
        "calories": 0,
        "protein": 0,
        "stock": 77
      },
      {
        "id": "set-of-2",
        "size": "Set of 2",
        "flavor": null,
        "unit": "Set of 2",
        "price": 2469,
        "mrp": 3151,
        "calories": 0,
        "protein": 0,
        "stock": 38
      }
    ]
  },
  {
    "id": "wp-12",
    "name": "Push Up Bars",
    "category": "workout-products",
    "image": "https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?auto=format&fit=crop&w=500&q=80",
    "description": "Durable, gym-ready push up bars built for consistent training performance.",
    "ingredients": [],
    "rating": 4.7,
    "reviewCount": 436,
    "tags": [
      "trending"
    ],
    "variants": [
      {
        "id": "standard",
        "size": "Standard",
        "flavor": null,
        "unit": "1 pc",
        "price": 449,
        "mrp": 564,
        "calories": 0,
        "protein": 0,
        "stock": 23
      },
      {
        "id": "pro",
        "size": "Pro",
        "flavor": null,
        "unit": "1 pc (Pro)",
        "price": 579,
        "mrp": 690,
        "calories": 0,
        "protein": 0,
        "stock": 50
      },
      {
        "id": "premium",
        "size": "Premium",
        "flavor": null,
        "unit": "1 pc (Premium)",
        "price": 759,
        "mrp": 998,
        "calories": 0,
        "protein": 0,
        "stock": 87
      },
      {
        "id": "set-of-2",
        "size": "Set of 2",
        "flavor": null,
        "unit": "Set of 2",
        "price": 849,
        "mrp": 994,
        "calories": 0,
        "protein": 0,
        "stock": 97
      }
    ]
  },
  {
    "id": "wp-13",
    "name": "Gym Duffel Bag",
    "category": "workout-products",
    "image": "https://images.unsplash.com/photo-1620188467120-5042ed1eb5da?auto=format&fit=crop&w=500&q=80",
    "description": "Durable, gym-ready gym duffel bag built for consistent training performance.",
    "ingredients": [],
    "rating": 4.9,
    "reviewCount": 181,
    "tags": [],
    "variants": [
      {
        "id": "standard",
        "size": "Standard",
        "flavor": null,
        "unit": "1 pc",
        "price": 1099,
        "mrp": 1463,
        "calories": 0,
        "protein": 0,
        "stock": 98
      },
      {
        "id": "pro",
        "size": "Pro",
        "flavor": null,
        "unit": "1 pc (Pro)",
        "price": 1429,
        "mrp": 1814,
        "calories": 0,
        "protein": 0,
        "stock": 18
      },
      {
        "id": "premium",
        "size": "Premium",
        "flavor": null,
        "unit": "1 pc (Premium)",
        "price": 1869,
        "mrp": 2250,
        "calories": 0,
        "protein": 0,
        "stock": 107
      },
      {
        "id": "set-of-2",
        "size": "Set of 2",
        "flavor": null,
        "unit": "Set of 2",
        "price": 2089,
        "mrp": 2355,
        "calories": 0,
        "protein": 0,
        "stock": 85
      }
    ]
  },
  {
    "id": "wp-14",
    "name": "Wrist Wraps",
    "category": "workout-products",
    "image": "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?auto=format&fit=crop&w=500&q=80",
    "description": "Durable, gym-ready wrist wraps built for consistent training performance.",
    "ingredients": [],
    "rating": 4.5,
    "reviewCount": 80,
    "tags": [
      "new"
    ],
    "variants": [
      {
        "id": "standard",
        "size": "Standard",
        "flavor": null,
        "unit": "1 pc",
        "price": 349,
        "mrp": 421,
        "calories": 0,
        "protein": 0,
        "stock": 116
      },
      {
        "id": "pro",
        "size": "Pro",
        "flavor": null,
        "unit": "1 pc (Pro)",
        "price": 449,
        "mrp": 609,
        "calories": 0,
        "protein": 0,
        "stock": 82
      },
      {
        "id": "premium",
        "size": "Premium",
        "flavor": null,
        "unit": "1 pc (Premium)",
        "price": 589,
        "mrp": 749,
        "calories": 0,
        "protein": 0,
        "stock": 67
      },
      {
        "id": "set-of-2",
        "size": "Set of 2",
        "flavor": null,
        "unit": "Set of 2",
        "price": 659,
        "mrp": 753,
        "calories": 0,
        "protein": 0,
        "stock": 19
      }
    ]
  },
  {
    "id": "we-gen-100",
    "name": "Apple Cider Vinegar with The Mother Gummies",
    "brand": "Kapiva",
    "category": "weight-loss",
    "subCategory": "Supplements",
    "image": "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Delicious pectin gummies powered by unfiltered Himalayan apple cider vinegar and vitamin B12 to improve gut health and fat metabolism.",
    "ingredients": [
      "Apple Cider Vinegar with Mother",
      "Vitamin B12",
      "Pomegranate Extract",
      "Folic Acid"
    ],
    "rating": 4.7,
    "reviewCount": 820,
    "inStock": true,
    "tags": [
      "bestseller",
      "gut-health",
      "gelatin-free"
    ],
    "variants": [
      {
        "id": "we-gen-100-30g",
        "size": "30 Gummies",
        "flavor": "Crisp Apple",
        "unit": "30 Gummies Pack",
        "price": 449,
        "mrp": 599,
        "calories": 15,
        "protein": 0,
        "stock": 95
      },
      {
        "id": "we-gen-100-60g",
        "size": "60 Gummies",
        "flavor": "Crisp Apple",
        "unit": "60 Gummies Jar",
        "price": 799,
        "mrp": 1199,
        "calories": 15,
        "protein": 0,
        "stock": 70
      }
    ],
    "nutrition": {
      "calories": 15,
      "protein": 0,
      "carbs": 3.5,
      "fats": 0,
      "servingSize": "2 Gummies (8g)"
    }
  },
  {
    "id": "we-gen-101",
    "name": "Keto BHB Exogenous Ketone Electrolyte Salts",
    "brand": "Ketofy",
    "category": "weight-loss",
    "subCategory": "Supplements",
    "image": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Advanced Beta-Hydroxybutyrate (BHB) complex bound to calcium, magnesium, and sodium to accelerate nutritional ketosis without keto flu.",
    "ingredients": [
      "Calcium BHB",
      "Magnesium BHB",
      "Sodium BHB",
      "Potassium Citrate",
      "Stevia Leaf Extract"
    ],
    "rating": 4.6,
    "reviewCount": 410,
    "inStock": true,
    "tags": [
      "keto",
      "energy",
      "zero-sugar"
    ],
    "variants": [
      {
        "id": "we-gen-101-300g",
        "size": "300g Powder",
        "flavor": "Lemon Lime",
        "unit": "300g Tub",
        "price": 899,
        "mrp": 1299,
        "calories": 5,
        "protein": 0,
        "stock": 55
      },
      {
        "id": "we-gen-101-600g",
        "size": "600g Powder",
        "flavor": "Lemon Lime",
        "unit": "600g Tub",
        "price": 1599,
        "mrp": 2399,
        "calories": 5,
        "protein": 0,
        "stock": 35
      }
    ],
    "nutrition": {
      "calories": 5,
      "protein": 0,
      "carbs": 0.5,
      "fats": 0,
      "servingSize": "10g (1 Scoop)"
    }
  },
  {
    "id": "we-gen-102",
    "name": "Pure Thar Aloe Vera Inner Leaf Detox Juice",
    "brand": "Baidyanath",
    "category": "weight-loss",
    "subCategory": "Detox Drinks",
    "image": "https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Micro-filtered inner leaf aloe vera pulp juice with natural polysaccharides to soothe digestive tract lining and flush out bodily toxins.",
    "ingredients": [
      "100% Cold-Extracted Aloe Vera Inner Leaf Pulp (Aloe Barbadensis)"
    ],
    "rating": 4.7,
    "reviewCount": 560,
    "inStock": true,
    "tags": [
      "herbal",
      "detox",
      "digestive"
    ],
    "variants": [
      {
        "id": "we-gen-102-1l",
        "size": "1 Litre",
        "flavor": "Natural Pulp",
        "unit": "1000ml Bottle",
        "price": 279,
        "mrp": 360,
        "calories": 12,
        "protein": 0.3,
        "stock": 80
      },
      {
        "id": "we-gen-102-2l",
        "size": "Pack of 2 (2L)",
        "flavor": "Natural Pulp",
        "unit": "2 x 1000ml Bottles",
        "price": 499,
        "mrp": 720,
        "calories": 12,
        "protein": 0.3,
        "stock": 45
      }
    ],
    "nutrition": {
      "calories": 12,
      "protein": 0.3,
      "carbs": 2.5,
      "fats": 0.1,
      "servingSize": "30ml"
    }
  },
  {
    "id": "we-gen-103",
    "name": "BurnPRO Thermogenic Extreme Fat Burner",
    "brand": "MuscleBlaze",
    "category": "weight-loss",
    "subCategory": "Supplements",
    "image": "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Clinically dosed thermogenic formula with Green Coffee Bean Extract, L-Theanine, Capsimax cayenne, and caffeine for enhanced calorie burn.",
    "ingredients": [
      "Green Coffee Bean Extract",
      "Caffeine Anhydrous",
      "L-Theanine",
      "Capsimax",
      "Black Pepper Extract"
    ],
    "rating": 4.8,
    "reviewCount": 1120,
    "inStock": true,
    "tags": [
      "bestseller",
      "thermogenic",
      "workout-fuel"
    ],
    "variants": [
      {
        "id": "we-gen-103-60caps",
        "size": "60 Capsules",
        "flavor": "Unflavored",
        "unit": "60 Veg Capsules",
        "price": 749,
        "mrp": 1099,
        "calories": 0,
        "protein": 0,
        "stock": 110
      },
      {
        "id": "we-gen-103-120caps",
        "size": "120 Capsules",
        "flavor": "Unflavored",
        "unit": "120 Veg Capsules",
        "price": 1349,
        "mrp": 1999,
        "calories": 0,
        "protein": 0,
        "stock": 65
      }
    ],
    "nutrition": {
      "calories": 0,
      "protein": 0,
      "carbs": 0,
      "fats": 0,
      "servingSize": "2 Capsules"
    }
  },
  {
    "id": "we-gen-104",
    "name": "Garcinia Cambogia 60% HCA Appetite Controller",
    "brand": "Himalayan Organics",
    "category": "weight-loss",
    "subCategory": "Supplements",
    "image": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Standardized herbal extract delivering 60% active Hydroxycitric Acid (HCA) to inhibit citrate lyase enzyme and curb emotional snacking.",
    "ingredients": [
      "Garcinia Cambogia Fruit Extract (60% HCA)",
      "Green Tea Extract",
      "Guggul Extract"
    ],
    "rating": 4.6,
    "reviewCount": 480,
    "inStock": true,
    "tags": [
      "herbal",
      "weight-loss",
      "plant-based"
    ],
    "variants": [
      {
        "id": "we-gen-104-60caps",
        "size": "60 Capsules",
        "flavor": "Unflavored",
        "unit": "60 Veg Capsules",
        "price": 549,
        "mrp": 799,
        "calories": 0,
        "protein": 0,
        "stock": 85
      },
      {
        "id": "we-gen-104-120caps",
        "size": "120 Capsules",
        "flavor": "Unflavored",
        "unit": "120 Veg Capsules",
        "price": 949,
        "mrp": 1499,
        "calories": 0,
        "protein": 0,
        "stock": 50
      }
    ],
    "nutrition": {
      "calories": 0,
      "protein": 0,
      "carbs": 0,
      "fats": 0,
      "servingSize": "2 Capsules"
    }
  },
  {
    "id": "we-gen-105",
    "name": "Zero Carb Shirataki Konjac Noodles",
    "brand": "Urban Platter",
    "category": "weight-loss",
    "subCategory": "Healthy Meals",
    "image": "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Miracle noodles made from glucomannan konjac root containing only 9 calories per serving, ideal for pasta cravings during a calorie deficit.",
    "ingredients": [
      "Purified Water",
      "Konjac Flour (Glucomannan)",
      "Calcium Hydroxide"
    ],
    "rating": 4.5,
    "reviewCount": 430,
    "inStock": true,
    "tags": [
      "keto",
      "zero-carb",
      "gluten-free"
    ],
    "variants": [
      {
        "id": "we-gen-105-270g",
        "size": "270g Pack",
        "flavor": "Neutral",
        "unit": "270g Pouch",
        "price": 289,
        "mrp": 350,
        "calories": 9,
        "protein": 0,
        "stock": 90
      },
      {
        "id": "we-gen-105-pack3",
        "size": "270g x 3",
        "flavor": "Neutral",
        "unit": "Pack of 3 Pouches",
        "price": 799,
        "mrp": 1050,
        "calories": 9,
        "protein": 0,
        "stock": 50
      }
    ],
    "nutrition": {
      "calories": 9,
      "protein": 0.2,
      "carbs": 1.8,
      "fats": 0,
      "servingSize": "100g"
    }
  },
  {
    "id": "we-gen-106",
    "name": "Low-Calorie Konjac Diet Rice",
    "brand": "Ketofy",
    "category": "weight-loss",
    "subCategory": "Healthy Meals",
    "image": "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Grain-free konjac rice pearls providing the mouthfeel of real rice with over 90% fewer calories and near zero net carbohydrates.",
    "ingredients": [
      "Water",
      "Konjac Root Powder",
      "Citric Acid"
    ],
    "rating": 4.4,
    "reviewCount": 360,
    "inStock": true,
    "tags": [
      "keto",
      "low-calorie",
      "vegan"
    ],
    "variants": [
      {
        "id": "we-gen-106-250g",
        "size": "250g Pack",
        "flavor": "Neutral",
        "unit": "250g Pouch",
        "price": 299,
        "mrp": 375,
        "calories": 10,
        "protein": 0,
        "stock": 85
      },
      {
        "id": "we-gen-106-pack3",
        "size": "250g x 3",
        "flavor": "Neutral",
        "unit": "Pack of 3 Pouches",
        "price": 829,
        "mrp": 1125,
        "calories": 10,
        "protein": 0,
        "stock": 40
      }
    ],
    "nutrition": {
      "calories": 10,
      "protein": 0.1,
      "carbs": 2.1,
      "fats": 0,
      "servingSize": "100g"
    }
  },
  {
    "id": "we-gen-107",
    "name": "First Harvest Japanese Ceremonial Matcha Green Tea Powder",
    "brand": "Tencha",
    "category": "weight-loss",
    "subCategory": "Superfoods",
    "image": "https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Stone-ground ceremonial grade Uji matcha packed with 137x more antioxidants than regular brewed green tea and clean L-theanine energy.",
    "ingredients": [
      "100% Japanese Stone-Ground Green Tea Leaves (Ceremonial Grade)"
    ],
    "rating": 4.9,
    "reviewCount": 710,
    "inStock": true,
    "tags": [
      "ceremonial-grade",
      "antioxidant",
      "focus"
    ],
    "variants": [
      {
        "id": "we-gen-107-50g",
        "size": "50g Tin",
        "flavor": "Rich Umami",
        "unit": "50g Sealed Tin",
        "price": 599,
        "mrp": 799,
        "calories": 3,
        "protein": 0.3,
        "stock": 65
      },
      {
        "id": "we-gen-107-100g",
        "size": "100g Tin",
        "flavor": "Rich Umami",
        "unit": "100g Sealed Tin",
        "price": 1049,
        "mrp": 1499,
        "calories": 3,
        "protein": 0.3,
        "stock": 40
      }
    ],
    "nutrition": {
      "calories": 3,
      "protein": 0.3,
      "carbs": 0.4,
      "fats": 0,
      "servingSize": "1g (1/2 tsp)"
    }
  },
  {
    "id": "we-gen-108",
    "name": "Pure Freeze-Dried Celery Detox Juice Powder",
    "brand": "Neuherbs",
    "category": "weight-loss",
    "subCategory": "Detox Drinks",
    "image": "https://images.unsplash.com/photo-1510130387422-82bed34b37e9?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1510130387422-82bed34b37e9?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "100% pure organic celery juice powder rich in bio-sodium mineral cluster salts to support gut motility, reduce water retention and bloating.",
    "ingredients": [
      "100% Freeze-Dried Organic Celery Stalk Powder (Apium Graveolens)"
    ],
    "rating": 4.5,
    "reviewCount": 380,
    "inStock": true,
    "tags": [
      "anti-bloat",
      "cleansing",
      "plant-based"
    ],
    "variants": [
      {
        "id": "we-gen-108-150g",
        "size": "150g Jar",
        "flavor": "Crisp Celery",
        "unit": "150g Jar (30 Servings)",
        "price": 449,
        "mrp": 599,
        "calories": 15,
        "protein": 0.8,
        "stock": 70
      },
      {
        "id": "we-gen-108-300g",
        "size": "300g Jar",
        "flavor": "Crisp Celery",
        "unit": "300g Jar (60 Servings)",
        "price": 799,
        "mrp": 1150,
        "calories": 15,
        "protein": 0.8,
        "stock": 45
      }
    ],
    "nutrition": {
      "calories": 15,
      "protein": 0.8,
      "carbs": 2.5,
      "fats": 0.1,
      "servingSize": "5g (1 Scoop)"
    }
  },
  {
    "id": "we-gen-109",
    "name": "Spiced Ginger Lemon Herbal Detox Infusion",
    "brand": "Typhoo",
    "category": "weight-loss",
    "subCategory": "Detox Drinks",
    "image": "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Caffeine-free soothing botanical blend combining zesty dried lemon peel and warming ginger root to stimulate digestion and metabolic heat.",
    "ingredients": [
      "Ginger Root",
      "Lemon Peel",
      "Lemongrass",
      "Licorice",
      "Spearmint"
    ],
    "rating": 4.8,
    "reviewCount": 520,
    "inStock": true,
    "tags": [
      "caffeine-free",
      "digestive",
      "immunity"
    ],
    "variants": [
      {
        "id": "we-gen-109-25bags",
        "size": "25 Tea Bags",
        "flavor": "Ginger Lemon",
        "unit": "25 Tea Bags Box",
        "price": 210,
        "mrp": 260,
        "calories": 1,
        "protein": 0,
        "stock": 95
      },
      {
        "id": "we-gen-109-50bags",
        "size": "50 Tea Bags",
        "flavor": "Ginger Lemon",
        "unit": "50 Tea Bags Box",
        "price": 389,
        "mrp": 495,
        "calories": 1,
        "protein": 0,
        "stock": 60
      }
    ],
    "nutrition": {
      "calories": 1,
      "protein": 0,
      "carbs": 0.2,
      "fats": 0,
      "servingSize": "1 Cup (200ml)"
    }
  },
  {
    "id": "we-gen-110",
    "name": "Grapefruit Seed Extract Liquid Metabolic Drops",
    "brand": "Nutriorg",
    "category": "weight-loss",
    "subCategory": "Supplements",
    "image": "https://images.unsplash.com/photo-1597714026720-8f74c62310ba?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1597714026720-8f74c62310ba?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Concentrated bioactive citrus bioflavonoid drops providing naringenin antioxidants to help activate AMPK enzymes in cellular fat burning.",
    "ingredients": [
      "Grapefruit Seed Extract (Citrus Paradisi)",
      "Vegetable Glycerin",
      "Purified Water"
    ],
    "rating": 4.6,
    "reviewCount": 310,
    "inStock": true,
    "tags": [
      "metabolic-boost",
      "antioxidant"
    ],
    "variants": [
      {
        "id": "we-gen-110-30ml",
        "size": "30ml Dropper",
        "flavor": "Citrus Tart",
        "unit": "30ml Bottle",
        "price": 379,
        "mrp": 499,
        "calories": 0,
        "protein": 0,
        "stock": 70
      },
      {
        "id": "we-gen-110-60ml",
        "size": "60ml Dropper",
        "flavor": "Citrus Tart",
        "unit": "60ml Bottle",
        "price": 679,
        "mrp": 899,
        "calories": 0,
        "protein": 0,
        "stock": 45
      }
    ],
    "nutrition": {
      "calories": 0,
      "protein": 0,
      "carbs": 0,
      "fats": 0,
      "servingSize": "10 Drops (0.5ml)"
    }
  },
  {
    "id": "we-gen-111",
    "name": "Prebiotic Daily Soluble Dietary Fiber",
    "brand": "ActiFiber",
    "category": "weight-loss",
    "subCategory": "Supplements",
    "image": "https://images.unsplash.com/photo-1514995428455-447d4443fa7f?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1514995428455-447d4443fa7f?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "100% natural wheat dextrin soluble dietary fiber powder that dissolves clear in any beverage without altering taste or texture.",
    "ingredients": [
      "100% Wheat Dextrin Soluble Dietary Fiber"
    ],
    "rating": 4.7,
    "reviewCount": 780,
    "inStock": true,
    "tags": [
      "fiber-rich",
      "gut-friendly",
      "sugar-free"
    ],
    "variants": [
      {
        "id": "we-gen-111-200g",
        "size": "200g Jar",
        "flavor": "Unflavored",
        "unit": "200g Jar",
        "price": 399,
        "mrp": 499,
        "calories": 12,
        "protein": 0,
        "stock": 110
      },
      {
        "id": "we-gen-111-400g",
        "size": "400g Jar",
        "flavor": "Unflavored",
        "unit": "400g Jar",
        "price": 729,
        "mrp": 950,
        "calories": 12,
        "protein": 0,
        "stock": 65
      }
    ],
    "nutrition": {
      "calories": 12,
      "protein": 0,
      "carbs": 6,
      "fats": 0,
      "servingSize": "6g (1 Tbsp)"
    }
  },
  {
    "id": "we-gen-112",
    "name": "Gluten-Free Konjac Diet Fettuccine",
    "brand": "Ketofy",
    "category": "weight-loss",
    "subCategory": "Healthy Meals",
    "image": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Broad cut konjac pasta ribbons that hold rich pestos and tomato sauces perfectly while keeping daily carb intake at near zero.",
    "ingredients": [
      "Purified Water",
      "Konjac Glucomannan",
      "Calcium Hydroxide"
    ],
    "rating": 4.5,
    "reviewCount": 340,
    "inStock": true,
    "tags": [
      "keto",
      "zero-carb",
      "vegan"
    ],
    "variants": [
      {
        "id": "we-gen-112-250g",
        "size": "250g Pack",
        "flavor": "Neutral",
        "unit": "250g Pouch",
        "price": 289,
        "mrp": 350,
        "calories": 9,
        "protein": 0.2,
        "stock": 80
      },
      {
        "id": "we-gen-112-pack3",
        "size": "250g x 3",
        "flavor": "Neutral",
        "unit": "Pack of 3 Pouches",
        "price": 799,
        "mrp": 1050,
        "calories": 9,
        "protein": 0.2,
        "stock": 45
      }
    ],
    "nutrition": {
      "calories": 9,
      "protein": 0.2,
      "carbs": 1.8,
      "fats": 0,
      "servingSize": "100g"
    }
  },
  {
    "id": "we-gen-113",
    "name": "Superfood Meal Replacement Slim Shake",
    "brand": "OZiva",
    "category": "weight-loss",
    "subCategory": "Supplements",
    "image": "https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Ayurvedic herbs (Garcinia, Green Tea, Shatavari) combined with 28 vitamins, minerals, and 20g clean plant protein to replace a 500 kcal meal.",
    "ingredients": [
      "Pea Protein Isolate",
      "Brown Rice Protein",
      "Garcinia Cambogia Extract",
      "Green Tea Extract",
      "Vitamin & Mineral Blend"
    ],
    "rating": 4.8,
    "reviewCount": 1450,
    "inStock": true,
    "tags": [
      "bestseller",
      "meal-replacement",
      "high-protein"
    ],
    "variants": [
      {
        "id": "we-gen-113-500g",
        "size": "500g Tub",
        "flavor": "Swiss Chocolate",
        "unit": "500g Tub",
        "price": 899,
        "mrp": 1199,
        "calories": 140,
        "protein": 20,
        "stock": 95
      },
      {
        "id": "we-gen-113-1kg",
        "size": "1kg Tub",
        "flavor": "Swiss Chocolate",
        "unit": "1kg Tub",
        "price": 1649,
        "mrp": 2299,
        "calories": 140,
        "protein": 20,
        "stock": 60
      }
    ],
    "nutrition": {
      "calories": 140,
      "protein": 20,
      "carbs": 11,
      "fats": 1.5,
      "servingSize": "35g (1 Scoop)"
    }
  },
  {
    "id": "we-gen-114",
    "name": "Pure Natural Psyllium Husk (Sat Isabgol)",
    "brand": "Organic India",
    "category": "weight-loss",
    "subCategory": "Supplements",
    "image": "https://images.unsplash.com/photo-1562547256-2c5ee93b60b7?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1562547256-2c5ee93b60b7?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "100% certified organic whole psyllium husk providing mucilage fiber to slow gastric emptying, balance gut microbiota and regulate bowel motility.",
    "ingredients": [
      "100% Certified Organic Psyllium Husk (Plantago Ovata)"
    ],
    "rating": 4.9,
    "reviewCount": 880,
    "inStock": true,
    "tags": [
      "organic",
      "fiber",
      "digestive"
    ],
    "variants": [
      {
        "id": "we-gen-114-100g",
        "size": "100g Jar",
        "flavor": "Natural",
        "unit": "100g Jar",
        "price": 185,
        "mrp": 230,
        "calories": 15,
        "protein": 0,
        "stock": 120
      },
      {
        "id": "we-gen-114-250g",
        "size": "250g Jar",
        "flavor": "Natural",
        "unit": "250g Jar",
        "price": 399,
        "mrp": 495,
        "calories": 15,
        "protein": 0,
        "stock": 85
      }
    ],
    "nutrition": {
      "calories": 15,
      "protein": 0,
      "carbs": 4,
      "fats": 0,
      "servingSize": "5g (1 Tbsp)"
    }
  },
  {
    "id": "we-gen-115",
    "name": "High Mountain Formosa Oolong Slimming Tea",
    "brand": "Vahdam",
    "category": "weight-loss",
    "subCategory": "Detox Drinks",
    "image": "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Semi-fermented whole leaf oolong rich in theaflavins and polymerized polyphenols known to trigger lipid breakdown and thermogenesis.",
    "ingredients": [
      "100% Pure High-Grown Oolong Tea Leaves"
    ],
    "rating": 4.8,
    "reviewCount": 520,
    "inStock": true,
    "tags": [
      "loose-leaf",
      "antioxidant",
      "premium"
    ],
    "variants": [
      {
        "id": "we-gen-115-100g",
        "size": "100g Tin",
        "flavor": "Floral Roasted",
        "unit": "100g Vacuum Tin",
        "price": 449,
        "mrp": 599,
        "calories": 2,
        "protein": 0,
        "stock": 75
      },
      {
        "id": "we-gen-115-200g",
        "size": "200g Tin",
        "flavor": "Floral Roasted",
        "unit": "200g Vacuum Tin",
        "price": 799,
        "mrp": 1099,
        "calories": 2,
        "protein": 0,
        "stock": 45
      }
    ],
    "nutrition": {
      "calories": 2,
      "protein": 0,
      "carbs": 0.3,
      "fats": 0,
      "servingSize": "1 Cup (200ml)"
    }
  },
  {
    "id": "we-gen-116",
    "name": "Egyptian Dried Hibiscus Flower Detox Herbal Tea",
    "brand": "Blue Tea",
    "category": "weight-loss",
    "subCategory": "Detox Drinks",
    "image": "https://images.unsplash.com/photo-1523920290228-4f321a939b4c?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1523920290228-4f321a939b4c?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Tart ruby-red botanical infusion made from whole sun-dried hibiscus petals containing anthocyanins to support healthy blood pressure and fluid balance.",
    "ingredients": [
      "100% Whole Sun-Dried Hibiscus Sabdariffa Flower Petals"
    ],
    "rating": 4.7,
    "reviewCount": 610,
    "inStock": true,
    "tags": [
      "caffeine-free",
      "anti-bloat",
      "tart-flavor"
    ],
    "variants": [
      {
        "id": "we-gen-116-50g",
        "size": "50g Jar",
        "flavor": "Tangy Berry",
        "unit": "50g Glass Jar",
        "price": 279,
        "mrp": 350,
        "calories": 2,
        "protein": 0,
        "stock": 85
      },
      {
        "id": "we-gen-116-100g",
        "size": "100g Jar",
        "flavor": "Tangy Berry",
        "unit": "100g Glass Jar",
        "price": 489,
        "mrp": 650,
        "calories": 2,
        "protein": 0,
        "stock": 55
      }
    ],
    "nutrition": {
      "calories": 2,
      "protein": 0,
      "carbs": 0.4,
      "fats": 0,
      "servingSize": "1 Cup (200ml)"
    }
  },
  {
    "id": "we-gen-117",
    "name": "Cayenne Capsimax Pepper Fat Metabolizer",
    "brand": "INLIFE",
    "category": "weight-loss",
    "subCategory": "Supplements",
    "image": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Enteric-coated red pepper beadlets delivering active capsaicinoids to elevate energy expenditure without stomach irritation.",
    "ingredients": [
      "Capsimax Red Pepper Extract (Capsicum Annuum)",
      "Ginger Root Extract",
      "Bioperine"
    ],
    "rating": 4.6,
    "reviewCount": 390,
    "inStock": true,
    "tags": [
      "thermogenic",
      "metabolism",
      "capsimax"
    ],
    "variants": [
      {
        "id": "we-gen-117-60caps",
        "size": "60 Capsules",
        "flavor": "Unflavored",
        "unit": "60 Veg Capsules",
        "price": 599,
        "mrp": 849,
        "calories": 0,
        "protein": 0,
        "stock": 70
      },
      {
        "id": "we-gen-117-120caps",
        "size": "120 Capsules",
        "flavor": "Unflavored",
        "unit": "120 Veg Capsules",
        "price": 1049,
        "mrp": 1599,
        "calories": 0,
        "protein": 0,
        "stock": 40
      }
    ],
    "nutrition": {
      "calories": 0,
      "protein": 0,
      "carbs": 0,
      "fats": 0,
      "servingSize": "1 Capsule"
    }
  },
  {
    "id": "we-gen-118",
    "name": "Turmeric Curcumin 95% with Piperine Herbal Slim",
    "brand": "Kapiva",
    "category": "weight-loss",
    "subCategory": "Supplements",
    "image": "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Standardized 95% curcuminoid complex enhanced with black pepper piperine to combat diet-induced systemic inflammation and support liver fat metabolism.",
    "ingredients": [
      "Curcuma Longa Extract (95% Curcuminoids)",
      "Black Pepper Fruit Extract (95% Piperine)"
    ],
    "rating": 4.8,
    "reviewCount": 770,
    "inStock": true,
    "tags": [
      "anti-inflammatory",
      "ayurvedic",
      "joint-health"
    ],
    "variants": [
      {
        "id": "we-gen-118-60caps",
        "size": "60 Capsules",
        "flavor": "Unflavored",
        "unit": "60 Veg Capsules",
        "price": 479,
        "mrp": 699,
        "calories": 0,
        "protein": 0,
        "stock": 90
      },
      {
        "id": "we-gen-118-120caps",
        "size": "120 Capsules",
        "flavor": "Unflavored",
        "unit": "120 Veg Capsules",
        "price": 849,
        "mrp": 1299,
        "calories": 0,
        "protein": 0,
        "stock": 55
      }
    ],
    "nutrition": {
      "calories": 0,
      "protein": 0,
      "carbs": 0,
      "fats": 0,
      "servingSize": "1 Capsule"
    }
  },
  {
    "id": "we-gen-119",
    "name": "Phase 2 White Kidney Bean Carb Intercept",
    "brand": "Carbamide Forte",
    "category": "weight-loss",
    "subCategory": "Supplements",
    "image": "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Non-stimulant all-natural white kidney bean extract that temporarily inhibits alpha-amylase enzyme from breaking complex dietary starches into glucose.",
    "ingredients": [
      "Phaseolus Vulgaris White Kidney Bean Extract (Phase 2)",
      "Chromium Picolinate"
    ],
    "rating": 4.6,
    "reviewCount": 520,
    "inStock": true,
    "tags": [
      "carb-blocker",
      "non-stimulant",
      "diet-support"
    ],
    "variants": [
      {
        "id": "we-gen-119-60caps",
        "size": "60 Capsules",
        "flavor": "Unflavored",
        "unit": "60 Veg Capsules",
        "price": 549,
        "mrp": 799,
        "calories": 0,
        "protein": 0,
        "stock": 85
      },
      {
        "id": "we-gen-119-120caps",
        "size": "120 Capsules",
        "flavor": "Unflavored",
        "unit": "120 Veg Capsules",
        "price": 979,
        "mrp": 1499,
        "calories": 0,
        "protein": 0,
        "stock": 45
      }
    ],
    "nutrition": {
      "calories": 0,
      "protein": 0,
      "carbs": 0,
      "fats": 0,
      "servingSize": "2 Capsules"
    }
  },
  {
    "id": "we-gen-120",
    "name": "CarbBlocker Dual Action Meal Neutralizer",
    "brand": "Fast&Up",
    "category": "weight-loss",
    "subCategory": "Supplements",
    "image": "https://images.unsplash.com/photo-1626544827763-d516dce335e2?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1626544827763-d516dce335e2?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Dual-action dietary support with green coffee chlorogenic acid and phaseolamin to reduce carbohydrate absorption during cheat meals.",
    "ingredients": [
      "Phaseolamin White Kidney Bean",
      "Green Coffee Bean Extract",
      "Cinnamon Bark Extract",
      "Zinc Gluconate"
    ],
    "rating": 4.7,
    "reviewCount": 640,
    "inStock": true,
    "tags": [
      "cheat-meal",
      "carb-control"
    ],
    "variants": [
      {
        "id": "we-gen-120-60caps",
        "size": "60 Capsules",
        "flavor": "Unflavored",
        "unit": "60 Veg Capsules",
        "price": 649,
        "mrp": 899,
        "calories": 0,
        "protein": 0,
        "stock": 75
      },
      {
        "id": "we-gen-120-120caps",
        "size": "120 Capsules",
        "flavor": "Unflavored",
        "unit": "120 Veg Capsules",
        "price": 1149,
        "mrp": 1699,
        "calories": 0,
        "protein": 0,
        "stock": 40
      }
    ],
    "nutrition": {
      "calories": 0,
      "protein": 0,
      "carbs": 0,
      "fats": 0,
      "servingSize": "2 Capsules"
    }
  },
  {
    "id": "we-gen-121",
    "name": "Organic Roasted Dandelion Root Cleansing Tea",
    "brand": "Traditional Medicinals",
    "category": "weight-loss",
    "subCategory": "Detox Drinks",
    "image": "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Earthy, robust herbal infusion made from European roasted dandelion root to gently stimulate kidney filtration and ease water retention.",
    "ingredients": [
      "100% Organic Roasted Dandelion Root (Taraxacum Officinale)"
    ],
    "rating": 4.8,
    "reviewCount": 390,
    "inStock": true,
    "tags": [
      "kidney-cleanse",
      "anti-bloat",
      "caffeine-free"
    ],
    "variants": [
      {
        "id": "we-gen-121-16bags",
        "size": "16 Tea Bags",
        "flavor": "Earthy Roasted",
        "unit": "16 Tea Bags Box",
        "price": 349,
        "mrp": 450,
        "calories": 2,
        "protein": 0,
        "stock": 65
      },
      {
        "id": "we-gen-121-32bags",
        "size": "32 Tea Bags",
        "flavor": "Earthy Roasted",
        "unit": "32 Tea Bags Box",
        "price": 629,
        "mrp": 850,
        "calories": 2,
        "protein": 0,
        "stock": 40
      }
    ],
    "nutrition": {
      "calories": 2,
      "protein": 0,
      "carbs": 0.3,
      "fats": 0,
      "servingSize": "1 Cup (200ml)"
    }
  },
  {
    "id": "we-gen-122",
    "name": "Wholegrain Rye Crispbread Sourdough Crackers",
    "brand": "Wasa",
    "category": "weight-loss",
    "subCategory": "Healthy Snacks",
    "image": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Classic Scandinavian oven-baked sourdough rye crispbread delivering only 35 calories per slice with exceptional dietary crunch and fiber.",
    "ingredients": [
      "Wholegrain Rye Flour",
      "Rye Sourdough",
      "Yeast",
      "Sea Salt"
    ],
    "rating": 4.6,
    "reviewCount": 510,
    "inStock": true,
    "tags": [
      "low-calorie",
      "high-fiber",
      "vegan"
    ],
    "variants": [
      {
        "id": "we-gen-122-275g",
        "size": "275g Pack",
        "flavor": "Original Sourdough",
        "unit": "275g Box (24 Slices)",
        "price": 289,
        "mrp": 375,
        "calories": 35,
        "protein": 1.2,
        "stock": 80
      },
      {
        "id": "we-gen-122-pack2",
        "size": "Pack of 2",
        "flavor": "Original Sourdough",
        "unit": "2 x 275g Boxes",
        "price": 549,
        "mrp": 750,
        "calories": 35,
        "protein": 1.2,
        "stock": 50
      }
    ],
    "nutrition": {
      "calories": 35,
      "protein": 1.2,
      "carbs": 7,
      "fats": 0.2,
      "servingSize": "1 Slice (11g)"
    }
  },
  {
    "id": "we-gen-123",
    "name": "Ancient Ragi & Foxtail Millet Diet Flakes",
    "brand": "True Elements",
    "category": "weight-loss",
    "subCategory": "Oats & Cereals",
    "image": "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Slow-toasted unpolished finger millet (ragi) and foxtail millet flakes rich in bioavailable calcium, iron, and slow-burning complex carbs.",
    "ingredients": [
      "Whole Ragi Flakes",
      "Foxtail Millet Flakes",
      "Jowar Flakes",
      "Raw Honey Touch"
    ],
    "rating": 4.8,
    "reviewCount": 620,
    "inStock": true,
    "tags": [
      "millet",
      "gluten-free",
      "calcium-rich"
    ],
    "variants": [
      {
        "id": "we-gen-123-400g",
        "size": "400g Pouch",
        "flavor": "Toasted Natural",
        "unit": "400g Zipper Pouch",
        "price": 199,
        "mrp": 260,
        "calories": 155,
        "protein": 4.5,
        "stock": 110
      },
      {
        "id": "we-gen-123-800g",
        "size": "800g Pouch",
        "flavor": "Toasted Natural",
        "unit": "800g Value Pack",
        "price": 369,
        "mrp": 499,
        "calories": 155,
        "protein": 4.5,
        "stock": 70
      }
    ],
    "nutrition": {
      "calories": 360,
      "protein": 11,
      "carbs": 72,
      "fats": 2.2,
      "servingSize": "40g"
    }
  },
  {
    "id": "we-gen-124",
    "name": "Organic Wholegrain Spelt Flakes",
    "brand": "Urban Platter",
    "category": "weight-loss",
    "subCategory": "Oats & Cereals",
    "image": "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Heritage heirloom spelt grain rolled flakes with a distinct nutty flavor profile, gentle on digestion and naturally rich in dietary zinc.",
    "ingredients": [
      "100% Organic Wholegrain Spelt Flakes (Triticum Spelta)"
    ],
    "rating": 4.7,
    "reviewCount": 320,
    "inStock": true,
    "tags": [
      "heirloom-grain",
      "fiber",
      "digestive"
    ],
    "variants": [
      {
        "id": "we-gen-124-500g",
        "size": "500g Pack",
        "flavor": "Nutty Grain",
        "unit": "500g Pack",
        "price": 349,
        "mrp": 450,
        "calories": 170,
        "protein": 6.5,
        "stock": 65
      },
      {
        "id": "we-gen-124-1kg",
        "size": "1kg Pack",
        "flavor": "Nutty Grain",
        "unit": "1kg Pack",
        "price": 629,
        "mrp": 850,
        "calories": 170,
        "protein": 6.5,
        "stock": 35
      }
    ],
    "nutrition": {
      "calories": 350,
      "protein": 14,
      "carbs": 65,
      "fats": 2.4,
      "servingSize": "50g"
    }
  },
  {
    "id": "we-gen-125",
    "name": "Organic Popped Amaranth (Rajgira) Grain",
    "brand": "Organic Tattva",
    "category": "weight-loss",
    "subCategory": "Healthy Grains",
    "image": "https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Naturally puffed lightweight rajgira grain delivering complete plant protein, squalene, and lysine for breakfast porridge and low-cal snack bowls.",
    "ingredients": [
      "100% Organic Puffed Amaranth Seeds"
    ],
    "rating": 4.8,
    "reviewCount": 470,
    "inStock": true,
    "tags": [
      "superfood",
      "gluten-free",
      "lightweight"
    ],
    "variants": [
      {
        "id": "we-gen-125-250g",
        "size": "250g Pouch",
        "flavor": "Puffed Natural",
        "unit": "250g Pouch",
        "price": 149,
        "mrp": 195,
        "calories": 120,
        "protein": 4.5,
        "stock": 90
      },
      {
        "id": "we-gen-125-500g",
        "size": "500g Pouch",
        "flavor": "Puffed Natural",
        "unit": "500g Pouch",
        "price": 279,
        "mrp": 375,
        "calories": 120,
        "protein": 4.5,
        "stock": 60
      }
    ],
    "nutrition": {
      "calories": 371,
      "protein": 14,
      "carbs": 65,
      "fats": 7,
      "servingSize": "30g"
    }
  },
  {
    "id": "we-gen-126",
    "name": "Roasted Buckwheat Kasha (Kuttu)",
    "brand": "Sorich Organics",
    "category": "weight-loss",
    "subCategory": "Healthy Grains",
    "image": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Toasted whole buckwheat groats packed with rutin bioflavonoids to support capillary integrity, blood sugar regulation and heart health.",
    "ingredients": [
      "100% Toasted Whole Buckwheat Groats (Fagopyrum Esculentum)"
    ],
    "rating": 4.7,
    "reviewCount": 390,
    "inStock": true,
    "tags": [
      "gluten-free",
      "heart-health",
      "low-gi"
    ],
    "variants": [
      {
        "id": "we-gen-126-500g",
        "size": "500g Jar",
        "flavor": "Roasted Nutty",
        "unit": "500g Jar",
        "price": 249,
        "mrp": 325,
        "calories": 160,
        "protein": 6,
        "stock": 75
      },
      {
        "id": "we-gen-126-1kg",
        "size": "1kg Jar",
        "flavor": "Roasted Nutty",
        "unit": "1kg Jar",
        "price": 449,
        "mrp": 599,
        "calories": 160,
        "protein": 6,
        "stock": 45
      }
    ],
    "nutrition": {
      "calories": 343,
      "protein": 13,
      "carbs": 71,
      "fats": 3.4,
      "servingSize": "50g"
    }
  },
  {
    "id": "we-gen-127",
    "name": "Instant Pearl Barley & Veggie Slimming Soup",
    "brand": "NutriSnacks",
    "category": "weight-loss",
    "subCategory": "Healthy Meals",
    "image": "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Filling high-fiber whole grain barley soup with dehydrated carrots, leeks, and herbs that delivers hot comforting satisfaction under 80 calories.",
    "ingredients": [
      "Pearl Barley Flakes",
      "Dehydrated Vegetables",
      "Himalayan Pink Salt",
      "Black Pepper",
      "Herbs"
    ],
    "rating": 4.6,
    "reviewCount": 420,
    "inStock": true,
    "tags": [
      "low-calorie",
      "comfort-food",
      "high-fiber"
    ],
    "variants": [
      {
        "id": "we-gen-127-pack4",
        "size": "4 Sachets (160g)",
        "flavor": "Country Herb",
        "unit": "Box of 4 Servings",
        "price": 199,
        "mrp": 260,
        "calories": 75,
        "protein": 3,
        "stock": 95
      },
      {
        "id": "we-gen-127-pack8",
        "size": "8 Sachets (320g)",
        "flavor": "Country Herb",
        "unit": "Box of 8 Servings",
        "price": 369,
        "mrp": 499,
        "calories": 75,
        "protein": 3,
        "stock": 55
      }
    ],
    "nutrition": {
      "calories": 75,
      "protein": 3,
      "carbs": 15,
      "fats": 0.6,
      "servingSize": "1 Sachet (40g)"
    }
  },
  {
    "id": "we-gen-128",
    "name": "Raw Organic Zero Sugar Ginger Lemon Kombucha",
    "brand": "HappyBooch",
    "category": "weight-loss",
    "subCategory": "Detox Drinks",
    "image": "https://images.unsplash.com/photo-1603569283847-aa295f0d016a?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1603569283847-aa295f0d016a?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Naturally effervescent live fermented green tea kombucha containing billions of CFU gut-friendly probiotics, acetic acid, and B vitamins.",
    "ingredients": [
      "Filtered Water",
      "Organic Green Tea",
      "Kombucha Culture (SCOBY)",
      "Fresh Ginger Extract",
      "Lemon Juice",
      "Stevia"
    ],
    "rating": 4.8,
    "reviewCount": 580,
    "inStock": true,
    "tags": [
      "probiotic",
      "zero-sugar",
      "fermented"
    ],
    "variants": [
      {
        "id": "we-gen-128-330ml",
        "size": "330ml Glass Bottle",
        "flavor": "Ginger Lemon",
        "unit": "330ml Glass Bottle",
        "price": 160,
        "mrp": 190,
        "calories": 15,
        "protein": 0,
        "stock": 50
      },
      {
        "id": "we-gen-128-pack4",
        "size": "330ml x 4",
        "flavor": "Ginger Lemon",
        "unit": "Pack of 4 Bottles",
        "price": 599,
        "mrp": 760,
        "calories": 15,
        "protein": 0,
        "stock": 30
      }
    ],
    "nutrition": {
      "calories": 15,
      "protein": 0,
      "carbs": 3,
      "fats": 0,
      "servingSize": "330ml"
    }
  },
  {
    "id": "we-gen-129",
    "name": "Artisan Low-Fat Probiotic Milk Kefir Drink",
    "brand": "MO's Kefir",
    "category": "weight-loss",
    "subCategory": "Detox Drinks",
    "image": "https://images.unsplash.com/photo-1548848221-0c2e497ed557?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1548848221-0c2e497ed557?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Traditional cultured dairy drink fermented with live active kefir grains containing 24 strains of beneficial bacteria for healthy microbiome.",
    "ingredients": [
      "Pasteurized Double Toned Milk",
      "Live Active Kefir Cultures (24 Strains)"
    ],
    "rating": 4.7,
    "reviewCount": 460,
    "inStock": true,
    "tags": [
      "probiotic",
      "high-protein",
      "gut-microbiome"
    ],
    "variants": [
      {
        "id": "we-gen-129-250ml",
        "size": "250ml Bottle",
        "flavor": "Natural Tart",
        "unit": "250ml Bottle",
        "price": 175,
        "mrp": 210,
        "calories": 95,
        "protein": 7.5,
        "stock": 45
      },
      {
        "id": "we-gen-129-500ml",
        "size": "500ml Bottle",
        "flavor": "Natural Tart",
        "unit": "500ml Bottle",
        "price": 320,
        "mrp": 390,
        "calories": 190,
        "protein": 15,
        "stock": 30
      }
    ],
    "nutrition": {
      "calories": 95,
      "protein": 7.5,
      "carbs": 9,
      "fats": 2.2,
      "servingSize": "250ml"
    }
  },
  {
    "id": "we-gen-130",
    "name": "Cold-Pressed Himalayan Hemp Seed Oil",
    "brand": "India Hemp Organics",
    "category": "weight-loss",
    "subCategory": "Superfoods",
    "image": "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Extra virgin raw hemp seed finishing oil boasting the golden 3:1 ratio of Omega-6 to Omega-3 and Gamma-Linolenic Acid (GLA) for hormonal balance.",
    "ingredients": [
      "100% Cold-Pressed Unrefined Hemp Seed Oil (Cannabis Sativa L)"
    ],
    "rating": 4.8,
    "reviewCount": 380,
    "inStock": true,
    "tags": [
      "omega-ratio",
      "cold-pressed",
      "keto"
    ],
    "variants": [
      {
        "id": "we-gen-130-250ml",
        "size": "250ml Bottle",
        "flavor": "Earthy Nutty",
        "unit": "250ml Amber Glass Bottle",
        "price": 599,
        "mrp": 799,
        "calories": 120,
        "protein": 0,
        "stock": 55
      },
      {
        "id": "we-gen-130-500ml",
        "size": "500ml Bottle",
        "flavor": "Earthy Nutty",
        "unit": "500ml Amber Glass Bottle",
        "price": 1099,
        "mrp": 1499,
        "calories": 120,
        "protein": 0,
        "stock": 30
      }
    ],
    "nutrition": {
      "calories": 120,
      "protein": 0,
      "carbs": 0,
      "fats": 14,
      "servingSize": "1 Tbsp (15ml)"
    }
  },
  {
    "id": "we-gen-131",
    "name": "AAA Grade Raw Green Pumpkin Seeds",
    "brand": "True Elements",
    "category": "weight-loss",
    "subCategory": "Superfoods",
    "image": "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Shelled raw pepitas high in bioavailable zinc, magnesium, and tryptophan to support restful sleep, muscle recovery and cravings control.",
    "ingredients": [
      "100% Raw Shelled Pumpkin Seeds (Cucurbita Pepo)"
    ],
    "rating": 4.9,
    "reviewCount": 910,
    "inStock": true,
    "tags": [
      "zinc-rich",
      "keto-friendly",
      "magnesium"
    ],
    "variants": [
      {
        "id": "we-gen-131-250g",
        "size": "250g Pouch",
        "flavor": "Raw Natural",
        "unit": "250g Pouch",
        "price": 229,
        "mrp": 299,
        "calories": 160,
        "protein": 9,
        "stock": 120
      },
      {
        "id": "we-gen-131-500g",
        "size": "500g Pouch",
        "flavor": "Raw Natural",
        "unit": "500g Pouch",
        "price": 429,
        "mrp": 575,
        "calories": 160,
        "protein": 9,
        "stock": 80
      }
    ],
    "nutrition": {
      "calories": 559,
      "protein": 30,
      "carbs": 10.7,
      "fats": 49,
      "servingSize": "30g"
    }
  },
  {
    "id": "we-gen-132",
    "name": "Premium Raw Shelled Sunflower Seeds",
    "brand": "Farmley",
    "category": "weight-loss",
    "subCategory": "Superfoods",
    "image": "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Jumbo crunchy sunflower kernels abundant in natural Vitamin E antioxidant, selenium, and phytosterols to maintain healthy lipid levels.",
    "ingredients": [
      "100% Raw Shelled Sunflower Kernels (Helianthus Annuus)"
    ],
    "rating": 4.7,
    "reviewCount": 650,
    "inStock": true,
    "tags": [
      "vitamin-e",
      "crunchy",
      "healthy-fats"
    ],
    "variants": [
      {
        "id": "we-gen-132-250g",
        "size": "250g Pouch",
        "flavor": "Raw Natural",
        "unit": "250g Pouch",
        "price": 169,
        "mrp": 225,
        "calories": 165,
        "protein": 6,
        "stock": 110
      },
      {
        "id": "we-gen-132-500g",
        "size": "500g Pouch",
        "flavor": "Raw Natural",
        "unit": "500g Pouch",
        "price": 319,
        "mrp": 425,
        "calories": 165,
        "protein": 6,
        "stock": 75
      }
    ],
    "nutrition": {
      "calories": 584,
      "protein": 21,
      "carbs": 20,
      "fats": 51,
      "servingSize": "30g"
    }
  },
  {
    "id": "we-gen-133",
    "name": "Roasted Chia & Quinoa Pops Diet Snack",
    "brand": "The Green Snack Co",
    "category": "weight-loss",
    "subCategory": "Healthy Snacks",
    "image": "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Guilt-free air-popped supergrain puffs dusted with Himalayan pink salt and tangy sundried herbs with zero trans fats or palm oil.",
    "ingredients": [
      "Puffed Quinoa",
      "Puffed Chia Seeds",
      "Rice Bran Oil",
      "Pink Salt",
      "Dried Oregano & Thyme"
    ],
    "rating": 4.6,
    "reviewCount": 420,
    "inStock": true,
    "tags": [
      "roasted",
      "oil-free",
      "snack"
    ],
    "variants": [
      {
        "id": "we-gen-133-100g",
        "size": "100g Pouch",
        "flavor": "Himalayan Salt & Herb",
        "unit": "100g Pouch",
        "price": 129,
        "mrp": 160,
        "calories": 95,
        "protein": 3.5,
        "stock": 95
      },
      {
        "id": "we-gen-133-pack3",
        "size": "100g x 3",
        "flavor": "Himalayan Salt & Herb",
        "unit": "Pack of 3 Pouches",
        "price": 349,
        "mrp": 480,
        "calories": 95,
        "protein": 3.5,
        "stock": 50
      }
    ],
    "nutrition": {
      "calories": 95,
      "protein": 3.5,
      "carbs": 16,
      "fats": 2.1,
      "servingSize": "25g"
    }
  },
  {
    "id": "we-gen-134",
    "name": "Crunchy Roasted Spiced Flaxseed Diet Bites",
    "brand": "True Elements",
    "category": "weight-loss",
    "subCategory": "Healthy Snacks",
    "image": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Dry roasted whole brown flaxseed clusters seasoned with roasted cumin, rock salt, and amchur for an energizing midday crunch.",
    "ingredients": [
      "Roasted Flax Seeds",
      "Roasted Cumin",
      "Rock Salt",
      "Dry Mango Powder"
    ],
    "rating": 4.7,
    "reviewCount": 510,
    "inStock": true,
    "tags": [
      "high-fiber",
      "digestive-snack",
      "roasted"
    ],
    "variants": [
      {
        "id": "we-gen-134-150g",
        "size": "150g Pouch",
        "flavor": "Spiced Masala",
        "unit": "150g Pouch",
        "price": 139,
        "mrp": 175,
        "calories": 135,
        "protein": 4.8,
        "stock": 100
      },
      {
        "id": "we-gen-134-pack2",
        "size": "Pack of 2",
        "flavor": "Spiced Masala",
        "unit": "2 x 150g Pouches",
        "price": 259,
        "mrp": 350,
        "calories": 135,
        "protein": 4.8,
        "stock": 65
      }
    ],
    "nutrition": {
      "calories": 135,
      "protein": 4.8,
      "carbs": 7.2,
      "fats": 10.5,
      "servingSize": "25g"
    }
  },
  {
    "id": "we-gen-135",
    "name": "Pure Apple Pectin Dietary Soluble Fiber Powder",
    "brand": "NOW Foods",
    "category": "weight-loss",
    "subCategory": "Supplements",
    "image": "https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Premium fruit-derived complex carbohydrate fiber that forms a soothing gel in the stomach to prolong fullness and maintain intestinal regularity.",
    "ingredients": [
      "100% Pure Apple Pectin Powder (Pyrus Malus)"
    ],
    "rating": 4.8,
    "reviewCount": 450,
    "inStock": true,
    "tags": [
      "soluble-fiber",
      "gut-health",
      "vegan"
    ],
    "variants": [
      {
        "id": "we-gen-135-250g",
        "size": "250g Tub",
        "flavor": "Unflavored",
        "unit": "250g Tub",
        "price": 699,
        "mrp": 950,
        "calories": 10,
        "protein": 0,
        "stock": 60
      },
      {
        "id": "we-gen-135-500g",
        "size": "500g Tub",
        "flavor": "Unflavored",
        "unit": "500g Tub",
        "price": 1299,
        "mrp": 1799,
        "calories": 10,
        "protein": 0,
        "stock": 35
      }
    ],
    "nutrition": {
      "calories": 10,
      "protein": 0,
      "carbs": 4,
      "fats": 0,
      "servingSize": "5g (1 Scoop)"
    }
  },
  {
    "id": "we-gen-136",
    "name": "L-Carnitine 3000 Liquid Fast-Absorbing Shots",
    "brand": "MuscleBlaze",
    "category": "weight-loss",
    "subCategory": "Supplements",
    "image": "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "High potency liquid L-Carnitine delivering 3000mg per serving with Vitamin B5 to ferry long-chain fatty acids into mitochondria for cellular energy.",
    "ingredients": [
      "Purified Water",
      "L-Carnitine Base",
      "Pantothenic Acid (Vitamin B5)",
      "Citric Acid",
      "Sucralose"
    ],
    "rating": 4.8,
    "reviewCount": 1350,
    "inStock": true,
    "tags": [
      "bestseller",
      "fat-transporter",
      "pre-workout"
    ],
    "variants": [
      {
        "id": "we-gen-136-450ml",
        "size": "450ml Bottle (30 Servings)",
        "flavor": "Tangy Citrus",
        "unit": "450ml Bottle",
        "price": 749,
        "mrp": 1099,
        "calories": 0,
        "protein": 0,
        "stock": 95
      },
      {
        "id": "we-gen-136-pack2",
        "size": "Pack of 2 (900ml)",
        "flavor": "Tangy Citrus",
        "unit": "2 x 450ml Bottles",
        "price": 1399,
        "mrp": 2198,
        "calories": 0,
        "protein": 0,
        "stock": 50
      }
    ],
    "nutrition": {
      "calories": 0,
      "protein": 0,
      "carbs": 0,
      "fats": 0,
      "servingSize": "15ml (1 Tbsp)"
    }
  },
  {
    "id": "we-gen-137",
    "name": "Conjugated Linoleic Acid (CLA 1000) Softgels",
    "brand": "MuscleTech",
    "category": "weight-loss",
    "subCategory": "Supplements",
    "image": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Platinum pure 80% active conjugated linoleic acid derived from safflower seed oil to support lean muscle preservation during strict dieting.",
    "ingredients": [
      "Pure Safflower Seed Oil (80% CLA)",
      "Gelatin",
      "Glycerin",
      "Purified Water"
    ],
    "rating": 4.7,
    "reviewCount": 680,
    "inStock": true,
    "tags": [
      "lean-muscle",
      "non-stimulant",
      "cla"
    ],
    "variants": [
      {
        "id": "we-gen-137-90softgels",
        "size": "90 Softgels",
        "flavor": "Unflavored",
        "unit": "90 Softgels Bottle",
        "price": 799,
        "mrp": 1199,
        "calories": 10,
        "protein": 0,
        "stock": 85
      },
      {
        "id": "we-gen-137-180softgels",
        "size": "180 Softgels",
        "flavor": "Unflavored",
        "unit": "180 Softgels Bottle",
        "price": 1449,
        "mrp": 2199,
        "calories": 10,
        "protein": 0,
        "stock": 45
      }
    ],
    "nutrition": {
      "calories": 10,
      "protein": 0,
      "carbs": 0,
      "fats": 1,
      "servingSize": "1 Softgel"
    }
  },
  {
    "id": "we-gen-138",
    "name": "Gold Mega Mass Gainer",
    "brand": "Nutrabay",
    "category": "weight-gain",
    "subCategory": "Mass Gainers",
    "price": 2199,
    "originalPrice": 3299,
    "image": "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "High-protein mass gainer featuring 40g whey protein and 210g clean complex carbs per serving with added digestive enzymes.",
    "ingredients": [
      "Maltodextrin",
      "Whey Protein Blend",
      "Digestive Enzyme Complex",
      "Dutch Cocoa"
    ],
    "rating": 4.7,
    "reviewCount": 820,
    "inStock": true,
    "tags": [
      "clean-bulk",
      "enzymes-enriched",
      "high-protein"
    ],
    "variants": [
      {
        "id": "we-gen-138-3kg",
        "size": "3kg",
        "flavor": "Rich Chocolate",
        "unit": "3kg",
        "price": 2199,
        "mrp": 3299,
        "calories": 1050,
        "protein": 40,
        "stock": 95
      },
      {
        "id": "we-gen-138-1kg",
        "size": "1kg",
        "flavor": "Kesar Pista",
        "unit": "1kg",
        "price": 849,
        "mrp": 1299,
        "calories": 1050,
        "protein": 40,
        "stock": 65
      }
    ],
    "nutrition": {
      "calories": 1050,
      "protein": 40,
      "carbs": 210,
      "fats": 5,
      "servingSize": "100g"
    }
  },
  {
    "id": "we-gen-139",
    "name": "Real Mass Gainer Powder",
    "brand": "Bigmuscles Nutrition",
    "category": "weight-gain",
    "subCategory": "Mass Gainers",
    "price": 1899,
    "originalPrice": 2899,
    "image": "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Engineered with slow and fast acting carbs along with whey protein isolate to promote continuous nutrient delivery.",
    "ingredients": [
      "Carb Matrix",
      "Whey Isolate",
      "Glutamine",
      "Natural Flavors"
    ],
    "rating": 4.6,
    "reviewCount": 910,
    "inStock": true,
    "tags": [
      "muscle-mass",
      "tasty-flavors",
      "affordable-bulk"
    ],
    "variants": [
      {
        "id": "we-gen-139-3kg",
        "size": "3kg",
        "flavor": "Belgian Chocolate",
        "unit": "3kg",
        "price": 1899,
        "mrp": 2899,
        "calories": 1000,
        "protein": 50,
        "stock": 120
      },
      {
        "id": "we-gen-139-1kg",
        "size": "1kg",
        "flavor": "Malai Kulfi",
        "unit": "1kg",
        "price": 749,
        "mrp": 1099,
        "calories": 1000,
        "protein": 50,
        "stock": 80
      }
    ],
    "nutrition": {
      "calories": 1000,
      "protein": 50,
      "carbs": 190,
      "fats": 4.5,
      "servingSize": "100g"
    }
  },
  {
    "id": "we-gen-140",
    "name": "Mass Gainer (High Carbs & Whey)",
    "brand": "AS-IT-IS Nutrition",
    "category": "weight-gain",
    "subCategory": "Mass Gainers",
    "price": 799,
    "originalPrice": 1099,
    "image": "https://images.unsplash.com/photo-1546483875-ad9014c88eba?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1546483875-ad9014c88eba?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Pure unadulterated mass gainer combining premium whey protein and complex carbohydrates with zero added artificial sweeteners.",
    "ingredients": [
      "Whey Protein Concentrate",
      "Complex Carbohydrate Blend",
      "Sunflower Lecithin"
    ],
    "rating": 4.7,
    "reviewCount": 1140,
    "inStock": true,
    "tags": [
      "unflavored",
      "pure-raw",
      "no-fillers"
    ],
    "variants": [
      {
        "id": "we-gen-140-1kg",
        "size": "1kg",
        "flavor": "Unflavored",
        "unit": "1kg",
        "price": 799,
        "mrp": 1099,
        "calories": 380,
        "protein": 30,
        "stock": 150
      },
      {
        "id": "we-gen-140-2.5kg",
        "size": "2.5kg",
        "flavor": "Unflavored",
        "unit": "2.5kg",
        "price": 1899,
        "mrp": 2599,
        "calories": 380,
        "protein": 30,
        "stock": 85
      }
    ],
    "nutrition": {
      "calories": 380,
      "protein": 30,
      "carbs": 55,
      "fats": 4,
      "servingSize": "100g"
    }
  },
  {
    "id": "we-gen-141",
    "name": "Organic Creamy Peanut Butter",
    "brand": "Pintola",
    "category": "weight-gain",
    "subCategory": "Peanut Butter & Spreads",
    "price": 475,
    "originalPrice": 599,
    "image": "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "USDA Certified organic roasted bold peanuts blended into a silky smooth high-calorie spread rich in monounsaturated fats.",
    "ingredients": [
      "100% Certified Organic Roasted Peanuts"
    ],
    "rating": 4.9,
    "reviewCount": 760,
    "inStock": true,
    "tags": [
      "usda-organic",
      "creamy",
      "keto-friendly"
    ],
    "variants": [
      {
        "id": "we-gen-141-1kg",
        "size": "1kg",
        "flavor": "Creamy Smooth",
        "unit": "1kg",
        "price": 475,
        "mrp": 599,
        "calories": 630,
        "protein": 30,
        "stock": 100
      }
    ],
    "nutrition": {
      "calories": 630,
      "protein": 30,
      "carbs": 17,
      "fats": 49,
      "servingSize": "32g"
    }
  },
  {
    "id": "we-gen-142",
    "name": "100% Pure Roasted Cashew Butter",
    "brand": "Happilo",
    "category": "weight-gain",
    "subCategory": "Nut Butters",
    "price": 399,
    "originalPrice": 525,
    "image": "https://images.unsplash.com/photo-1567892737950-30c4db37cd89?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1567892737950-30c4db37cd89?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Ultra creamy 100% pure roasted cashew nut butter offering magnesium, copper, and calorie-dense healthy fats.",
    "ingredients": [
      "100% Whole Roasted Cashews"
    ],
    "rating": 4.7,
    "reviewCount": 430,
    "inStock": true,
    "tags": [
      "gourmet-nut-butter",
      "rich-creamy",
      "healthy-fats"
    ],
    "variants": [
      {
        "id": "we-gen-142-350g",
        "size": "350g",
        "flavor": "Creamy Cashew",
        "unit": "350g",
        "price": 399,
        "mrp": 525,
        "calories": 580,
        "protein": 18,
        "stock": 70
      }
    ],
    "nutrition": {
      "calories": 580,
      "protein": 18,
      "carbs": 30,
      "fats": 44,
      "servingSize": "32g"
    }
  },
  {
    "id": "we-gen-143",
    "name": "100% Pure Raw Almond Butter",
    "brand": "Urban Platter",
    "category": "weight-gain",
    "subCategory": "Nut Butters",
    "price": 499,
    "originalPrice": 650,
    "image": "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Stone ground 100% pure California almond butter providing vitamin E, dietary fiber, and healthy omega fats.",
    "ingredients": [
      "100% California Almonds"
    ],
    "rating": 4.8,
    "reviewCount": 520,
    "inStock": true,
    "tags": [
      "stone-ground",
      "pure-almond",
      "no-palm-oil"
    ],
    "variants": [
      {
        "id": "we-gen-143-400g",
        "size": "400g",
        "flavor": "Smooth Almond",
        "unit": "400g",
        "price": 499,
        "mrp": 650,
        "calories": 614,
        "protein": 21,
        "stock": 85
      }
    ],
    "nutrition": {
      "calories": 614,
      "protein": 21,
      "carbs": 19,
      "fats": 52,
      "servingSize": "32g"
    }
  },
  {
    "id": "we-gen-144",
    "name": "Whole Grain Rolled Oat Flour",
    "brand": "True Elements",
    "category": "weight-gain",
    "subCategory": "High Carb Meals",
    "price": 249,
    "originalPrice": 325,
    "image": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Finely milled whole grain rolled oats ideal for blending seamlessly into homemade mass builder calorie shakes and protein pancakes.",
    "ingredients": [
      "100% Whole Grain Oats"
    ],
    "rating": 4.8,
    "reviewCount": 610,
    "inStock": true,
    "tags": [
      "high-fiber",
      "complex-carbs",
      "shake-friendly"
    ],
    "variants": [
      {
        "id": "we-gen-144-1kg",
        "size": "1kg",
        "flavor": "Natural Oat",
        "unit": "1kg",
        "price": 249,
        "mrp": 325,
        "calories": 389,
        "protein": 13,
        "stock": 110
      }
    ],
    "nutrition": {
      "calories": 389,
      "protein": 13,
      "carbs": 67,
      "fats": 6.9,
      "servingSize": "50g"
    }
  },
  {
    "id": "we-gen-145",
    "name": "Mass Tech Extreme 2000 Gainer",
    "brand": "MuscleTech",
    "category": "weight-gain",
    "subCategory": "Mass Gainers",
    "price": 3599,
    "originalPrice": 4999,
    "image": "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Mega mass gainer with 80g multi-phase protein system, 400g+ multi-phase carb complex, and 10g creatine per full daily serving.",
    "ingredients": [
      "Multi-Phase Carb Complex",
      "Multi-Phase Protein System (Whey Concentrate, Isolate 97%)",
      "Creatine Monohydrate",
      "MCTs"
    ],
    "rating": 4.8,
    "reviewCount": 1420,
    "inStock": true,
    "tags": [
      "extreme-gainer",
      "80g-protein",
      "creatine-loaded"
    ],
    "variants": [
      {
        "id": "we-gen-145-3kg",
        "size": "3kg",
        "flavor": "Triple Chocolate Brownie",
        "unit": "3kg",
        "price": 3599,
        "mrp": 4999,
        "calories": 2000,
        "protein": 80,
        "stock": 60
      }
    ],
    "nutrition": {
      "calories": 2000,
      "protein": 80,
      "carbs": 400,
      "fats": 8,
      "servingSize": "100g"
    }
  },
  {
    "id": "we-gen-146",
    "name": "Pro Performance Weight Gainer",
    "brand": "GNC",
    "category": "weight-gain",
    "subCategory": "Mass Gainers",
    "price": 2799,
    "originalPrice": 3999,
    "image": "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Scientifically formulated with 50g high quality protein, 700 calories, and BCAAs to facilitate muscle hypertrophy.",
    "ingredients": [
      "Maltodextrin",
      "Whey Protein Blend",
      "MCT Powder",
      "Vitamins & Minerals"
    ],
    "rating": 4.7,
    "reviewCount": 780,
    "inStock": true,
    "tags": [
      "trusted-gnc",
      "digestive-enzymes",
      "bcaa-powered"
    ],
    "variants": [
      {
        "id": "we-gen-146-3kg",
        "size": "3kg",
        "flavor": "Double Chocolate",
        "unit": "3kg",
        "price": 2799,
        "mrp": 3999,
        "calories": 700,
        "protein": 50,
        "stock": 75
      }
    ],
    "nutrition": {
      "calories": 700,
      "protein": 50,
      "carbs": 116,
      "fats": 5,
      "servingSize": "100g"
    }
  },
  {
    "id": "we-gen-147",
    "name": "Max Protein Ultimate Bar 30g Protein (Pack of 6)",
    "brand": "RiteBite",
    "category": "weight-gain",
    "subCategory": "Protein & Energy Bars",
    "price": 690,
    "originalPrice": 780,
    "image": "https://images.unsplash.com/photo-1604908814868-b3d8fb1a0c01?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1604908814868-b3d8fb1a0c01?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Heavyweight 30g protein energy bar packed with 21 vitamins and minerals, glutamine, and BCAAs for 4-hour sustained energy release.",
    "ingredients": [
      "Protein Blend (Whey, Soy, Casein)",
      "Dark Chocolate",
      "Almonds",
      "Glutamine",
      "Electrolytes"
    ],
    "rating": 4.8,
    "reviewCount": 1650,
    "inStock": true,
    "tags": [
      "30g-protein",
      "on-the-go",
      "sustained-release"
    ],
    "variants": [
      {
        "id": "we-gen-147-pack6",
        "size": "Pack of 6",
        "flavor": "Choco Fudge",
        "unit": "6x100g",
        "price": 690,
        "mrp": 780,
        "calories": 350,
        "protein": 30,
        "stock": 110
      }
    ],
    "nutrition": {
      "calories": 350,
      "protein": 30,
      "carbs": 35,
      "fats": 9,
      "servingSize": "100g"
    }
  },
  {
    "id": "we-gen-148",
    "name": "Signature Dried Fruit & Nut Calorie Mix",
    "brand": "Nutraj",
    "category": "weight-gain",
    "subCategory": "Dry Fruits & Nuts",
    "price": 475,
    "originalPrice": 650,
    "image": "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Energizing blend of almonds, cashews, walnuts, golden raisins and black raisins supplying immediate and sustained caloric fuel.",
    "ingredients": [
      "California Almonds",
      "Cashews",
      "Walnuts",
      "Golden Raisins",
      "Black Raisins"
    ],
    "rating": 4.7,
    "reviewCount": 890,
    "inStock": true,
    "tags": [
      "dry-fruits",
      "natural-calories",
      "energy-boost"
    ],
    "variants": [
      {
        "id": "we-gen-148-500g",
        "size": "500g",
        "flavor": "Natural Mix",
        "unit": "500g",
        "price": 475,
        "mrp": 650,
        "calories": 480,
        "protein": 14,
        "stock": 130
      }
    ],
    "nutrition": {
      "calories": 480,
      "protein": 14,
      "carbs": 54,
      "fats": 25,
      "servingSize": "50g"
    }
  },
  {
    "id": "we-gen-149",
    "name": "Huge Mass Gainer (Chocolate Milkshake)",
    "brand": "Fast&Up",
    "category": "weight-gain",
    "subCategory": "Mass Gainers",
    "price": 1499,
    "originalPrice": 2100,
    "image": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Swiss formula high calorie clean gainer containing whey concentrate and multi-source carbohydrate matrix with digestive pepzyme AG.",
    "ingredients": [
      "Complex Carbohydrates",
      "Whey Protein Concentrate",
      "Cocoa",
      "Pepzyme AG"
    ],
    "rating": 4.6,
    "reviewCount": 640,
    "inStock": true,
    "tags": [
      "swiss-formula",
      "clean-calories",
      "easy-digestion"
    ],
    "variants": [
      {
        "id": "we-gen-149-1.5kg",
        "size": "1.5kg",
        "flavor": "Chocolate Milkshake",
        "unit": "1.5kg",
        "price": 1499,
        "mrp": 2100,
        "calories": 950,
        "protein": 32,
        "stock": 90
      }
    ],
    "nutrition": {
      "calories": 950,
      "protein": 32,
      "carbs": 180,
      "fats": 4,
      "servingSize": "100g"
    }
  },
  {
    "id": "we-gen-150",
    "name": "High Protein Milk Shake (Pack of 8 x 200ml)",
    "brand": "Amul",
    "category": "weight-gain",
    "subCategory": "Ready-to-Drink Shakes",
    "price": 320,
    "originalPrice": 360,
    "image": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Delicious high-protein UHT milkshake supplying 15g protein per pack, perfect for quick post-workout calorie and glycogen replenishment.",
    "ingredients": [
      "Standardised Milk",
      "Milk Solids",
      "Cocoa",
      "Lactase Enzyme"
    ],
    "rating": 4.8,
    "reviewCount": 1980,
    "inStock": true,
    "tags": [
      "15g-protein",
      "ready-to-drink",
      "lactose-friendly"
    ],
    "variants": [
      {
        "id": "we-gen-150-pack8",
        "size": "Pack of 8 x 200ml",
        "flavor": "Chocolate",
        "unit": "8x200ml",
        "price": 320,
        "mrp": 360,
        "calories": 180,
        "protein": 15,
        "stock": 120
      }
    ],
    "nutrition": {
      "calories": 180,
      "protein": 15,
      "carbs": 18,
      "fats": 5,
      "servingSize": "200ml"
    }
  },
  {
    "id": "we-gen-151",
    "name": "High Protein Malt Drink Powder",
    "brand": "Cadbury Bournvita",
    "category": "weight-gain",
    "subCategory": "Nutrition Drinks",
    "price": 465,
    "originalPrice": 525,
    "image": "https://images.unsplash.com/photo-1517438322307-e67111335449?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1517438322307-e67111335449?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Classic malted chocolate nutrition powder fortified with 17 vital micronutrients, calcium and vitamin D to boost daily milkshake calories.",
    "ingredients": [
      "Cereal Extracts (Barley, Malt)",
      "Sugar",
      "Cocoa Solids",
      "Milk Solids",
      "Vitamins & Minerals"
    ],
    "rating": 4.8,
    "reviewCount": 2200,
    "inStock": true,
    "tags": [
      "malt-nutrition",
      "kid-and-adult",
      "calcium-boost"
    ],
    "variants": [
      {
        "id": "we-gen-151-1kg",
        "size": "1kg",
        "flavor": "Malt Chocolate",
        "unit": "1kg",
        "price": 465,
        "mrp": 525,
        "calories": 380,
        "protein": 7,
        "stock": 150
      }
    ],
    "nutrition": {
      "calories": 380,
      "protein": 7,
      "carbs": 85,
      "fats": 1.8,
      "servingSize": "30g"
    }
  },
  {
    "id": "we-gen-152",
    "name": "Pure Cow Ghee Tin",
    "brand": "Amul",
    "category": "weight-gain",
    "subCategory": "Healthy Fats",
    "price": 645,
    "originalPrice": 720,
    "image": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "India's trusted pure golden cow ghee crafted from fresh cream. High energy density and natural butyric acid for peak metabolic health.",
    "ingredients": [
      "100% Pure Clarified Butter (Cow Ghee)"
    ],
    "rating": 4.9,
    "reviewCount": 3100,
    "inStock": true,
    "tags": [
      "amul-trust",
      "golden-ghee",
      "healthy-calories"
    ],
    "variants": [
      {
        "id": "we-gen-152-1L",
        "size": "1L Tin",
        "flavor": "Pure Cow",
        "unit": "1L",
        "price": 645,
        "mrp": 720,
        "calories": 900,
        "protein": 0,
        "stock": 180
      }
    ],
    "nutrition": {
      "calories": 900,
      "protein": 0,
      "carbs": 0,
      "fats": 100,
      "servingSize": "15ml"
    }
  },
  {
    "id": "we-gen-153",
    "name": "Rolled Oats Mega Value Pack",
    "brand": "Quaker",
    "category": "weight-gain",
    "subCategory": "High Carb Meals",
    "price": 199,
    "originalPrice": 240,
    "image": "https://images.unsplash.com/photo-1517637382994-f02da38c6728?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1517637382994-f02da38c6728?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "100% whole grain rolled wholegrain oats delivering complex carbohydrates, beta-glucan fiber, and plant protein for heavy mass oatmeal bowls.",
    "ingredients": [
      "100% Whole Grain Rolled Oats"
    ],
    "rating": 4.8,
    "reviewCount": 2900,
    "inStock": true,
    "tags": [
      "wholegrain",
      "energy-fuel",
      "high-fiber"
    ],
    "variants": [
      {
        "id": "we-gen-153-1kg",
        "size": "1kg",
        "flavor": "Natural Oats",
        "unit": "1kg",
        "price": 199,
        "mrp": 240,
        "calories": 374,
        "protein": 12,
        "stock": 220
      }
    ],
    "nutrition": {
      "calories": 374,
      "protein": 12,
      "carbs": 60,
      "fats": 8,
      "servingSize": "40g"
    }
  },
  {
    "id": "we-gen-154",
    "name": "True-Mass Ultra-Premium Mass Gainer",
    "brand": "BSN",
    "category": "weight-gain",
    "subCategory": "Mass Gainers",
    "price": 3999,
    "originalPrice": 5499,
    "image": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "World renowned 2-to-1 carbohydrate to protein gainer delivering 50g of BSN's signature protein formula and 700 calories per serving.",
    "ingredients": [
      "Protein Matrix (Whey Concentrate, Calcium Caseinate, Milk Isolate, Micellar Casein, Egg Albumen)",
      "Maltodextrin",
      "MCT Powder"
    ],
    "rating": 4.9,
    "reviewCount": 1350,
    "inStock": true,
    "tags": [
      "ultra-premium",
      "legendary-taste",
      "lean-gains"
    ],
    "variants": [
      {
        "id": "we-gen-154-2.6kg",
        "size": "2.6kg",
        "flavor": "Chocolate Milkshake",
        "unit": "2.6kg",
        "price": 3999,
        "mrp": 5499,
        "calories": 700,
        "protein": 50,
        "stock": 55
      }
    ],
    "nutrition": {
      "calories": 700,
      "protein": 50,
      "carbs": 90,
      "fats": 17,
      "servingSize": "165g"
    }
  },
  {
    "id": "we-gen-155",
    "name": "Organic Jumbo Rolled Oats",
    "brand": "Bagrry's",
    "category": "weight-gain",
    "subCategory": "High Carb Meals",
    "price": 239,
    "originalPrice": 299,
    "image": "https://images.unsplash.com/photo-1614961233913-a5113a4a34ed?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1614961233913-a5113a4a34ed?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Thick jumbo rolled whole oats from Australia providing slow-burning energy, dietary fiber and clean calories for muscle building.",
    "ingredients": [
      "100% Organic Rolled Oats"
    ],
    "rating": 4.7,
    "reviewCount": 710,
    "inStock": true,
    "tags": [
      "australian-oats",
      "jumbo-rolled",
      "organic"
    ],
    "variants": [
      {
        "id": "we-gen-155-1kg",
        "size": "1kg",
        "flavor": "Natural Wholegrain",
        "unit": "1kg",
        "price": 239,
        "mrp": 299,
        "calories": 397,
        "protein": 14,
        "stock": 140
      }
    ],
    "nutrition": {
      "calories": 397,
      "protein": 14,
      "carbs": 66,
      "fats": 8.5,
      "servingSize": "50g"
    }
  },
  {
    "id": "we-gen-156",
    "name": "Cream of Rice (High Carb Bodybuilder Fuel)",
    "brand": "Urban Platter",
    "category": "weight-gain",
    "subCategory": "High Carb Meals",
    "price": 299,
    "originalPrice": 395,
    "image": "https://images.unsplash.com/photo-1612532275214-e4ca76d0e4d1?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1612532275214-e4ca76d0e4d1?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Finely ground white rice hot cereal meal. Extremely fast digesting glycogen replenisher favorite among professional bodybuilders.",
    "ingredients": [
      "100% Finely Ground White Rice"
    ],
    "rating": 4.9,
    "reviewCount": 880,
    "inStock": true,
    "tags": [
      "cream-of-rice",
      "fast-glycogen",
      "bodybuilding-staple"
    ],
    "variants": [
      {
        "id": "we-gen-156-1kg",
        "size": "1kg",
        "flavor": "Natural Rice",
        "unit": "1kg",
        "price": 299,
        "mrp": 395,
        "calories": 360,
        "protein": 7,
        "stock": 130
      }
    ],
    "nutrition": {
      "calories": 360,
      "protein": 7,
      "carbs": 80,
      "fats": 0.6,
      "servingSize": "50g"
    }
  },
  {
    "id": "we-gen-157",
    "name": "Pure Sweet Potato Powder Flour",
    "brand": "Urban Platter",
    "category": "weight-gain",
    "subCategory": "Superfoods",
    "price": 425,
    "originalPrice": 550,
    "image": "https://images.unsplash.com/photo-1470194842654-d374443e8c68?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1470194842654-d374443e8c68?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Nutrient-rich complex carbohydrate source made from dehydrated sweet potatoes. High in potassium, vitamin A and slow-release mass carbs.",
    "ingredients": [
      "100% Dehydrated Sweet Potato Powder"
    ],
    "rating": 4.7,
    "reviewCount": 420,
    "inStock": true,
    "tags": [
      "sweet-potato",
      "complex-carbs",
      "potassium-rich"
    ],
    "variants": [
      {
        "id": "we-gen-157-500g",
        "size": "500g",
        "flavor": "Natural Sweet Potato",
        "unit": "500g",
        "price": 425,
        "mrp": 550,
        "calories": 340,
        "protein": 4.5,
        "stock": 75
      }
    ],
    "nutrition": {
      "calories": 340,
      "protein": 4.5,
      "carbs": 80,
      "fats": 0.5,
      "servingSize": "50g"
    }
  },
  {
    "id": "we-gen-158",
    "name": "Organic Jaggery Powder / Desi Khand",
    "brand": "Organic India",
    "category": "weight-gain",
    "subCategory": "Calorie Boosters",
    "price": 185,
    "originalPrice": 225,
    "image": "https://images.unsplash.com/photo-1568051243851-f9b136146e97?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1568051243851-f9b136146e97?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Unrefined organic sugarcane jaggery powder loaded with iron, minerals and clean simple carbs to add healthy sweetness and calories to mass shakes.",
    "ingredients": [
      "100% Certified Organic Jaggery (Gur) Powder"
    ],
    "rating": 4.8,
    "reviewCount": 960,
    "inStock": true,
    "tags": [
      "organic-jaggery",
      "iron-rich",
      "unrefined-sweetener"
    ],
    "variants": [
      {
        "id": "we-gen-158-1kg",
        "size": "1kg",
        "flavor": "Traditional Sweet",
        "unit": "1kg",
        "price": 185,
        "mrp": 225,
        "calories": 383,
        "protein": 0.4,
        "stock": 160
      }
    ],
    "nutrition": {
      "calories": 383,
      "protein": 0.4,
      "carbs": 95,
      "fats": 0.1,
      "servingSize": "25g"
    }
  },
  {
    "id": "we-gen-159",
    "name": "100% Natural Date Energy Spread",
    "brand": "Brawny Bear",
    "category": "weight-gain",
    "subCategory": "Spreads",
    "price": 329,
    "originalPrice": 420,
    "image": "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Luscious date paste spread made with premium Arabian dates and raw cocoa. Zero refined sugar, zero preservatives, and high calorie density.",
    "ingredients": [
      "Arabian Dates (85%)",
      "Cocoa Powder",
      "Vanilla Extract"
    ],
    "rating": 4.8,
    "reviewCount": 510,
    "inStock": true,
    "tags": [
      "date-spread",
      "no-refined-sugar",
      "pre-workout-carbs"
    ],
    "variants": [
      {
        "id": "we-gen-159-350g",
        "size": "350g",
        "flavor": "Choco Dates",
        "unit": "350g",
        "price": 329,
        "mrp": 420,
        "calories": 290,
        "protein": 3,
        "stock": 90
      }
    ],
    "nutrition": {
      "calories": 290,
      "protein": 3,
      "carbs": 70,
      "fats": 0.5,
      "servingSize": "30g"
    }
  },
  {
    "id": "we-gen-160",
    "name": "High Protein Dark Chocolate Peanut Butter",
    "brand": "MuscleBlaze",
    "category": "weight-gain",
    "subCategory": "Peanut Butter & Spreads",
    "price": 499,
    "originalPrice": 699,
    "image": "https://images.unsplash.com/photo-1607897225703-b3b1e4c63063?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1607897225703-b3b1e4c63063?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Fortified with whey protein concentrate supplying 27g protein per 100g, dark chocolate flavor, and healthy fats from roasted peanuts.",
    "ingredients": [
      "Roasted Peanuts (75%)",
      "Whey Protein Concentrate",
      "Dark Chocolate Paste",
      "Cocoa"
    ],
    "rating": 4.8,
    "reviewCount": 2150,
    "inStock": true,
    "tags": [
      "mb-protein-butter",
      "dark-chocolate",
      "crunchy"
    ],
    "variants": [
      {
        "id": "we-gen-160-1kg",
        "size": "1kg",
        "flavor": "Dark Chocolate Crunchy",
        "unit": "1kg",
        "price": 499,
        "mrp": 699,
        "calories": 615,
        "protein": 27,
        "stock": 150
      }
    ],
    "nutrition": {
      "calories": 615,
      "protein": 27,
      "carbs": 24,
      "fats": 46,
      "servingSize": "32g"
    }
  },
  {
    "id": "we-gen-161",
    "name": "Mutant Mass Extreme 2500 Mass Gainer",
    "brand": "Mutant",
    "category": "weight-gain",
    "subCategory": "Mass Gainers",
    "price": 3399,
    "originalPrice": 4799,
    "image": "https://images.unsplash.com/photo-1549590143-d5855148a9d5?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1549590143-d5855148a9d5?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Extreme high-calorie mass gainer engineered for extreme hardgainers. Delivers 56g pure protein and 360g clean food-based carbs.",
    "ingredients": [
      "Carb Matrix (Maltodextrin, Waxy Maize, Sweet Potato, Rolled Oats)",
      "Whey Protein Blend",
      "Lipid Complex (MCT, Flax, Avocado)"
    ],
    "rating": 4.8,
    "reviewCount": 1100,
    "inStock": true,
    "tags": [
      "extreme-hardgainer",
      "food-based-carbs",
      "canadian-brand"
    ],
    "variants": [
      {
        "id": "we-gen-161-2.2kg",
        "size": "2.2kg",
        "flavor": "Triple Chocolate",
        "unit": "2.2kg",
        "price": 3399,
        "mrp": 4799,
        "calories": 1270,
        "protein": 56,
        "stock": 55
      }
    ],
    "nutrition": {
      "calories": 1270,
      "protein": 56,
      "carbs": 231,
      "fats": 12,
      "servingSize": "100g"
    }
  },
  {
    "id": "we-gen-162",
    "name": "Ashwagandha Gold Capsules (Weight & Vitality)",
    "brand": "Kapiva",
    "category": "weight-gain",
    "subCategory": "Ayurvedic Boosters",
    "price": 799,
    "originalPrice": 999,
    "image": "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Potent Ayurvedic formulation combining standardized Nagori Ashwagandha, Swarna Bhasma, and Shilajit to lower cortisol and support natural muscle gain.",
    "ingredients": [
      "Nagori Ashwagandha Extract",
      "Shilajit",
      "Safed Musli",
      "Swarna Bhasma (Gold)"
    ],
    "rating": 4.8,
    "reviewCount": 920,
    "inStock": true,
    "tags": [
      "ayurvedic-mass",
      "cortisol-reduction",
      "swarna-bhasma"
    ],
    "variants": [
      {
        "id": "we-gen-162-60caps",
        "size": "60 Capsules",
        "flavor": "Herbal",
        "unit": "60 Caps",
        "price": 799,
        "mrp": 999,
        "calories": 0,
        "protein": 0,
        "stock": 120
      }
    ],
    "nutrition": {
      "calories": 0,
      "protein": 0,
      "carbs": 0,
      "fats": 0,
      "servingSize": "1 Capsule"
    }
  },
  {
    "id": "we-gen-163",
    "name": "Mega Mass 100% Whey Mass Gainer",
    "brand": "Scitron",
    "category": "weight-gain",
    "subCategory": "Mass Gainers",
    "price": 2499,
    "originalPrice": 3699,
    "image": "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Formulated with 22.5g protein and 112g clean carbs per serving from premium European ingredients to pack on lean muscle bulk.",
    "ingredients": [
      "Maltodextrin",
      "Whey Protein Concentrate",
      "Cocoa Powder",
      "Enzyme Blend"
    ],
    "rating": 4.7,
    "reviewCount": 680,
    "inStock": true,
    "tags": [
      "european-whey",
      "digestive-enzymes",
      "rich-chocolate"
    ],
    "variants": [
      {
        "id": "we-gen-163-3kg",
        "size": "3kg",
        "flavor": "Rich Milk Chocolate",
        "unit": "3kg",
        "price": 2499,
        "mrp": 3699,
        "calories": 550,
        "protein": 22.5,
        "stock": 85
      }
    ],
    "nutrition": {
      "calories": 550,
      "protein": 22.5,
      "carbs": 112,
      "fats": 3,
      "servingSize": "100g"
    }
  },
  {
    "id": "we-gen-164",
    "name": "Dark Chocolate Peanut Butter with Whey Protein",
    "brand": "Yogabar",
    "category": "weight-gain",
    "subCategory": "Peanut Butter & Spreads",
    "price": 489,
    "originalPrice": 649,
    "image": "https://images.unsplash.com/photo-1630544068741-7de14db0a96c?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1630544068741-7de14db0a96c?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Slow-roasted high oleic peanuts infused with whey protein isolate and Belgian cocoa for maximum protein and healthy fats.",
    "ingredients": [
      "High Oleic Peanuts (78%)",
      "Whey Protein Isolate",
      "Cocoa Powder",
      "Raw Sugar"
    ],
    "rating": 4.8,
    "reviewCount": 890,
    "inStock": true,
    "tags": [
      "high-oleic",
      "whey-infused",
      "super-crunchy"
    ],
    "variants": [
      {
        "id": "we-gen-164-1kg",
        "size": "1kg",
        "flavor": "Dark Chocolate Crunchy",
        "unit": "1kg",
        "price": 489,
        "mrp": 649,
        "calories": 605,
        "protein": 28,
        "stock": 120
      }
    ],
    "nutrition": {
      "calories": 605,
      "protein": 28,
      "carbs": 23,
      "fats": 45,
      "servingSize": "32g"
    }
  },
  {
    "id": "we-gen-165",
    "name": "Real Gains Mass Gainer Powder",
    "brand": "Universal Nutrition",
    "category": "weight-gain",
    "subCategory": "Mass Gainers",
    "price": 4199,
    "originalPrice": 5899,
    "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Hardcore weight gainer designed for serious athletes, featuring 52g protein from fast and slow sources with low DE maltodextrin complex carbs.",
    "ingredients": [
      "Protein Blend (Whey Isolate, Whey Concentrate, Micellar Casein)",
      "Low DE Maltodextrin",
      "MCTs",
      "Flaxseed Oil"
    ],
    "rating": 4.9,
    "reviewCount": 970,
    "inStock": true,
    "tags": [
      "universal-animal",
      "hardcore-mass",
      "inulin-fiber"
    ],
    "variants": [
      {
        "id": "we-gen-165-3.1kg",
        "size": "3.1kg",
        "flavor": "Vanilla Ice Cream",
        "unit": "3.1kg",
        "price": 4199,
        "mrp": 5899,
        "calories": 600,
        "protein": 52,
        "stock": 50
      }
    ],
    "nutrition": {
      "calories": 600,
      "protein": 52,
      "carbs": 87,
      "fats": 6,
      "servingSize": "155g"
    }
  },
  {
    "id": "we-gen-166",
    "name": "Cold Pressed Extra Virgin Olive Oil",
    "brand": "Disano",
    "category": "weight-gain",
    "subCategory": "Healthy Fats & Oils",
    "price": 899,
    "originalPrice": 1395,
    "image": "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Imported from Spain, first cold-pressed extra virgin olive oil rich in MUFA, polyphenols and clean dense calories to drizzle on mass meals.",
    "ingredients": [
      "100% Extra Virgin Olive Oil (Cold Pressed)"
    ],
    "rating": 4.8,
    "reviewCount": 1450,
    "inStock": true,
    "tags": [
      "spanish-olives",
      "cold-pressed",
      "mufa-rich"
    ],
    "variants": [
      {
        "id": "we-gen-166-1L",
        "size": "1L Glass Bottle",
        "flavor": "Pure Extra Virgin",
        "unit": "1L",
        "price": 899,
        "mrp": 1395,
        "calories": 900,
        "protein": 0,
        "stock": 110
      }
    ],
    "nutrition": {
      "calories": 900,
      "protein": 0,
      "carbs": 0,
      "fats": 100,
      "servingSize": "15ml"
    }
  },
  {
    "id": "we-gen-167",
    "name": "Fit High Protein Muesli (Dark Chocolate & Cranberry)",
    "brand": "MuscleBlaze",
    "category": "weight-gain",
    "subCategory": "High Carb Meals",
    "price": 599,
    "originalPrice": 799,
    "image": "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Nutritious crunchy muesli with rolled oats, soy flakes, dried cranberries and dark chocolate providing 22g protein per 100g.",
    "ingredients": [
      "Rolled Oats (45%)",
      "Soy Protein Flakes",
      "Dark Chocolate",
      "Dried Cranberries",
      "Almonds"
    ],
    "rating": 4.8,
    "reviewCount": 1820,
    "inStock": true,
    "tags": [
      "high-protein-muesli",
      "dark-chocolate",
      "super-crunch"
    ],
    "variants": [
      {
        "id": "we-gen-167-1kg",
        "size": "1kg",
        "flavor": "Dark Chocolate Cranberry",
        "unit": "1kg",
        "price": 599,
        "mrp": 799,
        "calories": 430,
        "protein": 22,
        "stock": 140
      }
    ],
    "nutrition": {
      "calories": 430,
      "protein": 22,
      "carbs": 58,
      "fats": 12,
      "servingSize": "50g"
    }
  },
  {
    "id": "we-gen-168",
    "name": "Jumbo Roasted & Salted Cashews",
    "brand": "Nutty Gritties",
    "category": "weight-gain",
    "subCategory": "Dry Fruits & Healthy Fats",
    "price": 649,
    "originalPrice": 850,
    "image": "https://images.unsplash.com/photo-1571997799156-9c8f2e225803?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1571997799156-9c8f2e225803?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Large W240 grade whole cashews dry-roasted with pink Himalayan salt. Calorie-dense source of healthy fats and plant zinc.",
    "ingredients": [
      "Whole Cashew Nuts (W240)",
      "Pink Himalayan Salt"
    ],
    "rating": 4.8,
    "reviewCount": 780,
    "inStock": true,
    "tags": [
      "jumbo-w240",
      "himalayan-salt",
      "dry-roasted"
    ],
    "variants": [
      {
        "id": "we-gen-168-500g",
        "size": "500g",
        "flavor": "Lightly Salted",
        "unit": "500g",
        "price": 649,
        "mrp": 850,
        "calories": 575,
        "protein": 18,
        "stock": 95
      }
    ],
    "nutrition": {
      "calories": 575,
      "protein": 18,
      "carbs": 30,
      "fats": 44,
      "servingSize": "40g"
    }
  },
  {
    "id": "we-gen-169",
    "name": "Baked Choco Almond High Calorie Granola",
    "brand": "True Elements",
    "category": "weight-gain",
    "subCategory": "Cereals & Snacks",
    "price": 499,
    "originalPrice": 695,
    "image": "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Slow-baked crunchy granola with rolled oats, raw honey, almonds and cocoa providing dense wholesome calories.",
    "ingredients": [
      "Rolled Oats",
      "Raw Honey",
      "Almonds",
      "Cocoa Powder",
      "Chia Seeds"
    ],
    "rating": 4.8,
    "reviewCount": 910,
    "inStock": true,
    "tags": [
      "baked-granola",
      "honey-sweetened",
      "choco-almond"
    ],
    "variants": [
      {
        "id": "we-gen-169-1kg",
        "size": "1kg",
        "flavor": "Choco Almond",
        "unit": "1kg",
        "price": 499,
        "mrp": 695,
        "calories": 460,
        "protein": 14,
        "stock": 125
      }
    ],
    "nutrition": {
      "calories": 460,
      "protein": 14,
      "carbs": 62,
      "fats": 18,
      "servingSize": "50g"
    }
  },
  {
    "id": "we-gen-170",
    "name": "Herbobuild Ayurvedic Muscle & Mass Booster",
    "brand": "Dr. Vaidya's",
    "category": "weight-gain",
    "subCategory": "Ayurvedic Boosters",
    "price": 449,
    "originalPrice": 600,
    "image": "https://images.unsplash.com/photo-1547482009-9e8ce4c6f067?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1547482009-9e8ce4c6f067?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Ayurvedic capsules containing Ashwagandha, Safed Musli, Kaunch Beej and Shatavari to enhance protein absorption and natural mass gains.",
    "ingredients": [
      "Ashwagandha",
      "Safed Musli",
      "Kaunch Beej",
      "Shatavari",
      "Gokhru"
    ],
    "rating": 4.7,
    "reviewCount": 1350,
    "inStock": true,
    "tags": [
      "100%-ayurvedic",
      "muscle-booster",
      "safed-musli"
    ],
    "variants": [
      {
        "id": "we-gen-170-60caps",
        "size": "60 Capsules",
        "flavor": "Herbal",
        "unit": "60 Caps",
        "price": 449,
        "mrp": 600,
        "calories": 0,
        "protein": 0,
        "stock": 160
      }
    ],
    "nutrition": {
      "calories": 0,
      "protein": 0,
      "carbs": 0,
      "fats": 0,
      "servingSize": "1 Capsule"
    }
  },
  {
    "id": "we-gen-171",
    "name": "Raw Pumpkin, Chia & Sunflower Seeds Mix",
    "brand": "Urban Platter",
    "category": "weight-gain",
    "subCategory": "Superfood Seeds",
    "price": 399,
    "originalPrice": 525,
    "image": "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Nutrient-dense super seed mix packed with zinc, magnesium, omega-3 fatty acids and clean calories for bulking meal additions.",
    "ingredients": [
      "Raw Pumpkin Seeds (40%)",
      "Sunflower Seeds (40%)",
      "Chia Seeds (20%)"
    ],
    "rating": 4.8,
    "reviewCount": 670,
    "inStock": true,
    "tags": [
      "super-seeds",
      "omega-3",
      "zinc-rich"
    ],
    "variants": [
      {
        "id": "we-gen-171-500g",
        "size": "500g",
        "flavor": "Raw Natural",
        "unit": "500g",
        "price": 399,
        "mrp": 525,
        "calories": 560,
        "protein": 24,
        "stock": 110
      }
    ],
    "nutrition": {
      "calories": 560,
      "protein": 24,
      "carbs": 18,
      "fats": 44,
      "servingSize": "30g"
    }
  },
  {
    "id": "we-gen-172",
    "name": "California Walnut Kernels (Akhrot Giri)",
    "brand": "Nutraj",
    "category": "weight-gain",
    "subCategory": "Dry Fruits & Nuts",
    "price": 599,
    "originalPrice": 850,
    "image": "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Premium half-cut California walnut halves rich in ALA Omega-3 fatty acids, supplying clean calories for muscle recovery.",
    "ingredients": [
      "100% Raw California Walnut Kernels"
    ],
    "rating": 4.8,
    "reviewCount": 1120,
    "inStock": true,
    "tags": [
      "brain-food",
      "omega-3-ala",
      "california-walnuts"
    ],
    "variants": [
      {
        "id": "we-gen-172-500g",
        "size": "500g",
        "flavor": "Natural Raw",
        "unit": "500g",
        "price": 599,
        "mrp": 850,
        "calories": 654,
        "protein": 15,
        "stock": 95
      }
    ],
    "nutrition": {
      "calories": 654,
      "protein": 15,
      "carbs": 14,
      "fats": 65,
      "servingSize": "30g"
    }
  },
  {
    "id": "we-gen-173",
    "name": "Pure Himalayan Shilajit Resin with Fulvic Acid",
    "brand": "Kapiva",
    "category": "weight-gain",
    "subCategory": "Ayurvedic Boosters",
    "price": 1099,
    "originalPrice": 1499,
    "image": "https://images.unsplash.com/photo-1485704686097-ed47f7263ca4?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1485704686097-ed47f7263ca4?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "100% pure Ayurvedic Himalayan Shilajit resin with >60% Fulvic acid to improve nutrient absorption, strength, stamina and mass building.",
    "ingredients": [
      "100% Pure Himalayan Shilajit (Bitumen Mineral Resin)"
    ],
    "rating": 4.9,
    "reviewCount": 3400,
    "inStock": true,
    "tags": [
      "60-percent-fulvic",
      "himalayan-grade",
      "strength-enhancer"
    ],
    "variants": [
      {
        "id": "we-gen-173-20g",
        "size": "20g",
        "flavor": "Resin",
        "unit": "20g",
        "price": 1099,
        "mrp": 1499,
        "calories": 0,
        "protein": 0,
        "stock": 140
      }
    ],
    "nutrition": {
      "calories": 0,
      "protein": 0,
      "carbs": 0,
      "fats": 0,
      "servingSize": "Pea Sized (250mg)"
    }
  },
  {
    "id": "we-gen-174",
    "name": "Chocolate Milkshake Ready-to-Drink (Pack of 6 x 180ml)",
    "brand": "Hershey's",
    "category": "weight-gain",
    "subCategory": "Ready-to-Drink Shakes",
    "price": 210,
    "originalPrice": 240,
    "image": "https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Fortified chocolate milkshake containing calcium, vitamin D and rich cocoa for instant post-workout caloric replenishment.",
    "ingredients": [
      "Toned Milk (82%)",
      "Sugar",
      "Cocoa Solids (1.5%)",
      "Mineral & Vitamin Premix"
    ],
    "rating": 4.7,
    "reviewCount": 1680,
    "inStock": true,
    "tags": [
      "hersheys-choco",
      "calcium-fortified",
      "pack-of-6"
    ],
    "variants": [
      {
        "id": "we-gen-174-pack6",
        "size": "Pack of 6 x 180ml",
        "flavor": "Chocolate Milkshake",
        "unit": "6x180ml",
        "price": 210,
        "mrp": 240,
        "calories": 155,
        "protein": 4.5,
        "stock": 130
      }
    ],
    "nutrition": {
      "calories": 155,
      "protein": 4.5,
      "carbs": 24,
      "fats": 4.5,
      "servingSize": "180ml"
    }
  },
  {
    "id": "we-gen-175",
    "name": "High Protein Peanut Butter with Seeds (Crunchy)",
    "brand": "Saffola",
    "category": "weight-gain",
    "subCategory": "Peanut Butter & Spreads",
    "price": 429,
    "originalPrice": 575,
    "image": "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=600&q=80",
    "images": [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=600&q=80"
    ],
    "description": "Nutritious crunchy peanut butter enriched with chia, pumpkin and flax seeds providing 31g protein per 100g and high energy density.",
    "ingredients": [
      "Roasted Peanuts (85%)",
      "Chia Seeds",
      "Flax Seeds",
      "Pumpkin Seeds"
    ],
    "rating": 4.8,
    "reviewCount": 840,
    "inStock": true,
    "tags": [
      "super-seeds",
      "high-protein",
      "crunchy"
    ],
    "variants": [
      {
        "id": "we-gen-175-1kg",
        "size": "1kg",
        "flavor": "Seeds Crunchy",
        "unit": "1kg",
        "price": 429,
        "mrp": 575,
        "calories": 620,
        "protein": 31,
        "stock": 105
      }
    ],
    "nutrition": {
      "calories": 620,
      "protein": 31,
      "carbs": 19,
      "fats": 47,
      "servingSize": "32g"
    }
  },
  {
    "id": "fi-gen-176",
    "name": "Daily Multivitamin Pro (1)",
    "category": "fitness-maintenance",
    "image": "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=520&q=80",
    "description": "Premium quality daily multivitamin pro (1) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Daily Multivitamin Pro (1)"
    ],
    "rating": 4.2,
    "reviewCount": 468,
    "tags": [
      "trending"
    ],
    "variants": [
      {
        "id": "fi-gen-176-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 200,
        "mrp": 300,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "fi-gen-176-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 360,
        "mrp": 550,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "fi-gen-177",
    "name": "Omega 3 Fish Oil Max (2)",
    "category": "fitness-maintenance",
    "image": "https://images.unsplash.com/photo-1559181567-c3190958d3ab?auto=format&fit=crop&w=480&q=80",
    "description": "Premium quality omega 3 fish oil max (2) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Omega 3 Fish Oil Max (2)"
    ],
    "rating": 4.4,
    "reviewCount": 502,
    "tags": [],
    "variants": [
      {
        "id": "fi-gen-177-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 210,
        "mrp": 310,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "fi-gen-177-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 370,
        "mrp": 560,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "fi-gen-178",
    "name": "Calcium D3 Bone Support (3)",
    "category": "fitness-maintenance",
    "image": "https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&w=400&q=80",
    "description": "Premium quality calcium d3 bone support (3) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Calcium D3 Bone Support (3)"
    ],
    "rating": 4.8,
    "reviewCount": 833,
    "tags": [],
    "variants": [
      {
        "id": "fi-gen-178-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 220,
        "mrp": 320,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "fi-gen-178-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 380,
        "mrp": 570,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "fi-gen-179",
    "name": "Active Zinc Complex (4)",
    "category": "fitness-maintenance",
    "image": "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=520&q=80",
    "description": "Premium quality active zinc complex (4) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Active Zinc Complex (4)"
    ],
    "rating": 4.8,
    "reviewCount": 654,
    "tags": [],
    "variants": [
      {
        "id": "fi-gen-179-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 230,
        "mrp": 330,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "fi-gen-179-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 390,
        "mrp": 580,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "fi-gen-180",
    "name": "Daily Probiotics Pro (5)",
    "category": "fitness-maintenance",
    "image": "https://images.unsplash.com/photo-1602741338009-cac2772e18bc?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality daily probiotics pro (5) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Daily Probiotics Pro (5)"
    ],
    "rating": 4.6,
    "reviewCount": 328,
    "tags": [],
    "variants": [
      {
        "id": "fi-gen-180-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 240,
        "mrp": 340,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "fi-gen-180-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 400,
        "mrp": 590,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "fi-gen-181",
    "name": "Iron Health Caps (6)",
    "category": "fitness-maintenance",
    "image": "https://images.unsplash.com/photo-1614531341773-3bff15b7f2d9?auto=format&fit=crop&w=520&q=80",
    "description": "Premium quality iron health caps (6) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Iron Health Caps (6)"
    ],
    "rating": 4.5,
    "reviewCount": 633,
    "tags": [],
    "variants": [
      {
        "id": "fi-gen-181-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 250,
        "mrp": 350,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "fi-gen-181-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 410,
        "mrp": 600,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "fi-gen-182",
    "name": "B-Complex Energy Max (7)",
    "category": "fitness-maintenance",
    "image": "https://images.unsplash.com/photo-1626514539232-21d3a30db3db?auto=format&fit=crop&w=400&q=80",
    "description": "Premium quality b-complex energy max (7) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "B-Complex Energy Max (7)"
    ],
    "rating": 4.5,
    "reviewCount": 747,
    "tags": [],
    "variants": [
      {
        "id": "fi-gen-182-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 260,
        "mrp": 360,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "fi-gen-182-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 420,
        "mrp": 610,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "fi-gen-183",
    "name": "CoQ10 Heart Support (8)",
    "category": "fitness-maintenance",
    "image": "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=400&q=80",
    "description": "Premium quality coq10 heart support (8) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "CoQ10 Heart Support (8)"
    ],
    "rating": 4.9,
    "reviewCount": 540,
    "tags": [],
    "variants": [
      {
        "id": "fi-gen-183-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 270,
        "mrp": 370,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "fi-gen-183-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 430,
        "mrp": 620,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "fi-gen-184",
    "name": "Active Collagen Powder (9)",
    "category": "fitness-maintenance",
    "image": "https://images.unsplash.com/photo-1452967153968-db4c3d671c70?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality active collagen powder (9) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Active Collagen Powder (9)"
    ],
    "rating": 4.4,
    "reviewCount": 464,
    "tags": [],
    "variants": [
      {
        "id": "fi-gen-184-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 280,
        "mrp": 380,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "fi-gen-184-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 440,
        "mrp": 630,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "fi-gen-185",
    "name": "Hair Skin Nails Vitamins (10)",
    "category": "fitness-maintenance",
    "image": "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=500&q=79",
    "description": "Premium quality hair skin nails vitamins (10) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Hair Skin Nails Vitamins (10)"
    ],
    "rating": 4.5,
    "reviewCount": 493,
    "tags": [],
    "variants": [
      {
        "id": "fi-gen-185-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 290,
        "mrp": 390,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "fi-gen-185-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 450,
        "mrp": 640,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "fi-gen-186",
    "name": "Biotin Beauty Plus (11)",
    "category": "fitness-maintenance",
    "image": "https://images.unsplash.com/photo-1611244419377-b0a760c19719?auto=format&fit=crop&w=450&q=80",
    "description": "Premium quality biotin beauty plus (11) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Biotin Beauty Plus (11)"
    ],
    "rating": 4.3,
    "reviewCount": 610,
    "tags": [
      "trending"
    ],
    "variants": [
      {
        "id": "fi-gen-186-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 300,
        "mrp": 400,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "fi-gen-186-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 460,
        "mrp": 650,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "fi-gen-187",
    "name": "Premium Flaxseed Oil (12)",
    "category": "fitness-maintenance",
    "image": "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=520&q=80",
    "description": "Premium quality premium flaxseed oil (12) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Premium Flaxseed Oil (12)"
    ],
    "rating": 4.5,
    "reviewCount": 826,
    "tags": [],
    "variants": [
      {
        "id": "fi-gen-187-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 310,
        "mrp": 410,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "fi-gen-187-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 470,
        "mrp": 660,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "fi-gen-188",
    "name": "Organic Spirulina Tablets (13)",
    "category": "fitness-maintenance",
    "image": "https://images.unsplash.com/photo-1624454002302-36b824d7bd0a?auto=format&fit=crop&w=450&q=80",
    "description": "Premium quality organic spirulina tablets (13) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Organic Spirulina Tablets (13)"
    ],
    "rating": 4.9,
    "reviewCount": 858,
    "tags": [
      "bestseller"
    ],
    "variants": [
      {
        "id": "fi-gen-188-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 320,
        "mrp": 420,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "fi-gen-188-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 480,
        "mrp": 670,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "fi-gen-189",
    "name": "Green Superfood Powder (14)",
    "category": "fitness-maintenance",
    "image": "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality green superfood powder (14) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Green Superfood Powder (14)"
    ],
    "rating": 4.2,
    "reviewCount": 130,
    "tags": [],
    "variants": [
      {
        "id": "fi-gen-189-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 330,
        "mrp": 430,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "fi-gen-189-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 490,
        "mrp": 680,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "fi-gen-190",
    "name": "Vitamin C Immune Support (15)",
    "category": "fitness-maintenance",
    "image": "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=400&q=80",
    "description": "Premium quality vitamin c immune support (15) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Vitamin C Immune Support (15)"
    ],
    "rating": 4.3,
    "reviewCount": 682,
    "tags": [],
    "variants": [
      {
        "id": "fi-gen-190-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 340,
        "mrp": 440,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "fi-gen-190-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 500,
        "mrp": 690,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "fi-gen-191",
    "name": "Vitamin D3 High Dose (16)",
    "category": "fitness-maintenance",
    "image": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=400&q=80",
    "description": "Premium quality vitamin d3 high dose (16) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Vitamin D3 High Dose (16)"
    ],
    "rating": 4.2,
    "reviewCount": 93,
    "tags": [],
    "variants": [
      {
        "id": "fi-gen-191-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 350,
        "mrp": 450,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "fi-gen-191-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 510,
        "mrp": 700,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "fi-gen-192",
    "name": "Glucosamine Joint Guard (17)",
    "category": "fitness-maintenance",
    "image": "https://images.unsplash.com/photo-1600423115367-87ea7661688f?auto=format&fit=crop&w=480&q=80",
    "description": "Premium quality glucosamine joint guard (17) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Glucosamine Joint Guard (17)"
    ],
    "rating": 4.5,
    "reviewCount": 700,
    "tags": [],
    "variants": [
      {
        "id": "fi-gen-192-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 360,
        "mrp": 460,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "fi-gen-192-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 520,
        "mrp": 710,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "fi-gen-193",
    "name": "Curcumin Joint Care (18)",
    "category": "fitness-maintenance",
    "image": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80",
    "description": "Premium quality curcumin joint care (18) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Curcumin Joint Care (18)"
    ],
    "rating": 4.7,
    "reviewCount": 340,
    "tags": [],
    "variants": [
      {
        "id": "fi-gen-193-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 370,
        "mrp": 470,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "fi-gen-193-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 530,
        "mrp": 720,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "fi-gen-194",
    "name": "Magnesium Sleep Complex (19)",
    "category": "fitness-maintenance",
    "image": "https://images.unsplash.com/photo-1519925610903-381054cc2a1c?auto=format&fit=crop&w=600&q=80",
    "description": "Premium quality magnesium sleep complex (19) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Magnesium Sleep Complex (19)"
    ],
    "rating": 4.8,
    "reviewCount": 209,
    "tags": [],
    "variants": [
      {
        "id": "fi-gen-194-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 380,
        "mrp": 480,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "fi-gen-194-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 540,
        "mrp": 730,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "fi-gen-195",
    "name": "Daily Greens Blend (20)",
    "category": "fitness-maintenance",
    "image": "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality daily greens blend (20) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Daily Greens Blend (20)"
    ],
    "rating": 4.8,
    "reviewCount": 469,
    "tags": [],
    "variants": [
      {
        "id": "fi-gen-195-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 390,
        "mrp": 490,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "fi-gen-195-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 550,
        "mrp": 740,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "fi-gen-196",
    "name": "Organic Ashwagandha Extract (21)",
    "category": "fitness-maintenance",
    "image": "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=450&q=80",
    "description": "Premium quality organic ashwagandha extract (21) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Organic Ashwagandha Extract (21)"
    ],
    "rating": 4.2,
    "reviewCount": 225,
    "tags": [
      "trending"
    ],
    "variants": [
      {
        "id": "fi-gen-196-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 400,
        "mrp": 500,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "fi-gen-196-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 560,
        "mrp": 750,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "fi-gen-197",
    "name": "Daily Focus Caps (22)",
    "category": "fitness-maintenance",
    "image": "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=500&q=71",
    "description": "Premium quality daily focus caps (22) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Daily Focus Caps (22)"
    ],
    "rating": 4.7,
    "reviewCount": 255,
    "tags": [],
    "variants": [
      {
        "id": "fi-gen-197-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 410,
        "mrp": 510,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "fi-gen-197-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 570,
        "mrp": 760,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "fi-gen-198",
    "name": "Melatonin Sleep Gummies (23)",
    "category": "fitness-maintenance",
    "image": "https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality melatonin sleep gummies (23) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Melatonin Sleep Gummies (23)"
    ],
    "rating": 4.9,
    "reviewCount": 252,
    "tags": [],
    "variants": [
      {
        "id": "fi-gen-198-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 420,
        "mrp": 520,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "fi-gen-198-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 580,
        "mrp": 770,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "fi-gen-199",
    "name": "Digestive Enzyme Support (24)",
    "category": "fitness-maintenance",
    "image": "https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=520&q=80",
    "description": "Premium quality digestive enzyme support (24) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Digestive Enzyme Support (24)"
    ],
    "rating": 4.9,
    "reviewCount": 657,
    "tags": [],
    "variants": [
      {
        "id": "fi-gen-199-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 430,
        "mrp": 530,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "fi-gen-199-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 590,
        "mrp": 780,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "fi-gen-200",
    "name": "Apple Cider Wellbeing (25)",
    "category": "fitness-maintenance",
    "image": "https://images.unsplash.com/photo-1559181567-c3190958d3ab?auto=format&fit=crop&w=600&q=80",
    "description": "Premium quality apple cider wellbeing (25) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Apple Cider Wellbeing (25)"
    ],
    "rating": 4,
    "reviewCount": 872,
    "tags": [
      "bestseller"
    ],
    "variants": [
      {
        "id": "fi-gen-200-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 440,
        "mrp": 540,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "fi-gen-200-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 600,
        "mrp": 790,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "fi-gen-201",
    "name": "Organic Wheatgrass Blend (26)",
    "category": "fitness-maintenance",
    "image": "https://images.unsplash.com/photo-1531904014248-7b80caa5e8ef?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality organic wheatgrass blend (26) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Organic Wheatgrass Blend (26)"
    ],
    "rating": 4.6,
    "reviewCount": 619,
    "tags": [],
    "variants": [
      {
        "id": "fi-gen-201-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 450,
        "mrp": 550,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "fi-gen-201-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 610,
        "mrp": 800,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "fi-gen-202",
    "name": "Premium Sea Buckthorn (27)",
    "category": "fitness-maintenance",
    "image": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality premium sea buckthorn (27) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Premium Sea Buckthorn (27)"
    ],
    "rating": 4.4,
    "reviewCount": 160,
    "tags": [],
    "variants": [
      {
        "id": "fi-gen-202-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 460,
        "mrp": 560,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "fi-gen-202-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 620,
        "mrp": 810,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "fi-gen-203",
    "name": "Immune Defense Gummies (28)",
    "category": "fitness-maintenance",
    "image": "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality immune defense gummies (28) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Immune Defense Gummies (28)"
    ],
    "rating": 4.2,
    "reviewCount": 485,
    "tags": [],
    "variants": [
      {
        "id": "fi-gen-203-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 470,
        "mrp": 570,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "fi-gen-203-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 630,
        "mrp": 820,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "fi-gen-204",
    "name": "Stress Relief Complex (29)",
    "category": "fitness-maintenance",
    "image": "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=400&q=80",
    "description": "Premium quality stress relief complex (29) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Stress Relief Complex (29)"
    ],
    "rating": 4.3,
    "reviewCount": 294,
    "tags": [],
    "variants": [
      {
        "id": "fi-gen-204-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 480,
        "mrp": 580,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "fi-gen-204-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 640,
        "mrp": 830,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "fi-gen-205",
    "name": "Organic Moringa Powder (30)",
    "category": "fitness-maintenance",
    "image": "https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality organic moringa powder (30) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Organic Moringa Powder (30)"
    ],
    "rating": 4.6,
    "reviewCount": 504,
    "tags": [],
    "variants": [
      {
        "id": "fi-gen-205-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 490,
        "mrp": 590,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "fi-gen-205-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 650,
        "mrp": 840,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "fi-gen-206",
    "name": "Lutein Eye Support (31)",
    "category": "fitness-maintenance",
    "image": "https://images.unsplash.com/photo-1531514951839-1ad2e0c4e92c?auto=format&fit=crop&w=480&q=80",
    "description": "Premium quality lutein eye support (31) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Lutein Eye Support (31)"
    ],
    "rating": 4.3,
    "reviewCount": 560,
    "tags": [
      "trending"
    ],
    "variants": [
      {
        "id": "fi-gen-206-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 500,
        "mrp": 600,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "fi-gen-206-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 660,
        "mrp": 850,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "fi-gen-207",
    "name": "Active Garlic Extract (32)",
    "category": "fitness-maintenance",
    "image": "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=520&q=80",
    "description": "Premium quality active garlic extract (32) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Active Garlic Extract (32)"
    ],
    "rating": 4.3,
    "reviewCount": 700,
    "tags": [],
    "variants": [
      {
        "id": "fi-gen-207-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 510,
        "mrp": 610,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "fi-gen-207-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 670,
        "mrp": 860,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "fi-gen-208",
    "name": "Daily Kelp Iodine (33)",
    "category": "fitness-maintenance",
    "image": "https://images.unsplash.com/photo-1614531341773-3bff15b7f2d9?auto=format&fit=crop&w=480&q=80",
    "description": "Premium quality daily kelp iodine (33) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Daily Kelp Iodine (33)"
    ],
    "rating": 4,
    "reviewCount": 854,
    "tags": [],
    "variants": [
      {
        "id": "fi-gen-208-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 520,
        "mrp": 620,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "fi-gen-208-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 680,
        "mrp": 870,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "fi-gen-209",
    "name": "Milk Thistle Detox Max (34)",
    "category": "fitness-maintenance",
    "image": "https://images.unsplash.com/photo-1543158181-e6f9f6712055?auto=format&fit=crop&w=520&q=80",
    "description": "Premium quality milk thistle detox max (34) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Milk Thistle Detox Max (34)"
    ],
    "rating": 4.3,
    "reviewCount": 582,
    "tags": [],
    "variants": [
      {
        "id": "fi-gen-209-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 530,
        "mrp": 630,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "fi-gen-209-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 690,
        "mrp": 880,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "fi-gen-210",
    "name": "Active Ginseng Gold (35)",
    "category": "fitness-maintenance",
    "image": "https://images.unsplash.com/photo-1575386133099-23c985a2d73e?auto=format&fit=crop&w=520&q=80",
    "description": "Premium quality active ginseng gold (35) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Active Ginseng Gold (35)"
    ],
    "rating": 4.3,
    "reviewCount": 341,
    "tags": [],
    "variants": [
      {
        "id": "fi-gen-210-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 540,
        "mrp": 640,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "fi-gen-210-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 700,
        "mrp": 890,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "fi-gen-211",
    "name": "Cranberry Urinary Care (36)",
    "category": "fitness-maintenance",
    "image": "https://images.unsplash.com/photo-1597714026720-8f74c62310ba?auto=format&fit=crop&w=520&q=80",
    "description": "Premium quality cranberry urinary care (36) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Cranberry Urinary Care (36)"
    ],
    "rating": 4,
    "reviewCount": 941,
    "tags": [],
    "variants": [
      {
        "id": "fi-gen-211-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 550,
        "mrp": 650,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "fi-gen-211-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 710,
        "mrp": 900,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "fi-gen-212",
    "name": "Premium Elderberry Boost (37)",
    "category": "fitness-maintenance",
    "image": "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=600&q=80",
    "description": "Premium quality premium elderberry boost (37) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Premium Elderberry Boost (37)"
    ],
    "rating": 4.3,
    "reviewCount": 418,
    "tags": [
      "bestseller"
    ],
    "variants": [
      {
        "id": "fi-gen-212-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 560,
        "mrp": 660,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "fi-gen-212-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 720,
        "mrp": 910,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "fi-gen-213",
    "name": "Daily Multivitamin Gummies (38)",
    "category": "fitness-maintenance",
    "image": "https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=480&q=80",
    "description": "Premium quality daily multivitamin gummies (38) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Daily Multivitamin Gummies (38)"
    ],
    "rating": 4.1,
    "reviewCount": 222,
    "tags": [],
    "variants": [
      {
        "id": "fi-gen-213-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 570,
        "mrp": 670,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "fi-gen-213-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 730,
        "mrp": 920,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "pr-gen-214",
    "name": "Whey Protein Isolate Gold (1)",
    "category": "protein-supplements",
    "image": "https://images.unsplash.com/photo-1579126038374-6064e9370f0f?auto=format&fit=crop&w=520&q=80",
    "description": "Premium quality whey protein isolate gold (1) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Whey Protein Isolate Gold (1)"
    ],
    "rating": 4.9,
    "reviewCount": 568,
    "tags": [
      "trending"
    ],
    "variants": [
      {
        "id": "pr-gen-214-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 200,
        "mrp": 300,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "pr-gen-214-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 360,
        "mrp": 550,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "pr-gen-215",
    "name": "Hydrolyzed Whey Max (2)",
    "category": "protein-supplements",
    "image": "https://images.unsplash.com/photo-1601648764658-cf37e8c89b70?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality hydrolyzed whey max (2) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Hydrolyzed Whey Max (2)"
    ],
    "rating": 4.4,
    "reviewCount": 375,
    "tags": [],
    "variants": [
      {
        "id": "pr-gen-215-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 210,
        "mrp": 310,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "pr-gen-215-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 370,
        "mrp": 560,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "pr-gen-216",
    "name": "Concentrate Whey Blend (3)",
    "category": "protein-supplements",
    "image": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=600&q=80",
    "description": "Premium quality concentrate whey blend (3) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Concentrate Whey Blend (3)"
    ],
    "rating": 4,
    "reviewCount": 489,
    "tags": [],
    "variants": [
      {
        "id": "pr-gen-216-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 220,
        "mrp": 320,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "pr-gen-216-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 380,
        "mrp": 570,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "pr-gen-217",
    "name": "Organic Plant Protein Raw (4)",
    "category": "protein-supplements",
    "image": "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=520&q=80",
    "description": "Premium quality organic plant protein raw (4) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Organic Plant Protein Raw (4)"
    ],
    "rating": 4.1,
    "reviewCount": 446,
    "tags": [],
    "variants": [
      {
        "id": "pr-gen-217-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 230,
        "mrp": 330,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "pr-gen-217-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 390,
        "mrp": 580,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "pr-gen-218",
    "name": "Vegan Pea Protein Elite (5)",
    "category": "protein-supplements",
    "image": "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&w=520&q=80",
    "description": "Premium quality vegan pea protein elite (5) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Vegan Pea Protein Elite (5)"
    ],
    "rating": 4,
    "reviewCount": 211,
    "tags": [],
    "variants": [
      {
        "id": "pr-gen-218-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 240,
        "mrp": 340,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "pr-gen-218-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 400,
        "mrp": 590,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "pr-gen-219",
    "name": "Soy Protein Isolate Pro (6)",
    "category": "protein-supplements",
    "image": "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=400&q=80",
    "description": "Premium quality soy protein isolate pro (6) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Soy Protein Isolate Pro (6)"
    ],
    "rating": 4.2,
    "reviewCount": 148,
    "tags": [],
    "variants": [
      {
        "id": "pr-gen-219-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 250,
        "mrp": 350,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "pr-gen-219-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 410,
        "mrp": 600,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "pr-gen-220",
    "name": "Premium Casein Protein (7)",
    "category": "protein-supplements",
    "image": "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=480&q=80",
    "description": "Premium quality premium casein protein (7) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Premium Casein Protein (7)"
    ],
    "rating": 4.4,
    "reviewCount": 392,
    "tags": [],
    "variants": [
      {
        "id": "pr-gen-220-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 260,
        "mrp": 360,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "pr-gen-220-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 420,
        "mrp": 610,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "pr-gen-221",
    "name": "BCAA 2:1:1 Energy (8)",
    "category": "protein-supplements",
    "image": "https://images.unsplash.com/photo-1615485290449-8aeb7c2a8e27?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality bcaa 2:1:1 energy (8) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "BCAA 2:1:1 Energy (8)"
    ],
    "rating": 4.6,
    "reviewCount": 355,
    "tags": [],
    "variants": [
      {
        "id": "pr-gen-221-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 270,
        "mrp": 370,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "pr-gen-221-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 430,
        "mrp": 620,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "pr-gen-222",
    "name": "Essential Amino Acids EAA (9)",
    "category": "protein-supplements",
    "image": "https://images.unsplash.com/photo-1546483875-ad9014c88eba?auto=format&fit=crop&w=480&q=80",
    "description": "Premium quality essential amino acids eaa (9) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Essential Amino Acids EAA (9)"
    ],
    "rating": 4.3,
    "reviewCount": 243,
    "tags": [],
    "variants": [
      {
        "id": "pr-gen-222-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 280,
        "mrp": 380,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "pr-gen-222-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 440,
        "mrp": 630,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "pr-gen-223",
    "name": "Pure L-Glutamine Max (10)",
    "category": "protein-supplements",
    "image": "https://images.unsplash.com/photo-1600959907703-6b3d7be0d56e?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality pure l-glutamine max (10) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Pure L-Glutamine Max (10)"
    ],
    "rating": 4.7,
    "reviewCount": 672,
    "tags": [],
    "variants": [
      {
        "id": "pr-gen-223-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 290,
        "mrp": 390,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "pr-gen-223-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 450,
        "mrp": 640,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "pr-gen-224",
    "name": "Creatine Monohydrate Gold (11)",
    "category": "protein-supplements",
    "image": "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&w=600&q=80",
    "description": "Premium quality creatine monohydrate gold (11) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Creatine Monohydrate Gold (11)"
    ],
    "rating": 4.7,
    "reviewCount": 433,
    "tags": [
      "trending"
    ],
    "variants": [
      {
        "id": "pr-gen-224-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 300,
        "mrp": 400,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "pr-gen-224-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 460,
        "mrp": 650,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "pr-gen-225",
    "name": "L-Arginine Pump Max (12)",
    "category": "protein-supplements",
    "image": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=480&q=80",
    "description": "Premium quality l-arginine pump max (12) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "L-Arginine Pump Max (12)"
    ],
    "rating": 4.5,
    "reviewCount": 409,
    "tags": [],
    "variants": [
      {
        "id": "pr-gen-225-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 310,
        "mrp": 410,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "pr-gen-225-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 470,
        "mrp": 660,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "pr-gen-226",
    "name": "Beta Alanine Power Boost (13)",
    "category": "protein-supplements",
    "image": "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=600&q=80",
    "description": "Premium quality beta alanine power boost (13) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Beta Alanine Power Boost (13)"
    ],
    "rating": 4.5,
    "reviewCount": 375,
    "tags": [
      "bestseller"
    ],
    "variants": [
      {
        "id": "pr-gen-226-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 320,
        "mrp": 420,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "pr-gen-226-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 480,
        "mrp": 670,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "pr-gen-227",
    "name": "Pre-Workout Ignition (14)",
    "category": "protein-supplements",
    "image": "https://images.unsplash.com/photo-1514995428455-447d4443fa7f?auto=format&fit=crop&w=400&q=80",
    "description": "Premium quality pre-workout ignition (14) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Pre-Workout Ignition (14)"
    ],
    "rating": 4.1,
    "reviewCount": 82,
    "tags": [],
    "variants": [
      {
        "id": "pr-gen-227-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 330,
        "mrp": 430,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "pr-gen-227-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 490,
        "mrp": 680,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "pr-gen-228",
    "name": "Post-Workout Recovery (15)",
    "category": "protein-supplements",
    "image": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=480&q=80",
    "description": "Premium quality post-workout recovery (15) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Post-Workout Recovery (15)"
    ],
    "rating": 4.1,
    "reviewCount": 414,
    "tags": [],
    "variants": [
      {
        "id": "pr-gen-228-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 340,
        "mrp": 440,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "pr-gen-228-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 500,
        "mrp": 690,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "pr-gen-229",
    "name": "Citruilline Malate Max (16)",
    "category": "protein-supplements",
    "image": "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=480&q=80",
    "description": "Premium quality citruilline malate max (16) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Citruilline Malate Max (16)"
    ],
    "rating": 4.1,
    "reviewCount": 484,
    "tags": [],
    "variants": [
      {
        "id": "pr-gen-229-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 350,
        "mrp": 450,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "pr-gen-229-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 510,
        "mrp": 700,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "pr-gen-230",
    "name": "HMB Muscle Builder (17)",
    "category": "protein-supplements",
    "image": "https://images.unsplash.com/photo-1549476464-37392f717541?auto=format&fit=crop&w=480&q=80",
    "description": "Premium quality hmb muscle builder (17) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "HMB Muscle Builder (17)"
    ],
    "rating": 4.6,
    "reviewCount": 113,
    "tags": [],
    "variants": [
      {
        "id": "pr-gen-230-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 360,
        "mrp": 460,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "pr-gen-230-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 520,
        "mrp": 710,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "pr-gen-231",
    "name": "Whey Protein Bar Pack (18)",
    "category": "protein-supplements",
    "image": "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=520&q=80",
    "description": "Premium quality whey protein bar pack (18) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Whey Protein Bar Pack (18)"
    ],
    "rating": 4.2,
    "reviewCount": 330,
    "tags": [],
    "variants": [
      {
        "id": "pr-gen-231-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 370,
        "mrp": 470,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "pr-gen-231-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 530,
        "mrp": 720,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "pr-gen-232",
    "name": "Vegan Plant Protein Vanilla (19)",
    "category": "protein-supplements",
    "image": "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=520&q=80",
    "description": "Premium quality vegan plant protein vanilla (19) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Vegan Plant Protein Vanilla (19)"
    ],
    "rating": 4.4,
    "reviewCount": 73,
    "tags": [],
    "variants": [
      {
        "id": "pr-gen-232-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 380,
        "mrp": 480,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "pr-gen-232-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 540,
        "mrp": 730,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "pr-gen-233",
    "name": "Casein Sleep Protein Chocolate (20)",
    "category": "protein-supplements",
    "image": "https://images.unsplash.com/photo-1545093149-618ce3bcf49d?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality casein sleep protein chocolate (20) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Casein Sleep Protein Chocolate (20)"
    ],
    "rating": 4.4,
    "reviewCount": 324,
    "tags": [],
    "variants": [
      {
        "id": "pr-gen-233-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 390,
        "mrp": 490,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "pr-gen-233-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 550,
        "mrp": 740,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "pr-gen-234",
    "name": "Premium Beef Protein Isolate (21)",
    "category": "protein-supplements",
    "image": "https://images.unsplash.com/photo-1611241893603-3c359704e0ee?auto=format&fit=crop&w=500&q=71",
    "description": "Premium quality premium beef protein isolate (21) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Premium Beef Protein Isolate (21)"
    ],
    "rating": 4.4,
    "reviewCount": 228,
    "tags": [
      "trending"
    ],
    "variants": [
      {
        "id": "pr-gen-234-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 400,
        "mrp": 500,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "pr-gen-234-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 560,
        "mrp": 750,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "pr-gen-235",
    "name": "Egg White Protein Powder (22)",
    "category": "protein-supplements",
    "image": "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=400&q=80",
    "description": "Premium quality egg white protein powder (22) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Egg White Protein Powder (22)"
    ],
    "rating": 4.5,
    "reviewCount": 659,
    "tags": [],
    "variants": [
      {
        "id": "pr-gen-235-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 410,
        "mrp": 510,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "pr-gen-235-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 570,
        "mrp": 760,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "pr-gen-236",
    "name": "Rice Protein Isolate Organic (23)",
    "category": "protein-supplements",
    "image": "https://images.unsplash.com/photo-1612532275214-e4ca76d0e4d1?auto=format&fit=crop&w=480&q=80",
    "description": "Premium quality rice protein isolate organic (23) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Rice Protein Isolate Organic (23)"
    ],
    "rating": 4,
    "reviewCount": 138,
    "tags": [],
    "variants": [
      {
        "id": "pr-gen-236-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 420,
        "mrp": 520,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "pr-gen-236-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 580,
        "mrp": 770,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "pr-gen-237",
    "name": "Hemp Protein Raw Booster (24)",
    "category": "protein-supplements",
    "image": "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=500&q=74",
    "description": "Premium quality hemp protein raw booster (24) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Hemp Protein Raw Booster (24)"
    ],
    "rating": 4.1,
    "reviewCount": 553,
    "tags": [],
    "variants": [
      {
        "id": "pr-gen-237-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 430,
        "mrp": 530,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "pr-gen-237-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 590,
        "mrp": 780,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "pr-gen-238",
    "name": "Pumpkin Seed Protein Raw (25)",
    "category": "protein-supplements",
    "image": "https://images.unsplash.com/photo-1628689502016-0bccc5a04abd?auto=format&fit=crop&w=520&q=80",
    "description": "Premium quality pumpkin seed protein raw (25) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Pumpkin Seed Protein Raw (25)"
    ],
    "rating": 4.9,
    "reviewCount": 358,
    "tags": [
      "bestseller"
    ],
    "variants": [
      {
        "id": "pr-gen-238-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 440,
        "mrp": 540,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "pr-gen-238-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 600,
        "mrp": 790,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "pr-gen-239",
    "name": "EAA Hydration Complex (26)",
    "category": "protein-supplements",
    "image": "https://images.unsplash.com/photo-1619636963499-a5e2f449e98b?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality eaa hydration complex (26) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "EAA Hydration Complex (26)"
    ],
    "rating": 4.3,
    "reviewCount": 167,
    "tags": [],
    "variants": [
      {
        "id": "pr-gen-239-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 450,
        "mrp": 550,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "pr-gen-239-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 610,
        "mrp": 800,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "pr-gen-240",
    "name": "BCAA Energy Shots (27)",
    "category": "protein-supplements",
    "image": "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=400&q=80",
    "description": "Premium quality bcaa energy shots (27) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "BCAA Energy Shots (27)"
    ],
    "rating": 4.2,
    "reviewCount": 834,
    "tags": [],
    "variants": [
      {
        "id": "pr-gen-240-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 460,
        "mrp": 560,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "pr-gen-240-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 620,
        "mrp": 810,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "pr-gen-241",
    "name": "Raw Creatine Powder (28)",
    "category": "protein-supplements",
    "image": "https://images.unsplash.com/photo-1626544827763-d516dce335e2?auto=format&fit=crop&w=450&q=80",
    "description": "Premium quality raw creatine powder (28) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Raw Creatine Powder (28)"
    ],
    "rating": 4.8,
    "reviewCount": 610,
    "tags": [],
    "variants": [
      {
        "id": "pr-gen-241-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 470,
        "mrp": 570,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "pr-gen-241-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 630,
        "mrp": 820,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "pr-gen-242",
    "name": "Pre-Workout Extreme Energy (29)",
    "category": "protein-supplements",
    "image": "https://images.unsplash.com/photo-1515165562839-978bbcf18277?auto=format&fit=crop&w=450&q=80",
    "description": "Premium quality pre-workout extreme energy (29) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Pre-Workout Extreme Energy (29)"
    ],
    "rating": 4.4,
    "reviewCount": 386,
    "tags": [],
    "variants": [
      {
        "id": "pr-gen-242-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 480,
        "mrp": 580,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "pr-gen-242-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 640,
        "mrp": 830,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "pr-gen-243",
    "name": "Nitric Oxide Pump Boost (30)",
    "category": "protein-supplements",
    "image": "https://images.unsplash.com/photo-1596357395217-80de13130e92?auto=format&fit=crop&w=520&q=80",
    "description": "Premium quality nitric oxide pump boost (30) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Nitric Oxide Pump Boost (30)"
    ],
    "rating": 4.4,
    "reviewCount": 490,
    "tags": [],
    "variants": [
      {
        "id": "pr-gen-243-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 490,
        "mrp": 590,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "pr-gen-243-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 650,
        "mrp": 840,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "pr-gen-244",
    "name": "ZMA Night Muscle (31)",
    "category": "protein-supplements",
    "image": "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=450&q=80",
    "description": "Premium quality zma night muscle (31) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "ZMA Night Muscle (31)"
    ],
    "rating": 4.3,
    "reviewCount": 669,
    "tags": [
      "trending"
    ],
    "variants": [
      {
        "id": "pr-gen-244-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 500,
        "mrp": 600,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "pr-gen-244-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 660,
        "mrp": 850,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "pr-gen-245",
    "name": "Protein Water Clear Berry (32)",
    "category": "protein-supplements",
    "image": "https://images.unsplash.com/photo-1576086085526-0763a1d64a6d?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality protein water clear berry (32) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Protein Water Clear Berry (32)"
    ],
    "rating": 4.3,
    "reviewCount": 319,
    "tags": [],
    "variants": [
      {
        "id": "pr-gen-245-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 510,
        "mrp": 610,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "pr-gen-245-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 670,
        "mrp": 860,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "pr-gen-246",
    "name": "Isolate Protein Shots (33)",
    "category": "protein-supplements",
    "image": "https://images.unsplash.com/photo-1559181567-c3190958d3ab?auto=format&fit=crop&w=520&q=80",
    "description": "Premium quality isolate protein shots (33) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Isolate Protein Shots (33)"
    ],
    "rating": 4.4,
    "reviewCount": 902,
    "tags": [],
    "variants": [
      {
        "id": "pr-gen-246-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 520,
        "mrp": 620,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "pr-gen-246-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 680,
        "mrp": 870,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "pr-gen-247",
    "name": "Gold Muscle Builder Shake (34)",
    "category": "protein-supplements",
    "image": "https://images.unsplash.com/photo-1611941143867-8c32dfa73942?auto=format&fit=crop&w=500&q=75",
    "description": "Premium quality gold muscle builder shake (34) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Gold Muscle Builder Shake (34)"
    ],
    "rating": 4.2,
    "reviewCount": 451,
    "tags": [],
    "variants": [
      {
        "id": "pr-gen-247-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 530,
        "mrp": 630,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "pr-gen-247-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 690,
        "mrp": 880,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "pr-gen-248",
    "name": "Recovery Amino Complex (35)",
    "category": "protein-supplements",
    "image": "https://images.unsplash.com/photo-1588776814546-1ffbb172d936?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality recovery amino complex (35) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Recovery Amino Complex (35)"
    ],
    "rating": 4.5,
    "reviewCount": 155,
    "tags": [],
    "variants": [
      {
        "id": "pr-gen-248-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 540,
        "mrp": 640,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "pr-gen-248-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 700,
        "mrp": 890,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "pr-gen-249",
    "name": "Premium Mass Protein EAA (36)",
    "category": "protein-supplements",
    "image": "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=480&q=80",
    "description": "Premium quality premium mass protein eaa (36) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Premium Mass Protein EAA (36)"
    ],
    "rating": 4.8,
    "reviewCount": 408,
    "tags": [],
    "variants": [
      {
        "id": "pr-gen-249-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 550,
        "mrp": 650,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "pr-gen-249-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 710,
        "mrp": 900,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "pr-gen-250",
    "name": "Super Whey Isolate Vanilla (37)",
    "category": "protein-supplements",
    "image": "https://images.unsplash.com/photo-1548438294-1ad5d5f4f063?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality super whey isolate vanilla (37) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Super Whey Isolate Vanilla (37)"
    ],
    "rating": 4.5,
    "reviewCount": 143,
    "tags": [
      "bestseller"
    ],
    "variants": [
      {
        "id": "pr-gen-250-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 560,
        "mrp": 660,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "pr-gen-250-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 720,
        "mrp": 910,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "pr-gen-251",
    "name": "Organic Soy Protein Plain (38)",
    "category": "protein-supplements",
    "image": "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=500&q=70",
    "description": "Premium quality organic soy protein plain (38) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Organic Soy Protein Plain (38)"
    ],
    "rating": 4.7,
    "reviewCount": 307,
    "tags": [],
    "variants": [
      {
        "id": "pr-gen-251-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 570,
        "mrp": 670,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "pr-gen-251-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 730,
        "mrp": 920,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "he-gen-252",
    "name": "Protein Bar Mixed Pack (1)",
    "category": "healthy-snacks",
    "image": "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=480&q=80",
    "description": "Premium quality protein bar mixed pack (1) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Protein Bar Mixed Pack (1)"
    ],
    "rating": 4.6,
    "reviewCount": 884,
    "tags": [
      "trending"
    ],
    "variants": [
      {
        "id": "he-gen-252-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 200,
        "mrp": 300,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "he-gen-252-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 360,
        "mrp": 550,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "he-gen-253",
    "name": "Peanut Butter Oats Bar (2)",
    "category": "healthy-snacks",
    "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80",
    "description": "Premium quality peanut butter oats bar (2) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Peanut Butter Oats Bar (2)"
    ],
    "rating": 4.8,
    "reviewCount": 512,
    "tags": [],
    "variants": [
      {
        "id": "he-gen-253-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 210,
        "mrp": 310,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "he-gen-253-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 370,
        "mrp": 560,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "he-gen-254",
    "name": "Almond Crunch Bar (3)",
    "category": "healthy-snacks",
    "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80",
    "description": "Premium quality almond crunch bar (3) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Almond Crunch Bar (3)"
    ],
    "rating": 4.6,
    "reviewCount": 362,
    "tags": [],
    "variants": [
      {
        "id": "he-gen-254-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 220,
        "mrp": 320,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "he-gen-254-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 380,
        "mrp": 570,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "he-gen-255",
    "name": "Choco Fudge Energy Bar (4)",
    "category": "healthy-snacks",
    "image": "https://images.unsplash.com/photo-1575377427642-087cf684ad5e?auto=format&fit=crop&w=520&q=80",
    "description": "Premium quality choco fudge energy bar (4) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Choco Fudge Energy Bar (4)"
    ],
    "rating": 4.6,
    "reviewCount": 539,
    "tags": [],
    "variants": [
      {
        "id": "he-gen-255-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 230,
        "mrp": 330,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "he-gen-255-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 390,
        "mrp": 580,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "he-gen-256",
    "name": "Roasted Almonds Salted (5)",
    "category": "healthy-snacks",
    "image": "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=480&q=80",
    "description": "Premium quality roasted almonds salted (5) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Roasted Almonds Salted (5)"
    ],
    "rating": 4.4,
    "reviewCount": 452,
    "tags": [],
    "variants": [
      {
        "id": "he-gen-256-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 240,
        "mrp": 340,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "he-gen-256-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 400,
        "mrp": 590,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "he-gen-257",
    "name": "Premium Cashews Roasted (6)",
    "category": "healthy-snacks",
    "image": "https://images.unsplash.com/photo-1567892737950-30c4db37cd89?auto=format&fit=crop&w=480&q=80",
    "description": "Premium quality premium cashews roasted (6) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Premium Cashews Roasted (6)"
    ],
    "rating": 4.8,
    "reviewCount": 126,
    "tags": [],
    "variants": [
      {
        "id": "he-gen-257-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 250,
        "mrp": 350,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "he-gen-257-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 410,
        "mrp": 600,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "he-gen-258",
    "name": "Walnuts Raw Kernels (7)",
    "category": "healthy-snacks",
    "image": "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&w=520&q=80",
    "description": "Premium quality walnuts raw kernels (7) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Walnuts Raw Kernels (7)"
    ],
    "rating": 4.8,
    "reviewCount": 331,
    "tags": [],
    "variants": [
      {
        "id": "he-gen-258-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 260,
        "mrp": 360,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "he-gen-258-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 420,
        "mrp": 610,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "he-gen-259",
    "name": "Trail Mix Active blend (8)",
    "category": "healthy-snacks",
    "image": "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=480&q=80",
    "description": "Premium quality trail mix active blend (8) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Trail Mix Active blend (8)"
    ],
    "rating": 4.3,
    "reviewCount": 886,
    "tags": [],
    "variants": [
      {
        "id": "he-gen-259-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 270,
        "mrp": 370,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "he-gen-259-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 430,
        "mrp": 620,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "he-gen-260",
    "name": "Pumpkin Seeds Roasted (9)",
    "category": "healthy-snacks",
    "image": "https://images.unsplash.com/photo-1628689502016-0bccc5a04abd?auto=format&fit=crop&w=400&q=80",
    "description": "Premium quality pumpkin seeds roasted (9) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Pumpkin Seeds Roasted (9)"
    ],
    "rating": 4.4,
    "reviewCount": 229,
    "tags": [],
    "variants": [
      {
        "id": "he-gen-260-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 280,
        "mrp": 380,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "he-gen-260-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 440,
        "mrp": 630,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "he-gen-261",
    "name": "Sunflower Seeds Roasted (10)",
    "category": "healthy-snacks",
    "image": "https://images.unsplash.com/photo-1625005152241-82b19afb9e93?auto=format&fit=crop&w=400&q=80",
    "description": "Premium quality sunflower seeds roasted (10) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Sunflower Seeds Roasted (10)"
    ],
    "rating": 4.6,
    "reviewCount": 612,
    "tags": [],
    "variants": [
      {
        "id": "he-gen-261-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 290,
        "mrp": 390,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "he-gen-261-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 450,
        "mrp": 640,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "he-gen-262",
    "name": "Baked Ragi Chips Plain (11)",
    "category": "healthy-snacks",
    "image": "https://images.unsplash.com/photo-1562547256-2c5ee93b60b7?auto=format&fit=crop&w=520&q=80",
    "description": "Premium quality baked ragi chips plain (11) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Baked Ragi Chips Plain (11)"
    ],
    "rating": 4.5,
    "reviewCount": 319,
    "tags": [
      "trending"
    ],
    "variants": [
      {
        "id": "he-gen-262-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 300,
        "mrp": 400,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "he-gen-262-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 460,
        "mrp": 650,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "he-gen-263",
    "name": "Baked Beetroot Chips Spicy (12)",
    "category": "healthy-snacks",
    "image": "https://images.unsplash.com/photo-1604908814868-b3d8fb1a0c01?auto=format&fit=crop&w=520&q=80",
    "description": "Premium quality baked beetroot chips spicy (12) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Baked Beetroot Chips Spicy (12)"
    ],
    "rating": 4.8,
    "reviewCount": 101,
    "tags": [],
    "variants": [
      {
        "id": "he-gen-263-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 310,
        "mrp": 410,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "he-gen-263-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 470,
        "mrp": 660,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "he-gen-264",
    "name": "Popped Lotus Seeds Makhana (13)",
    "category": "healthy-snacks",
    "image": "https://images.unsplash.com/photo-1568205631878-6b4b04e9780d?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality popped lotus seeds makhana (13) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Popped Lotus Seeds Makhana (13)"
    ],
    "rating": 4.1,
    "reviewCount": 824,
    "tags": [
      "bestseller"
    ],
    "variants": [
      {
        "id": "he-gen-264-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 320,
        "mrp": 420,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "he-gen-264-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 480,
        "mrp": 670,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "he-gen-265",
    "name": "Quinoa Puffs Spicy (14)",
    "category": "healthy-snacks",
    "image": "https://images.unsplash.com/photo-1631078124539-fa48f28e4f63?auto=format&fit=crop&w=520&q=80",
    "description": "Premium quality quinoa puffs spicy (14) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Quinoa Puffs Spicy (14)"
    ],
    "rating": 4.7,
    "reviewCount": 173,
    "tags": [],
    "variants": [
      {
        "id": "he-gen-265-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 330,
        "mrp": 430,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "he-gen-265-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 490,
        "mrp": 680,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "he-gen-266",
    "name": "Multigrain Roasted Flakes (15)",
    "category": "healthy-snacks",
    "image": "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=520&q=80",
    "description": "Premium quality multigrain roasted flakes (15) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Multigrain Roasted Flakes (15)"
    ],
    "rating": 4.1,
    "reviewCount": 918,
    "tags": [],
    "variants": [
      {
        "id": "he-gen-266-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 340,
        "mrp": 440,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "he-gen-266-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 500,
        "mrp": 690,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "he-gen-267",
    "name": "Dark Chocolate Oatmeal Cookies (16)",
    "category": "healthy-snacks",
    "image": "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=450&q=80",
    "description": "Premium quality dark chocolate oatmeal cookies (16) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Dark Chocolate Oatmeal Cookies (16)"
    ],
    "rating": 4.6,
    "reviewCount": 188,
    "tags": [],
    "variants": [
      {
        "id": "he-gen-267-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 350,
        "mrp": 450,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "he-gen-267-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 510,
        "mrp": 700,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "he-gen-268",
    "name": "Baked Oats Crisps Honey (17)",
    "category": "healthy-snacks",
    "image": "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality baked oats crisps honey (17) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Baked Oats Crisps Honey (17)"
    ],
    "rating": 4.6,
    "reviewCount": 151,
    "tags": [],
    "variants": [
      {
        "id": "he-gen-268-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 360,
        "mrp": 460,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "he-gen-268-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 520,
        "mrp": 710,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "he-gen-269",
    "name": "Spiced Chickpeas Roasted (18)",
    "category": "healthy-snacks",
    "image": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=400&q=80",
    "description": "Premium quality spiced chickpeas roasted (18) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Spiced Chickpeas Roasted (18)"
    ],
    "rating": 4.5,
    "reviewCount": 698,
    "tags": [],
    "variants": [
      {
        "id": "he-gen-269-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 370,
        "mrp": 470,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "he-gen-269-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 530,
        "mrp": 720,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "he-gen-270",
    "name": "Soy Nuts Roasted Salted (19)",
    "category": "healthy-snacks",
    "image": "https://images.unsplash.com/photo-1512003867696-6d5ce6835040?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality soy nuts roasted salted (19) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Soy Nuts Roasted Salted (19)"
    ],
    "rating": 4.4,
    "reviewCount": 410,
    "tags": [],
    "variants": [
      {
        "id": "he-gen-270-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 380,
        "mrp": 480,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "he-gen-270-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 540,
        "mrp": 730,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "he-gen-271",
    "name": "Healthy Energy Bites Cocoa (20)",
    "category": "healthy-snacks",
    "image": "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=480&q=80",
    "description": "Premium quality healthy energy bites cocoa (20) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Healthy Energy Bites Cocoa (20)"
    ],
    "rating": 4.6,
    "reviewCount": 860,
    "tags": [],
    "variants": [
      {
        "id": "he-gen-271-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 390,
        "mrp": 490,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "he-gen-271-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 550,
        "mrp": 740,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "he-gen-272",
    "name": "Coconut Crunch Chips (21)",
    "category": "healthy-snacks",
    "image": "https://images.unsplash.com/photo-1501529301733-aa9bc9a4dece?auto=format&fit=crop&w=600&q=80",
    "description": "Premium quality coconut crunch chips (21) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Coconut Crunch Chips (21)"
    ],
    "rating": 4.8,
    "reviewCount": 676,
    "tags": [
      "trending"
    ],
    "variants": [
      {
        "id": "he-gen-272-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 400,
        "mrp": 500,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "he-gen-272-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 560,
        "mrp": 750,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "he-gen-273",
    "name": "Apple Cinnamon Energy Bar (22)",
    "category": "healthy-snacks",
    "image": "https://images.unsplash.com/photo-1568051243851-f9b136146e97?auto=format&fit=crop&w=400&q=80",
    "description": "Premium quality apple cinnamon energy bar (22) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Apple Cinnamon Energy Bar (22)"
    ],
    "rating": 4.1,
    "reviewCount": 560,
    "tags": [],
    "variants": [
      {
        "id": "he-gen-273-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 410,
        "mrp": 510,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "he-gen-273-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 570,
        "mrp": 760,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "he-gen-274",
    "name": "Berry Crunch Granola Bar (23)",
    "category": "healthy-snacks",
    "image": "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=400&q=80",
    "description": "Premium quality berry crunch granola bar (23) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Berry Crunch Granola Bar (23)"
    ],
    "rating": 4.8,
    "reviewCount": 595,
    "tags": [],
    "variants": [
      {
        "id": "he-gen-274-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 420,
        "mrp": 520,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "he-gen-274-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 580,
        "mrp": 770,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "he-gen-275",
    "name": "Roasted Makhana Cheese Flavor (24)",
    "category": "healthy-snacks",
    "image": "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=400&q=80",
    "description": "Premium quality roasted makhana cheese flavor (24) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Roasted Makhana Cheese Flavor (24)"
    ],
    "rating": 4.7,
    "reviewCount": 443,
    "tags": [],
    "variants": [
      {
        "id": "he-gen-275-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 430,
        "mrp": 530,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "he-gen-275-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 590,
        "mrp": 780,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "he-gen-276",
    "name": "Salted Pistachios Premium (25)",
    "category": "healthy-snacks",
    "image": "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&w=600&q=80",
    "description": "Premium quality salted pistachios premium (25) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Salted Pistachios Premium (25)"
    ],
    "rating": 4.6,
    "reviewCount": 894,
    "tags": [
      "bestseller"
    ],
    "variants": [
      {
        "id": "he-gen-276-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 440,
        "mrp": 540,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "he-gen-276-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 600,
        "mrp": 790,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "he-gen-277",
    "name": "Organic Flaxseed Crackers (26)",
    "category": "healthy-snacks",
    "image": "https://images.unsplash.com/photo-1586511925558-a4134d14cdfe?auto=format&fit=crop&w=520&q=80",
    "description": "Premium quality organic flaxseed crackers (26) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Organic Flaxseed Crackers (26)"
    ],
    "rating": 4.6,
    "reviewCount": 693,
    "tags": [],
    "variants": [
      {
        "id": "he-gen-277-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 450,
        "mrp": 550,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "he-gen-277-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 610,
        "mrp": 800,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "he-gen-278",
    "name": "Chia Seed Oat Crackers (27)",
    "category": "healthy-snacks",
    "image": "https://images.unsplash.com/photo-1586511925558-a4134d14cdfe?auto=format&fit=crop&w=480&q=80",
    "description": "Premium quality chia seed oat crackers (27) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Chia Seed Oat Crackers (27)"
    ],
    "rating": 4.2,
    "reviewCount": 66,
    "tags": [],
    "variants": [
      {
        "id": "he-gen-278-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 460,
        "mrp": 560,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "he-gen-278-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 620,
        "mrp": 810,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "he-gen-279",
    "name": "Roasted Edamame Salted (28)",
    "category": "healthy-snacks",
    "image": "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=450&q=80",
    "description": "Premium quality roasted edamame salted (28) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Roasted Edamame Salted (28)"
    ],
    "rating": 4.6,
    "reviewCount": 508,
    "tags": [],
    "variants": [
      {
        "id": "he-gen-279-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 470,
        "mrp": 570,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "he-gen-279-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 630,
        "mrp": 820,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "he-gen-280",
    "name": "Sweet Potato Baked Crisps (29)",
    "category": "healthy-snacks",
    "image": "https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=450&q=80",
    "description": "Premium quality sweet potato baked crisps (29) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Sweet Potato Baked Crisps (29)"
    ],
    "rating": 4.7,
    "reviewCount": 580,
    "tags": [],
    "variants": [
      {
        "id": "he-gen-280-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 480,
        "mrp": 580,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "he-gen-280-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 640,
        "mrp": 830,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "he-gen-281",
    "name": "High Fiber Bran Crisps (30)",
    "category": "healthy-snacks",
    "image": "https://images.unsplash.com/photo-1585647347483-22b66260dfff?auto=format&fit=crop&w=480&q=80",
    "description": "Premium quality high fiber bran crisps (30) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "High Fiber Bran Crisps (30)"
    ],
    "rating": 4.1,
    "reviewCount": 340,
    "tags": [],
    "variants": [
      {
        "id": "he-gen-281-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 490,
        "mrp": 590,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "he-gen-281-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 650,
        "mrp": 840,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "he-gen-282",
    "name": "Banana Baked Crisps Sweet (31)",
    "category": "healthy-snacks",
    "image": "https://images.unsplash.com/photo-1485963631004-f2f00b1d6606?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality banana baked crisps sweet (31) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Banana Baked Crisps Sweet (31)"
    ],
    "rating": 4.9,
    "reviewCount": 637,
    "tags": [
      "trending"
    ],
    "variants": [
      {
        "id": "he-gen-282-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 500,
        "mrp": 600,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "he-gen-282-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 660,
        "mrp": 850,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "he-gen-283",
    "name": "Fruit and Nut Protein Bar (32)",
    "category": "healthy-snacks",
    "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality fruit and nut protein bar (32) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Fruit and Nut Protein Bar (32)"
    ],
    "rating": 4.9,
    "reviewCount": 618,
    "tags": [],
    "variants": [
      {
        "id": "he-gen-283-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 510,
        "mrp": 610,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "he-gen-283-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 670,
        "mrp": 860,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "he-gen-284",
    "name": "Double Chocolate Protein Cookie (33)",
    "category": "healthy-snacks",
    "image": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=600&q=80",
    "description": "Premium quality double chocolate protein cookie (33) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Double Chocolate Protein Cookie (33)"
    ],
    "rating": 4.5,
    "reviewCount": 397,
    "tags": [],
    "variants": [
      {
        "id": "he-gen-284-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 520,
        "mrp": 620,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "he-gen-284-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 680,
        "mrp": 870,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "he-gen-285",
    "name": "Coconut Protein Bar Raw (34)",
    "category": "healthy-snacks",
    "image": "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=600&q=80",
    "description": "Premium quality coconut protein bar raw (34) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Coconut Protein Bar Raw (34)"
    ],
    "rating": 4.2,
    "reviewCount": 597,
    "tags": [],
    "variants": [
      {
        "id": "he-gen-285-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 530,
        "mrp": 630,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "he-gen-285-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 690,
        "mrp": 880,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "he-gen-286",
    "name": "Peanut Butter Protein Cookie (35)",
    "category": "healthy-snacks",
    "image": "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&w=600&q=80",
    "description": "Premium quality peanut butter protein cookie (35) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Peanut Butter Protein Cookie (35)"
    ],
    "rating": 4.1,
    "reviewCount": 739,
    "tags": [],
    "variants": [
      {
        "id": "he-gen-286-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 540,
        "mrp": 640,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "he-gen-286-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 700,
        "mrp": 890,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "he-gen-287",
    "name": "Spiced Green Peas Roasted (36)",
    "category": "healthy-snacks",
    "image": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=600&q=80",
    "description": "Premium quality spiced green peas roasted (36) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Spiced Green Peas Roasted (36)"
    ],
    "rating": 4.8,
    "reviewCount": 512,
    "tags": [],
    "variants": [
      {
        "id": "he-gen-287-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 550,
        "mrp": 650,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "he-gen-287-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 710,
        "mrp": 900,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "he-gen-288",
    "name": "Crunchy Quinoa Chips (37)",
    "category": "healthy-snacks",
    "image": "https://images.unsplash.com/photo-1494390248081-4e521a5940db?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality crunchy quinoa chips (37) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Crunchy Quinoa Chips (37)"
    ],
    "rating": 4.3,
    "reviewCount": 534,
    "tags": [
      "bestseller"
    ],
    "variants": [
      {
        "id": "he-gen-288-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 560,
        "mrp": 660,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "he-gen-288-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 720,
        "mrp": 910,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "he-gen-289",
    "name": "Roasted Rice Crackers Chili (38)",
    "category": "healthy-snacks",
    "image": "https://images.unsplash.com/photo-1562547256-2c5ee93b60b7?auto=format&fit=crop&w=480&q=80",
    "description": "Premium quality roasted rice crackers chili (38) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Roasted Rice Crackers Chili (38)"
    ],
    "rating": 4.5,
    "reviewCount": 141,
    "tags": [],
    "variants": [
      {
        "id": "he-gen-289-500g",
        "size": "500g",
        "flavor": null,
        "unit": "500g",
        "price": 570,
        "mrp": 670,
        "calories": 180,
        "protein": 12,
        "stock": 75
      },
      {
        "id": "he-gen-289-1kg",
        "size": "1kg",
        "flavor": null,
        "unit": "1kg",
        "price": 730,
        "mrp": 920,
        "calories": 180,
        "protein": 12,
        "stock": 45
      }
    ]
  },
  {
    "id": "di-gen-290",
    "name": "Keto Paneer Bhurji Meal (1)",
    "category": "diet-meals",
    "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=480&q=80",
    "description": "Premium quality keto paneer bhurji meal (1) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Keto Paneer Bhurji Meal (1)"
    ],
    "rating": 4.5,
    "reviewCount": 294,
    "tags": [
      "trending"
    ],
    "variants": [
      {
        "id": "di-gen-290-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 80,
        "mrp": 100,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "di-gen-291",
    "name": "Keto Egg Salad Bowl (2)",
    "category": "diet-meals",
    "image": "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=600&q=80",
    "description": "Premium quality keto egg salad bowl (2) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Keto Egg Salad Bowl (2)"
    ],
    "rating": 4.5,
    "reviewCount": 762,
    "tags": [],
    "variants": [
      {
        "id": "di-gen-291-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 85,
        "mrp": 105,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "di-gen-292",
    "name": "Low Cal Tofu Salad Bowl (3)",
    "category": "diet-meals",
    "image": "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=400&q=80",
    "description": "Premium quality low cal tofu salad bowl (3) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Low Cal Tofu Salad Bowl (3)"
    ],
    "rating": 4.7,
    "reviewCount": 259,
    "tags": [],
    "variants": [
      {
        "id": "di-gen-292-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 90,
        "mrp": 110,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "di-gen-293",
    "name": "Quinoa Khichdi Diet Bowl (4)",
    "category": "diet-meals",
    "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=480&q=80",
    "description": "Premium quality quinoa khichdi diet bowl (4) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Quinoa Khichdi Diet Bowl (4)"
    ],
    "rating": 4.3,
    "reviewCount": 385,
    "tags": [],
    "variants": [
      {
        "id": "di-gen-293-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 95,
        "mrp": 115,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "di-gen-294",
    "name": "Brown Rice Veg Pulao (5)",
    "category": "diet-meals",
    "image": "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=480&q=80",
    "description": "Premium quality brown rice veg pulao (5) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Brown Rice Veg Pulao (5)"
    ],
    "rating": 4,
    "reviewCount": 443,
    "tags": [],
    "variants": [
      {
        "id": "di-gen-294-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 100,
        "mrp": 120,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "di-gen-295",
    "name": "Oats Veg Upma Diet Bowl (6)",
    "category": "diet-meals",
    "image": "https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?auto=format&fit=crop&w=480&q=80",
    "description": "Premium quality oats veg upma diet bowl (6) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Oats Veg Upma Diet Bowl (6)"
    ],
    "rating": 4.4,
    "reviewCount": 729,
    "tags": [],
    "variants": [
      {
        "id": "di-gen-295-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 105,
        "mrp": 125,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "di-gen-296",
    "name": "High Protein Paneer Tikka (7)",
    "category": "diet-meals",
    "image": "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality high protein paneer tikka (7) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "High Protein Paneer Tikka (7)"
    ],
    "rating": 4,
    "reviewCount": 76,
    "tags": [],
    "variants": [
      {
        "id": "di-gen-296-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 110,
        "mrp": 130,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "di-gen-297",
    "name": "Low Cal Vegetable Soup (8)",
    "category": "diet-meals",
    "image": "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=520&q=80",
    "description": "Premium quality low cal vegetable soup (8) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Low Cal Vegetable Soup (8)"
    ],
    "rating": 4.6,
    "reviewCount": 742,
    "tags": [],
    "variants": [
      {
        "id": "di-gen-297-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 115,
        "mrp": 135,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "di-gen-298",
    "name": "High Protein Soya Salad (9)",
    "category": "diet-meals",
    "image": "https://images.unsplash.com/photo-1562802378-063ec186a863?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality high protein soya salad (9) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "High Protein Soya Salad (9)"
    ],
    "rating": 4.7,
    "reviewCount": 794,
    "tags": [],
    "variants": [
      {
        "id": "di-gen-298-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 120,
        "mrp": 140,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "di-gen-299",
    "name": "Low Carb Cauliflower Rice (10)",
    "category": "diet-meals",
    "image": "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?auto=format&fit=crop&w=480&q=80",
    "description": "Premium quality low carb cauliflower rice (10) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Low Carb Cauliflower Rice (10)"
    ],
    "rating": 4.1,
    "reviewCount": 608,
    "tags": [],
    "variants": [
      {
        "id": "di-gen-299-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 125,
        "mrp": 145,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "di-gen-300",
    "name": "Diet Chicken Breast Bowl (11)",
    "category": "diet-meals",
    "image": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=520&q=80",
    "description": "Premium quality diet chicken breast bowl (11) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Diet Chicken Breast Bowl (11)"
    ],
    "rating": 4.8,
    "reviewCount": 518,
    "tags": [
      "trending"
    ],
    "variants": [
      {
        "id": "di-gen-300-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 130,
        "mrp": 150,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "di-gen-301",
    "name": "Grilled Fish Veg Bowl (12)",
    "category": "diet-meals",
    "image": "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=480&q=80",
    "description": "Premium quality grilled fish veg bowl (12) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Grilled Fish Veg Bowl (12)"
    ],
    "rating": 4.7,
    "reviewCount": 465,
    "tags": [],
    "variants": [
      {
        "id": "di-gen-301-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 135,
        "mrp": 155,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "di-gen-302",
    "name": "Low Fat Turkey Wrap (13)",
    "category": "diet-meals",
    "image": "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=520&q=80",
    "description": "Premium quality low fat turkey wrap (13) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Low Fat Turkey Wrap (13)"
    ],
    "rating": 4.8,
    "reviewCount": 691,
    "tags": [
      "bestseller"
    ],
    "variants": [
      {
        "id": "di-gen-302-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 140,
        "mrp": 160,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "di-gen-303",
    "name": "High Protein Egg Wrap (14)",
    "category": "diet-meals",
    "image": "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&w=520&q=80",
    "description": "Premium quality high protein egg wrap (14) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "High Protein Egg Wrap (14)"
    ],
    "rating": 4.6,
    "reviewCount": 211,
    "tags": [],
    "variants": [
      {
        "id": "di-gen-303-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 145,
        "mrp": 165,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "di-gen-304",
    "name": "Keto Cauliflower Rice Veg (15)",
    "category": "diet-meals",
    "image": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=520&q=80",
    "description": "Premium quality keto cauliflower rice veg (15) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Keto Cauliflower Rice Veg (15)"
    ],
    "rating": 4.4,
    "reviewCount": 789,
    "tags": [],
    "variants": [
      {
        "id": "di-gen-304-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 150,
        "mrp": 170,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "di-gen-305",
    "name": "Vegan Quinoa Stir Fry (16)",
    "category": "diet-meals",
    "image": "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?auto=format&fit=crop&w=480&q=80",
    "description": "Premium quality vegan quinoa stir fry (16) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Vegan Quinoa Stir Fry (16)"
    ],
    "rating": 4.8,
    "reviewCount": 949,
    "tags": [],
    "variants": [
      {
        "id": "di-gen-305-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 155,
        "mrp": 175,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "di-gen-306",
    "name": "Detox Lentil Salad (17)",
    "category": "diet-meals",
    "image": "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=480&q=80",
    "description": "Premium quality detox lentil salad (17) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Detox Lentil Salad (17)"
    ],
    "rating": 4.9,
    "reviewCount": 546,
    "tags": [],
    "variants": [
      {
        "id": "di-gen-306-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 160,
        "mrp": 180,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "di-gen-307",
    "name": "Lean Beef Quinoa Bowl (18)",
    "category": "diet-meals",
    "image": "https://images.unsplash.com/photo-1551462147-ff29053bfc14?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality lean beef quinoa bowl (18) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Lean Beef Quinoa Bowl (18)"
    ],
    "rating": 4.9,
    "reviewCount": 375,
    "tags": [],
    "variants": [
      {
        "id": "di-gen-307-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 165,
        "mrp": 185,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "di-gen-308",
    "name": "Spinach Paneer Rice Bowl (19)",
    "category": "diet-meals",
    "image": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
    "description": "Premium quality spinach paneer rice bowl (19) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Spinach Paneer Rice Bowl (19)"
    ],
    "rating": 4.6,
    "reviewCount": 794,
    "tags": [],
    "variants": [
      {
        "id": "di-gen-308-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 170,
        "mrp": 190,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "di-gen-309",
    "name": "Low Cal Chickpea Stew (20)",
    "category": "diet-meals",
    "image": "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=520&q=80",
    "description": "Premium quality low cal chickpea stew (20) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Low Cal Chickpea Stew (20)"
    ],
    "rating": 4.6,
    "reviewCount": 157,
    "tags": [],
    "variants": [
      {
        "id": "di-gen-309-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 175,
        "mrp": 195,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "di-gen-310",
    "name": "Baked Salmon Brocolli Meal (21)",
    "category": "diet-meals",
    "image": "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80",
    "description": "Premium quality baked salmon brocolli meal (21) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Baked Salmon Brocolli Meal (21)"
    ],
    "rating": 4.2,
    "reviewCount": 675,
    "tags": [
      "trending"
    ],
    "variants": [
      {
        "id": "di-gen-310-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 180,
        "mrp": 200,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "di-gen-311",
    "name": "Steamed Chicken Breast Veg (22)",
    "category": "diet-meals",
    "image": "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=520&q=80",
    "description": "Premium quality steamed chicken breast veg (22) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Steamed Chicken Breast Veg (22)"
    ],
    "rating": 4.3,
    "reviewCount": 816,
    "tags": [],
    "variants": [
      {
        "id": "di-gen-311-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 185,
        "mrp": 205,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "di-gen-312",
    "name": "Tofu Veg Stir Fry Low Fat (23)",
    "category": "diet-meals",
    "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=520&q=80",
    "description": "Premium quality tofu veg stir fry low fat (23) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Tofu Veg Stir Fry Low Fat (23)"
    ],
    "rating": 4.2,
    "reviewCount": 115,
    "tags": [],
    "variants": [
      {
        "id": "di-gen-312-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 190,
        "mrp": 210,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "di-gen-313",
    "name": "Brown Rice Chicken Pulao (24)",
    "category": "diet-meals",
    "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80",
    "description": "Premium quality brown rice chicken pulao (24) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Brown Rice Chicken Pulao (24)"
    ],
    "rating": 4.1,
    "reviewCount": 711,
    "tags": [],
    "variants": [
      {
        "id": "di-gen-313-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 195,
        "mrp": 215,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "di-gen-314",
    "name": "Low Cal Lentil Soup Diet (25)",
    "category": "diet-meals",
    "image": "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=520&q=80",
    "description": "Premium quality low cal lentil soup diet (25) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Low Cal Lentil Soup Diet (25)"
    ],
    "rating": 4.5,
    "reviewCount": 771,
    "tags": [
      "bestseller"
    ],
    "variants": [
      {
        "id": "di-gen-314-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 200,
        "mrp": 220,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "di-gen-315",
    "name": "High Protein Paneer Salad Bowl (26)",
    "category": "diet-meals",
    "image": "https://images.unsplash.com/photo-1534787238916-9ba6764efd4f?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality high protein paneer salad bowl (26) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "High Protein Paneer Salad Bowl (26)"
    ],
    "rating": 4.3,
    "reviewCount": 334,
    "tags": [],
    "variants": [
      {
        "id": "di-gen-315-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 205,
        "mrp": 225,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "di-gen-316",
    "name": "High Protein Egg Curry Bowl (27)",
    "category": "diet-meals",
    "image": "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&w=480&q=80",
    "description": "Premium quality high protein egg curry bowl (27) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "High Protein Egg Curry Bowl (27)"
    ],
    "rating": 4.7,
    "reviewCount": 284,
    "tags": [],
    "variants": [
      {
        "id": "di-gen-316-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 210,
        "mrp": 230,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "di-gen-317",
    "name": "Boiled Egg Salad Low Fat (28)",
    "category": "diet-meals",
    "image": "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=520&q=80",
    "description": "Premium quality boiled egg salad low fat (28) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Boiled Egg Salad Low Fat (28)"
    ],
    "rating": 4.5,
    "reviewCount": 305,
    "tags": [],
    "variants": [
      {
        "id": "di-gen-317-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 215,
        "mrp": 235,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "di-gen-318",
    "name": "Vegetable Diet Salad Dressing (29)",
    "category": "diet-meals",
    "image": "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=400&q=80",
    "description": "Premium quality vegetable diet salad dressing (29) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Vegetable Diet Salad Dressing (29)"
    ],
    "rating": 4.8,
    "reviewCount": 190,
    "tags": [],
    "variants": [
      {
        "id": "di-gen-318-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 220,
        "mrp": 240,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "di-gen-319",
    "name": "Organic Veg Soup Pack (30)",
    "category": "diet-meals",
    "image": "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?auto=format&fit=crop&w=400&q=80",
    "description": "Premium quality organic veg soup pack (30) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Organic Veg Soup Pack (30)"
    ],
    "rating": 4.4,
    "reviewCount": 470,
    "tags": [],
    "variants": [
      {
        "id": "di-gen-319-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 225,
        "mrp": 245,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "di-gen-320",
    "name": "Keto Mushroom Stir Fry (31)",
    "category": "diet-meals",
    "image": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    "description": "Premium quality keto mushroom stir fry (31) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Keto Mushroom Stir Fry (31)"
    ],
    "rating": 4.2,
    "reviewCount": 278,
    "tags": [
      "trending"
    ],
    "variants": [
      {
        "id": "di-gen-320-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 230,
        "mrp": 250,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "di-gen-321",
    "name": "Cauliflower Mash Meal Bowl (32)",
    "category": "diet-meals",
    "image": "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?auto=format&fit=crop&w=400&q=80",
    "description": "Premium quality cauliflower mash meal bowl (32) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Cauliflower Mash Meal Bowl (32)"
    ],
    "rating": 4.3,
    "reviewCount": 828,
    "tags": [],
    "variants": [
      {
        "id": "di-gen-321-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 235,
        "mrp": 255,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "di-gen-322",
    "name": "High Protein Soya Pulao (33)",
    "category": "diet-meals",
    "image": "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality high protein soya pulao (33) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "High Protein Soya Pulao (33)"
    ],
    "rating": 4.6,
    "reviewCount": 185,
    "tags": [],
    "variants": [
      {
        "id": "di-gen-322-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 240,
        "mrp": 260,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "di-gen-323",
    "name": "Vegan Dal Khichdi Diet (34)",
    "category": "diet-meals",
    "image": "https://images.unsplash.com/photo-1625937392053-ec673d11d7e4?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality vegan dal khichdi diet (34) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Vegan Dal Khichdi Diet (34)"
    ],
    "rating": 4.8,
    "reviewCount": 227,
    "tags": [],
    "variants": [
      {
        "id": "di-gen-323-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 245,
        "mrp": 265,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "di-gen-324",
    "name": "Low Cal Beans Stew (35)",
    "category": "diet-meals",
    "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80",
    "description": "Premium quality low cal beans stew (35) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Low Cal Beans Stew (35)"
    ],
    "rating": 4.5,
    "reviewCount": 816,
    "tags": [],
    "variants": [
      {
        "id": "di-gen-324-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 250,
        "mrp": 270,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "di-gen-325",
    "name": "Baked Vegetable Meal Bowl (36)",
    "category": "diet-meals",
    "image": "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80",
    "description": "Premium quality baked vegetable meal bowl (36) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Baked Vegetable Meal Bowl (36)"
    ],
    "rating": 4.6,
    "reviewCount": 486,
    "tags": [],
    "variants": [
      {
        "id": "di-gen-325-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 255,
        "mrp": 275,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "di-gen-326",
    "name": "High Protein Mixed Lentil Bowl (37)",
    "category": "diet-meals",
    "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
    "description": "Premium quality high protein mixed lentil bowl (37) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "High Protein Mixed Lentil Bowl (37)"
    ],
    "rating": 4.4,
    "reviewCount": 51,
    "tags": [
      "bestseller"
    ],
    "variants": [
      {
        "id": "di-gen-326-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 260,
        "mrp": 280,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "di-gen-327",
    "name": "Diet Oats Khichdi Bowl (38)",
    "category": "diet-meals",
    "image": "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality diet oats khichdi bowl (38) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Diet Oats Khichdi Bowl (38)"
    ],
    "rating": 4,
    "reviewCount": 931,
    "tags": [],
    "variants": [
      {
        "id": "di-gen-327-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 265,
        "mrp": 285,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "fr-gen-328",
    "name": "Fresh Apple Red (1)",
    "category": "fruits",
    "image": "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=480&q=80",
    "description": "Premium quality fresh apple red (1) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Fresh Apple Red (1)"
    ],
    "rating": 4.5,
    "reviewCount": 949,
    "tags": [
      "trending"
    ],
    "variants": [
      {
        "id": "fr-gen-328-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 80,
        "mrp": 100,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "fr-gen-329",
    "name": "Fresh Apple Green (2)",
    "category": "fruits",
    "image": "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?auto=format&fit=crop&w=480&q=80",
    "description": "Premium quality fresh apple green (2) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Fresh Apple Green (2)"
    ],
    "rating": 4.1,
    "reviewCount": 158,
    "tags": [],
    "variants": [
      {
        "id": "fr-gen-329-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 85,
        "mrp": 105,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "fr-gen-330",
    "name": "Fresh Banana Robusta (3)",
    "category": "fruits",
    "image": "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=480&q=80",
    "description": "Premium quality fresh banana robusta (3) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Fresh Banana Robusta (3)"
    ],
    "rating": 4.5,
    "reviewCount": 910,
    "tags": [],
    "variants": [
      {
        "id": "fr-gen-330-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 90,
        "mrp": 110,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "fr-gen-331",
    "name": "Fresh Banana Elaichi (4)",
    "category": "fruits",
    "image": "https://images.unsplash.com/photo-1587488173487-c45c26b1111c?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality fresh banana elaichi (4) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Fresh Banana Elaichi (4)"
    ],
    "rating": 4.3,
    "reviewCount": 679,
    "tags": [],
    "variants": [
      {
        "id": "fr-gen-331-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 95,
        "mrp": 115,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "fr-gen-332",
    "name": "Fresh Orange Import (5)",
    "category": "fruits",
    "image": "https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality fresh orange import (5) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Fresh Orange Import (5)"
    ],
    "rating": 4.8,
    "reviewCount": 554,
    "tags": [],
    "variants": [
      {
        "id": "fr-gen-332-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 100,
        "mrp": 120,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "fr-gen-333",
    "name": "Fresh Sweet Lime (6)",
    "category": "fruits",
    "image": "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality fresh sweet lime (6) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Fresh Sweet Lime (6)"
    ],
    "rating": 4.5,
    "reviewCount": 286,
    "tags": [],
    "variants": [
      {
        "id": "fr-gen-333-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 105,
        "mrp": 125,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "fr-gen-334",
    "name": "Fresh Kiwi Fruit Pack (7)",
    "category": "fruits",
    "image": "https://images.unsplash.com/photo-1585059895524-72359e06133a?auto=format&fit=crop&w=520&q=80",
    "description": "Premium quality fresh kiwi fruit pack (7) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Fresh Kiwi Fruit Pack (7)"
    ],
    "rating": 4.7,
    "reviewCount": 856,
    "tags": [],
    "variants": [
      {
        "id": "fr-gen-334-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 110,
        "mrp": 130,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "fr-gen-335",
    "name": "Fresh Pomegranate Premium (8)",
    "category": "fruits",
    "image": "https://images.unsplash.com/photo-1541344999736-83eca272f6fc?auto=format&fit=crop&w=520&q=80",
    "description": "Premium quality fresh pomegranate premium (8) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Fresh Pomegranate Premium (8)"
    ],
    "rating": 4.6,
    "reviewCount": 117,
    "tags": [],
    "variants": [
      {
        "id": "fr-gen-335-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 115,
        "mrp": 135,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "fr-gen-336",
    "name": "Fresh Papaya Premium (9)",
    "category": "fruits",
    "image": "https://images.unsplash.com/photo-1526318472351-c75fcf070305?auto=format&fit=crop&w=400&q=80",
    "description": "Premium quality fresh papaya premium (9) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Fresh Papaya Premium (9)"
    ],
    "rating": 4.6,
    "reviewCount": 646,
    "tags": [],
    "variants": [
      {
        "id": "fr-gen-336-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 120,
        "mrp": 140,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "fr-gen-337",
    "name": "Fresh Pineapple Slice (10)",
    "category": "fruits",
    "image": "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=600&q=80",
    "description": "Premium quality fresh pineapple slice (10) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Fresh Pineapple Slice (10)"
    ],
    "rating": 4.2,
    "reviewCount": 271,
    "tags": [],
    "variants": [
      {
        "id": "fr-gen-337-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 125,
        "mrp": 145,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "fr-gen-338",
    "name": "Fresh Watermelon Slice (11)",
    "category": "fruits",
    "image": "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=520&q=80",
    "description": "Premium quality fresh watermelon slice (11) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Fresh Watermelon Slice (11)"
    ],
    "rating": 4.1,
    "reviewCount": 239,
    "tags": [
      "trending"
    ],
    "variants": [
      {
        "id": "fr-gen-338-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 130,
        "mrp": 150,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "fr-gen-339",
    "name": "Fresh Muskmelon Premium (12)",
    "category": "fruits",
    "image": "https://images.unsplash.com/photo-1559561853-08451507cbe7?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality fresh muskmelon premium (12) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Fresh Muskmelon Premium (12)"
    ],
    "rating": 4.6,
    "reviewCount": 301,
    "tags": [],
    "variants": [
      {
        "id": "fr-gen-339-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 135,
        "mrp": 155,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "fr-gen-340",
    "name": "Fresh Guava Premium (13)",
    "category": "fruits",
    "image": "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=480&q=80",
    "description": "Premium quality fresh guava premium (13) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Fresh Guava Premium (13)"
    ],
    "rating": 4.2,
    "reviewCount": 212,
    "tags": [
      "bestseller"
    ],
    "variants": [
      {
        "id": "fr-gen-340-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 140,
        "mrp": 160,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "fr-gen-341",
    "name": "Fresh Pear Fruit Import (14)",
    "category": "fruits",
    "image": "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality fresh pear fruit import (14) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Fresh Pear Fruit Import (14)"
    ],
    "rating": 4.1,
    "reviewCount": 641,
    "tags": [],
    "variants": [
      {
        "id": "fr-gen-341-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 145,
        "mrp": 165,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "fr-gen-342",
    "name": "Fresh Dragon Fruit Red (15)",
    "category": "fruits",
    "image": "https://images.unsplash.com/photo-1609590981063-d495a2bcc47d?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality fresh dragon fruit red (15) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Fresh Dragon Fruit Red (15)"
    ],
    "rating": 4.2,
    "reviewCount": 718,
    "tags": [],
    "variants": [
      {
        "id": "fr-gen-342-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 150,
        "mrp": 170,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "fr-gen-343",
    "name": "Fresh Dragon Fruit White (16)",
    "category": "fruits",
    "image": "https://images.unsplash.com/photo-1615485290582-1d82b2f0e3a1?auto=format&fit=crop&w=400&q=80",
    "description": "Premium quality fresh dragon fruit white (16) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Fresh Dragon Fruit White (16)"
    ],
    "rating": 4.2,
    "reviewCount": 646,
    "tags": [],
    "variants": [
      {
        "id": "fr-gen-343-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 155,
        "mrp": 175,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "fr-gen-344",
    "name": "Fresh Blueberry Pack Premium (17)",
    "category": "fruits",
    "image": "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=480&q=80",
    "description": "Premium quality fresh blueberry pack premium (17) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Fresh Blueberry Pack Premium (17)"
    ],
    "rating": 4.5,
    "reviewCount": 902,
    "tags": [],
    "variants": [
      {
        "id": "fr-gen-344-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 160,
        "mrp": 180,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "fr-gen-345",
    "name": "Fresh Strawberry Pack Premium (18)",
    "category": "fruits",
    "image": "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality fresh strawberry pack premium (18) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Fresh Strawberry Pack Premium (18)"
    ],
    "rating": 4.8,
    "reviewCount": 290,
    "tags": [],
    "variants": [
      {
        "id": "fr-gen-345-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 165,
        "mrp": 185,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "fr-gen-346",
    "name": "Fresh Blackberry Pack Premium (19)",
    "category": "fruits",
    "image": "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=520&q=80",
    "description": "Premium quality fresh blackberry pack premium (19) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Fresh Blackberry Pack Premium (19)"
    ],
    "rating": 4.3,
    "reviewCount": 151,
    "tags": [],
    "variants": [
      {
        "id": "fr-gen-346-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 170,
        "mrp": 190,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "fr-gen-347",
    "name": "Fresh Cranberry Pack Import (20)",
    "category": "fruits",
    "image": "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality fresh cranberry pack import (20) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Fresh Cranberry Pack Import (20)"
    ],
    "rating": 4.1,
    "reviewCount": 766,
    "tags": [],
    "variants": [
      {
        "id": "fr-gen-347-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 175,
        "mrp": 195,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "fr-gen-348",
    "name": "Fresh Avocados Premium Pack (21)",
    "category": "fruits",
    "image": "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=480&q=80",
    "description": "Premium quality fresh avocados premium pack (21) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Fresh Avocados Premium Pack (21)"
    ],
    "rating": 4.7,
    "reviewCount": 312,
    "tags": [
      "trending"
    ],
    "variants": [
      {
        "id": "fr-gen-348-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 180,
        "mrp": 200,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "fr-gen-349",
    "name": "Fresh Grapes Green Seedless (22)",
    "category": "fruits",
    "image": "https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&w=600&q=80",
    "description": "Premium quality fresh grapes green seedless (22) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Fresh Grapes Green Seedless (22)"
    ],
    "rating": 4,
    "reviewCount": 931,
    "tags": [],
    "variants": [
      {
        "id": "fr-gen-349-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 185,
        "mrp": 205,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "fr-gen-350",
    "name": "Fresh Grapes Black Seedless (23)",
    "category": "fruits",
    "image": "https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality fresh grapes black seedless (23) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Fresh Grapes Black Seedless (23)"
    ],
    "rating": 4.7,
    "reviewCount": 418,
    "tags": [],
    "variants": [
      {
        "id": "fr-gen-350-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 190,
        "mrp": 210,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "fr-gen-351",
    "name": "Fresh Mango Alphonso Premium (24)",
    "category": "fruits",
    "image": "https://images.unsplash.com/photo-1591073113125-e46713c829ed?auto=format&fit=crop&w=600&q=80",
    "description": "Premium quality fresh mango alphonso premium (24) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Fresh Mango Alphonso Premium (24)"
    ],
    "rating": 4.9,
    "reviewCount": 753,
    "tags": [],
    "variants": [
      {
        "id": "fr-gen-351-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 195,
        "mrp": 215,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "fr-gen-352",
    "name": "Fresh Mango Kesar Premium (25)",
    "category": "fruits",
    "image": "https://images.unsplash.com/photo-1602345454868-9e085e8e7408?auto=format&fit=crop&w=480&q=80",
    "description": "Premium quality fresh mango kesar premium (25) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Fresh Mango Kesar Premium (25)"
    ],
    "rating": 4.5,
    "reviewCount": 224,
    "tags": [
      "bestseller"
    ],
    "variants": [
      {
        "id": "fr-gen-352-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 200,
        "mrp": 220,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "fr-gen-353",
    "name": "Fresh Peach Fruit Import (26)",
    "category": "fruits",
    "image": "https://images.unsplash.com/photo-1595475038784-bbe439ff41e6?auto=format&fit=crop&w=600&q=80",
    "description": "Premium quality fresh peach fruit import (26) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Fresh Peach Fruit Import (26)"
    ],
    "rating": 4.6,
    "reviewCount": 576,
    "tags": [],
    "variants": [
      {
        "id": "fr-gen-353-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 205,
        "mrp": 225,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "fr-gen-354",
    "name": "Fresh Plum Fruit Import (27)",
    "category": "fruits",
    "image": "https://images.unsplash.com/photo-1524594081293-190a2523a971?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality fresh plum fruit import (27) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Fresh Plum Fruit Import (27)"
    ],
    "rating": 4.4,
    "reviewCount": 668,
    "tags": [],
    "variants": [
      {
        "id": "fr-gen-354-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 210,
        "mrp": 230,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "fr-gen-355",
    "name": "Fresh Cherry Fruit Pack (28)",
    "category": "fruits",
    "image": "https://images.unsplash.com/photo-1528821128474-27f963b062bf?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality fresh cherry fruit pack (28) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Fresh Cherry Fruit Pack (28)"
    ],
    "rating": 4.5,
    "reviewCount": 75,
    "tags": [],
    "variants": [
      {
        "id": "fr-gen-355-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 215,
        "mrp": 235,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "fr-gen-356",
    "name": "Fresh Apricot Fruit Pack (29)",
    "category": "fruits",
    "image": "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality fresh apricot fruit pack (29) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Fresh Apricot Fruit Pack (29)"
    ],
    "rating": 4.4,
    "reviewCount": 321,
    "tags": [],
    "variants": [
      {
        "id": "fr-gen-356-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 220,
        "mrp": 240,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "fr-gen-357",
    "name": "Fresh Fig Fruit Pack (30)",
    "category": "fruits",
    "image": "https://images.unsplash.com/photo-1548197938-aa648720960f?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality fresh fig fruit pack (30) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Fresh Fig Fruit Pack (30)"
    ],
    "rating": 4.4,
    "reviewCount": 772,
    "tags": [],
    "variants": [
      {
        "id": "fr-gen-357-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 225,
        "mrp": 245,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "fr-gen-358",
    "name": "Fresh Custard Apple Premium (31)",
    "category": "fruits",
    "image": "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?auto=format&fit=crop&w=600&q=80",
    "description": "Premium quality fresh custard apple premium (31) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Fresh Custard Apple Premium (31)"
    ],
    "rating": 4.6,
    "reviewCount": 468,
    "tags": [
      "trending"
    ],
    "variants": [
      {
        "id": "fr-gen-358-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 230,
        "mrp": 250,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "fr-gen-359",
    "name": "Fresh Wood Apple Diet (32)",
    "category": "fruits",
    "image": "https://images.unsplash.com/photo-1543158181-e6f9f6712055?auto=format&fit=crop&w=600&q=80",
    "description": "Premium quality fresh wood apple diet (32) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Fresh Wood Apple Diet (32)"
    ],
    "rating": 4,
    "reviewCount": 472,
    "tags": [],
    "variants": [
      {
        "id": "fr-gen-359-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 235,
        "mrp": 255,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "fr-gen-360",
    "name": "Fresh Star Fruit Premium (33)",
    "category": "fruits",
    "image": "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality fresh star fruit premium (33) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Fresh Star Fruit Premium (33)"
    ],
    "rating": 4.6,
    "reviewCount": 758,
    "tags": [],
    "variants": [
      {
        "id": "fr-gen-360-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 240,
        "mrp": 260,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "fr-gen-361",
    "name": "Fresh Passion Fruit Pack (34)",
    "category": "fruits",
    "image": "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality fresh passion fruit pack (34) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Fresh Passion Fruit Pack (34)"
    ],
    "rating": 4.2,
    "reviewCount": 352,
    "tags": [],
    "variants": [
      {
        "id": "fr-gen-361-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 245,
        "mrp": 265,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "fr-gen-362",
    "name": "Fresh Rambutan Fruit Pack (35)",
    "category": "fruits",
    "image": "https://images.unsplash.com/photo-1607197109166-e6c0e4408bbd?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality fresh rambutan fruit pack (35) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Fresh Rambutan Fruit Pack (35)"
    ],
    "rating": 4.8,
    "reviewCount": 225,
    "tags": [],
    "variants": [
      {
        "id": "fr-gen-362-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 250,
        "mrp": 270,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "fr-gen-363",
    "name": "Fresh Mangosteen Fruit Pack (36)",
    "category": "fruits",
    "image": "https://images.unsplash.com/photo-1589927986089-35812388d1f4?auto=format&fit=crop&w=520&q=80",
    "description": "Premium quality fresh mangosteen fruit pack (36) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Fresh Mangosteen Fruit Pack (36)"
    ],
    "rating": 4.5,
    "reviewCount": 131,
    "tags": [],
    "variants": [
      {
        "id": "fr-gen-363-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 255,
        "mrp": 275,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "fr-gen-364",
    "name": "Fresh Lychee Fruit Pack Premium (37)",
    "category": "fruits",
    "image": "https://images.unsplash.com/photo-1548094878-84ced0f6896d?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality fresh lychee fruit pack premium (37) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Fresh Lychee Fruit Pack Premium (37)"
    ],
    "rating": 4.6,
    "reviewCount": 111,
    "tags": [
      "bestseller"
    ],
    "variants": [
      {
        "id": "fr-gen-364-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 260,
        "mrp": 280,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "fr-gen-365",
    "name": "Fresh Jackfruit Slice Diet (38)",
    "category": "fruits",
    "image": "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=400&q=80",
    "description": "Premium quality fresh jackfruit slice diet (38) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Fresh Jackfruit Slice Diet (38)"
    ],
    "rating": 4.1,
    "reviewCount": 124,
    "tags": [],
    "variants": [
      {
        "id": "fr-gen-365-1pc",
        "size": "1 serving",
        "flavor": null,
        "unit": "1 serving",
        "price": 265,
        "mrp": 285,
        "calories": 120,
        "protein": 4,
        "stock": 50
      }
    ]
  },
  {
    "id": "wo-gen-366",
    "name": "Premium Protein Shaker Bottle (1)",
    "category": "workout-products",
    "image": "https://images.unsplash.com/photo-1610973317066-c3c82b4a0cb4?auto=format&fit=crop&w=480&q=80",
    "description": "Premium quality premium protein shaker bottle (1) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Premium Protein Shaker Bottle (1)"
    ],
    "rating": 4.1,
    "reviewCount": 265,
    "tags": [
      "trending"
    ],
    "variants": [
      {
        "id": "wo-gen-366-std",
        "size": "Standard size",
        "flavor": null,
        "unit": "1 unit",
        "price": 300,
        "mrp": 450,
        "calories": 0,
        "protein": 0,
        "stock": 40
      }
    ]
  },
  {
    "id": "wo-gen-367",
    "name": "Steel Leakproof Gym Shaker (2)",
    "category": "workout-products",
    "image": "https://images.unsplash.com/photo-1540914124281-342587941389?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality steel leakproof gym shaker (2) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Steel Leakproof Gym Shaker (2)"
    ],
    "rating": 4.6,
    "reviewCount": 681,
    "tags": [],
    "variants": [
      {
        "id": "wo-gen-367-std",
        "size": "Standard size",
        "flavor": null,
        "unit": "1 unit",
        "price": 320,
        "mrp": 470,
        "calories": 0,
        "protein": 0,
        "stock": 40
      }
    ]
  },
  {
    "id": "wo-gen-368",
    "name": "Gym Workout Leather Belt (3)",
    "category": "workout-products",
    "image": "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=480&q=80",
    "description": "Premium quality gym workout leather belt (3) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Gym Workout Leather Belt (3)"
    ],
    "rating": 4.2,
    "reviewCount": 629,
    "tags": [],
    "variants": [
      {
        "id": "wo-gen-368-std",
        "size": "Standard size",
        "flavor": null,
        "unit": "1 unit",
        "price": 340,
        "mrp": 490,
        "calories": 0,
        "protein": 0,
        "stock": 40
      }
    ]
  },
  {
    "id": "wo-gen-369",
    "name": "Neoprene Gym Lifting Belt (4)",
    "category": "workout-products",
    "image": "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=400&q=80",
    "description": "Premium quality neoprene gym lifting belt (4) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Neoprene Gym Lifting Belt (4)"
    ],
    "rating": 4.8,
    "reviewCount": 352,
    "tags": [],
    "variants": [
      {
        "id": "wo-gen-369-std",
        "size": "Standard size",
        "flavor": null,
        "unit": "1 unit",
        "price": 360,
        "mrp": 510,
        "calories": 0,
        "protein": 0,
        "stock": 40
      }
    ]
  },
  {
    "id": "wo-gen-370",
    "name": "Gym Hand Wrist Straps (5)",
    "category": "workout-products",
    "image": "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=520&q=80",
    "description": "Premium quality gym hand wrist straps (5) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Gym Hand Wrist Straps (5)"
    ],
    "rating": 4.2,
    "reviewCount": 793,
    "tags": [],
    "variants": [
      {
        "id": "wo-gen-370-std",
        "size": "Standard size",
        "flavor": null,
        "unit": "1 unit",
        "price": 380,
        "mrp": 530,
        "calories": 0,
        "protein": 0,
        "stock": 40
      }
    ]
  },
  {
    "id": "wo-gen-371",
    "name": "Gym Knee Support Sleeves (6)",
    "category": "workout-products",
    "image": "https://images.unsplash.com/photo-1600965962102-9d260a71890d?auto=format&fit=crop&w=520&q=80",
    "description": "Premium quality gym knee support sleeves (6) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Gym Knee Support Sleeves (6)"
    ],
    "rating": 4.5,
    "reviewCount": 67,
    "tags": [],
    "variants": [
      {
        "id": "wo-gen-371-std",
        "size": "Standard size",
        "flavor": null,
        "unit": "1 unit",
        "price": 400,
        "mrp": 550,
        "calories": 0,
        "protein": 0,
        "stock": 40
      }
    ]
  },
  {
    "id": "wo-gen-372",
    "name": "Workout Hand Gloves Premium (7)",
    "category": "workout-products",
    "image": "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=520&q=80",
    "description": "Premium quality workout hand gloves premium (7) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Workout Hand Gloves Premium (7)"
    ],
    "rating": 4.7,
    "reviewCount": 583,
    "tags": [],
    "variants": [
      {
        "id": "wo-gen-372-std",
        "size": "Standard size",
        "flavor": null,
        "unit": "1 unit",
        "price": 420,
        "mrp": 570,
        "calories": 0,
        "protein": 0,
        "stock": 40
      }
    ]
  },
  {
    "id": "wo-gen-373",
    "name": "Resistance Bands Set of 5 (8)",
    "category": "workout-products",
    "image": "https://images.unsplash.com/photo-1620188467120-5042ed1eb5da?auto=format&fit=crop&w=480&q=80",
    "description": "Premium quality resistance bands set of 5 (8) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Resistance Bands Set of 5 (8)"
    ],
    "rating": 4,
    "reviewCount": 332,
    "tags": [],
    "variants": [
      {
        "id": "wo-gen-373-std",
        "size": "Standard size",
        "flavor": null,
        "unit": "1 unit",
        "price": 440,
        "mrp": 590,
        "calories": 0,
        "protein": 0,
        "stock": 40
      }
    ]
  },
  {
    "id": "wo-gen-374",
    "name": "Mini Loop Resistance Bands (9)",
    "category": "workout-products",
    "image": "https://images.unsplash.com/photo-1605296867424-35fc25c9212a?auto=format&fit=crop&w=520&q=80",
    "description": "Premium quality mini loop resistance bands (9) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Mini Loop Resistance Bands (9)"
    ],
    "rating": 4.5,
    "reviewCount": 595,
    "tags": [],
    "variants": [
      {
        "id": "wo-gen-374-std",
        "size": "Standard size",
        "flavor": null,
        "unit": "1 unit",
        "price": 460,
        "mrp": 610,
        "calories": 0,
        "protein": 0,
        "stock": 40
      }
    ]
  },
  {
    "id": "wo-gen-375",
    "name": "Fabric Booty Resistance Bands (10)",
    "category": "workout-products",
    "image": "https://images.unsplash.com/photo-1504387103978-e4ee71416c38?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality fabric booty resistance bands (10) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Fabric Booty Resistance Bands (10)"
    ],
    "rating": 4.4,
    "reviewCount": 432,
    "tags": [],
    "variants": [
      {
        "id": "wo-gen-375-std",
        "size": "Standard size",
        "flavor": null,
        "unit": "1 unit",
        "price": 480,
        "mrp": 630,
        "calories": 0,
        "protein": 0,
        "stock": 40
      }
    ]
  },
  {
    "id": "wo-gen-376",
    "name": "Gym PVC Yoga Mat 6mm (11)",
    "category": "workout-products",
    "image": "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=480&q=80",
    "description": "Premium quality gym pvc yoga mat 6mm (11) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Gym PVC Yoga Mat 6mm (11)"
    ],
    "rating": 4.5,
    "reviewCount": 514,
    "tags": [
      "trending"
    ],
    "variants": [
      {
        "id": "wo-gen-376-std",
        "size": "Standard size",
        "flavor": null,
        "unit": "1 unit",
        "price": 500,
        "mrp": 650,
        "calories": 0,
        "protein": 0,
        "stock": 40
      }
    ]
  },
  {
    "id": "wo-gen-377",
    "name": "Gym TPE Yoga Mat 8mm (12)",
    "category": "workout-products",
    "image": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=520&q=80",
    "description": "Premium quality gym tpe yoga mat 8mm (12) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Gym TPE Yoga Mat 8mm (12)"
    ],
    "rating": 4.4,
    "reviewCount": 254,
    "tags": [],
    "variants": [
      {
        "id": "wo-gen-377-std",
        "size": "Standard size",
        "flavor": null,
        "unit": "1 unit",
        "price": 520,
        "mrp": 670,
        "calories": 0,
        "protein": 0,
        "stock": 40
      }
    ]
  },
  {
    "id": "wo-gen-378",
    "name": "Speed Jump Rope Adjustable (13)",
    "category": "workout-products",
    "image": "https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality speed jump rope adjustable (13) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Speed Jump Rope Adjustable (13)"
    ],
    "rating": 4.9,
    "reviewCount": 277,
    "tags": [
      "bestseller"
    ],
    "variants": [
      {
        "id": "wo-gen-378-std",
        "size": "Standard size",
        "flavor": null,
        "unit": "1 unit",
        "price": 540,
        "mrp": 690,
        "calories": 0,
        "protein": 0,
        "stock": 40
      }
    ]
  },
  {
    "id": "wo-gen-379",
    "name": "Weighted Gym Jump Rope (14)",
    "category": "workout-products",
    "image": "https://images.unsplash.com/photo-1600965962102-9d260a71890d?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality weighted gym jump rope (14) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Weighted Gym Jump Rope (14)"
    ],
    "rating": 4,
    "reviewCount": 179,
    "tags": [],
    "variants": [
      {
        "id": "wo-gen-379-std",
        "size": "Standard size",
        "flavor": null,
        "unit": "1 unit",
        "price": 560,
        "mrp": 710,
        "calories": 0,
        "protein": 0,
        "stock": 40
      }
    ]
  },
  {
    "id": "wo-gen-380",
    "name": "Dumbbells Set of 2 (2.5kg) (15)",
    "category": "workout-products",
    "image": "https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?auto=format&fit=crop&w=520&q=80",
    "description": "Premium quality dumbbells set of 2 (2.5kg) (15) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Dumbbells Set of 2 (2.5kg) (15)"
    ],
    "rating": 4.5,
    "reviewCount": 904,
    "tags": [],
    "variants": [
      {
        "id": "wo-gen-380-std",
        "size": "Standard size",
        "flavor": null,
        "unit": "1 unit",
        "price": 580,
        "mrp": 730,
        "calories": 0,
        "protein": 0,
        "stock": 40
      }
    ]
  },
  {
    "id": "wo-gen-381",
    "name": "Dumbbells Set of 2 (5kg) (16)",
    "category": "workout-products",
    "image": "https://images.unsplash.com/photo-1526506118085-60122bfc18fc?auto=format&fit=crop&w=520&q=80",
    "description": "Premium quality dumbbells set of 2 (5kg) (16) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Dumbbells Set of 2 (5kg) (16)"
    ],
    "rating": 4,
    "reviewCount": 470,
    "tags": [],
    "variants": [
      {
        "id": "wo-gen-381-std",
        "size": "Standard size",
        "flavor": null,
        "unit": "1 unit",
        "price": 600,
        "mrp": 750,
        "calories": 0,
        "protein": 0,
        "stock": 40
      }
    ]
  },
  {
    "id": "wo-gen-382",
    "name": "Dumbbells Set of 2 (7.5kg) (17)",
    "category": "workout-products",
    "image": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=520&q=80",
    "description": "Premium quality dumbbells set of 2 (7.5kg) (17) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Dumbbells Set of 2 (7.5kg) (17)"
    ],
    "rating": 4.4,
    "reviewCount": 712,
    "tags": [],
    "variants": [
      {
        "id": "wo-gen-382-std",
        "size": "Standard size",
        "flavor": null,
        "unit": "1 unit",
        "price": 620,
        "mrp": 770,
        "calories": 0,
        "protein": 0,
        "stock": 40
      }
    ]
  },
  {
    "id": "wo-gen-383",
    "name": "Kettlebell Gym Strength (4kg) (18)",
    "category": "workout-products",
    "image": "https://images.unsplash.com/photo-1607532941433-304659e8198a?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality kettlebell gym strength (4kg) (18) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Kettlebell Gym Strength (4kg) (18)"
    ],
    "rating": 4.1,
    "reviewCount": 446,
    "tags": [],
    "variants": [
      {
        "id": "wo-gen-383-std",
        "size": "Standard size",
        "flavor": null,
        "unit": "1 unit",
        "price": 640,
        "mrp": 790,
        "calories": 0,
        "protein": 0,
        "stock": 40
      }
    ]
  },
  {
    "id": "wo-gen-384",
    "name": "Kettlebell Gym Strength (8kg) (19)",
    "category": "workout-products",
    "image": "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality kettlebell gym strength (8kg) (19) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Kettlebell Gym Strength (8kg) (19)"
    ],
    "rating": 4.7,
    "reviewCount": 746,
    "tags": [],
    "variants": [
      {
        "id": "wo-gen-384-std",
        "size": "Standard size",
        "flavor": null,
        "unit": "1 unit",
        "price": 660,
        "mrp": 810,
        "calories": 0,
        "protein": 0,
        "stock": 40
      }
    ]
  },
  {
    "id": "wo-gen-385",
    "name": "Workout Pushup Bar Stands (20)",
    "category": "workout-products",
    "image": "https://images.unsplash.com/photo-1534438097261-d0d668d2f68a?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality workout pushup bar stands (20) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Workout Pushup Bar Stands (20)"
    ],
    "rating": 4,
    "reviewCount": 267,
    "tags": [],
    "variants": [
      {
        "id": "wo-gen-385-std",
        "size": "Standard size",
        "flavor": null,
        "unit": "1 unit",
        "price": 680,
        "mrp": 830,
        "calories": 0,
        "protein": 0,
        "stock": 40
      }
    ]
  },
  {
    "id": "wo-gen-386",
    "name": "Gym Ab Roller Wheel Dual (21)",
    "category": "workout-products",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality gym ab roller wheel dual (21) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Gym Ab Roller Wheel Dual (21)"
    ],
    "rating": 4.3,
    "reviewCount": 391,
    "tags": [
      "trending"
    ],
    "variants": [
      {
        "id": "wo-gen-386-std",
        "size": "Standard size",
        "flavor": null,
        "unit": "1 unit",
        "price": 700,
        "mrp": 850,
        "calories": 0,
        "protein": 0,
        "stock": 40
      }
    ]
  },
  {
    "id": "wo-gen-387",
    "name": "Gym Exercise Ball 65cm (22)",
    "category": "workout-products",
    "image": "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality gym exercise ball 65cm (22) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Gym Exercise Ball 65cm (22)"
    ],
    "rating": 4.7,
    "reviewCount": 559,
    "tags": [],
    "variants": [
      {
        "id": "wo-gen-387-std",
        "size": "Standard size",
        "flavor": null,
        "unit": "1 unit",
        "price": 720,
        "mrp": 870,
        "calories": 0,
        "protein": 0,
        "stock": 40
      }
    ]
  },
  {
    "id": "wo-gen-388",
    "name": "Workout Grip Strengthener Adjust (23)",
    "category": "workout-products",
    "image": "https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality workout grip strengthener adjust (23) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Workout Grip Strengthener Adjust (23)"
    ],
    "rating": 4.2,
    "reviewCount": 909,
    "tags": [],
    "variants": [
      {
        "id": "wo-gen-388-std",
        "size": "Standard size",
        "flavor": null,
        "unit": "1 unit",
        "price": 740,
        "mrp": 890,
        "calories": 0,
        "protein": 0,
        "stock": 40
      }
    ]
  },
  {
    "id": "wo-gen-389",
    "name": "Gym Hand Chalk Powder (24)",
    "category": "workout-products",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=480&q=80",
    "description": "Premium quality gym hand chalk powder (24) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Gym Hand Chalk Powder (24)"
    ],
    "rating": 4.8,
    "reviewCount": 935,
    "tags": [],
    "variants": [
      {
        "id": "wo-gen-389-std",
        "size": "Standard size",
        "flavor": null,
        "unit": "1 unit",
        "price": 760,
        "mrp": 910,
        "calories": 0,
        "protein": 0,
        "stock": 40
      }
    ]
  },
  {
    "id": "wo-gen-390",
    "name": "Gym Liquid Grip Chalk (25)",
    "category": "workout-products",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=520&q=80",
    "description": "Premium quality gym liquid grip chalk (25) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Gym Liquid Grip Chalk (25)"
    ],
    "rating": 4.4,
    "reviewCount": 55,
    "tags": [
      "bestseller"
    ],
    "variants": [
      {
        "id": "wo-gen-390-std",
        "size": "Standard size",
        "flavor": null,
        "unit": "1 unit",
        "price": 780,
        "mrp": 930,
        "calories": 0,
        "protein": 0,
        "stock": 40
      }
    ]
  },
  {
    "id": "wo-gen-391",
    "name": "Workout Ankle Weights (1kg) (26)",
    "category": "workout-products",
    "image": "https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?auto=format&fit=crop&w=480&q=80",
    "description": "Premium quality workout ankle weights (1kg) (26) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Workout Ankle Weights (1kg) (26)"
    ],
    "rating": 4.1,
    "reviewCount": 690,
    "tags": [],
    "variants": [
      {
        "id": "wo-gen-391-std",
        "size": "Standard size",
        "flavor": null,
        "unit": "1 unit",
        "price": 800,
        "mrp": 950,
        "calories": 0,
        "protein": 0,
        "stock": 40
      }
    ]
  },
  {
    "id": "wo-gen-392",
    "name": "Workout Ankle Weights (2kg) (27)",
    "category": "workout-products",
    "image": "https://images.unsplash.com/photo-1534438097261-d0d668d2f68a?auto=format&fit=crop&w=520&q=80",
    "description": "Premium quality workout ankle weights (2kg) (27) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Workout Ankle Weights (2kg) (27)"
    ],
    "rating": 4,
    "reviewCount": 378,
    "tags": [],
    "variants": [
      {
        "id": "wo-gen-392-std",
        "size": "Standard size",
        "flavor": null,
        "unit": "1 unit",
        "price": 820,
        "mrp": 970,
        "calories": 0,
        "protein": 0,
        "stock": 40
      }
    ]
  },
  {
    "id": "wo-gen-393",
    "name": "Gym Lifting Straps Cotton (28)",
    "category": "workout-products",
    "image": "https://images.unsplash.com/photo-1569922032068-47dbadce3cf3?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality gym lifting straps cotton (28) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Gym Lifting Straps Cotton (28)"
    ],
    "rating": 4.3,
    "reviewCount": 79,
    "tags": [],
    "variants": [
      {
        "id": "wo-gen-393-std",
        "size": "Standard size",
        "flavor": null,
        "unit": "1 unit",
        "price": 840,
        "mrp": 990,
        "calories": 0,
        "protein": 0,
        "stock": 40
      }
    ]
  },
  {
    "id": "wo-gen-394",
    "name": "Workout Headbands Pack of 3 (29)",
    "category": "workout-products",
    "image": "https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality workout headbands pack of 3 (29) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Workout Headbands Pack of 3 (29)"
    ],
    "rating": 4.8,
    "reviewCount": 727,
    "tags": [],
    "variants": [
      {
        "id": "wo-gen-394-std",
        "size": "Standard size",
        "flavor": null,
        "unit": "1 unit",
        "price": 860,
        "mrp": 1010,
        "calories": 0,
        "protein": 0,
        "stock": 40
      }
    ]
  },
  {
    "id": "wo-gen-395",
    "name": "Gym Sports Towel Microfiber (30)",
    "category": "workout-products",
    "image": "https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality gym sports towel microfiber (30) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Gym Sports Towel Microfiber (30)"
    ],
    "rating": 4.6,
    "reviewCount": 264,
    "tags": [],
    "variants": [
      {
        "id": "wo-gen-395-std",
        "size": "Standard size",
        "flavor": null,
        "unit": "1 unit",
        "price": 880,
        "mrp": 1030,
        "calories": 0,
        "protein": 0,
        "stock": 40
      }
    ]
  },
  {
    "id": "wo-gen-396",
    "name": "Gym Water Bottle 1 Gallon (31)",
    "category": "workout-products",
    "image": "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality gym water bottle 1 gallon (31) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Gym Water Bottle 1 Gallon (31)"
    ],
    "rating": 4.3,
    "reviewCount": 890,
    "tags": [
      "trending"
    ],
    "variants": [
      {
        "id": "wo-gen-396-std",
        "size": "Standard size",
        "flavor": null,
        "unit": "1 unit",
        "price": 900,
        "mrp": 1050,
        "calories": 0,
        "protein": 0,
        "stock": 40
      }
    ]
  },
  {
    "id": "wo-gen-397",
    "name": "Workout Gym Duffel Bag (32)",
    "category": "workout-products",
    "image": "https://images.unsplash.com/photo-1553830591-fddf9a9e0e29?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality workout gym duffel bag (32) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Workout Gym Duffel Bag (32)"
    ],
    "rating": 4.7,
    "reviewCount": 326,
    "tags": [],
    "variants": [
      {
        "id": "wo-gen-397-std",
        "size": "Standard size",
        "flavor": null,
        "unit": "1 unit",
        "price": 920,
        "mrp": 1070,
        "calories": 0,
        "protein": 0,
        "stock": 40
      }
    ]
  },
  {
    "id": "wo-gen-398",
    "name": "Gym Wrist Wraps Support (33)",
    "category": "workout-products",
    "image": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality gym wrist wraps support (33) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Gym Wrist Wraps Support (33)"
    ],
    "rating": 4.7,
    "reviewCount": 622,
    "tags": [],
    "variants": [
      {
        "id": "wo-gen-398-std",
        "size": "Standard size",
        "flavor": null,
        "unit": "1 unit",
        "price": 940,
        "mrp": 1090,
        "calories": 0,
        "protein": 0,
        "stock": 40
      }
    ]
  },
  {
    "id": "wo-gen-399",
    "name": "Workout Foam Roller Muscle (34)",
    "category": "workout-products",
    "image": "https://images.unsplash.com/photo-1606902965551-dce093cda6e7?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality workout foam roller muscle (34) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Workout Foam Roller Muscle (34)"
    ],
    "rating": 4.2,
    "reviewCount": 59,
    "tags": [],
    "variants": [
      {
        "id": "wo-gen-399-std",
        "size": "Standard size",
        "flavor": null,
        "unit": "1 unit",
        "price": 960,
        "mrp": 1110,
        "calories": 0,
        "protein": 0,
        "stock": 40
      }
    ]
  },
  {
    "id": "wo-gen-400",
    "name": "Massage Ball Muscle Lacrosse (35)",
    "category": "workout-products",
    "image": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality massage ball muscle lacrosse (35) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Massage Ball Muscle Lacrosse (35)"
    ],
    "rating": 4.7,
    "reviewCount": 497,
    "tags": [],
    "variants": [
      {
        "id": "wo-gen-400-std",
        "size": "Standard size",
        "flavor": null,
        "unit": "1 unit",
        "price": 980,
        "mrp": 1130,
        "calories": 0,
        "protein": 0,
        "stock": 40
      }
    ]
  },
  {
    "id": "wo-gen-401",
    "name": "Gym Resistance Tube Handles (36)",
    "category": "workout-products",
    "image": "https://images.unsplash.com/photo-1607532941440-faed20c4cde1?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality gym resistance tube handles (36) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Gym Resistance Tube Handles (36)"
    ],
    "rating": 4.6,
    "reviewCount": 747,
    "tags": [],
    "variants": [
      {
        "id": "wo-gen-401-std",
        "size": "Standard size",
        "flavor": null,
        "unit": "1 unit",
        "price": 1000,
        "mrp": 1150,
        "calories": 0,
        "protein": 0,
        "stock": 40
      }
    ]
  },
  {
    "id": "wo-gen-402",
    "name": "Gym Pull Up Bar Doorway (37)",
    "category": "workout-products",
    "image": "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality gym pull up bar doorway (37) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Gym Pull Up Bar Doorway (37)"
    ],
    "rating": 4.6,
    "reviewCount": 485,
    "tags": [
      "bestseller"
    ],
    "variants": [
      {
        "id": "wo-gen-402-std",
        "size": "Standard size",
        "flavor": null,
        "unit": "1 unit",
        "price": 1020,
        "mrp": 1170,
        "calories": 0,
        "protein": 0,
        "stock": 40
      }
    ]
  },
  {
    "id": "wo-gen-403",
    "name": "Gym Parallel Dip Bars (38)",
    "category": "workout-products",
    "image": "https://images.unsplash.com/photo-1526506118085-60122bfc18fc?auto=format&fit=crop&w=500&q=80",
    "description": "Premium quality gym parallel dip bars (38) specially crafted and packed to support your daily wellness and fitness goals.",
    "ingredients": [
      "Gym Parallel Dip Bars (38)"
    ],
    "rating": 4.7,
    "reviewCount": 340,
    "tags": [],
    "variants": [
      {
        "id": "wo-gen-403-std",
        "size": "Standard size",
        "flavor": null,
        "unit": "1 unit",
        "price": 1040,
        "mrp": 1190,
        "calories": 0,
        "protein": 0,
        "stock": 40
      }
    ]
  }
];
