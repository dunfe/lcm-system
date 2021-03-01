import express from 'express';
import { getSkills, getSkill, createSkill, updateSkill, deleteSkill, getSkillByName } from '../controller/skill.js';

const router = express.Router();

router.get('/skills', getSkills);
router.get('/skill/:id', getSkill);
router.get('/skill-name', getSkillByName);
router.post('/createSkill', createSkill);
router.put('/update-skill/:id', updateSkill);
router.delete('/delete-skill/:id', deleteSkill);

export default router;

