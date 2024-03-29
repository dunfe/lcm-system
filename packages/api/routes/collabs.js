import express from 'express';
import colabRoom from '../models/collabRoom.js';
import { protect, restrictTo} from '../controller/auth.js';
import { createCollabRoom, joinRoomById,listRoom, endCollabRoomById,viewCollabRoomById} from '../controller/collabRoom.js'

const router = express.Router();

router.get('/create-colab-room', protect, restrictTo('mentee', 'mentor'), createCollabRoom);
router.get('/create-colab-room/:id', protect, restrictTo('mentee', 'mentor'), joinRoomById);
router.get('/colab-room', protect, restrictTo('mentee', 'mentor'), listRoom);
router.post('/colab-room/:id', protect, restrictTo('mentee', 'mentor'), endCollabRoomById);
router.get('/colab-room/:id', protect, restrictTo('mentee', 'mentor'), viewCollabRoomById);
export default router;
