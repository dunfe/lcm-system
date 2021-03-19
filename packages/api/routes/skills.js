import express from 'express';
import { getAllSkills, getSkillById, createSkill, updateSkill, deleteSkill, getSkillByName } from '../controller/skill.js';
import { protect, restrictTo} from '../controller/auth.js';

const router = express.Router();

router.get('/skills', protect, restrictTo('admin'), getAllSkills);
router.get('/skills/:id', protect, restrictTo('admin'), getSkillById);

router.post('/skills', protect, restrictTo('admin'), createSkill);
router.put('/skills/:id', protect, restrictTo('admin'), updateSkill);
router.delete('/skills/:id', protect, restrictTo('admin'), deleteSkill);

export default router;

