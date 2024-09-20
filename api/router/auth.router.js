import express from 'express';
import { signup , signin, signout, upload, getStudents } from '../controller/auth.controller.js';

const router = express.Router();

// Wrap your controller with multer middleware
router.post('/signup', upload.single("profileImage"), signup);
router.post('/signin',signin);
router.post('/signout',signout)
router.get('/getusers',getStudents)

export default router;