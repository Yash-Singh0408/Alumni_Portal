import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Hashed password
    createdAt: { type: Date, default: Date.now },
  });
  
 export const Admin = mongoose.model('Admin', adminSchema);