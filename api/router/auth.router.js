import express from 'express';
import { signup , signin, signout, upload, getStudents, verifyStudent, updateStudent, deleteStudent } from '../controller/auth.controller.js';

const router = express.Router();

// Wrap your controller with multer middleware
router.post("/signup", upload.single("profileImage"), signup);

router.post('/signin',signin);
router.post('/signout',signout)
router.get('/getusers',getStudents)
router.post('/verify/:id',verifyStudent)
router.put('/student/:id',updateStudent)
router.post('/student/:id',deleteStudent)


export default router;