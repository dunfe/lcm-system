import express from 'express';
import mongoose from 'mongoose';
import User from '../models/user.js'
import Request from '../models/request.js';
import {useridFromToken} from '../controller/mentor.js'
import cloudinary from '../utils/cloudinary.js';
import upload from '../utils/multer.js';
const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;

export const uploadCVFile = async (req, res) => {
  try {
      const result = await cloudinary.uploader.upload(req.file.path);
      return res.status(200).json({
          status: 'Success',
          url: result.secure_url
      })
  } catch (error) {
      return res.status(400).json({
          status: 'fail',
          message: 'Lỗi ở try'
      })
  }
}

export const registerMentorRequest = async (req, res) => {
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
        title: 'Đăng kí mentor',
        createdId: user._id,
        createdName: user.fullname,
        content: req.body.content,
        cv: req.body.cv,
        createdAt: Date.now()
    });
    User.findByIdAndUpdate(userId,{$set: formInput}, { new: true}, (err, doc) => {
      if(!err) {
         
      } else {
          return res.status(400).json({
              status: 'fail',
              message: 'User wrong, try again later'
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

export const delRequest = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
        status: 'fail',
        message: `Invalid id ${req.params.id}`
    })
};

Request.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
        return res.status(200).json({
            status: 'success',
            message: 'Delete request success'
        });
    } else {
        return res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
});
}

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

export function getAllRequest(model) {
    return async (req, res) => {
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