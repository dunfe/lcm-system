import express from 'express';
import { createMentor} from '../controller/mentor.js';

const router = express.Router();

router.post('/admin/mentor-request', createMentor);
// router.get('/mentors', getMentors);
// router.get('/mentors/:id', getMentor);


export default router;