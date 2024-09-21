import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Hashed password
  phone: { type: String, required: true },
  profile: { type: String, default: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPMAAACUCAMAAABx2e/vAAAAaVBMVEX///8dHRsAAABqamkbGxkZGRf8/Pzo6OgXFxXg4ODz8/N5eXmYmJgUFBHt7e3Pz8/Hx8cPDw26urrZ2dlCQkJXV1cpKSg2NjaAgICJiYkFBQBJSUinp6e0tLTBwcFzc3NQUE9hYWAwMC5J9BoDAAAFBElEQVR4nO2c2bLqKhCGhRAykQEzqJn1/R/ygOusWu5Slwlkp0M234XljVb/1dB0M/ThYLFYLBaLxWKxWCwWiwlQSsMwFJ/QhqxE6OVZxyLn6kSsywJv97pp0LMSYUl9/0Ql64M9y6YpK11cu+gHwnFcsnS3qvNz8afg/2XXuDjn0Mb9FeilwPGT4C/iurjs0NV5w98pvquOm925uuX8F8USzlsxGKDtXI7kjP0PkhHy8TmBNnQ5vDMmHyWLYIYjD9rUpUiiSZIFOEr2Mbypg6cplqKdXUg+nKdLFqIv0OYuQcsnDuw7REZv00lvnyP2I/EthTZZl6SsZ0lGqC5NX7HYp1TkCcIZtNF6pM1szYg3Ro/u8DInZn+DLyG04Rqk1W91xTv8ymBHq7nZbEd7apJF4m1u3s0UNSNsbOgO0ZwM7BG3MnVwZ6puFo7OoI1XJNLQHEEbrwiZl2k/4hNo49UI1N0sHB1Am69Eq6XZzJLSmZ9q/8AdaPOVuD0fWUzHvUGbr0JSaWmuTKyiU+WMREKQiccanaulmRyhBSjQ6kgWok0M3ExLMiImlhkXLT8TYuJG91k985S4RmrWWaqE5jO0AAX0xraZfv4XY1irlZMgZOJa1WnFMOJ30AIUSLW8TJCJe9y6NYaR270nLc0naPOVuGrtGVyhzVdCeUdfYuiufq6l2cTyWTD1htQLCIY2XpGrxp6+mdP5cDhqaDZxl0RCuepq5XJTr8ZRxSN3eehuqmYRuRWjmKlRWxAqnkziyNTjZ0FGVGa0S0w9fZYkSo7GZ4PdfDj0Cpel4qqHNlsPNj+M1Wam2j8E5dzqqi7NPG5/oJ95l9mvTE3BHphZUhpaRP7JvEXa6KX5G3oIxxlvUMYdSJZ4zVTReDRy5+8VXjnxTVm5G8lC9BBPeDsYRybeIXmDmNOs+vhGtGI7kiyh3Yh/qzcIHo/G1sxvyZn/flZj92JuyfwLNBvwS18TjKNsJ2vUE2Ea4af3/VwoTveq+I7XNrJPB48lXPbraNodLVDvoCkbyrEpmrEcdtyl4wX/TuMdi8VisVg2AE2CPE2zPsvSPPBUksrQE/+Q9X2Win9INr+MJ2nHouZE7j3g+K1xLu0xDaYLD7302F6c5sa/usidxoh16ZbrapFUFrHQ6n/VjMSVlqPiGl3a7GMDPJr3LYuuheyc931YT3zxD24xsI0e2tFuKPiLrmhuXNe1cJgzsOMbj4fBkQ3OeEI1ruPnajPG9WnoNjjG+7Kq35/HCYfxGlUn4XPWZamY5xI58zvp21OFav49PF4R11W5tZO7/IpfOOjJ5a7/VT+K0UvE9/tXWVf6E37L8XVLB1lhi2efMxPJvJ9g3G5mb8HTuAg2U/V1G/sLNCvWkixEF1u41k27m8793bnwE/yW8MqShegb+Kp1VOquowP4dZMcrS1ZiIZ9JpxUczuiLQGHfKtBV1uk/gRf4aa0VmcKLdFgD84CpPcMVAMXKg0d1l2lHqkHGMm91qMxPVyYBYsCulnE7gEijB1nXvBbFv8GcF2QzmrDuzwQzxdUOncuSQzQBbSFyMAeqVdfo0PgoQ1xmz8AHtqyxe3aeUk2q6v234DwlTe9KViq/QNu143c8NN5/QmdjNBhWwTucd1zLE+r8d0yuLd1tw4Cjffci7FyP0ytd/tLsbrmr2MnSOqVX8/mowPPuMvrzxaLxWKxWCwWi8Vi2SL/AVNMTf5XWOKBAAAAAElFTkSuQmCC" },
  skills: { type: [String] },
  working: { type: Boolean, default: false },
  workingAt: { type: String }, // Company name or college name 
  experience: { type: String, default: "Fresher" }, // Years of experience 
  description: { type: String },
  yearOfPassing: { type: Number, required:true }, // Year of graduation
  course: { type: String, required:true }, // Course of study
  batch: { type: String,  }, // Batch year or name
  isEmailVerified: { type: Boolean, default: false }, // Email verification status
  isAdminVerified: { type: Boolean, default: false }, // Admin verification status
  isAlumni: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});
  
const Student = mongoose.model('Student', studentSchema);

export default Student;