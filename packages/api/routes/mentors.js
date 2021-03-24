import express from 'express';
//import { createMentor} from '../controller/mentor.js';
import {viewListQuestionForMentor} from '../controller/question.js'
const router = express.Router();

//router.post('/admin/mentor-request', createMentor);
// router.get('/mentors', getMentors);
//router.get('/mentors/:id', getMentor);
router.get('/listQuestionForMentor',viewListQuestionForMentor)

export default router;