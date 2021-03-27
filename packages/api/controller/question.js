import express from 'express';
import mongoose from 'mongoose';

import Question from '../models/question.js';
import User from '../models/user.js';

const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;

export const createQuestion = async (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).json({
            status: 'fail',
            message: `Invalid id ${req.params.id}`
        })
    }
    const mentee = await User.findById(req.params.id);
    const question = new Question({
        title: req.body.title,
        menteeId: mentee._id,
        menteeName: mentee.fullname,
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
            return res.status(200).json({
                status: 'List Question For Mentor',
                data: doc
            });
        } else {
            return res.status(400).json({
                status: 'fail',
                message: 'Something wrong, try again later'
            })
        }
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

// export const getQuestionById = (req, res) => {
//     if(!ObjectId.isValid(req.params.id)) { 
//         return res.status(400).json({
//             status: 'fail',
//             message: `Invalid id ${req.params.id}`
//         })
//     };

//     Question.findById(req.params.id, (err, doc) => {
//         if (!err){
//             return res.status(200).json({
//                 status: 'success',
//                 data: doc
//             });
//         } else {
//             return res.status(400).json({
//                 status: 'fail',
//                 message: 'Something wrong, try again later'
//             }) 
//         };
//     });
// };

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