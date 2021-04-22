import express from 'express';
import {updatePoint_Transaction,viewPointInTransactionById,viewPointOutTransactionById,
        plusPoint_Transaction,minusPoint_Transaction, addRateExchange, updateRateExchange} from '../controller/staff.js';
import {confirmRequestMentorRegister} from '../controller/request.js';
import {getAllUser} from '../controller/mentor.js';
import { protect, restrictTo} from '../controller/auth.js';
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
// confirm request mentee register mentor
// router.post('/mentor/confirm/:id',protect, restrictTo('staff'),confirmRequestMentorRegister);
export default router;