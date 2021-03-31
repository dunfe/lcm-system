import express from 'express';
import mongoose from 'mongoose';
import colabRoom from '../models/collabRoom.js';

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

export default router;