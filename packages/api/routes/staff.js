import express from 'express';
import {updatePoint_Transaction,viewPointInTransactionById,viewPointOutTransactionById,
        plusPoint_Transaction,minusPoint_Transaction, addRateExchange, updateRateExchange} from '../controller/staff.js';
import {confirmRequestMentorRegister} from '../controller/request.js';
import { protect, restrictTo} from '../controller/auth.js';
const router = express.Router();

router.post('/pointIn/:id',protect, restrictTo('staff'),plusPoint_Transaction);
router.post('/pointOut/:id',protect, restrictTo('staff'),minusPoint_Transaction);
router.get('/viewPointOut/:id',protect, restrictTo('staff'),viewPointOutTransactionById);
router.get('/viewPointIn/:id',protect, restrictTo('staff'),viewPointInTransactionById);
router.post('/updatePoint/:id',protect, restrictTo('staff'),updatePoint_Transaction);
//router.post('/addRate',addRateExchange);
router.post('/updateRateExchange/:id',updateRateExchange);
router.post('/comfirmRegisterMentor/:id',protect, restrictTo('staff'),confirmRequestMentorRegister);
export default router;