import express from 'express';
//import { createMentor} from '../controller/mentor.js';
import {viewListQuestionForMentor} from '../controller/question.js'
import {selectQuestion} from '../controller/mentor.js'
import request from '../models/request.js';
import { protect} from '../controller/auth.js';
const router = express.Router();

//router.post('/admin/mentor-request', createMentor);
// router.get('/mentors', getMentors);
//router.get('/mentors/:id', getMentor);
router.get('/listQuestionForMentor/:id',viewListQuestionForMentor)
router.post('/selectQuestion/:id', protect, selectQuestion)
export default router;