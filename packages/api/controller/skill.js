import express from 'express';
import Skill from '../models/skill.js';

const router = express.Router();

export const getSkills = async (req, res, next) => {
    try {
        const skills = await Skill.find();
        res.send(skills);
    } catch (error) {
        console.log(err);
        res.json(error);
    }
};

export const getSkill = async (req, res, next) => {
    try {
        const skill = await Skill.findOne({
            _id: req.params.id,
        });
        res.json(skill);
    } catch (error) {
        console.log(err);
        res.json(error);
    }
};

export const createSkill = async (req, res, next) => {
    const { skill_name, status, create_date, last_modified_date } = req.body;
    const skill = await Skill.findOne({skill_name});

    if( skill ) {
        return res.json({error: {message: 'skill name already used'}});
    };

    const newSkill = new Skill({ skill_name, status, create_date, last_modified_date});
    try {
        const newSkills = await newSkill.save();
        res.json(newSkills);
    } catch (error) {
        console.log(err);
        res.json(error);
    }
};

export const updateSkill = async (req, res, next) => {
    try {
        await Skill.findOneAndUpdate({ _id: req.params.id}, req.body,{
            new: true,
        });

        res.send('Update skill successfully');
    } catch (error) {
        console.log(error);
        res.json(error);
    }
};

export const deleteSkill = async (req, res) => {
    try {
        await Skill.deleteOne({ _id: req.params.id});           
        res.send('Deleted skill');    
    } catch (error) {
        console.log(error);
        res.json(error);
    }
};

export default router;