import express from 'express';
import mongoose from 'mongoose';
import Skill from '../models/skill.js';
const router = express.Router();

const ObjectId = mongoose.Types.ObjectId;

export const getAllSkills = async (req, res) => {
    try {
        const data = await Skill.find();

        return res.status(200).json({
            status: 'success',
            result: data.length,
            skill:data
        })
    } catch (error) {
        return res.status(500).send(error.message);
    }
    
};

export const getSkillById = (req, res) => {
    if(!ObjectId.isValid(req.params.id)) { 
        return res.status(400).json({
            status: 'fail',
            message: `Invalid id ${req.params.id}`
        })
    };

    Skill.findById(req.params.id, (err, doc) =>{
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
};

export const getSkillByName = (req, res) => {
    const skill = req.body.skill_name;
    Skill.find({ name : {'$regex' : new RegExp(skill, "i")} }, (err, doc) =>{
        if(!err) { 
            if(doc.toString() == ""){ 
                return res.status(400).send(`No record with given name: ${req.body.name}`)
            }else {
                res.send(doc);
            }
        } else {
            console.log('Error' + JSON.stringify(err, undefined, 2)); 
        };
    })
};

export const createSkill = async (req, res) => {
    var skill = new Skill({
        name: req.body.name
    });

    try {
        skill.save((err, doc) => {
            if(!err) {
                return res.status(200).json({
                    status: 'success',
                    data: doc
                });
            } else {
                return res.status(401).json({
                    status: 'fail',
                    message: 'Something wrong, try again later, maybe duplicate skill name'
                })
            }
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            message: 'Something wrong, try again later'
        })
    }
    
};

export const updateSkill = (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).json({
            status: 'fail',
            message: `Invalid id ${req.params.id}`
        })
    }

    var skill = {
        name: req.body.name,
        modifiedAt: Date.now()
    };

    Skill.findByIdAndUpdate(req.params.id, { $set: skill }, { new: true}, (err, doc) => {
        if(!err) {
            return res.status(200).json({
                status: 'success',
                data: doc
            }); 
        } else {
            return res.status(400).json({
                status: 'fail',
                message: 'Something wrong, try again later, maybe duplicate skill name'
            })
        };
    });

};

export const deleteSkill = (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).json({
            status: 'fail',
            message: `Invalid id ${req.params.id}`
        })
    };

    Skill.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            return res.status(200).json({
                status: 'success',
                data: doc
            });
        } else {
            return res.status(400).json({
                status: 'fail',
                message: 'Something wrong, try again later'
            })
        }
    });
};

export default router;