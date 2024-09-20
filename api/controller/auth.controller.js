import bcrypt from "bcrypt"; 
import Student from "../model/student.model.js";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer"; // For handling multipart form data
import nodemailer from "nodemailer"

// Cloudinary config

// Multer setup for file upload
const storage = multer.memoryStorage(); // Store file in memory buffer
export const upload = multer({ storage });

// Signup controller
export const signup = async (req, res) => {
  const { name, email, password, phone, skills, workingAt, yearOfPassing, course, batch } = req.body;

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

    console.log("profile image url",profileImageUrl)

    // const transporter = nodemailer.createTransport({
    //   host: "smtp.ethereal.email",
    //   port: 587,
    //   secure: false, // true for port 465, false for other ports
    //   auth: {
    //     user: "maddison53@ethereal.email",
    //     pass: "jn7jnAPss4f63QBp6D",
    //   },
    // });

    // const info = await transporter.sendMail({
    //   from: '"Alumni Associate Portal" <alumni@ethereal.email>', // sender address
    //   to: email, // list of receivers
    //   subject: 'Verify Your Email',
    //     html: \Please click the following link to verify your email: <a href="\${verificationUrl}">\${verificationUrl}</a>\

    // });
  
    // console.log("Message sent: %s", info.messageId);

    // if(!isEmailVerified){
    //   return res.status(400).json({ success: false, message: "Email not verified"})
    // }
    
    // Create new student
    const newStudent = new Student({
      name,
      email,
      password: hashedPassword,
      phone,
      skills,
      workingAt,
      yearOfPassing,
      course,
      batch,
      profileImage: profileImageUrl, // store image URL
    });

    // Save the student to the database
    await newStudent.save();

    res.status(201).json({ success: true, message: "Student registered successfully" });
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