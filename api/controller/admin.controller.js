import bcrypt from "bcrypt";
import {Admin}  from "../model/Admin.Model.js";
import jwt from "jsonwebtoken";


// Signup
export const signup = async (req, res) => {
  const {
    name,
    email,
    password
  } = req.body;


  try {
    // Check if the email is already in use
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ success: false, message: "Email already in use" });
    }

   // Hash the password only if it's not undefined or null

  const hashedPassword = await bcrypt.hash(password, 10);

    
    // Create new student with required fields
    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
      });

    // Save the student to the database
    await newAdmin.save();
    
    res
      .status(201)
      .json({ success: true, message: "Admin registered successfully" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// Signin
export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const validAdmin = await Admin.findOne({ email });
    if (!validAdmin) {
      return res
        .status(400)
        .json({ success: false, message: "Admin dont exist" });
    }
    // Compare the provided password with the hashed password in the DB
    const isMatch = await bcrypt.compare(password, validAdmin.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
     // Generate JWT token
      const token = jwt.sign({ _id: validAdmin._id }, process.env.JWT_SECRET, {
       expiresIn: '1d' // Token expires in 1 day
      });

  // Destructure validAdmin and remove the password field
  const { password: pass, ...rest } = validAdmin._doc;

  // Set the cookie with the JWT token
  res.cookie("access_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Secure flag for HTTPS in production
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // Cookie expires in 1 day
  })
  .status(200)
  .json({ success: true, student: rest });

} catch (error) {
  console.error("Signin error:", error);
  res.status(500).json({ success: false, message: "Server error" });
}
}

export const signout = async (req, res) => {
    try {
      // Clear the access token from cookies
      res.clearCookie("access_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Ensure it's secure in production
      });
  
      // Send success response
      res.status(200).json({ success: true, message: "Sign out successful" });
    } catch (error) {
      console.error("Error during sign out:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
  