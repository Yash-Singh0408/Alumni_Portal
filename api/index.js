import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./config/Database.js";

const app = express();

app.use(express.json());

//Initialize Port Number
const PORT = process.env.PORT || 3000;

//Connect DB
connectDB();

//Listining
app.listen(PORT, () => console.log(`Server is Started On ${PORT}`));

