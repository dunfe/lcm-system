import express from 'express';

import { getAllUser, getUserById, getUserByName, countAllRecord } from '../controller/user.js';
import { getAllMentor, getMentorById, getMentorByName} from '../controller/mentor.js';
import { createQuestion, getAllQuestions, getQuestionById } from '../controller/question.js';
import {createRequest, getAllRequest, getRequestById} from '../controller/request.js';

const router = express.Router();

router.get("/dashboard", countAllRecord);

router.get("/users/all", getAllUser);
router.get("/users/:id", getUserById);
router.get('/users', getUserByName);

router.get("/mentors/all", getAllMentor);
router.get("/mentors/:id", getMentorById);
router.get('/mentors', getMentorByName);

// router.post("/questions", createQuestion);
router.get("/questions/all", getAllQuestions);
router.get("/questions/:id", getQuestionById);

router.get("/requests", createRequest);
router.get("/requests/all", getAllRequest);
router.get("/requests/:id", getRequestById);

export default router;
