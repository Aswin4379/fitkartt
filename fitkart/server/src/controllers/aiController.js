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
Generate a concise, personalized daily meal split for a ${age}-year-old ${gender} weighing ${weight}kg, height ${height}cm.
Their primary goal is "${goal}" and their activity level is "${activityLevel || 'moderate'}".

Provide a short meal plan formatted strictly as JSON with exactly these four keys: "Breakfast", "Lunch", "PrePostWorkout", and "Dinner".
Each key should have a concise 1-2 sentence description of the meal containing specific food items and macros in mind.
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
        temperature: 0.7,
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

export const handleChat = async (req, res) => {
  try {
    const { messages } = req.body;
    const GROQ_API_KEY = process.env.GROQ_API_KEY;

    if (!GROQ_API_KEY) {
      return res.status(500).json({ message: 'Groq API key not configured.' });
    }

    const systemPrompt = {
      role: 'system',
      content: 'You are the FitKart AI Assistant. You are a helpful, concise, and expert fitness and nutrition coach. Answer questions about fitness, nutrition, and FitKart products.'
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
