import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const router = express.Router();

export const getSignToken = user => {
    return jwt.sign({
        id: user._id,
        username: user.username,
        email: user.email,
        status: user.status,
        created_date: user.created_date,
        last_modified_date: user.last_modified_date
    }, process.env.SECRET_KEY, { expiresIn: '1h'});
};

export const register = async (req, res, next) => {
    const { username, password, email, status, created_date, last_modified_date} = req.body;
    const user = await User.findOne({username});
    console.log(user);
    if( user ){
        return res.status(403).json({error: { message: 'username already in use!'}});
    };

    const newUser = new User();
    newUser.username = username;
    newUser.password = newUser.generateHash(password);
    newUser.email = email;
    try {
        await newUser.save();
        const token = getSignToken(newUser);
        res.status(200).json({ token });
    } catch (error) {
        error.status = 400;
        next(error);
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user){
        return res.status(403).json({ error: {message: 'invalid username/password'}});
    };

    const isValid = await user.isPasswordValid(password);

    if(!isValid){
        return res.status(401).json({ error: {message: 'invalid username/password'}});
    };

    const token = getSignToken(user);
    
    return res.status(200).json({ token });
};

export const createUser = async (req, res) => {
    const { username, password, display_name,point_out_history} = req.body;
    const user = await User.findOne({username});

    if( user ){
        return res.status(403).json({error: { message: 'username already in use!'}});
    };

    const newUser = new User({ username, password, display_name,point_out_history });
    try {
        await newUser.save();
        res.status(200).json('saved');
    } catch (error) {
        error.status = 400;
        res.json(error);
    }
};

export default router;
