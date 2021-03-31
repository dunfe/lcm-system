import express from 'express';
import mongoose from 'mongoose';
import User from '../models/user.js';
import { useridFromToken } from '../controller/mentor.js'
import { uniqBy } from '../controller/question.js'

const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;

//Edit profile
export const viewMenteeInfo = async (req, res) => {
    let userId = await useridFromToken(req, res);
    User.find({ _id: userId }, (err, doc) => {
        if (!err) {
            return res.status(200).json({
                status: 'Success',
                data: doc
            });

        } else {
            return res.status(400).json({
                status: 'fail',
                message: 'Something wrong, try again'
            })
        }
    })
}

export const editProfileUserById = async (req, res) => {
    let userId = await useridFromToken(req, res);
    let user = req.body;

    User.findOneAndUpdate({ _id: userId }, { $set: user }, { new: true }, (err, doc) => {
        if (!err) {
            return res.status(200).json({
                status: 'Edit Profile Successful',
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

//Question of mentee 

export const addFavoriteMentorById = async (req, res) => {
    let userId = await useridFromToken(req, res);
    const currentMentor = await User.findById(req.body.currentMentorId);
    const favorite = {
        mentorId: req.body.currentMentorId,
        mentorName: currentMentor.fullname
    }

    User.findByIdAndUpdate({ _id: userId }, { $addToSet: { favoriteMentor: favorite } }, { new: true }, (err, doc) => {
        if(favorite.mentorId ===favorite.mentorId){
            console.log("A favorate mentor has been created!");
        }
        if (!err) {
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

export const viewListFavoriteMentor = async (req, res) => {
    let page = parseInt(req.query.page) || 1;
    const limit = 50;
    const results = {}
    let userId = await useridFromToken(req, res);
    var favoriteMentor = [];
    const mentee = await User.find({ _id: userId }).then((mentee) => {
        for (var i = 0; i < mentee.length; i++) {
            favoriteMentor = favoriteMentor.concat(mentee[i].favoriteMentor);
            favoriteMentor = uniqBy(favoriteMentor, JSON.stringify);
        }
    })
    console.log(favoriteMentor);
    let data = favoriteMentor;
    const totalPage = Math.ceil(data.length / limit);
    results.totalPage = totalPage;
    if (page < 1 || page > totalPage) page = 1;
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    if (endIndex < data.length) {
        results.next = { page: page + 1 }
    }
    if (startIndex > 0) {
        results.previous = { page: page - 1 }
    }
    try {
        const favoriteMentorPaging = favoriteMentor.slice(startIndex, endIndex);;
        results.results = favoriteMentorPaging
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

//view dashboard
//point out and point in of mentee at router

