import express from 'express';
import {getAllUsers, getUserById, getUserByName} from '../controller/admin.js';

const router = express.Router();

router.get("/user/:id", getUserById);
router.get("/users", getAllUsers);

router.get('/user-name', getUserByName);

export default router;
