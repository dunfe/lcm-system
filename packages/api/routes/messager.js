import express from 'express';
import User from '../models/user.js';
import {createRoom, createMessage} from '../controller/roomchat.js' 
const router = express.Router();

router.post("/createRoom/:id",createRoom);
router.post("/send/:id",createMessage("hello mentee"));
export default router;