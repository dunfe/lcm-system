import express from 'express';
import { getSkills, getSkill, createSkill, updateSkill, deleteSkill } from '../controller/skill.js';

const router = express.Router();

router.get('/skills', getSkills);
router.get('/skills/:id', getSkill);
router.post('/createSkill', createSkill);
router.put('/skills/update/:id', updateSkill);
router.delete('/skills/:id', deleteSkill);

export default router;

