import express from 'express';
import Request from '../models/request.js';
import User from '../models/user.js'; 
import { getAllUser, getUserById, countAllRecord,delUserById, updateUserById } from '../controller/user.js';
import { getAllMentor, getMentorById, getMentorByName, updateMentorById, delMentorById} from '../controller/mentor.js';
import { createQuestion, getAllQuestions, getQuestionById, updateQuestionById, delQuestionById } from '../controller/question.js';
import { getAllRequest, getRequestById} from '../controller/request.js';
import { protect, restrictTo} from '../controller/auth.js';

const router = express.Router();

router.get("/dashboard", protect, restrictTo('admin'), countAllRecord);

//Mentee
router.get("/users", protect, restrictTo('admin'), getAllUser);
router.get("/users/:id", protect, restrictTo('admin'), getUserById);

router.put('/users/:id', protect, restrictTo('admin'), updateUserById);
router.delete('/users/:id', protect, restrictTo('admin'), delUserById);

//Mentor
router.get("/mentors", protect, restrictTo('admin'), getAllMentor(User));
router.get("/mentors/:id", protect, restrictTo('admin'), getMentorById);
router.post("/mentors/name",protect,restrictTo('admin'),getMentorByName);
// router.post("/mentors", protect, restrictTo('admin'), createMentor);
router.put('/mentors/:id', protect, restrictTo('admin'), updateMentorById);
router.delete('/mentors/:id', protect, restrictTo('admin'), delMentorById);

// router.post("/questions", createQuestion);
router.get("/questions", protect, restrictTo('admin'), getAllQuestions);
router.get("/questions/:id", protect, restrictTo('admin'), getQuestionById);
router.put('/questions/:id', protect, restrictTo('admin'), updateQuestionById);
router.delete('/questions/:id', protect, restrictTo('admin'), delQuestionById);

//Request
// router.post("/requests", protect, restrictTo('admin'), createRequest);
router.get("/requests", protect, restrictTo('admin'), getAllRequest(Request));
router.get("/requests/:id", protect, restrictTo('admin'), getRequestById);

export default router;
