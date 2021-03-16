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

export const register = async (req, res, next) => {
    const { username, password,email, fullname} = req.body;
    const user = await User.findOne({username});
    console.log(user);
    if( user ){
        return res.status(403).json({error: { message: 'username already in use!'}});
    };

    const newUser = new User();
    newUser.username = username;
    newUser.password = password;
    newUser.email = email;
    newUser.fullname = fullname;
    try {
        await newUser.save();
        const token = getSignToken(newUser);
        res.status(200).json({ token });
    } catch (error) {
        error.status = 400;
        next(error);
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user){
        return res.status(403).json({ error: {message: 'invalid username/password'}});
    };

    // const isValid = await user.validPassword(password);

    // if(!isValid){
    //     return res.status(401).json({ error: {message: 'invalid username/password'}});
    // };

    const token = getSignToken(user);
    
    return res.status(200).json({ token });
};

export const createUser = async (req, res) => {
    const { username, password, email, fullname,point_out_history} = req.body;
    const user = await User.findOne({username});

    if( user ){
        return res.status(403).json({error: { message: 'username already in use!'}});
    };

    const newUser = new User({ username, password, email, fullname });
    try {
        await newUser.save();
        res.status(200).json('saved');
    } catch (error) {
        error.status = 400;
        res.json(error);
    }
};

export const getAllUser = async (req, res) => {
    try {
        const data = await User.find();

        return res.status(200).json({
            status: 'success',
            result: data.length,
            data: data
        })
    } catch (error) {
         return res.status(500).send(error.message);
    }
    
};

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
