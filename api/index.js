import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./config/Database.js";
import studentRouter from './router/student.router.js'
import authRouter from './router/auth.router.js'
// import eventRouter from './router/Event.Router.js'
import cors from 'cors'

const app = express();
app.use(cors())
app.use(express.json());

//Initialize Port Number
const PORT = process.env.PORT || 3000;

//Connect DB
connectDB();

//Routes
app.use('/api/student',studentRouter)
app.use('/api/auth',authRouter)
// app.use('/api/event',eventRouter)

//Listining
app.listen(PORT, () => console.log(`Server is Started On ${PORT}`));

