import express from 'express'
const router = express.Router();
import createEvent from '../controller/Event.Controller';

router.post('/create-event',createEvent);

export default router;