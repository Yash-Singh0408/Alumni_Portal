import bcrypt from "bcrypt"; 
import Student from "../model/student.model.js";
import otpverification from "../model/otpverification.model.js"
import { v2 as cloudinary } from "cloudinary";
import multer from "multer"; // For handling multipart form data
import nodemailer from "nodemailer"
import jwt from "jsonwebtoken"
import crypto from 'crypto';
import { Resend } from 'resend';

// Cloudinary config

// Multer setup for file upload
const storage = multer.memoryStorage(); // Store file in memory buffer
export const upload = multer({ storage });

// Signup controller
// export const signup = async (req, res) => {
//   const { name, email, password, phone, skills, workingAt, yearOfPassing, course, batch } = req.body;


//   console.log("request",req.body); 
//   console.log("cloud details",process.env.CLOUD_NAME)
//   console.log("cloud details",process.env.CLOUDINARY_API_KEY)
//   console.log("cloud details",process.env.CLOUDINARY_API_SECRET)

//   cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
//   });
  

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

// Initialize Resend with your API key
const resend = new Resend("re_iWjDbkrs_k9jVxDZXZ38fYnhb2qZqU4UE");
console.log("resend: ",resend);


// export const signup = async (req, res) => {
//   const { name, email, password, phone, skills, workingAt, yearOfPassing, course, batch } = req.body;

//   console.log("request", req.body);
//   console.log("cloud details", process.env.CLOUD_NAME);
//   console.log("cloud details", process.env.CLOUDINARY_API_KEY);
//   console.log("cloud details", process.env.CLOUDINARY_API_SECRET);

//   cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
//   });


//   console.log("request",req.body); 
//   console.log("cloud details",process.env.CLOUD_NAME)
//   console.log("cloud details",process.env.CLOUDINARY_API_KEY)
//   console.log("cloud details",process.env.CLOUDINARY_API_SECRET)

//   cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
//   });
  


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

//     // const transporter = nodemailer.createTransport({
//     //   host: "smtp.ethereal.email",
//     //   port: 587,
//     //   secure: false, // true for port 465, false for other ports
//     //   auth: {
//     //     user: "maddison53@ethereal.email",
//     //     pass: "jn7jnAPss4f63QBp6D",
//     //   },
//     // });

//     // const info = await transporter.sendMail({
//     //   from: '"Alumni Associate Portal" <alumni@ethereal.email>', // sender address
//     //   to: email, // list of receivers
//     //   subject: 'Verify Your Email',
//     //     html: \Please click the following link to verify your email: <a href="\${verificationUrl}">\${verificationUrl}</a>\

//     // });
  
//     // console.log("Message sent: %s", info.messageId);

//     // if(!isEmailVerified){
//     //   return res.status(400).json({ success: false, message: "Email not verified"})
//     // }
    
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

