import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { promisify } from 'util';

import User from '../models/user.js';
import sendEmail from '../utils/email.js';
// import { json } from 'body-parser';

const router = express.Router();

// const signToken = id => {
//     return jwt.sign({ id }, process.env.SECRET_KEY, {
//         expiresIn: '60d'
//     });
// };

export const forgotPassword =  async(req, res, next) => {
    // 1) Get user based on POSTED email
    const user = await User.findOne({ email: req.body.email});
    
    if(!user) {
        return res.status(404).send('There is no user with email addres'); 
    }

    // 2) Generate the random reset token
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    // 3) Send it to email
    // const resetURL = `${req.protocal}://${req.get('host')}/api/users/reset-password/${resetToken}}`;
    const resetURL = `localhost:3000/api/users/reset-password/${resetToken}}`;

    const message = `Forgot your password? Submit a PATCH request with your new massword and password confirm to: ${resetURL}.\nIf you did not forget your password, please ignore this email!`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Your password reset token (valid for only 10 mins)',
            message
        });
    
        res.status(200).json({
            status: 'success',
            message: 'Token sent to email!'
        });
    } catch (err) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });

        return res.status(500).send(err.message);
    }
    
};

export const resetPassword = async (req, res, next) => {
    // 1) Get user based on the token
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() }
        });
    // 2) If token has not expired, and there is user, set the new password
    if(!user) {
        return next(res.status(400).send('Token is invalid or has expired'));
    }
    const tempUser = new User();
    user.password = tempUser.generateHash(req.body.new_password);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    
    // 3) Update changedPasswordAt property for the user

    // 4) Log the user in, send JWT
    try{
        await user.save();
        const body = { _id: user._id, username: user.username };
        const token = "Bearer "+ jwt.sign({ user: body }, process.env.SECRET_KEY,{
            expiresIn: '10m'
        });
    
        res.status(200).json({
            status: 'success',
            token
        });
    } catch(err) {
        return res.status(500).send(err.message);
    }
    
    
};

export const protect = async (req, res, next) => {
    try {
        // 1) Getting token and check of it's there
        let token;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1];
        }

        // console.log(token);

        if(!token) {
            return res.status(404).json({
            status: 'fail',
            message: 'Invalid Token. Maybe you are not logged in! Please log in to get acces or double check your token'
        })
    }
    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.SECRET_KEY);
    // console.log(decoded.user._id);

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.user._id);
  
    if(!currentUser) {
        return res.status(401).json({
            status:'fail',
            message: 'The user belonging to this token dones no longer exist!'
        });
    }

    // 4) CHeck if user changed password after the token was issued
    if (currentUser.changePasswordAter(decoded.iat)){
        return res.status(401).json({
            status: 'fail',
            message: 'User recently changed password! Please log in again'
        });
    }

    // GRANT ACCESS TO PRETECTED ROUTE
    req.user = currentUser;
    next();
    } catch (error) {
        return res.json({
            status: 'fail',
            message: 'Invalid Token, check it again'
        });
    }
    
}

export const restrictTo = (...roles) => {
    return (req, res, next) =>{
        if(!roles.includes(req.user.role)) {
            return res.status(403).json({
                status: 'fail',
                message: 'You do not have permission to perform this action'
            });
        }

        next();
    };
};

export default router;