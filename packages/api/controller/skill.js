import express from 'express';
import mongoose from 'mongoose';
import Skill from '../models/skill.js';
const router = express.Router();

const ObjectId = mongoose.Types.ObjectId;

export const getSkills = (req, res) => {
    Skill.find((err,doc) => {
        if(!err) {
            res.send(doc);
        } else {
            console.log('Error' + JSON.stringify(err, undefined, 2)); 
        }
    })
};

export const getSkill = (req, res) => {
    if(!ObjectId.isValid(req.params.id)) { 
        return res.status(400).send(`No record with given id: ${req.params.id}`)
    };

    Skill.findById(req.params.id, (err, doc) =>{
        if(!err) { 
            res.send(doc);
        } else {
            console.log('Error' + JSON.stringify(err, undefined, 2)); 
        };
    })
};

export const getSkillByName = (req, res) => {
    Skill.find({ skill_name : req.body.skill_name }, (err, doc) =>{
        if(!err) { 
            if(doc.toString() == ""){ 
                return res.status(400).send(`No record with given name: ${req.body.skill_name}`)
            }else {
                res.send(doc);
            }
        } else {
            console.log('Error' + JSON.stringify(err, undefined, 2)); 
        };
    })
};

export const createSkill = (req, res) => {
    var skill = new Skill({
        skill_name: req.body.skill_name,
        create_date: req.body.create_date,
        last_modified_date: req.body.last_modified_date
    });

    skill.save((err, doc) => {
        if(!err) {
            res.send(doc);
        } else {
            console.log('Error in Skill Save: '+ JSON.stringify(err, undefined, 2));
        }
    });
};

export const updateSkill = (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send(`No record with given id: ${req.params.id}`);
    }

    var skill = {
        skill_name: req.body.skill_name,
        create_date: req.body.create_date,
        last_modified_date: req.body.last_modified_date
    };

    Skill.findByIdAndUpdate(req.params.id, { $set: skill }, { new: true}, (err, doc) => {
        if(!err) {
            res.send(doc);
        } else {
            console.log('Error in skill Update: '+ JSON.stringify(err, undefined, 2));
        };
    });

};

export const deleteSkill = (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send(`No record with given id: ${req.params.id}`);
    };

    Skill.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error in skill delete: '+ JSON.stringify(err, undefined, 2));
        }
    });
};

export default router;