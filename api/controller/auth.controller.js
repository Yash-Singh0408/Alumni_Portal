import bcrypt from "bcrypt";
import Student from "../model/student.model.js";
import jwt from "jsonwebtoken";

// Signup
export const signup = async (req, res) => {
  const {
    name,
    email,
    password,
    phone,
    skills,
    workingAt,
    yearOfPassing,
    course,
    batch,
  } = req.body;

  try {
    // Check if the email is already in use
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res
        .status(400)
        .json({ success: false, message: "Email already in use" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new student with required fields
    const newStudent = new Student({
      name,
      email,
      password: hashedPassword,
      phone,
      skills, // Ensure skills are passed correctly here
      workingAt,
      yearOfPassing,
      course,
      batch,
    });

    // Save the student to the database
    await newStudent.save();
    
    res
      .status(201)
      .json({ success: true, message: "Student registered successfully" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Signin
export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const validStudent = await Student.findOne({ email });
    if (!validStudent) {
      return res
        .status(400)
        .json({ success: false, message: "Student dont exist" });
    }
    // hasedd password matching
    const isMatch = await bcrypt.compare(password, validStudent.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
    //    Create a Jwt token
    const token = jwt.sign({ _id:validStudent._id},process.env.JWT_SECRET)
    const { password: pass , ...rest} = validStudent._doc;
    res.cookie("access_token",token,{
        httpOnly:true,
        expires: new Date(Date.now()+ 24 * 60 * 60 * 1000)
    })
    .status(200)
    .json(rest);
  } catch (error) {
    console.log(error);
  }
};

// Signout
export const signout = async (req, res) => {
    try {
      // Clear the access token from cookies
      res.clearCookie("access_token", {
        httpOnly: true,
      });
  
      // Send success response
      res.status(200).json({ success: true, message: "Sign out successful" });
    } catch (error) {
      console.error("Error during sign out:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
  