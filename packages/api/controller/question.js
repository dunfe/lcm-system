import express from 'express';
import mongoose from 'mongoose';

import Question from '../models/question.js';
import User from '../models/user.js';
import { useridFromToken } from '../controller/mentor.js'
import question from '../models/question.js';
const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;

//chua sua (for future function)
export const createQuestion = async (req, res) => {
    let userId = await useridFromToken(req, res);
    const mentee = await User.findById(userId);
    const question = new Question({
        title: req.body.title,
        menteeId: mentee._id,
        menteeName: mentee.fullname,
        point: req.body.point,
        skill: req.body.skill,
        timeAvailableFrom: req.body.timeAvailableFrom,
        timeAvailableTo: req.body.timeAvailableTo,
        content: req.body.content,
        createdAt: req.body.createdAt,
        status: req.body.status,
        note: req.body.note,
    });
    if(mentee.currentPoint < req.body.point){
        return res.status(400).json({
            status: 'fail',
            message: 'Bạn không đủ điểm để tạo câu hỏi!!'
        })
    }else{
        question.save((err, doc) => {
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
            }
        });
    }
};

export function getAllQuestions(model) { 
    return async ( req, res) => {
        let page = parseInt(req.query.page) || 1;
        const limit = 10;
        const results = {}
        const data = await model.find();
        const totalPage = Math.ceil(data.length/limit) ;
        results.totalPage = totalPage;
        results.totalItem = data.length;
        if(page<1 || page > totalPage) page = 1;
        const startIndex = (page - 1) * limit
        const endIndex = page * limit
      
    if (endIndex < data.length) {
        results.next = {
          page: page + 1,
          limit: limit
        }
    }
      
    if (startIndex > 0) {
        results.previous = {
          page: page - 1,
          limit: limit
        }
    }
    try {
        results.results = await model.find().limit(limit).skip(startIndex).exec()
        return res.status(200).json(results);
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}
}


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

export const totalQuestion = (req, res) => {
    Question.countDocuments({}, (err, doc) => {
        if (!err) {
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


export const updateQuestionById = async (req, res, next) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            status: 'fail',
            message: `Invalid id ${req.params.id}`
        })
    }

    const updateQuestion = {
        title: req.body.title,
        point: req.body.point,
        skill: req.body.skill,
        content: req.body.content,
        note: req.body.note
    }

    Question.findByIdAndUpdate(req.params.id, { $set: updateQuestion }, { new: true }, (err, doc) => {
        if (!err) {
            return res.status(200).json({
                status: 'success',
                data: doc
            });
        } else {
            return res.status(400).json({
                status: 'fail',
                message: err.message
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
                status: 'success',
                message: 'Delete question success'
            });
        } else {
            return res.status(400).json({
                status: 'fail',
                message: 'Something wrong, try again later'
            })
        }
    });
}

export const viewListNewOrdoingQuestion = async (req, res) => {
    let page = parseInt(req.query.page) || 1;
    const limit = 10;
    const results = {}
    let userId = await useridFromToken(req, res);
    let CurrUser = await User.findById(userId);
    let data, listQues, startIndex, endIndex, totalPage;
    if(CurrUser.role == 'mentor'){
        data = await Question.find({receivedBy: userId, status : "doing" });
        totalPage = Math.ceil(data.length / limit);
        results.totalPage = totalPage;
        results.totalItem = data.length;
        if (page < 1 || page > totalPage) page = 1;
        startIndex = (page - 1) * limit
        endIndex = page * limit
        listQues = await Question.find({receivedBy: userId, status : "doing" }).sort({ point: 'descending' }).limit(limit).skip(startIndex).exec();
    }else if(CurrUser.role == 'mentee'){
        data = await Question.find({menteeId: userId, status : {$ne : "done"} });
        totalPage = Math.ceil(data.length / limit);
        results.totalPage = totalPage;
        results.totalItem = data.length;
        if (page < 1 || page > totalPage) page = 1;
        startIndex = (page - 1) * limit
        endIndex = page * limit
        listQues = await Question.find({menteeId: userId, status : {$ne : "done"} }).sort({ status: -1, createdAt: 'ascending' }).limit(limit).skip(startIndex).exec();
    }
    if (endIndex < data.length) {
        results.next = { page: page + 1 }
    }
    if (startIndex > 0) {
        results.previous = { page: page - 1 }
    }
    try {
        results.results = listQues;
        return res.status(200).json({
            status: 'success',
            data: results
        });
    } catch (e) {
        return res.status(400).json({
            status: 'fail',
            message: e.message
        })
    }
}

export const viewListDoneQuestion = async (req, res) => {
    let page = parseInt(req.query.page) || 1;
    const limit = 10;
    const results = {}
    let userId = await useridFromToken(req, res);
    let CurrUser = await User.findById(userId);
    let data, listQues, startIndex, endIndex, totalPage;
    if(CurrUser.role == 'mentor'){
        data = await Question.find({receivedBy: userId, status : "done" });
        totalPage = Math.ceil(data.length / limit);
        results.totalPage = totalPage;
        results.totalItem = data.length;
        if (page < 1 || page > totalPage) page = 1;
        startIndex = (page - 1) * limit
        endIndex = page * limit
        listQues = await Question.find({receivedBy: userId, status : "done" }).sort({ point: 'descending' }).limit(limit).skip(startIndex).exec();
    }else if(CurrUser.role == 'mentee'){
        data = await Question.find({menteeId: userId, status : "done" });
        totalPage = Math.ceil(data.length / limit);
        results.totalPage = totalPage;
        results.totalItem = data.length;
        if (page < 1 || page > totalPage) page = 1;
        startIndex = (page - 1) * limit
        endIndex = page * limit
        listQues = await Question.find({menteeId: userId, status : "done" }).sort({ createdAt: 'ascending' }).limit(limit).skip(startIndex).exec();
    }
    if (endIndex < data.length) {
        results.next = { page: page + 1 }
    }
    if (startIndex > 0) {
        results.previous = { page: page - 1 }
    }
    try {
        results.results = listQues;
        return res.status(200).json({
            status: 'success',
            data: results
        });
    } catch (e) {
        return res.status(400).json({
            status: 'fail',
            message: e.message
        })
    }
}

export const viewListQuestionForMentor = async (req, res) => {
    let page = parseInt(req.query.page) || 1;
    const limit = 1;
    const results = {}
    let userId = await useridFromToken(req, res);
    var listSkill = [];
    const user = await User.find({ role: "mentor", _id: userId }).then((users) => {
        for (var i = 0; i < users.length; i++) {
            listSkill = listSkill.concat(users[i].skill);
            listSkill = uniqBy(listSkill, JSON.stringify);
        }
    })
    const data = await Question.find({ skill: { $in: listSkill }, receivedBy: { $ne: userId }, status: "new" });
    const totalPage = Math.ceil(data.length / limit);
    results.totalPage = totalPage;
    results.totalItem = data.length;
    if (page < 1 || page > totalPage) page = 1;
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    if (endIndex < data.length) {
        results.next = { page: page + 1 }
    }
    if (startIndex > 0) {
        results.previous = { page: page - 1 }
    }
    try {
        results.results = await Question.find({ skill: { $in: listSkill }, receivedBy: { $ne: userId }, status: "new" }).sort({ createAt: 'descending' }).exec();
        //limit(limit).skip(startIndex)
        return res.status(200).json({
            status: 'success',
            data: results
        });
    } catch (e) {
        return res.status(400).json({
            status: 'fail',
            message: e.message
        })
    }
}

export const viewListQuestionById = async (req, res) => {
    let page = parseInt(req.query.page) || 1;
    const limit = 10;
    const results = {}
    let userId = await useridFromToken(req, res);
    let CurrUser = await User.findById(userId);
    let data, listQues, startIndex, endIndex, totalPage;
    if(CurrUser.role == 'mentor'){
        data = await Question.find({receivedBy: userId});
        totalPage = Math.ceil(data.length / limit);
        results.totalPage = totalPage;
        results.totalItem = data.length;
        if (page < 1 || page > totalPage) page = 1;
        startIndex = (page - 1) * limit
        endIndex = page * limit
        listQues = await Question.find({receivedBy: userId}).sort({ point: 'descending' }).limit(limit).skip(startIndex).exec();
    }else if(CurrUser.role == 'mentee'){
        data = await Question.find({menteeId: userId});
        totalPage = Math.ceil(data.length / limit);
        results.totalPage = totalPage;
        results.totalItem = data.length;
        if (page < 1 || page > totalPage) page = 1;
        startIndex = (page - 1) * limit
        endIndex = page * limit
        listQues = await Question.find({menteeId: userId}).sort({ createdAt: 'ascending' }).limit(limit).skip(startIndex).sort().exec();
    }
    if (endIndex < data.length) {
        results.next = { page: page + 1 }
    }
    if (startIndex > 0) {
        results.previous = { page: page - 1 }
    }
    try {
        results.results = listQues;
        return res.status(200).json({
            status: 'success',
            data: results
        });
    } catch (e) {
        return res.status(400).json({
            status: 'fail',
            message: e.message
        })
    }
}

export function uniqBy(a, key) {
    var seen = {};
    return a.filter(function (item) {
        var k = key(item);
        return seen.hasOwnProperty(k) ? false : (seen[k] = true);
    })
}
export default router;