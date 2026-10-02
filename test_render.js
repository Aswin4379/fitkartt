async function checkLiveBackend() {
  const url = 'https://fitkartt.onrender.com/api/ai/quick-eval';
  console.log(`Curling ${url}...`);
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ age: 55, weight: 90, height: 170, gender: 'male' })
    });
    const text = await res.text();
    console.log('Response Status:', res.status);
    console.log('Response Body:', text);
  } catch (err) {
    console.error(err);
  }
}

checkLiveBackend();
