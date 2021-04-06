import express from 'express';
//import { createMentor} from '../controller/mentor.js';
import {viewListQuestionForMentor} from '../controller/question.js'
import {selectQuestion} from '../controller/mentor.js'
import request from '../models/request.js';
import { protect, restrictTo} from '../controller/auth.js';
import {getAllNotification} from '../controller/noti.js'
const router = express.Router();

//router.post('/admin/mentor-request', createMentor);
// router.get('/mentors', getMentors);
//router.get('/mentors/:id', getMentor);
router.get('/notify',protect, restrictTo('mentor'),getAllNotification);
router.get('/listQuestionForMentor',protect, restrictTo('mentor'),viewListQuestionForMentor)
router.post('/selectQuestion/:id',protect, restrictTo('mentor'), selectQuestion)
export default router;