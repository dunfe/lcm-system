import express from 'express';
import mongoose from 'mongoose';
import Report from '../models/report.js';
import { useridFromToken } from '../controller/mentor.js'
import cloudinary from '../utils/cloudinary.js';
import upload from '../utils/multer.js';

const router = express.Router();

export function getAllReport(model) {
    return async (req, res) => {
      let page = parseInt(req.query.page) || 1;
      const limit = 6;
      const results = {}
      const data = await model.find();
      const totalItem = Math.ceil(data.length/limit) ;
      results.totalItem = totalItem;
      if(page<1 || page > totalItem) page = 1;
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

export const uploadImagesReport = async (req, res) => {
  try {
      const urls = [];
      const files = req.files;

      for (const file of files) {
        const { path } = file;
        const newPath = await cloudinary.uploader.upload(path)
        urls.push(newPath.secure_url)
      }

      return res.status(200).json({
          status: 'Success',
          url: urls
      })
  } catch (error) {
      return res.status(400).json({
          status: 'fail',
          message: 'Lỗi ở try'
      })
  }
}

export const createReport = async (req, res) => {
  let userId = await useridFromToken(req, res);
  // Just for upload single file
  // const result = await cloudinary.uploader.upload(req.file.path);

  //Create new report to save to DB
  let report = new Report({
    title: req.body.title,
    createBy: userId,
    content: req.body.content,
    img: req.body.url,
    createdAt: Date.now(),
  });

  // save new report to db
  report.save((err, doc) => {
    if (!err) {
      return res.status(200).json({
          status: 'successful report',
          data: doc
      });
  } else {
      return res.status(400).json({
          status: 'fail',
          message: err.message
      })
  }
  })
}

export default router;