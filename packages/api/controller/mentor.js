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
export const getAllMentor = async (req, res) => {
    try {
        const data = await Mentor.find();
        return res.status(200).json({
            status: 'success',
            result: data.length,
            data: data
        });        
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

export const getMentorById = async (req, res) => {
    if(!ObjectId.isValid(req.params.id)) { 
        return res.status(400).json({
            status: 'fail',
            message: `Invalid id ${req.params.id}`
        })
    };

    Mentor.findById( req.params.id, (err, doc) => {
        if (!err){
            return res.status(200).json({
                status: 'success',
                data: doc
            });  
        } else {
            return res.status(400).json({
                status: 'fail',
                message: 'Something wrong, try again later'
            })
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

export const  totalMentor = (req, res) => {
    Mentor.aggregate([
        {
            $match:{}
        },
        {
            $count: "total_mentor"
        }
    ], (err, doc) => {
        if (!err){ 
            res.json(doc);
        } else {
            console.log('Error' + JSON.stringify(err, undefined, 2));
        };
    });
};

export default router;
