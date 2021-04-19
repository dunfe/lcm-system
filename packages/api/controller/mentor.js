import express from 'express';
import mongoose from 'mongoose';
import {uniqBy} from '../controller/question.js'
import User from '../models/user.js';
import Question from '../models/question.js'
import dotenv from 'dotenv'
import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import colabRoom from '../models/collabRoom.js';
import Notify from '../models/noti.js';
dotenv.config();
const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;

export function getAllMentor(model) {
    return async (req, res) => {
      let page = parseInt(req.query.page) || 1;
      const limit = 50;
      const results = {}
      const data = await model.find({role : 'mentor'});
      const totalPage = Math.ceil(data.length/limit) ;
      results.totalPage = totalPage;
      results.totalItem = data.length;
      if(page<1 || page > totalPage) page = 1;
      const startIndex = (page - 1) * limit
      const endIndex = page * limit
      if (endIndex < await model.countDocuments().exec()) {
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
        results.results = await model.find({role : 'mentor'}).limit(limit).skip(startIndex).exec()
        return res.status(200).json(results);
      } catch (e) {
        res.status(500).json({ message: e.message })
      }
    }
  }

export const countQuestionNotDoneOfMentor = async (req,res)=> {
    var userId = await useridFromToken(req,res);
    var data = await Question.find({receivedBy: userId},{status: "doing"});
    return data.length;
}

export const countNotify = async (req,res) =>{
    var userId = await useridFromToken(req,res);
    let countReadFalse;
    const readFalse = await Notify.find({receivedById : userId, read: false});
    countReadFalse = readFalse.length;
    return countReadFalse
}

export const selectQuestion = async (req,res) =>{
    if(!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            status: 'fail',
            message: `Invalid id ${req.params.id}`
        })
    };
    var count = await countQuestionNotDoneOfMentor(req,res);
    if(count > 5){
        return res.status(400).json({
            status: 'fail',
            message: 'bạn chưa hoàn thành 5 câu hỏi đã chọn trước đó, vui lòng hoàn thành trước khi chọn câu hỏi tiếp theo!!'
        })
    }
    var userId = await useridFromToken(req,res);
    var currUser = await User.findById(userId);
    var ques = await Question.findById(req.params.id);
    var room = new colabRoom({
        menteeInfo: {
            _id : ques.menteeId,
            displayName : ques.menteeName,
            level: 0
        },
        mentorInfo: {
            _id : currUser._id,
            displayName : currUser.fullname,
            level: currUser.level
        },
        content: ques.title
    });
    room.save();
    var notify1 = new Notify({
        title: currUser.fullname +" đã chọn giải đáp câu hỏi: '" + ques.title + "' của bạn",
        receivedById: ques.menteeId,
        content: room._id
    });
    var notify2 = new Notify({
        title: "Bạn đã chọn giải đáp câu hỏi: '" + ques.title + "' của " + ques.menteeName,
        receivedById: currUser._id,
        content: room._id
    });
    notify1.save();
    notify2.save();

    // var socketio = io("ws://localhost:3007");
    // let countReadFalse;
    // const readFalse = await Notify.find({receivedById : userId, read: false});
    // countReadFalse = readFalse.length;
    // socketio.emit("news",countReadFalse);
    var roomId = room._id;
    Question.findByIdAndUpdate(req.params.id,{$push : {receivedBy: userId}, $set: {status: "doing"}},{new: true},(err, doc) => {
        if(!err) {
            return res.status(200).json({
                status: 'success',
                roomId : roomId,
                data: doc
            });
        } else {
            return res.status(400).json({
                status: 'fail',
                message: 'Something wrong, try again later'
            })
        };
    });
}

export const getMentorById = async (req, res) => {
    if(!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            status: 'fail',
            message: `Invalid id ${req.params.id}`
        })
    };

    User.findById( req.params.id, (err, doc) => {
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
    const fullname = req.body.fullname;
    User.find({
        "fullname" : {'$regex' : new RegExp(fullname, "i")},
        role : 'mentor'
    }, (err, doc) => {
        if(!err) {
            if(doc.toString() == ""){
                return res.status(400).send(`No record with given name: ${req.body.fullname}`)
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

export const updateMentorById = async (req, res, next) => {
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).json({
            status: 'fail',
            message: `Invalid id ${req.params.id}`
        })
    }

    let mentor = req.body;

    User.findByIdAndUpdate(req.params.id, { $set: mentor}, { new: true}, (err, doc) => {
        if(!err){
            return res.status(200).json({
                status: 'Update mentor success',
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

export const delMentorById = async (req, res, next) => {
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).json({
            status: 'fail',
            message: `Invalid id ${req.params.id}`
        })
    };

    User.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err) {
            return res.status(200).json({
                status: 'Delete mentor success',
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

export const ratingMentor = async (req,res,next) =>{
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).json({
            status: 'fail',
            message: `Invalid id ${req.params.id}`
        })
    };
    let room = await colabRoom.findById(req.params.id);
    let mentorId = room.mentorInfo._id;
    let userId = await useridFromToken(req,res);
    let star = parseInt(req.body.star);
    const currentMentee = await User.findById(userId);
    const currentMentor = await User.findById(mentorId);
    let totalRating1 = currentMentor.rate.totalRating1;
    let totalRating2 = currentMentor.rate.totalRating2;
    let totalRating3 = currentMentor.rate.totalRating3;
    let totalRating4 = currentMentor.rate.totalRating4;
    let totalRating5 = currentMentor.rate.totalRating5;
    if(star == 1) totalRating1 = totalRating1 + 1;
    if(star == 2) totalRating2 = totalRating2 + 1;
    if(star == 3) totalRating3 = totalRating3 + 1;
    if(star == 4) totalRating4 = totalRating4 + 1;
    if(star == 5) totalRating5 = totalRating5 + 1;
    const avgRating = (totalRating1 + 2*totalRating2 + 3*totalRating3 + 4*totalRating4 + 5*totalRating5)/
                    (totalRating1 + totalRating2 + totalRating3 + totalRating4 + totalRating5);
    const rate = {
        totalRating1 : totalRating1,
        totalRating2 : totalRating2,
        totalRating3 : totalRating3,
        totalRating4 : totalRating4,
        totalRating5 : totalRating5,
        avgRating : avgRating
    }
    const reviews = {
        fromID : userId,
        name : currentMentee.fullname,
        content : req.body.content,
        star : star
    }
    User.findByIdAndUpdate(mentorId,{ $set : {rate : rate}, $push : {reviews: reviews} },{new: true},(err, doc) => {
        if(!err) {
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

export const useridFromToken = async (req,res)=>{
    let token;
    try {
        // 1) Getting token and check of it's there
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1];
        }

        if(!token) {
            return res.status(404).json({
            status: 'fail',
            message: 'Invalid Token. Maybe you are not logged in! Please log in to get acces or double check your token'
        })
    }} catch (error) {
        return res.json({
            status: 'fail',
            message: 'Invalid Token, check it again'
        });
    }
    const decoded = await promisify(jwt.verify)(token, process.env.SECRET_KEY);
    var userId = decoded.user._id;
    return userId;
}
export default router;
