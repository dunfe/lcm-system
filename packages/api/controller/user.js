import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

import User from '../models/user.js';
import Question from '../models/question.js';
import Mentor from '../models/mentor.js';
import Skill from '../models/skill.js';

const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;

export const getSignToken = user => {
    return jwt.sign({
        id: user._id
    }, process.env.SECRET_KEY, { expiresIn: '60d'});
};

export function getAllMentee(model) {
    return async (req, res) => {
      let page = parseInt(req.query.page) || 1;
      const limit = 50;
      const results = {}
      const data = await model.find({role : 'mentee'});
      const totalPage = Math.ceil(data.length/limit) ;
      results.totalPage = totalPage;
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
        results.results = await model.find({role : 'mentee'}).limit(limit).skip(startIndex).exec()
        return res.status(200).json(results);
      } catch (e) {
        res.status(500).json({ message: e.message })
      }
    }
  }

export const getUserById = (req, res) => {
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

// export const getUserByName = (req, res) => {
//     const name = req.body.display_name;
    
//     User.find({ "fullname" : {'$regex' : new RegExp(name, "i")}}, (err, doc) => {
//         if(!err) {
//             if(doc.toString() == ""){ 
//                 return res.status(400).send(`No record with given name: ${req.body.display_name}`)
//             }else {
//                 res.send(doc);
//             }
//         } else {
//             console.log('Error' + JSON.stringify(err, undefined, 2));
//         };
//     })
// };

export const  countAllRecord = async (req, res) => {
    var total_array = {
        totalUser : 0,
        totalMentor: 0,
        totalQuestion : 0,
        totalSkill: 0
    };

    await User.countDocuments((err, doc) => {
        if (!err){ 
            total_array.totalUser = doc;
        } else {
            console.log('Error' + JSON.stringify(err, undefined, 2));
        };
    });

    await Question.countDocuments((err, doc) => {
        if (!err){ 
            total_array.totalQuestion = doc;
        } else {
            console.log('Error' + JSON.stringify(err, undefined, 2));
        };
    });

    await Mentor.countDocuments((err, doc) => {
        if (!err){ 
            total_array.totalMentor = doc;
        } else {
            console.log('Error' + JSON.stringify(err, undefined, 2));
        };
    });
    await Skill.countDocuments((err, doc) => {
        if (!err){ 
            total_array.totalSkill = doc;
        } else {
            console.log('Error' + JSON.stringify(err, undefined, 2));
        };
    });

    res.json(total_array);

};

export const changePassword = async (req, res, next) => {
    try {
        const { id } = req.params;
        const salt = await bcrypt.genSalt(10);
        const newPasswordSalted = await bcrypt.hash(req.body.newPassword, salt);
        const userPassword = await User.findByIdAndUpdate({ _id: id }, { password: newPasswordSalted }, { new: true });
        return res.status(200).json({status: true, data: userPassword});
    } catch (error) {
        return res.status(400).json({ status: false, error: error.message});
    }
};

export const updateUserById = async (req, res, next) => {
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).json({
            status: 'fail',
            message: `Invalid id ${req.params.id}`
        })
    }

    let user = req.body;

    User.findByIdAndUpdate(req.params.id, { $set: user}, { new: true}, (err, doc) => {
        if(!err){
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

export const delUserById = async (req, res, next) => {
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).json({
            status: 'fail',
            message: `Invalid id ${req.params.id}`
        })
    };

    User.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err) {
            return res.status(200).json({
                status: 'Delete user success',
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

export default router;
