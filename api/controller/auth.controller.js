import bcrypt from "bcrypt";
import Student from "../model/student.model.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer"; // For handling multipart form data

// Multer setup for file upload
const storage = multer.memoryStorage(); // Store file in memory buffer
export const upload = multer({ storage });


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

  console.log("request",req.body); 
  console.log("cloud details",process.env.CLOUD_NAME)
  console.log("cloud details",process.env.CLOUDINARY_API_KEY)
  console.log("cloud details",process.env.CLOUDINARY_API_SECRET)

  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  try {
    // Check if the email is already in use
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res
        .status(400)
        .json({ success: false, message: "Email already in use" });
    }

   // Hash the password only if it's not undefined or null

  const hashedPassword = await bcrypt.hash(password, 10);



    // Handle image upload to Cloudinary
    let profileImageUrl = null;
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
          if (error) {
            return reject(error);
          }
          resolve(result);
        }).end(req.file.buffer);
      });

      profileImageUrl = result.secure_url;
    }

    console.log("profile image url",profileImageUrl)

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
      profile: profileImageUrl
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
    // Compare the provided password with the hashed password in the DB
    const isMatch = await bcrypt.compare(password, validStudent.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
     // Generate JWT token
      const token = jwt.sign({ _id: validStudent._id }, process.env.JWT_SECRET, {
       expiresIn: '1d' // Token expires in 1 day
      });

  // Destructure validStudent and remove the password field
  const { password: pass, ...rest } = validStudent._doc;

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
  


// Signup controller
// export const signup = async (req, res) => {
//   const { name, email, password, phone, skills, workingAt, yearOfPassing, course, batch } = req.body;

//     console.log("request",req.body); 
//     console.log("cloud details",process.env.CLOUD_NAME)
//     console.log("cloud details",process.env.CLOUDINARY_API_KEY)
//     console.log("cloud details",process.env.CLOUDINARY_API_SECRET)

//     cloudinary.config({
//       cloud_name: process.env.CLOUD_NAME,
//       api_key: process.env.CLOUDINARY_API_KEY,
//       api_secret: process.env.CLOUDINARY_API_SECRET,
//     });
  

//   try {
//     // Check if the email is already in use
//     const existingStudent = await Student.findOne({ email });
//     if (existingStudent) {
//       return res.status(400).json({ success: false, message: "Email already in use" });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Handle image upload to Cloudinary
//     let profileImageUrl = null;
//     if (req.file) {
//       const result = await new Promise((resolve, reject) => {
//         cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
//           if (error) {
//             return reject(error);
//           }
//           resolve(result);
//         }).end(req.file.buffer);
//       });

//       profileImageUrl = result.secure_url;
//     }

//     console.log("profile image url",profileImageUrl)

//     // Create new student
//     const newStudent = new Student({
//       name,
//       email,
//       password: hashedPassword,
//       phone,
//       skills,
//       workingAt,
//       yearOfPassing,
//       course,
//       batch,
//       profileImage: profileImageUrl, // store image URL
//     });

//     // Save the student to the database
//     await newStudent.save();

//     res.status(201).json({ success: true, message: "Student registered successfully" });
//   } catch (error) {
//     console.error("Error during signup:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