export const signup = async (req, res) => {
  const { name, email, password, phone, skills, isAlumni, working, workingAt, yearOfPassing, course, batch } = req.body;

  try {
    // Check if the email is already in use
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ success: false, message: "Email already in use" });
    }

    // Hash the password
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


    console.log("profile image url", profileImageUrl);

    // Generate verification token
    const verificationToken = crypto.randomBytes(20).toString('hex');

    // Verification URL (replace with your frontend URL)
    const verificationUrl = `http://localhost:3000/verify-email/${verificationToken}`;

    // Send verification email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Alumni Associate Portal <onboarding@resend.dev>',
      to: email,
      subject: 'Verify Your Email',
      html: `Please click the following link to verify your email: <a href="${verificationUrl}">${verificationUrl}</a>`
    });

    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ success: false, message: "Error sending verification email" });
    }

    console.log("Email sent successfully:", data);
 
    // Create new student
    const newStudent = new Student({
      name,
      email,
      password: hashedPassword,
      phone,
      skills,
      isAlumni,
      working: isAlumni ? working : false, // Only store working status if they are alumni
      workingAt: isAlumni && working ? workingAt : '', // Only store workingAt if they are working
      yearOfPassing,
      course,
      batch,
      profileImage: profileImageUrl,

      verificationToken,
      isEmailVerified: false,
 
    });

    // Save the student to the database
    const savedStudent = await newStudent.save();

    // Send OTP verification email
    await sendOTPVerificationEmail(savedStudent, res);

    res.status(201).json({ 
      success: true, 
      message: "Student registered successfully. Please check your email to verify your account." 
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Function to send OTP verification email
const sendOTPVerificationEmail = async (student, res) => {
  try {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

    // Send OTP email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Alumni Associate Portal <onboarding@resend.dev>',
      to: student.email,
      subject: 'OTP Verification',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>OTP Verification</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                }
                .container {
                    background-color: #f9f9f9;
                    border-radius: 5px;
                    padding: 30px;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                }
                h1 {
                    color: #2c3e50;
                    text-align: center;
                    margin-bottom: 20px;
                }
                .otp-container {
                    background-color: #3498db;
                    color: #ffffff;
                    font-size: 24px;
                    font-weight: bold;
                    text-align: center;
                    padding: 15px;
                    margin: 20px 0;
                    border-radius: 5px;
                }
                p {
                    margin-bottom: 15px;
                }
                .footer {
                    text-align: center;
                    margin-top: 20px;
                    font-size: 12px;
                    color: #7f8c8d;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>OTP Verification</h1>
                <p>Dear User,</p>
                <p>Thank you for registering with the Alumni Associate Portal. To complete your verification process, please use the following One-Time Password (OTP):</p>
                <div class="otp-container">
                    ${otp}
                </div>
                <p>This OTP is valid for 60 minutes. Please do not share this code with anyone.</p>
                <p>If you didn't request this verification, please ignore this email or contact our support team.</p>
                <p>Best regards,<br>Alumni Associate Portal Team</p>
            </div>
            <div class="footer">
                <p>This is an automated message, please do not reply to this email.</p>
            </div>
        </body>
        </html>
      `
    });

    if (error) {
      console.error("Error sending OTP email:", error);
      return res.status(500).json({ status: "FAILED", message: "Error sending OTP email" });
    }

    console.log("OTP email sent successfully:", data);

    // Hash OTP
    const hashedOTP = await bcrypt.hash(otp, 10);

    const newOtpVerification = new otpverification({
      userId: student._id,
      otp: hashedOTP,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000
    });

    await newOtpVerification.save();

    res.json({
      status: "PENDING",
      message: "OTP sent to your email",
      data: {
        userId: student._id,
        email: student.email,
      }
    });
  } catch (error) {
    console.log("Error while email verification ", error);
    res.status(500).json({
      status: "FAILED",
      message: error.message
    });
  }
};


// Add this new controller for email verification
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const student = await Student.findOne({ verificationToken: token });

    if (!student) {
      return res.status(400).json({ success: false, message: "Invalid or expired verification token" });
    }

    student.isEmailVerified = true;
    student.verificationToken = undefined;
    await student.save();

    res.status(200).json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    console.error("Error during email verification:", error);
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

//Signout
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
  
// Get all students
export const getStudents = async (req,res)=>{
    try {
        const students = await Student.find()
        res.json(students);
    } catch (error) {
        console.log( "Error while getting Students ",error);
        res.status(500).send({message:"Internal Server Error"});
    }
}

export const verifyStudent = async (req, res) => {
  try {
    const studentId = req.params.id;

    // Find the student by their ID
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Update the student to set isAdminVerified to true
    const update = { isAdminVerified: true };

    // Update the student in the database
    await Student.updateOne({ _id: studentId }, { $set: update });

    // Return success response
    res.status(200).json({ message: "Student verified successfully" });
  } catch (error) {
    console.error("Error while verifying student:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update Student
export const updateStudent = async (req, res) => {
  try {
    // Get student ID from params
    const studentId = req.params.id;
    
    // Get the update fields from the request body
    const update = req.body;

    // Find the student by ID and update it
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      { $set: update },
      { new: true } // Return the updated document
    );

    // Check if student was found and updated
    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Send a successful response with the updated student
    res.status(200).json({ message: "Student updated successfully", student: updatedStudent });
  } catch (error) {
    console.error("Error while updating Student:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

export const deleteStudent = async (req,res) =>{
  try {
      //get student id
      const studentId = req.params.id
      //check if student exist
      const student = await Student.findById(studentId);
      if (!student) {
          return res.status(404).json({ error: "Student not found" });
      }
      //delete student
      await Student.deleteOne({"_id": studentId})
      
      //notify user
      res.status(200).json({ message: "Student deleted successfully" });

  } catch (error) {
      console.log("Error while Deleteing student");
      res.status(500).send({message:"Internal Server Error"});
      
  }
}