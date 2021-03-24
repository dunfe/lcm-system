import express from 'express';
import mongoose from 'mongoose';
import User from '../models/user.js';
import Question from '../models/question.js';

const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;

//Edit profile
export const viewMenteeInfo = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`Invalid id ${req.params.id}`);
    }
    User.findById(req.params.id, (err, doc) => {
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

export const editOrUpdateUserById = async (req, res, next) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            status: 'fail',
            message: `Invalid id ${req.params.id}`
        })
    }

    let user = req.body;

    User.findByIdAndUpdate(req.params.id, { $set: user }, { new: true }, (err, doc) => {
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
export const createQuestion = async (req, res) => {
    const user = await User.findById(req.params.id);
    const question = new Question({
        title: req.body.title,
        createdBy: user.fullname,
        receivedBy: req.body.receivedBy,
        point: req.body.point,
        skill: req.body.skill,
        time: req.body.time,
        content: req.body.content,
        createdAt: req.body.createdAt,
        status: req.body.status,
        note: req.body.note,
    });

    question.save((err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error in saving new question:' + JSON.stringify(err, undefined, 2));
        };
    });
};

export const getQuestionById = (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            status: 'fail',
            message: `Invalid id ${req.params.id}`
        })
    };

    Question.findById(req.params.id, (err, doc) => {
        if (!err) {
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

export const editQuestionById = async (req, res, next) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            status: 'fail',
            message: `Invalid id ${req.params.id}`
        })
    }

    let question = req.body;

    Question.findByIdAndUpdate(req.params.id, { $set: question }, { new: true }, (err, doc) => {
        if (!err) {
            return res.status(200).json({
                status: 'Update question success',
                data: doc
            });
        } else {
            return res.status(400).json({
                status: 'fail',
                message: 'Opp! Something wrong, please try again later'
            })
        }
    });
}

export const delQuestionById = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            status: 'fail',
            message: `Invalid id ${req.params.id}`
        })
    };

    Question.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            return res.status(200).json({
                status: 'Delete question success',
                data: doc
            });
        } else {
            return res.status(400).json({
                status: 'fail',
                message: 'Opp! Something wrong, please try again later'
            })
        }
    });
}

//view dashboard
//point out and point in of mentee at router

