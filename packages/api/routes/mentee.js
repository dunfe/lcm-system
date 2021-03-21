import express from 'express';
import {viewMenteeInfo,editOrUpdateUserById} from '../controller/mentee.js'
import { protect, restrictTo} from '../controller/auth.js';

const router = express.Router();

router.get('/view_user/:id',viewMenteeInfo);
router.put('/updateUser/:id',editOrUpdateUserById);
export default router;