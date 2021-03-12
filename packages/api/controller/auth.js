import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

import User from '../models/user.js';
import sendEmail from '../utils/email.js';

const router = express.Router();

const signToken = id => {
    return jwt.sign({ id }, process.env.SECRET_KEY, {
        expiresIn: '1h'
    });
};

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

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    
    // 3) Update changedPasswordAt property for the user

    // 4) Log the user in, send JWT
    try{
        await user.save();
        const token = signToken(user._id);
    
        res.status(200).json({
            status: 'success',
            token
        });
    } catch(err) {
        return res.status(500).send(err.message);
    }
    
    
};

export default router;