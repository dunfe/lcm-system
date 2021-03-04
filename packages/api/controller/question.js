import express from 'express';
import mongoose from 'mongoose';

import Question from '../models/question.js';
import User from '../models/user.js';

const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;

export const createQuestion = (req, res) => {
    // const created_byId = mongoose.Types.ObjectId(req.body.created_by);
    const question = new Question({
        question_title: req.body.question_title,
        created_by: mongoose.Types.ObjectId(req.body.created_by),
        received_by: req.body.received_by,
        question_point: req.body.question_point,
        question_skill: req.body.question_skill,
        question_time: req.body.question_time,
        question_content: req.body.question_content,
        created_date: req.body.created_date,
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
    Question.find((err, doc) => {
        if(!err) {   
            res.send(doc);
        } else {
            console.log('Error' + JSON.stringify(err, undefined, 2));
        }
    });
};

export const getQuestionById = (req, res) => {
    if(!ObjectId.isValid(req.params.id)) { 
        return res.status(400).send(`No record with given id: ${req.params.id}`)
    };

    Question.findById( req.params.id, (err, doc) => {
        if (!err){
            res.send(doc);
        } else {
            console.log('Error' + JSON.stringify(err, undefined, 2));
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

export default router;