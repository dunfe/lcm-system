import express from 'express';
import mongoose from 'mongoose';
import { useridFromToken } from '../controller/mentor.js'
import Notify from '../models/noti.js';
import User from '../models/user.js';

const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;

export const clickNotify = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            status: 'fail',
            message: `Invalid id ${req.params.id}`
        })
    }

}

export const getAllNotification = async (req, res) => {
    let page = parseInt(req.query.page) || 1;
    const limit = 6;
    const results = {}
    let userId = await useridFromToken(req, res);
    const data = await Notify.find({receivedById : userId});
    const totalPage = Math.ceil(data.length/limit) ;
    results.totalPage = totalPage;
    if(page<1 || page > totalPage) page = 1;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    if (endIndex < data.length) {
      results.next = {
        page: page + 1
      }
    }
    if (startIndex > 0) {
      results.previous = {
        page: page - 1
      }
    }
    try {
      results.results = await Notify.find({receivedById : userId})
        .sort({createdAt: 'descending'}).limit(limit).skip(startIndex).exec()
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