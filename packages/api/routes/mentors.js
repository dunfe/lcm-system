import express from 'express';
//import { createMentor} from '../controller/mentor.js';
import {viewListQuestionForMentor} from '../controller/question.js'
import {selectQuestion} from '../controller/mentor.js'
import request from '../models/request.js';
import { protect, restrictTo} from '../controller/auth.js';
const router = express.Router();

router.get('/listQuestionForMentor',protect, restrictTo('mentor'),viewListQuestionForMentor);
router.post('/selectQuestion/:id',protect, restrictTo('mentor'), selectQuestion);
export default router;