import express from 'express';
import { viewPointInTransactionById, viewPointOutTransactionById } from "../controller/staff.js";
import { viewMenteeInfo, editOrUpdateUserById } from '../controller/mentee.js'
import { protect, restrictTo } from '../controller/auth.js';

const router = express.Router();

router.get('/user', viewMenteeInfo);
router.put('/editUser', editOrUpdateUserById);
router.get('/pointIn/:id', viewPointInTransactionById);
router.get('/pointOut/:id', viewPointOutTransactionById);
export default router;