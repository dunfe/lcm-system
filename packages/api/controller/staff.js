import express from 'express';
import mongoose from 'mongoose';
import User from '../models/user.js';
import Mentor from '../models/mentor.js'
import Report from '../models/report.js';
import Rate from '../models/rateExchange.js';
import dotenv from 'dotenv'
import { useridFromToken } from '../controller/mentor.js';
const router = express.Router();
dotenv.config();
const ObjectId = mongoose.Types.ObjectId;

export const updatePoint_Transaction = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No record ${req.params.id}`);
    }
    const user = await User.findById(req.params.id);
    const beforePoint = user.currentPoint;
    const afterPoint = req.body.new_current_point;
    if(afterPoint < beforePoint){
        var amount = beforePoint - afterPoint;
        User.findByIdAndUpdate(req.params.id, 
            { $push: {point_out_history : {method : "point out",
                                        beforePoint : beforePoint,
                                        afterPoint: afterPoint,
                                        amount : amount, 
                                        ref : user.display_name, 
                                        note : req.body.note}} },
            { new: true }, (err, doc) => {
            if (!err) {
                
            } else {
                console.log('Error Point Update: ' + JSON.stringify(err, undefined, 2));
            };
        });
    }else if(afterPoint > beforePoint){
        var amount = afterPoint - beforePoint;
        User.findByIdAndUpdate(req.params.id, 
            { $push: {point_in_history : {method : "point in",
                                        beforePoint : beforePoint,
                                        afterPoint: afterPoint,
                                        amount : amount, 
                                        ref : user.display_name, 
                                        note : req.body.note}} },
            { new: false }, (err, doc) => {
            if (!err) {
                
            } else {
                console.log('Error Point Update: ' + JSON.stringify(err, undefined, 2));
            };
        });
    }
    User.findByIdAndUpdate(req.params.id, { $set: {current_point : req.body.new_current_point} }, { new: true }, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error Point Update: ' + JSON.stringify(err, undefined, 2));
        };
    });
};

export const viewWithdrawalHistoryById = async (req,res) =>{
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No record ${req.params.id}`);
    }
    User.findById(req.params.id,{method: "money-point"},{pointOutHistory: 1},(err,user)=>{
        if(!err) { 
            res.send(user);
        } else {
            console.log('Error' + JSON.stringify(err, undefined, 2)); 
        };
    })
};

export const viewDepositHistoryById  = async (req,res) =>{
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No record ${req.params.id}`);
    }
    User.findById(req.params.id,{method: "money-point"},{pointInHistory: 1},(err,user)=>{
        if(!err) { 
            res.send(user);
        } else {
            console.log('Error' + JSON.stringify(err, undefined, 2)); 
        };
    })
};

export const minusPoint_Transaction = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No record ${req.params.id}`);
    }
    const user = await User.findById(req.params.id);
    const pointBefore = user.currentPoint;
    const amount = req.body.amount;
    const pointAfter = pointBefore - amount;
    const money = req.body.money;
    if(pointAfter < 0){
        res.status(400).json({
                status: 'fail',
                message: 'số point chuyển đi lớn hơn số point hiện có'
            })
    }else {
        User.findByIdAndUpdate(req.params.id, 
            { $push: {pointOutHistory : {method : "point-point",
                                        pointBefore : pointBefore,
                                        pointAfter: pointAfter,
                                        amount : amount, 
                                        ref : user.fullname, 
                                        note : req.body.note}} },
            { new: false }, (err, doc) => {
                if(!err) {
                    
                } else {
                    return res.status(400).json({
                        status: 'fail',
                        message: 'Something wrong, try again later'
                    })
                };
        });
        User.findByIdAndUpdate(req.params.id, { $set: {currentPoint : pointAfter} }, { new: true }, (err, doc) => {
            if (!err) {
                res.send(doc);
            } else {
                console.log('Error Point Update: ' + JSON.stringify(err, undefined, 2));
            };
        });
    }
    
};

