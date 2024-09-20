import bcrypt from "bcrypt";
import Student from "../model/student.model.js";

// Signup
export const signup = async (req, res) => {
  const { name, email, password, phone, skills, workingAt, yearOfPassing, course, batch } = req.body;

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
