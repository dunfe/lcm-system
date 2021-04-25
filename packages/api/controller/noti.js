import express from 'express';
import mongoose from 'mongoose';
import { useridFromToken } from '../controller/mentor.js'
import Notify from '../models/noti.js';
import User from '../models/user.js';
// import { io } from "socket.io-client";
const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;

export const clickNotify = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            status: 'fail',
            message: `Invalid id ${req.params.id}`
        })
    }
    Notify.findByIdAndUpdate(req.params.id, {$set: {read: true}}, {new : true}, (err, doc) =>{
      if (!err) {
        return res.status(200).json({
            status: 'success',
            roomid : doc.content
        });
    } else {
        return res.status(400).json({
            status: 'fail',
            message: 'Something wrong, try again later'
        })
    }
    })
}

export const getAllNotification = async (req, res) => {
    const results = {}
    let countReadFalse;
    let userId = await useridFromToken(req, res);
    const data = await Notify.find({receivedById : userId});
    const readFalse = await Notify.find({receivedById : userId, read: false});
    countReadFalse = readFalse.length;
    results.totalItem = data.length;
    // var socketio = io("ws://localhost:3007");
    // socketio.emit("news", 5);
    try {
      results.results = await Notify.find({receivedById : userId}).sort({createdAt: 'descending'}).exec()
      return res.status(200).json({
          status: 'success',
          readFalse : countReadFalse,
          data: results
      });
  } catch (e) {
      return res.status(400).json({
          status: 'fail',
          message: e.message
      })
  }
}
