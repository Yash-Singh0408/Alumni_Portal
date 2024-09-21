import mongoose from "mongoose";

const otpverificationSchema = new mongoose.Schema({
    userId: String,
    otp:String,
    createdAt: { type: Date },
    expiresAt: { type: Date }
  });
  
 const otpverification = mongoose.model
 ('otpverification', otpverificationSchema);

 export default otpverification