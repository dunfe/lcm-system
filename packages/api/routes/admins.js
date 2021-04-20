import express from 'express';
import Request from '../models/request.js';
import Report from '../models/report.js'
import User from '../models/user.js'; 
import Question from '../models/question.js'
import { getAllMentee, getUserById, countAllRecord,banUserById, updateUserById } from '../controller/user.js';
import { getAllMentor, getMentorById, getMentorByName, updateMentorById, delMentorById} from '../controller/mentor.js';
import { createQuestion, getAllQuestions, getQuestionById, updateQuestionById, delQuestionById } from '../controller/question.js';
import { getAllRequest, getRequestById} from '../controller/request.js';
import { protect, restrictTo} from '../controller/auth.js';
import { getAllReport, getReportById,updateReportById, delReportById, resolveFeedback } from '../controller/report.js';
import { getAllRole } from '../controller/admin.js';

const router = express.Router();

router.get("/dashboard", protect, restrictTo('admin'), countAllRecord);

//Mentee
router.get("/users", protect, restrictTo('admin'), getAllMentee(User));
router.get("/users/:id", protect, restrictTo('admin'), getUserById);

router.put('/users/:id', protect, restrictTo('admin'), updateUserById);
router.post('/users/:id', protect, restrictTo('admin'), banUserById);

//Mentor
router.get("/mentors", protect, restrictTo('admin'), getAllMentor(User));
router.get("/mentors/:id", protect, restrictTo('admin'), getMentorById);
router.post("/mentors/name",protect,restrictTo('admin'),getMentorByName);
// router.post("/mentors", protect, restrictTo('admin'), createMentor);
router.put('/mentors/:id', protect, restrictTo('admin'), updateMentorById);
router.delete('/mentors/:id', protect, restrictTo('admin'), delMentorById);

// router.post("/questions", createQuestion);
router.get("/questions", protect, restrictTo('admin'), getAllQuestions(Question));
router.get("/questions/:id", protect, restrictTo('admin'), getQuestionById);
router.put('/questions/:id', protect, restrictTo('admin'), updateQuestionById);
router.delete('/questions/:id', protect, restrictTo('admin'), delQuestionById);

//Request API
// router.post("/requests", protect, restrictTo('admin'), createRequest);
router.get("/requests", protect, restrictTo('admin','staff'), getAllRequest(Request));
router.get("/requests/:id", protect, restrictTo('admin'), getRequestById);

//CRUD Report
router.get("/reports", protect, restrictTo('admin'), getAllReport(Report));
router.get("/reports/:id", protect, restrictTo('admin'), getReportById);
router.put("/reports/:id", protect,restrictTo('admin'), updateReportById);
router.delete('/reports/:id', protect, restrictTo('admin'), delReportById);

router.post("/reports/:id", protect, restrictTo('admin'), resolveFeedback);

//Get all role
router.get("/roles", protect, restrictTo('admin'), getAllRole);

export default router;
