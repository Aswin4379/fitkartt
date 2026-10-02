import dotenv from 'dotenv';
dotenv.config();

export const generateDietPlan = async (req, res) => {
  try {
    const { age, gender, weight, height, goal, activityLevel } = req.body;

    const GROQ_API_KEY = process.env.GROQ_API_KEY;

    if (!GROQ_API_KEY) {
      return res.status(500).json({ message: 'Groq API key not configured.' });
    }

    const prompt = `You are a clinical nutritionist and fitness expert.
Calculate BMI and provide recommendations for a ${age}-year-old ${gender} weighing ${weight}kg, height ${height}cm.
Their manually selected goal is "${goal}" and their activity level is "${activityLevel || 'moderate'}".

Based on their profile (weight and height), calculate their exact BMI.
Determine their BMI category.
Recommend whether they should focus on Weight Gain, Weight Loss, or Weight Maintenance (ignoring their selected goal if it's unhealthy, or confirming it if it's fine). Give a short reason.
Calculate their target daily calories and macros: dailyProtein, dailyCarbs, and dailyFat (in grams) for your recommended goal.
Also, provide a short daily meal plan with 1-2 sentence descriptions.

Provide the response strictly as JSON with EXACTLY these keys:
"bmi" (number), "bmiCategory" (string), "recommendedGoal" (string), "reason" (string), "dailyCalories" (number), "dailyProtein" (number), "dailyCarbs" (number), "dailyFat" (number), "Breakfast" (string), "Lunch" (string), "PrePostWorkout" (string), "Dinner" (string).

Do NOT output any markdown, only raw JSON.`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-20b',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.2,
        response_format: { type: 'json_object' }
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Groq API Error:', errorData);
      return res.status(500).json({ message: 'Failed to generate AI plan.' });
    }

    const data = await response.json();
    const aiContent = data.choices[0].message.content;
    const parsedPlan = JSON.parse(aiContent);

    res.json(parsedPlan);
  } catch (error) {
    console.error('AI Generation Error:', error);
    res.status(500).json({ message: 'Server error generating AI plan.' });
  }
};

export const quickEval = async (req, res) => {
  try {
    const { age, gender, weight, height } = req.body;
    const GROQ_API_KEY = process.env.GROQ_API_KEY;

    if (!GROQ_API_KEY) {
      return res.status(500).json({ message: 'Groq API key not configured.' });
    }

    const prompt = `You are a clinical nutritionist AI.
Based on the following profile: Age ${age}, Gender ${gender}, Weight ${weight}kg, Height ${height}cm.
Calculate exact BMI.
Determine BMI category.
Provide a goal recommendation based strictly on BMI:
- BMI < 18.5 -> "Weight Gain"
- BMI 18.5 - 24.9 -> "Fitness Maintenance"
- BMI >= 25 -> "Weight Loss"

Provide response strictly as JSON with EXACTLY these keys:
"bmi" (number), "bmiCategory" (string), "recommendedGoal" (string).

Do NOT output any markdown, only raw JSON.`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-20b',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.1,
        response_format: { type: 'json_object' }
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Groq API Error:', errorData);
      return res.status(500).json({ message: 'Failed to evaluate profile.' });
    }

    const data = await response.json();
    const aiContent = data.choices[0].message.content;
    const parsed = JSON.parse(aiContent);

    res.json(parsed);
  } catch (error) {
    console.error('AI Eval Error:', error);
    res.status(500).json({ message: 'Server error evaluating profile.' });
  }
};

export const handleChat = async (req, res) => {
  try {
    const { messages } = req.body;
    const GROQ_API_KEY = process.env.GROQ_API_KEY;

    if (!GROQ_API_KEY) {
      return res.status(500).json({ message: 'Groq API key not configured.' });
    }

    const systemPrompt = {
      role: 'system',
      content: 'You are the FitKart AI Assistant. You are a helpful, concise, and expert fitness and nutrition coach. Answer questions about fitness, nutrition, and FitKart products. CRITICAL RULES: 1. NEVER use markdown tables. Output only plain text or simple bullet points. 2. If the user speaks in Tanglish (Tamil written in English letters) or Tamil, you MUST reply in Tanglish (Tamil in English letters). NEVER reply in Malayalam, Hindi, or any other language.'
    };

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-20b',
        messages: [systemPrompt, ...messages],
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Groq API Error:', errText);
      return res.status(500).json({ message: `Groq Error: ${errText}` });
    }

    const data = await response.json();
    res.json({ reply: data.choices[0].message.content });
  } catch (error) {
    console.error('AI Chat Error:', error);
    res.status(500).json({ message: 'Server error in AI chat.' });
  }
};

export const getModels = async (req, res) => {
  try {
    const GROQ_API_KEY = process.env.GROQ_API_KEY;
    const response = await fetch('https://api.groq.com/openai/v1/models', {
      headers: { 'Authorization': `Bearer ${GROQ_API_KEY}` }
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

export const estimateMacros = async (req, res) => {
  try {
    const { foodName, quantity, unit } = req.body;
    const GROQ_API_KEY = process.env.GROQ_API_KEY;

    if (!GROQ_API_KEY) {
      return res.status(500).json({ message: 'Groq API key not configured.' });
    }

    const prompt = `You are an expert clinical nutritionist AI.
The user consumed: ${quantity} ${unit} of "${foodName}".
(Note: If they wrote "1" for quantity and "500g" for unit, treat it as 500 grams total. Parse their input logically).

TASK:
Estimate the highly accurate nutritional macros for exactly this portion size.
Use standard databases (USDA, NIN India) for accuracy. 
CRITICAL GUIDELINES FOR INDIAN FOODS (like Curd Rice, Biryani, etc.):
- 100g of Curd Rice is typically around 120-150 calories and 3-4g protein. So 500g is around 600-750 calories and 15-20g protein. It is IMPOSSIBLE for 500g of curd rice to be 2000+ calories or have 50g+ protein. Be highly realistic!
- Do not wildly hallucinate. Ensure the ratios of protein/carbs/fat make sense for the food type.

Provide response strictly as JSON with EXACTLY these keys:
"calories" (number), "protein" (number), "carbs" (number), "fat" (number).

Do NOT output any markdown, only raw JSON.`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-20b',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.0,
        response_format: { type: 'json_object' }
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Groq API Error:', errorData);
      return res.status(500).json({ message: 'Failed to estimate macros.' });
    }

    const data = await response.json();
    const aiContent = data.choices[0].message.content;
    const parsed = JSON.parse(aiContent);

    res.json(parsed);
  } catch (error) {
    console.error('AI Macro Estimator Error:', error);
    res.status(500).json({ message: 'Server error estimating macros.' });
  }
};

