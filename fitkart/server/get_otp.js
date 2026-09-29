import mongoose from 'mongoose';
import dns from 'dns';

// Fix ISP DNS blocking SRV records
dns.setServers(['8.8.8.8', '8.8.4.4']);

async function getOTP() {
  const uri = "mongodb+srv://aswinsp2006:sF6g6XN0FwO5K7X1@cluster0.p7xve.mongodb.net/fitkart?retryWrites=true&w=majority";
  await mongoose.connect(uri);
  const Otp = mongoose.model('Otp', new mongoose.Schema({ email: String, otp: String, createdAt: Date }));
  
  const otps = await Otp.find().sort({ _id: -1 }).limit(1);
  console.log("Latest OTP:", otps);
  process.exit(0);
}

getOTP().catch(console.error);
