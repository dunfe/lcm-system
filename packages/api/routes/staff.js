import express from 'express';
import {updatePoint_Transaction,viewPointInTransactionById,getAllReport,viewPointOutTransactionById,
        plusPoint_Transaction,minusPoint_Transaction, addRate} from '../controller/staff.js';

const router = express.Router();

router.get('/reports/all', getAllReport);
router.post('/pointIn/:id',plusPoint_Transaction);
router.post('/pointOut/:id',minusPoint_Transaction);
router.get('/viewPointOut/:id',viewPointOutTransactionById);
router.get('/viewPointIn/:id',viewPointInTransactionById);
router.post('/updatePoint/:id',updatePoint_Transaction);
router.post('/addRate',addRate);
export default router;