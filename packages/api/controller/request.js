import express from 'express';
import mongoose from 'mongoose';
import User from '../models/user.js'
import Request from '../models/request.js';
import {useridFromToken} from '../controller/mentor.js'
const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;

export const registerMentorRequest = async (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).json({
            status: 'fail',
            message: `Invalid id ${req.params.id}`
        })
    }
    var userId = await useridFromToken(req,res);
    const user = await User.findById(userId);
    const formInput = {
      skill: req.body.skill,
      bio: req.body.bio,
      github: req.body.github,
      detail: {currentJob: req.body.currentJob, achievement: req.body.achievement},
      modifieAt: Date.now()
    }
    const request = new Request({
        title: req.body.title,
        createdId: user._id,
        createdName: user.fullname,
        receivedBy: req.body.receivedBy,
        content: req.body.content,
        picture: req.body.picture,
        createdAt: req.body.createdAt
    });
    User.findByIdAndUpdate(userId,{$set: formInput}, { new: true}, (err, doc) => {
      if(!err) {
         
      } else {
          return res.status(400).json({
              status: 'fail',
              message: 'Something wrong, try again later'
          })
      };
  });
    request.save((err, doc) => {
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

export const confirmRequestMentorRegister = async (req,res) =>{
  if(!ObjectId.isValid(req.params.id)){
    return res.status(400).json({
        status: 'fail',
        message: `Invalid request id ${req.params.id}`
    })
  }
  const request = await Request.findById(req.params.id);
  User.findByIdAndUpdate(request.createdId,{$set: {role: "mentor",level: 1}},{new:true}, (err, doc) => {
    if(!err) {
        
    } else {
        return res.status(400).json({
            status: 'fail',
            message: 'Something wrong, try again later'
        })
    };
  });
  Request.findByIdAndUpdate(req.params.id,{$set: {status: "approved"}},{new:true}, (err, doc) => {
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

// export const getAllRequest = async (req, res) => {
//     try {
//         const data = await Request.find();
//         return res.status(200).json({
//             status: 'success',
//             result: data.length,
//             data: data
//         })
//     } catch (error) {
//         return res.status(500).send(error.message);
//     }
// };

export function getAllRequest(model) {
    return async (req, res) => {
      let page = parseInt(req.query.page) || 1;
    //   const limit = parseInt(req.query.limit)
      const limit = 50;
      const results = {}
      const data = await model.find();
      const totalPage = Math.ceil(data.length/limit) ;
      results.totalPage = totalPage;
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
        results.results = await model.find().limit(limit).skip(startIndex).exec()
        return res.status(200).json(results);
      } catch (e) {
        res.status(500).json({ message: e.message })
      }
    }
  }

export const getRequestById = (req, res) => {
    if(!ObjectId.isValid(req.params.id)) { 
        return res.status(400).json({
            status: 'fail',
            message: `Invalid id ${req.params.id}`
        })
    };

    Request.findById( req.params.id, (err, doc) => {
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

export default router;