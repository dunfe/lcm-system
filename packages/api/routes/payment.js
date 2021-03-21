import express from 'express';
import {newUserPayment,getAllCard,updateCardDetails,createCharges,deleteCard,createPayemnt} from '../controller/payment.js';
import { protect, restrictTo} from '../controller/auth.js';

const router = express.Router();
router.post('/newUser/',newUserPayment);
router.get("/getAllCard",protect, restrictTo('admin'),getAllCard);
router.put("/updateCard",protect, restrictTo('admin'),updateCardDetails);
router.post('/createCharge',protect, restrictTo('admin'),createCharges);
router.post('/create',protect, restrictTo('admin'),createPayemnt);
router.delete('/deleteCard',protect, restrictTo('admin'),deleteCard);
export default router;