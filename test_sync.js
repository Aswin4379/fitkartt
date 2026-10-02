const API_URL = 'http://localhost:5000/api';
const EMAIL = 'test_sync@fitkart.app';
const PASSWORD = 'password123';

async function testSync() {
  console.log('--- STARTING CROSS-DEVICE SYNC TEST ---');
  
  // 1. Register/Login
  console.log('Logging in on laptop (Client A)...');
  let resA = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Sync Test', email: EMAIL, password: PASSWORD })
  });
  if (resA.status === 400) {
    resA = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: EMAIL, password: PASSWORD })
    });
  }
  const dataA = await resA.json();
  const tokenA = dataA.token;
  const userId = dataA.user._id || dataA.user.id;
  console.log(`Laptop logged in. Token: ${tokenA.substring(0,10)}... User ID: ${userId}`);

  console.log('Logging in on mobile (Client B)...');
  const resB = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD })
  });
  const dataB = await resB.json();
  const tokenB = dataB.token;
  console.log(`Mobile logged in. Token: ${tokenB.substring(0,10)}... User ID: ${dataB.user._id || dataB.user.id}`);

  if (userId !== (dataB.user._id || dataB.user.id)) {
    console.error('ERROR: Different User IDs for same email!');
    process.exit(1);
  }

  // 2. Change weight on Laptop
  const newWeight = Math.floor(Math.random() * 40) + 50; // Random weight 50-90
  console.log(`\nLaptop changing weight to ${newWeight}kg...`);
  const updateRes = await fetch(`${API_URL}/auth/profile`, {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tokenA}`
    },
    body: JSON.stringify({ currentWeight: newWeight })
  });
  const updateData = await updateRes.json();
  console.log(`Laptop update successful. New returned weight: ${updateData.user.currentWeight}`);

  // 3. Refresh on Mobile
  console.log('\nMobile refreshing profile (simulating page reload)...');
  const refreshRes = await fetch(`${API_URL}/auth/me`, {
    headers: { 'Authorization': `Bearer ${tokenB}` }
  });
  const refreshData = await refreshRes.json();
  console.log(`Mobile fetched weight: ${refreshData.user.currentWeight}`);

  if (refreshData.user.currentWeight === newWeight) {
    console.log('\n✅ SUCCESS: Cross-device synchronization works perfectly!');
  } else {
    console.error(`\n❌ ERROR: Mobile fetched ${refreshData.user.currentWeight} instead of ${newWeight}`);
    process.exit(1);
  }
}

testSync().catch(console.error);
