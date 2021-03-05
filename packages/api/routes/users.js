import express from 'express';
import { register, login, createUser, getAllUser, getUserById } from '../controller/user.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/create', createUser);


export default router;