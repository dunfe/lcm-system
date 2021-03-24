import express from 'express';
import {newUserPayment,getAllCard,updateCardDetails,createCharges,deleteCard,createPayemnt} from '../controller/payment.js';
import { protect, restrictTo} from '../controller/auth.js';

const router = express.Router();
router.post('/newUser/',newUserPayment);
router.get("/getAllCard",getAllCard);
router.put("/updateCard",updateCardDetails);
router.post('/createCharge',createCharges);
router.post('/create',createPayemnt);
router.delete('/deleteCard',deleteCard);
export default router;