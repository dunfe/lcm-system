import express from 'express';
import User from '../models/user.js';
import mongoose from 'mongoose';
import dayjs from 'dayjs';

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
            // console.log('Error' + JSON.stringify(err, undefined, 2));
            res.json({
                status: 'fail',
                message: err.message
            })
        };
    });
};

export const getAllRole = (req, res) => {
   const allRole = ['mentor', 'mentee', 'staff', 'admin', 'banned'];
   res.json({
       status:'success',
       roles: allRole
   })
}

export const countQuesiton = (data) => {
    return data.reduce((result, {createAt}) =>{
        const normalizeDate = dayjs(createAt).format('DD/MM/YYYY')
        if(result.length === 0) {
            result['1/1/2021'] = {
                date: '1/1/2021',
                count: 0,
            }
        }
        result[normalizeDate] = result[normalizeDate] || {
            date : normalizeDate,
            count: 0,
        }

        result[normalizeDate].count++
        return result
    },{})
}

export const countQuesitonbyStatus = (data) => {
    return data.reduce((result, {status}) =>{
        
        result[status] = result[status] || {
            status : status,
            count: 0,
        }

        result[status].count++
        return result
    },{})
}

export default router;