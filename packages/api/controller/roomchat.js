import Room from '../models/Roomchat.js';
import mongoose from 'mongoose';
import express from 'express';
import {useridFromToken} from '../controller/mentor.js'
import User from '../models/user.js'

const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;

export const createRoom = async (req, res,next) => {
    if(!ObjectId.isValid(req.params.id)) { 
        return res.status(400).json({
            status: 'fail',
            message: `Invalid id ${req.params.id}`
        })
    };
    let userId = await useridFromToken(req,res);
    const CurrentUser = await User.findById(userId);
    const chatUser = await User.findById(req.params.id);
    var rooms = {
        name : CurrentUser.fullname + " and " + chatUser.fullname,
        users : [
            {userId: CurrentUser._id, fullname : CurrentUser.fullname},
            {userId: chatUser._id, fullname : chatUser.fullname}
        ],
        messages : []
    }
    var room = new Room(rooms)
    try {
        var roomCheck = await Room.findOne(
            {users: { $elemMatch: {userId: CurrentUser._id},$elemMatch: {userId: CurrentUser._id} }}
        )
        if(roomCheck){
            return res.status(401).json({
                status: 'fail',
                message: "room is exist"
            })
        }else{
            room.save((err, doc) => {
                if(!err) {
                    return res.status(200).json({
                        status: 'success',
                        data: doc._id
                    });
                } else {
                    return res.status(401).json({
                        status: 'fail',
                        message: err.message
                    })
                }
            });
        }
        
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            message: 'Something wrong, try again later'
        })
    }
}

export function createMessage(message) {
    return async (req, res,next) => {
        if(!ObjectId.isValid(req.params.id)) { 
            return res.status(400).json({
                status: 'fail',
                message: `Invalid id ${req.params.id}`
            })
        };
        let currentUserId = await useridFromToken(req,res);
        var user = await User.findById(currentUserId);
        var messages = {
            room: req.params.id,
            userId: user._id,
            fullname: user.fullname,
            message_line: message
        };
        Room.findByIdAndUpdate(req.params.id, { $push: { messages : messages }}, { new: true }, (err, doc) => {
            if(!err){
                //next();
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
}

export const listMessage = async (req, res) => {
    if(!ObjectId.isValid(req.params.id)) { 
        return res.status(400).json({
            status: 'fail',
            message: `Invalid id ${req.params.id}`
        })
    };
    let page = parseInt(req.query.page) || 1;
    const limit = 1;
    const results = {}
    var userId = await useridFromToken(req,res);
    var listMessage = [];
    // var CurrenUserMess = [];
    // var OppositeMess = [];
    const currentRoom = await Room.find({_id : req.params.id}).then((room)=>{
        for (var i = 0; i < room.length; i++) {
            listMessage = listMessage.concat(room[i].messages);
            listMessage = uniqBy(listMessage, JSON.stringify);
          }
    })
    // for (var i = 0; i < listMessage.length; i++) {
    //     if(listMessage[i].userId == userId){
    //         CurrenUserMess = CurrenUserMess.concat(listMessage[i].messages);
    //         CurrenUserMess = uniqBy(CurrenUserMess, JSON.stringify);
    //     }
    //     if(listMessage[i].userId == req.params.id){
    //         OppositeMess = OppositeMess.concat(listMessage[i].messages);
    //         OppositeMess = uniqBy(OppositeMess, JSON.stringify);
    //     }
    // }
    return listMessage;
}