import express from "express";
import { signin, signout, signup } from "../controller/admin.controller.js";
const router = express.Router()

router.post("/register", signup);
router.post("/login", signin);
router.post("/logout", signout);

export default router
