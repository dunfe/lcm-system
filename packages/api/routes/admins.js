import express from 'express';
import Request from '../models/request.js';
import Report from '../models/report.js'
import User from '../models/user.js'; 
import Question from '../models/question.js'
import { getAllMentee, getUserById, countAllRecord,banUserById, updateUserById, unbanUserById } from '../controller/user.js';
import { getAllMentor, getMentorById, getMentorByName,getUserByEmail, updateMentorById, delMentorById} from '../controller/mentor.js';
import { createQuestion, getAllQuestions, getQuestionById, updateQuestionById, delQuestionById } from '../controller/question.js';
import { getAllRequest, getRequestById, confirmRequestMentorRegister, delRequest} from '../controller/request.js';
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
router.post('/users/unban/:id', protect, restrictTo('admin'), unbanUserById);
//Mentor
router.get("/mentors", protect, restrictTo('admin'), getAllMentor(User));
router.get("/mentors/:id", protect, restrictTo('admin'), getMentorById);
router.get("/search/mentors",protect,restrictTo('admin'),getMentorByName(User));
router.get("/search/users",protect,restrictTo('admin','staff'),getUserByEmail(User));
router.put('/mentors/:id', protect, restrictTo('admin'), updateMentorById);
router.delete('/mentors/:id', protect, restrictTo('admin'), delMentorById);

// Question
router.get("/questions", protect, restrictTo('admin'), getAllQuestions(Question));
router.get("/questions/:id", protect, restrictTo('admin'), getQuestionById);
router.put('/questions/:id', protect, restrictTo('admin'), updateQuestionById);
router.delete('/questions/:id', protect, restrictTo('admin'), delQuestionById);

//Request

// router.post("/requests", protect, restrictTo('admin'), createRequest);
router.get("/requests", protect, restrictTo('admin','staff'), getAllRequest(Request));
router.get("/requests/:id", protect, restrictTo('admin','staff'), getRequestById);
router.post('/requests/:id',protect, restrictTo('admin','staff'),confirmRequestMentorRegister);
router.delete('/requests/:id', protect, restrictTo('admin','staff'), delRequest);
//CRUD Report
router.get("/reports", protect, restrictTo('admin','staff'), getAllReport(Report));
router.get("/reports/:id", protect, restrictTo('admin','staff'), getReportById);
router.put("/reports/:id", protect,restrictTo('admin','staff'), updateReportById);
router.delete('/reports/:id', protect, restrictTo('admin','staff'), delReportById);

router.post("/reports/:id", protect, restrictTo('admin'), resolveFeedback);

//Get all role
router.get("/roles", protect, restrictTo('admin'), getAllRole);

//Search mentor API
// router.get("/reports", protect, restrictTo('admin'), getAllReport(Report));

export default router;
