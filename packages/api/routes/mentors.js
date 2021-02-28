import express from 'express';
import { createMentor, getMentors, getMentor} from '../controller/mentor.js';

const router = express.Router();

router.post('/admin/mentor-request', createMentor);
router.get('/mentors', getMentors);
router.get('/mentors/:id', getMentor);
// router.get('/mentors/rating/:id', viewMentorRating);

export default router;