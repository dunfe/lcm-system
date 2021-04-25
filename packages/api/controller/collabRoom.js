import express from 'express';
import mongoose from 'mongoose';
import colabRoom from '../models/collabRoom.js';
import User from '../models/user.js'
import Question from '../models/question.js';
import { useridFromToken } from '../controller/mentor.js'
const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;

export const createCollabRoom = (req, res) => {
    const room = new colabRoom();

    room.save((err, data) => {
        if(!err) {
            res.status(200).json({
                status: 'New Room was created successfully',
                roomInfo: data
              });
            // res.redirect('/room/' + doc._id);
        } else {
            console.log(err);
            return res.status(400).json({
                status: 'fail',
                message: err.message
            })
        }
    })
}

export const joinRoomById = (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).json({
            status: 'fail',
            message: `Invalid id ${req.params.id}`
        })
    }

    colabRoom.findOne({_id: req.params.id}, function(err, data) {
        if (err) {
          console.log(err);
          return res.status(400).json({
            status: 'fail',
            message: err.message
            })
        }
  
        if (data) {
          return res.status(200).json({
              status: `successfully entered the room ${data._id}`,
              roomInfo: data,
            });
        } else {
          res.render('error');
        }
      })
}

export const listRoom = async (req, res) => {
    const results = {}
    let userId = await useridFromToken(req, res);
    let CurrUser = await User.findById(userId);
    let data, listRoom;
    if(CurrUser.role == 'mentor'){
        data = await colabRoom.find({"mentorInfo._id" : userId});
        results.totalItem = data.length;
        listRoom = await colabRoom.find({"mentorInfo._id" : userId}).sort({ createAt: 'descending' }).exec();
    }else if(CurrUser.role == 'mentee'){
        data = await colabRoom.find({"menteeInfo._id" : userId});
        results.totalItem = data.length;
        listRoom = await colabRoom.find({"menteeInfo._id" : userId}).sort({ createAt: 'descending' }).exec();
    }
    try {
        results.results = listRoom;
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

export const viewCollabRoomById = async (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).json({
            status: 'fail',
            message: `Invalid id ${req.params.id}`
        })
    };
    colabRoom.findById(req.params.id, (err, doc) =>{
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
    })
}

export const endCollabRoomById = async (req, res, next) => {
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).json({
            status: 'fail',
            message: `Invalid id ${req.params.id}`
        })
    };
    let room = await colabRoom.findById(req.params.id);
    let ques = await Question.findById(room.questionInfo._id);
    //set status question done
    Question.findByIdAndUpdate(room.questionInfo._id,{$set: {status: "done"}},{new: true},(err, doc) => {
        if(!err) {
            
        } else {
            return res.status(400).json({
                status: 'fail',
                message: 'Something wrong, try again later'
            })
        };
    });
    //plus point to mentor
    let user = await User.findById(room.mentorInfo._id);
    let pointBefore = user.currentPoint;
    let amount = ques.point;
    let pointAfter = pointBefore + amount;
    User.findByIdAndUpdate(room.mentorInfo._id, 
        { $push: {pointInHistory : {method : "point-point",
                                    pointBefore : pointBefore,
                                    pointAfter: pointAfter,
                                    amount : amount, 
                                    ref : user.fullname, 
                                    note : ''}},
        $set: {currentPoint : pointAfter} },
        { new: false }, (err, doc) => {
            if(!err) {
                
            } else {
                return res.status(400).json({
                    status: 'fail',
                    message: 'Something wrong, try again later'
                })
            };
    });
    //minus point of mentee
    user = await User.findById(room.menteeInfo._id);
    pointBefore = user.currentPoint;
    pointAfter = pointBefore - amount;
    User.findByIdAndUpdate(room.menteeInfo._id, 
        { $push: {pointOutHistory : {method : "point-point",
                                    pointBefore : pointBefore,
                                    pointAfter: pointAfter,
                                    amount : amount, 
                                    ref : user.fullname, 
                                    note : ''}},
        $set: {currentPoint : pointAfter} },
        { new: false }, (err, doc) => {
            if(!err) {
                
            } else {
                return res.status(400).json({
                    status: 'fail',
                    message: 'Something wrong, try again later'
                })
            };
    });
    //delete room
    colabRoom.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err) {
            return res.status(200).json({
                status: 'success',
                message: 'Kết thúc session!'
            });
        } else {
            return res.status(400).json({
                status: 'fail',
                message: 'Something wrong, try again later'
            })
        }
    });
};

export default router;