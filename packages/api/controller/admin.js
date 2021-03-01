import express from 'express';
import User from '../models/user.js';

const router = express.Router();

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.json(users);
    } catch (error) {
        console.log(error);
        res.json(error);
    }
};


export const getUserById = async (req, res) => {
        try {
            const user = await User.findOne({
                _id: req.params.id,
            });

            res.json(user);
        } catch (error) {
            console.log(error);
            res.json(error);
        }
    
};

export const getUserByName = async (req, res) => {
    try {
        const user = await User.find({
            display_name: req.body.display_name
        });

        res.json(user);
    } catch (error) {
        console.log(error);
        res.json(error);
    }
};

export default router;