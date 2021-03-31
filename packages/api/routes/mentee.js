import express from 'express';
import { viewPointInTransactionById, viewPointOutTransactionById } from "../controller/staff.js";
import { viewMenteeInfo, editProfileUserById,addFavoriteMentorById,viewListFavoriteMentor } from '../controller/mentee.js'
import {viewListQuestionMenteeId} from '../controller/question.js';
import { protect, restrictTo } from '../controller/auth.js';

const router = express.Router();

router.get('/user', viewMenteeInfo);
router.get('/viewListQuestion',viewListQuestionMenteeId);
router.put('/editUser', editProfileUserById);
router.get('/listFavorite',viewListFavoriteMentor);
router.post('/favorite',addFavoriteMentorById);
router.get('/pointIn/:id', viewPointInTransactionById);
router.get('/pointOut/:id', viewPointOutTransactionById);
export default router;