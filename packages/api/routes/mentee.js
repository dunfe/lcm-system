import express from 'express';
import { viewPointInTransactionById, viewPointOutTransactionById } from "../controller/staff.js";
import { viewMenteeInfo, editOrUpdateUserById, createQuestion, getQuestionById, editQuestionById, delQuestionById } from '../controller/mentee.js'
import { protect, restrictTo } from '../controller/auth.js';

const router = express.Router();

router.get('/user/:id', viewMenteeInfo);
router.put('/editUser/:id', editOrUpdateUserById);
router.post('/question/:id', createQuestion);
router.get('/allQuestion/:id', getQuestionById);
router.put('/editQuestion/:id', editQuestionById);
router.delete('/delete/:id', delQuestionById)
router.get('/pointIn/:id', viewPointInTransactionById);
router.get('/pointOut/:id', viewPointOutTransactionById);
export default router;