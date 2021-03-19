import express from 'express';
import mongoose from 'mongoose';

import Question from '../models/question.js';
import User from '../models/user.js';

const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;

//chua sua (for future function)
export const createQuestion = (req, res) => {
    // const created_byId = mongoose.Types.ObjectId(req.body.created_by);
    const question = new Question({
        title: req.body.title,
        createdBy: mongoose.Types.ObjectId(req.body.createdBy),
        receivedBy: req.body.receivedBy,
        point: req.body._point,
        skill: req.body.skill,
        time: req.body.time,
        content: req.body.content,
        createdAt: req.body.createdAt,
        status: req.body.status,
        note: req.body.note,
    });

    question.save((err, doc) => {
        if(!err) {
            res.send(doc);
        } else {
            console.log('Error in saving new question:' + JSON.stringify(err, undefined, 2));
        };
    });
};

export const getAllQuestions = async ( req, res) => {
    try {
        const data = await Question.find();
        return res.status(200).json({
            status: 'success',
            result: data.length,
            data: data
        })
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

export const getQuestionById = (req, res) => {
    if(!ObjectId.isValid(req.params.id)) { 
        return res.status(400).json({
            status: 'fail',
            message: `Invalid id ${req.params.id}`
        })
    };

    Question.findById(req.params.id, (err, doc) => {
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

export const  totalQuestion = (req, res) => {
    Question.countDocuments({}, (err,doc)=> {
        if (!err){
            res.json('Total questions: '+ doc);
        } else {
            console.log('Error' + JSON.stringify(err, undefined, 2));
        };
    });
} ;


export const updateQuestionById = async (req, res, next) => {
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).json({
            status: 'fail',
            message: `Invalid id ${req.params.id}`
        })
    }

    let question = req.body;

    Question.findByIdAndUpdate(req.params.id, { $set: question}, { new: true}, (err, doc) => {
        if(!err){
            return res.status(200).json({
                status: 'Update question success',
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

export const delQuestionById = async (req, res) =>{
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).json({
            status: 'fail',
            message: `Invalid id ${req.params.id}`
        })
    };

    Question.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err) {
            return res.status(200).json({
                status: 'Delete question success',
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

export default router;