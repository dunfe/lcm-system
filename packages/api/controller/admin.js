import express from 'express';
import User from '../models/user.js';
import mongoose from 'mongoose';

const router = express.Router();

const ObjectId = mongoose.Types.ObjectId;

export const  totalUser = (req, res) => {
    User.aggregate([
        {
            $match:{}
        },
        {
            $count: "total_user"
        }
    ], (err, doc) => {
        if (!err){ 
            res.json(doc);
        } else {
            console.log('Error' + JSON.stringify(err, undefined, 2));
        };
    });
};

export default router;