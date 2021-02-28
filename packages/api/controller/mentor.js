import express from 'express';

import Mentor from '../models/mentor.js';

const router = express.Router();

export const createMentor = async (req, res, next) => {
    const { name, job, introduction, skill_description, service, status} = req.body;

    const newMentor = Mentor({ name, job, introduction, skill_description, service, status});

    try {
        const mentors = await newMentor.save();
        res.json(mentors);
    } catch (error) {
        console.log(error);
        res.json(error);
    }
}

export const getMentors = async (req, res, next) => {
    try {
        const mentors = await Mentor.find();
        res.json(mentors);
    } catch (error) {
        console.log(error);
        res.json(error);
    }
};

export const getMentor = async (req, res, next) => {
    try {  
        const mentor = await Mentor.findOne({
            _id: req.params.id,
        });

        res.json(mentor);
    } catch (error) {
        console.log(error);
        res.json(error);
    }
};

// export const viewMentorRating = async (req, res, next) => {
//     try{

//     } catch (error) {
//         console.log(error);
//         res.json(error);
//     }
// }

export default router;
