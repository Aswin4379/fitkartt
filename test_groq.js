// using global fetch in node 24

async function testGroq() {
  const url = 'http://localhost:5000/api/workouts/generate-plan';
  
  const payload = {
    goal: "build_muscle",
    gender: "Male",
    weight: 70,
    height: 175,
    age: 25,
    targetAreas: ["chest"]
  };
  
  try {
    console.log("Sending request to:", url);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer test' // dummy token
      },
      body: JSON.stringify(payload)
    });
    
    console.log("Status:", response.status);
    const text = await response.text();
    console.log("Response:", text);
  } catch (err) {
    console.error("Fetch failed:", err.message);
  }
}

testGroq();
