import express from 'express';

import { getAllUser, getUserById, getUserByName, countAllRecord,delUserById, updateUserById } from '../controller/user.js';
import { getAllMentor, getMentorById, getMentorByName, updateMentorById, delMentorById} from '../controller/mentor.js';
import { createQuestion, getAllQuestions, getQuestionById, updateQuestionById, delQuestionById } from '../controller/question.js';
import {createRequest, getAllRequest, getRequestById} from '../controller/request.js';
import { protect, restrictTo} from '../controller/auth.js';

const router = express.Router();

router.get("/dashboard", protect, restrictTo('admin'), countAllRecord);

//Mentee
router.get("/users/all", protect, restrictTo('admin'), getAllUser);
router.get("/users/:id", protect, restrictTo('admin'), getUserById);
router.get('/users', protect, restrictTo('admin'), getUserByName);
router.put('/users/:id', protect, restrictTo('admin'), updateUserById);
router.delete('/users/:id', protect, restrictTo('admin'), delUserById);

//Mentor
router.get("/mentors/all", protect, restrictTo('admin'), getAllMentor);
router.get("/mentors/:id", protect, restrictTo('admin'), getMentorById);
router.get('/mentors', protect, restrictTo('admin'), getMentorByName);
router.put('/mentors/:id', protect, restrictTo('admin'), updateMentorById);
router.delete('/mentors/:id', protect, restrictTo('admin'), delMentorById);

// router.post("/questions", createQuestion);
router.get("/questions/all", protect, restrictTo('admin'), getAllQuestions);
router.get("/questions/:id", protect, restrictTo('admin'), getQuestionById);
router.put('/questions/:id', protect, restrictTo('admin'), updateQuestionById);
router.delete('/questions/:id', protect, restrictTo('admin'), delQuestionById);

//Request
router.get("/requests", protect, restrictTo('admin'), createRequest);
router.get("/requests/all", protect, restrictTo('admin'), getAllRequest);
router.get("/requests/:id", protect, restrictTo('admin'), getRequestById);

export default router;
