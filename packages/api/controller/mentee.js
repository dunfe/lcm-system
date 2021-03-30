import express from 'express';
import mongoose from 'mongoose';
import User from '../models/user.js';
import Mentor from '../models/mentor.js';
import Question from '../models/question.js';
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

export const editOrUpdateUserById = async (req, res) => {
    let userId = await useridFromToken(req, res);
    let user = req.body;

    User.findOneAndUpdate({ _id: userId }, { $set: user }, { new: true }, (err, doc) => {
        if (!err) {
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

//Question of mentee 

export const addFavoriteMentorById = async (req, res) => {
    let userId = await useridFromToken(req, res);
    const currentMentor = await User.findById(req.body.currentMentorId);
    const favorite = {
        mentorId: req.body.currentMentorId,
        mentorName: currentMentor.fullname
    }

    User.findByIdAndUpdate({ _id: userId }, { $push: { favoriteMentor: favorite } }, { new: true }, (err, doc) => {
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
    var listFavorite = [];
    const user = await User.find({ _id: userId }).then((users) => {
        for (var i = 0; i < users.length; i++) {
            listFavorite = listFavorite.concat(users[i].favoriteMentor);
            listFavorite = uniqBy(listFavorite, JSON.stringify);
        }
    })
    const data = await User.find({ favoriteMentor: { $in: listFavorite } });
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
        results.results = await User.find({favoriteMentor:  userId }).limit(limit).skip(startIndex).exec();
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

