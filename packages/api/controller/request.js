import express from 'express';
import mongoose from 'mongoose';

import Request from '../models/request.js';

const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;

export const createRequest = (req, res) => {
    const request = new Request({
        request_title: req.body.request_title,
        created_by: req.body.created_by,
        received_by: req.body.received_by,
        request_content: req.body.request_content,
        picture: req.body.picture,
        created_date: req.body.created_date,
        note: req.body.note,
    });

    request.save((err, doc) => {
        if(!err) {
            res.send(doc);
        } else {
            console.log('Error in saving new request:' + JSON.stringify(err, undefined, 2));
        };
    });
};

export const getAllRequest = (req, res) => {
    Request.find((err, doc) => {
        if(!err) {
            res.send(doc);
        } else {
            console.log('Error' + JSON.stringify(err, undefined, 2));
        };
    });
};

export const getRequestById = (req, res) => {
    if(!ObjectId.isValid(req.params.id)) { 
        return res.status(400).send(`No record with given id: ${req.params.id}`)
    };

    Request.findById( req.params.id, (err, doc) => {
        if (!err){
            res.send(doc);
        } else {
            console.log('Error' + JSON.stringify(err, undefined, 2));
        };
    });
};

export default router;