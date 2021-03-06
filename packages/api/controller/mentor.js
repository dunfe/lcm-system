import express from 'express';
import mongoose from 'mongoose';

import Mentor from '../models/mentor.js';

const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;

// demo
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

// real
export const getAllMentor = (req, res) => {
    Mentor.find((err, doc) => {
        if(!err) {
            res.send(doc);
        } else {
            console.log('Error' + JSON.stringify(err, undefined, 2));
        };
    });
};

export const getMentorById = (req, res) => {
    if(!ObjectId.isValid(req.params.id)) { 
        return res.status(400).send(`No record with given id: ${req.params.id}`)
    };

    Mentor.findById( req.params.id, (err, doc) => {
        if (!err){
            res.send(doc);
        } else {
            console.log('Error' + JSON.stringify(err, undefined, 2));
        };
    });
};

export const getMentorByName = (req, res) => {
    const mentor_name = req.body.display_name;

    Mentor.find({
        "display_name" : {'$regex' : new RegExp(mentor_name, "i")}
    }, (err, doc) => {
        if(!err) {
            if(doc.toString() == ""){ 
                return res.status(400).send(`No record with given name: ${req.body.display_name}`)
            }else {
                res.send(doc);
            }
        } else {
            console.log('Error' + JSON.stringify(err, undefined, 2));
        };
    })
};

export default router;
