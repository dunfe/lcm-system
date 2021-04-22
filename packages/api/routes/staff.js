import express from 'express';
import Report from '../models/report.js';
import Request from '../models/request.js';
import {updatePoint_Transaction,viewPointInTransactionById,viewPointOutTransactionById,
        plusPoint_Transaction,minusPoint_Transaction, addRateExchange, updateRateExchange} from '../controller/staff.js';
import { getAllRequest, getRequestById, confirmRequestMentorRegister, delRequest} from '../controller/request.js';
import {getAllUser} from '../controller/mentor.js';
import { protect, restrictTo} from '../controller/auth.js';
import { getAllReport, getReportById,updateReportById, delReportById, resolveFeedback } from '../controller/report.js';
import User from '../models/user.js'; 
const router = express.Router();

router.post('/pointIn/:id',protect, restrictTo('staff'),plusPoint_Transaction);
router.post('/pointOut/:id',protect, restrictTo('staff'),minusPoint_Transaction);
router.get('/viewPointOut/:id',protect, restrictTo('staff'),viewPointOutTransactionById);
router.get('/viewPointIn/:id',protect, restrictTo('staff'),viewPointInTransactionById);
router.post('/updatePoint/:id',protect, restrictTo('staff'),updatePoint_Transaction);
router.get("/users", protect, restrictTo('staff'), getAllUser(User));
//router.post('/addRate',addRateExchange);
router.post('/updateRateExchange/:id',updateRateExchange);

router.get("/requests", protect, restrictTo('admin','staff'), getAllRequest(Request));
router.get("/requests/:id", protect, restrictTo('admin','staff'), getRequestById);
router.post('/requests/:id',protect, restrictTo('admin','staff'),confirmRequestMentorRegister);
router.delete('/requests/:id', protect, restrictTo('admin','staff'), delRequest);

router.get("/reports", protect, restrictTo('admin','staff'), getAllReport(Report));
router.get("/reports/:id", protect, restrictTo('admin','staff'), getReportById);
router.put("/reports/:id", protect,restrictTo('admin','staff'), updateReportById);
router.delete('/reports/:id', protect, restrictTo('admin','staff'), delReportById);


// confirm request mentee register mentor
// router.post('/mentor/confirm/:id',protect, restrictTo('staff'),confirmRequestMentorRegister);
export default router;