import express from 'express';
import mongoose from 'mongoose';

import Request from '../models/noti.js';

const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;

export function getAllNotification(model) {
    return async (req, res) => {
      let page = parseInt(req.query.page);
    //   const limit = parseInt(req.query.limit)
      const limit = 6;
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