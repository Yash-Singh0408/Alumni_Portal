import express from 'express'
import { createEvent, getEvents, updateEvent, deleteEvent } from '../controller/Event.Controller.js';

const router = express.Router();
router.post('/create-event',createEvent);
router.get('/events',getEvents);
router.put('/update-event/:id',updateEvent);
router.post('/update-event/:id',deleteEvent);
export default router;