import express from 'express'
import { createEvent, getEvents, updateEvent, deleteEvent, upload } from '../controller/Event.Controller.js';

const router = express.Router();
router.post('/create-event', upload.single("eventImg"),createEvent);
router.get('/events',getEvents);
router.put('/event/:id', upload.single("eventImg"),updateEvent);
router.post('/event/:id',deleteEvent);
export default router;