export const plusPoint_Transaction = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No record ${req.params.id}`);
    }
    const user = await User.findById(req.params.id);
    const pointBefore = user.currentPoint;
    const amount = req.body.amount;
    const pointAfter = pointBefore + amount;
    User.findByIdAndUpdate(req.params.id, 
        { $push: {pointInHistory : {method : "point-point",
                                    pointBefore : pointBefore,
                                    pointAfter: pointAfter,
                                    amount : amount, 
                                    ref : user.fullname, 
                                    note : req.body.note}} },
        { new: false }, (err, doc) => {
            if(!err) {
                
            } else {
                return res.status(400).json({
                    status: 'fail',
                    message: 'Something wrong, try again later'
                })
            };
    });
    User.findByIdAndUpdate(req.params.id, { $set: {currentPoint : pointAfter} }, { new: true }, (err, doc) => {
        if(!err) {
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

export const viewPointInTransactionById = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No record ${req.params.id}`);
    }
    User.findById(req.params.id,{pointInHistory: 1},(err, doc)=>{
        if(!err) {
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

export const viewPointInTransactionUser = async (req, res) => {
    let page = parseInt(req.query.page) || 1;
    const limit = 10;
    const results = {}
    let userId = await useridFromToken(req, res);
    let data, list, startIndex, endIndex, listUser =[];
    data = await User.findById(userId,{pointInHistory: 1, currentPoint: 1}).then((user) => {
        results.currentPoint = user.currentPoint;
        listUser = listUser.concat(user.pointInHistory);
        listUser = listUser.reverse();
    })
    const totalPage = Math.ceil(listUser.length / limit);
    results.totalPage = totalPage;
    results.totalItem = listUser.length;
    if (page < 1 || page > totalPage) page = 1;
    startIndex = (page - 1) * limit
    endIndex = page * limit
    // list = await User.findById(userId,{pointInHistory: 1}).sort({ createAt: 1 }).limit(limit).skip(startIndex).exec();
    list = listUser.slice(startIndex, endIndex);
    if (endIndex < totalPage) {
        results.next = { page: page + 1 }
    }
    if (startIndex > 0) {
        results.previous = { page: page - 1 }
    }
    try {
        results.results = list;
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

export const viewPointOutTransactionUser = async (req, res) => {
    let page = parseInt(req.query.page) || 1;
    const limit = 10;
    const results = {}
    let userId = await useridFromToken(req, res);
    let data, list, startIndex, endIndex, listUser =[];
    data = await User.findById(userId,{pointInHistory: 1, currentPoint: 1}).then((user) => {
        results.currentPoint = user.currentPoint;
        listUser = listUser.concat(user.pointOutHistory);
        listUser = listUser.reverse();
    })
    const totalPage = Math.ceil(listUser.length / limit);
    results.totalPage = totalPage;
    results.totalItem = listUser.length;
    if (page < 1 || page > totalPage) page = 1;
    startIndex = (page - 1) * limit
    endIndex = page * limit
    // list = await User.findById(userId,{pointInHistory: 1}).sort({ createAt: 1 }).limit(limit).skip(startIndex).exec();
    list = listUser.slice(startIndex, endIndex);
    if (endIndex < totalPage) {
        results.next = { page: page + 1 }
    }
    if (startIndex > 0) {
        results.previous = { page: page - 1 }
    }
    try {
        results.results = list;
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

export const viewPointOutTransactionById = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No record ${req.params.id}`);
    }
    User.findById(req.params.id,{pointOutHistory: 1},(err, doc)=>{
        if(!err) {
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

export const createRequestToAdmin = async (req, res) => {
    const user = await User.findById(req.params.id);
    var request = new Request({
        title: req.body.title,
        createdBy: user.fullname,
        receivedBy: req.body.receivedBy,
        content: req.body.content,
        picture: req.body.picture,
        createAt: req.body.created_date,
        note: req.body.note,
        status: req.body.status
    });

    request.save((err, doc) => {
        if(!err) {
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

export const addRateExchange = (req,res) =>{
    var rate = new Rate({
        rateExchange : 1,
        createAt: req.body.create_date,
        modifiedAt: req.body.last_modified_date
    })
    rate.save((err, doc) => {
        if(!err) {
            return res.status(200).json({
                status: 'success',
                data: doc
            });
        } else {
            return res.status(401).json({
                status: 'fail',
                message: err.message
            })
        }
    });
}

export const updateRateExchange = (req,res) =>{
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).json({
            status: 'fail',
            message: `Invalid id ${req.params.id}`
        })
    }
    var newRate = {
        rateExchange: req.body.newRate,
        modifiedAt: Date.now()
    }
    Rate.findByIdAndUpdate(req.params.id, { $set: newRate }, { new: true}, (err, doc) => {
        if(!err) {
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
}

const exchangeMoneyToPoint = async (money,point) =>{
    var rate = await Rate.findById();
    return point = money*rate.rateExchange*20;
}

const exchangePointToMoney = (money,point) =>{
    return money = point/20*0.9;
}

export default router;