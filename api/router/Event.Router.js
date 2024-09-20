import express from 'express'
import { createEvent, getEvents } from '../controller/Event.Controller.js';

const router = express.Router();
router.post('/create-event',createEvent);
router.get('/events',getEvents);
export default router;