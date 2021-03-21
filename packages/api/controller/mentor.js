import express from 'express';
import mongoose from 'mongoose';

import User from '../models/user.js';

const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;

// export const getAllMentor = async (req, res) => {
//     try {
//         const data = await User.find({role : 'mentor'});
//         return res.status(200).json({
//             status: 'success',
//             result: data.length,
//             data: data
//         });        
//     } catch (error) {
//         return res.status(500).send(error.message);
//     }
// };

export function getAllMentor(model) {
    return async (req, res) => {
      let page = parseInt(req.query.page) || 1;
    //   const limit = parseInt(req.query.limit)
      const limit = 50;
      const results = {}
      const data = await model.find({role : 'mentor'});
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
        results.results = await model.find({role : 'mentor'}).limit(limit).skip(startIndex).exec()
        return res.status(200).json(results);
      } catch (e) {
        res.status(500).json({ message: e.message })
      }
    }
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
    let star = parseInt(req.body.star);

    const currentMentee = await User.findById(req.body.currentUserId);
    const currentMentor = await User.findById(req.params.id);
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
        fromID : req.body.currentUserId,
        name : currentMentee.fullname,
        content : req.body.content,
        star : star
    }
    User.findByIdAndUpdate(req.params.id,{ $set : {rate : rate}, $push : {reviews: reviews} },{new: true},(err, doc) => {
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

export default router;
