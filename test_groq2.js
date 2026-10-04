import dotenv from 'dotenv';
dotenv.config({ path: './backend/.env' });

const GROQ_API_KEY = process.env.GROQ_API_KEY;
console.log("GROQ KEY:", GROQ_API_KEY ? "EXISTS" : "MISSING");

const prompt = `You are a world-class fitness coach AI.
Generate a structured 30-day workout plan for a 25yo Male, 70kg, 175cm.
Their main goal is "build_muscle" and they want to focus on: chest.

Create a JSON response with EXACTLY this structure:
{
  "schedule": [
    {
      "day": 1,
      "focus": "Upper Body Strength",
      "exercises": [
        { "name": "Push-ups", "sets": 3, "reps": 12 },
        { "name": "Dumbbell Rows", "sets": 3, "reps": 10 }
      ]
    }
  ]
}

Ensure there are exactly 30 days in the array. Include rest days where "exercises" array is empty and focus is "Rest and Recovery".
Do NOT output any markdown or extra text. Output ONLY valid raw JSON.`;

async function run() {
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-20b',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3,
        response_format: { type: 'json_object' }
      })
    });
    
    if (!response.ok) {
        console.error("HTTP ERROR:", response.status, await response.text());
        return;
    }
    
    const data = await response.json();
    console.log("SUCCESS!");
    console.log(data.choices[0].message.content.slice(0, 100));
  } catch (err) {
    console.error("CATCH ERROR:", err);
  }
}
run();
