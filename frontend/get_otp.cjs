const { MongoClient } = require('mongodb');

async function getOTP() {
  const uri = "mongodb+srv://aswinsp2006:sF6g6XN0FwO5K7X1@cluster0.p7xve.mongodb.net/fitkart?retryWrites=true&w=majority";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("fitkart"); // assuming db name is fitkart
    const otps = await db.collection('otps').find().sort({ createdAt: -1 }).limit(1).toArray();
    console.log("Latest OTP in DB:", otps);
  } finally {
    await client.close();
  }
}

getOTP().catch(console.error);
