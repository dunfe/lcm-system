import express from 'express';
import { getAllSkills, getSkillById, createSkill, updateSkill, deleteSkill, getSkillByName } from '../controller/skill.js';

const router = express.Router();

router.get('/skills/all', getAllSkills);
router.get('/skills/:id', getSkillById);
router.get('/skills', getSkillByName);
router.post('/skills', createSkill);
router.put('/skills/:id', updateSkill);
router.delete('/skills/:id', deleteSkill);

export default router;

