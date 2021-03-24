import express from 'express';
import {updatePoint_Transaction,viewPointInTransactionById,viewPointOutTransactionById,
        plusPoint_Transaction,minusPoint_Transaction, addRateExchange, updateRateExchange} from '../controller/staff.js';
import {confirmRequestMentorRegister} from '../controller/request.js';
const router = express.Router();

router.post('/pointIn/:id',plusPoint_Transaction);
router.post('/pointOut/:id',minusPoint_Transaction);
router.get('/viewPointOut/:id',viewPointOutTransactionById);
router.get('/viewPointIn/:id',viewPointInTransactionById);
router.post('/updatePoint/:id',updatePoint_Transaction);
//router.post('/addRate',addRateExchange);
router.post('/updateRateExchange/:id',updateRateExchange);
router.post('/comfirmRegisterMentor/:id',confirmRequestMentorRegister);
export default router;