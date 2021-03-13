import express from 'express';
import mongoose from 'mongoose';
import User from '../models/user.js';
import Mentor from '../models/mentor.js'
import Report from '../models/report.js';
import Rate from '../models/rateExchange.js';
const router = express.Router();

const ObjectId = mongoose.Types.ObjectId;

export const updatePoint_Transaction = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No record ${req.params.id}`);
    }
    const user = await User.findById(req.params.id);
    const beforePoint = user.current_point;
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
    User.findById(req.params.id,{method: "money-point"},{point_out_history: 1},(err,user)=>{
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
    User.findById(req.params.id,{method: "money-point"},{point_in_history: 1},(err,user)=>{
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
    const beforePoint = user.current_point;
    const amount = req.body.amount;
    const afterPoint = beforePoint - amount;
    const money = req.body.money;

    if(afterPoint < 0){
        res.send('Ban ko du point de rut');
    }else {
        User.findByIdAndUpdate(req.params.id, 
            { $push: {point_out_history : {method : req.body.note,
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
        User.findByIdAndUpdate(req.params.id, { $set: {current_point : afterPoint} }, { new: true }, (err, doc) => {
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
    const beforePoint = user.current_point;
    const amount = req.body.amount;
    const afterPoint = beforePoint + amount;
    User.findByIdAndUpdate(req.params.id, 
        { $push: {point_in_history : {method : "point-point",
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
    User.findByIdAndUpdate(req.params.id, { $set: {current_point : afterPoint} }, { new: true }, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error Point Update: ' + JSON.stringify(err, undefined, 2));
        };
    });
};

export const viewPointInTransactionById = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No record ${req.params.id}`);
    }
    User.findById(req.params.id,{point_in_history: 1},(err,user)=>{
        if(!err) { 
            res.send(user);
        } else {
            console.log('Error' + JSON.stringify(err, undefined, 2)); 
        };
    })
}

export const viewPointOutTransactionById = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No record ${req.params.id}`);
    }
    User.findById(req.params.id,{point_out_history: 1},(err,user)=>{
        if(!err) { 
            res.send(user);
        } else {
            console.log('Error' + JSON.stringify(err, undefined, 2)); 
        };
    })
}

export const createRequestToAdmin = async (req, res) => {
    const user = await User.findById(req.params.id);
    var request = new Request({
        request_title: req.body.request_title,
        created_by: user.display_name,
        received_by: req.body.received_by,
        request_content: req.body.request_content,
        picture: req.body.picture,
        created_date: req.body.created_date,
        note: req.body.note,
        status: req.body.status
    });

    request.save((err, doc) => {
        if (!err) {
            console.log('save success!');
            res.send(doc);
        } else {
            console.log('Error in request save: ' + JSON.stringify(err, undefined, 2));
        }
    });
};

export const getAllReport = (req, res) => {
    Report.find((err,doc) => {
        if(!err) {
            res.send(doc);
        } else {
            console.log('Error' + JSON.stringify(err, undefined, 2)); 
        }
    })
};

export const addRate = (req,res) =>{
    var rate = new Rate({
        rateExchange : 1,
        create_date: req.body.create_date,
        last_modified_date: req.body.last_modified_date
    })
    rate.save((err, doc) => {
        if(!err) {
            res.send(doc);
        } else {
            console.log('Error in rateExchange Save: '+ JSON.stringify(err, undefined, 2));
        }
    });
}

export const updateRateExchange = (req,res) =>{
    var newRate = {
        rateExchange: req.body.newRate,
        last_modified_date: Date.now()
    }
    Rate.findByIdAndUpdate(1,{$set:{}})
}

const exchangeMoneyToPoint = async (money,point) =>{
    var rate = await Rate.findById();
    return point = money*rate.rateExchange*20;
}

const exchangePointToMoney = (money,point) =>{
    return money = point/20*0.9;
}

export default router;