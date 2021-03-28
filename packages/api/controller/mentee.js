import express from 'express';
import mongoose from 'mongoose';
import User from '../models/user.js';
import Question from '../models/question.js';
import {useridFromToken} from '../controller/mentor.js'

const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;

//Edit profile
export const viewMenteeInfo = async (req, res) => {
    let userId = await useridFromToken(req,res);
    User.find({_id: userId}, (err, doc) => {
        if (!err) {
            return res.status(200).json({
                status: 'Success',
                data: doc
            });

        } else {
            return res.status(400).json({
                status: 'fail',
                message: 'Something wrong, try again'
            })
        }
    })
}

export const editOrUpdateUserById = async (req, res) => {
    let userId = await useridFromToken(req,res);
    let user = req.body;

    User.findOneAndUpdate({_id: userId}, { $set: user }, { new: true }, (err, doc) => {
        if (!err) {
            return res.status(200).json({
                status: 'Update success',
                data: doc
            });
        } else {
            return res.status(400).json({
                status: 'fail',
                message: 'Something wrong, try again later'
            })
        }
    });
}

//Question of mentee 

export const favoriteMentorById = async (req,res)=>{
    
}

//view dashboard
//point out and point in of mentee at router

