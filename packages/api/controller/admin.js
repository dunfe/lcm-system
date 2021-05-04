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
        
            result['1/1/2021'] = {
                date: '1/1/2021',
                count: 0,
            }
        
        result[normalizeDate] = result[normalizeDate] || {
            date : normalizeDate,
            count: 0,
        }

        result[normalizeDate].count++
        return result
    },{})
}

export const countUser = (data) => {
    return data.reduce((result, {createdAt}) =>{
        const normalizeDate = dayjs(createdAt).format('DD/MM/YYYY')
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

export const countUserbyRole = (data) => {
    return data.reduce((result, {role}) =>{
        
        result[role] = result[role] || {
            status : role,
            count: 0,
        }

        result[role].count++
        return result
    },{})
}

export const countPoint = (data) => {
    return data.reduce((result, {createAt,pointAfter}) =>{
        const normalizeDate = dayjs(createAt).format('DD/MM/YYYY')
        
        result['1/1/2021'] = {
            date: '1/1/2021',
            point: 0,
        }
        
        result[normalizeDate] = result[normalizeDate] || {
            date : normalizeDate,
            point: pointAfter,
        }

        // result[normalizeDate].point += result[normalizeDate].point;
        return result
    },{})
}

export default router;