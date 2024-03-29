import express from 'express';
import {changePassword,viewUserInfo,editProfileUserById,addFavoriteMentorById,viewListFavoriteMentor,countMentorFaverite, uploadAvatar,dashboardMentee} from '../controller/user.js';
import {forgotPassword, resetPassword} from '../controller/auth.js'
import {ratingMentor} from '../controller/mentor.js';
import {createQuestion,viewListNewOrdoingQuestion, viewListDoneQuestion, getQuestionById, updateQuestionById, delQuestionById,viewListQuestionById} from '../controller/question.js'
import {getAllSkills} from '../controller/skill.js';
import {viewPointOutTransactionUser, viewPointInTransactionUser } from "../controller/staff.js";
import {registerMentorRequest, uploadCVFile} from '../controller/request.js';
import { protect, restrictTo} from '../controller/auth.js';
import { createReport, uploadImagesReport, updateReportById, delReportById, getAllReportFromUser, getReportById } from '../controller/report.js';
import {getAllNotification, clickNotify} from '../controller/noti.js'

import Report from '../models/report.js';
import upload from '../utils/multer.js';
import cloudinary from '../utils/cloudinary.js';
import cors from 'cors'

import passport from 'passport';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {createPayemnt} from '../controller/payment.js';

dotenv.config();

const router = express.Router();

router.get('/dashboard',protect, restrictTo('mentee', 'mentor'),dashboardMentee);

router.post('/register',async (req, res, next) => {
        passport.authenticate(
            'register', {session: false},
            async (err, user, info) => {
                try {
                    if (err || !user) {
                        const error = new Error(info.message);
                        return next(error);
                    }
                    res.json({
                        message: 'Signup successful',
                        user: req.user
                    });
                } catch (error) {
                    // res.json({ error: error+"" });
                    return next(error.message);
                }
            }
        )(req, res, next);
    }
);

router.post(
    '/login',
    async (req, res, next) => {
        passport.authenticate(
            'local-login',
            async (err, user, info) => {
                try {
                    if (err || !user) {
                        const error = new Error(info.message);
                        return next(error);
                    }
                    req.login(
                        user,
                        {session: false},
                        async (error) => {
                            if (error) return next(error);
                            if(user.role == 'banned') {
                                return res.status(500).json({
                                    status: 'banned',
                                    message: 'Người dùng đã bị vô hiệu hóa'
                                })
                            }
                            // if(user.role == 'admin') {
                            //     return res.json({
                            //         status: 'banned',
                            //         message: 'Vui lòng sử dụng ứng dụng cho admin!!'
                            //     })
                            // }
                            const body = {_id: user._id, username: user.username};
                            let token = "Bearer ";
                            token += jwt.sign({user: body}, process.env.SECRET_KEY).toString();
                            // return res.json({ token, user });
                            const data = {
                                _id: user._id,
                                username: user.username,
                                email: user.email,
                                fullname: user.fullname,
                                role: user.role,
                                level: user.level,
                                detail: {
                                    dob: user.detail.dob,
                                    gender: user.detail.gender,
                                    phone: user.detail.phone,
                                    address: user.detail.address,
                                    avatar: user.detail.avatar,
                                    currentJob: user.detail.currentJob,
                                    achievement: user.detail.achievement
                                }
                            }
                            return res.json({
                                user: {
                                    token: token,
                                    data
                                }
                            })
                        }
                    );
                } catch (error) {
                    return next(error);
                }
            }
        )(req, res, next);
    }
);

// auth with google+
router.get('/google', passport.authenticate('google', { scope:['profile', 'email'] }));

router.get('/google/redirect', (req, res, next) =>
    passport.authenticate('google', {
        successRedirect: 'http://localhost:3001',
        failureRedirect: 'http://localhost:3001/login'
    }, (err, user) => {
        if(user.role == 'banned') {
            return res.json({
                status: 'banned',
                message: 'User has been banned'
            })
        }
        const body = {_id: user._id, username: user.username};
        let token = "Bearer ";
        token += jwt.sign({user: body}, process.env.SECRET_KEY).toString();
        const data = {
            _id: user._id,
            username: user.username,
            email: user.email,
            fullname: user.fullname,
            role: user.role,
            level: user.level,
            detail: {
                dob: user.detail.dob,
                gender: user.detail.gender,
                phone: user.detail.phone,
                address: user.detail.address,
                avatar: user.detail.avatar,
                currentJob: user.detail.currentJob,
                achievement: user.detail.achievement
            }
        }
        res.cookie('user', JSON.stringify({
            user: {
                token,
                data
            }
        }), {domain: '.livecoding.me', secure: true})
        res.redirect('http://localhost:3001');
    })(req, res, next)
);

// auth with facebook
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/facebook/redirect', (req, res, next) =>
    passport.authenticate('facebook', {
        successRedirect: 'http://localhost:3001',
        failureRedirect: 'http://localhost:3001/login'
    }, (err, user) => {
        if(user.role == 'banned') {
            return res.json({
                status: 'banned',
                message: 'User has been banned'
            })
        }
        const body = {_id: user._id, username: user.username};
        let token = "Bearer ";
        token += jwt.sign({user: body}, process.env.SECRET_KEY).toString();
        const data = {
            _id: user._id,
            username: user.username,
            email: user.email,
            fullname: user.fullname,
            role: user.role,
            level: user.level,
            detail: {
                dob: user.detail.dob,
                gender: user.detail.gender,
                phone: user.detail.phone,
                address: user.detail.address,
                avatar: user.detail.avatar,
                currentJob: user.detail.currentJob,
                achievement: user.detail.achievement
            }
        }
        res.cookie('user', JSON.stringify({
            user: {
                token,
                data
            }
        }), {domain: '.livecoding.me', secure: true})
        res.redirect('http://localhost:3001');
    })(req, res, next)
);

// auth with github
router.get('/github', passport.authenticate('github', {scope: ['user:email']}));

router.get('/github/redirect', (req, res, next) =>
    passport.authenticate('github', {
        successRedirect: 'http://localhost:3001',
        failureRedirect: 'http://localhost:3001/login'
    }, (err, user) => {
        if(user.role == 'banned') {
            return res.json({
                status: 'banned',
                message: 'User has been banned'
            })
        }
        const body = {_id: user._id, username: user.username};
        let token = "Bearer ";
        token += jwt.sign({user: body}, process.env.SECRET_KEY).toString();
        const data = {
            _id: user._id,
            username: user.username,
            email: user.email,
            fullname: user.fullname,
            role: user.role,
            level: user.level,
            detail: {
                dob: user.detail.dob,
                gender: user.detail.gender,
                phone: user.detail.phone,
                address: user.detail.address,
                avatar: user.detail.avatar,
                currentJob: user.detail.currentJob,
                achievement: user.detail.achievement
            }
        }
        res.cookie('user', JSON.stringify({
            user: {
                token,
                data
            }
        }), {domain: '.livecoding.me', secure: true})
        res.redirect('http://localhost:3001');
    })(req, res, next)
);

router.get('/logout', (req, res) => {
    req.logOut();
    res.json({message: 'logout successful'});
})

//password function
router.post('/change-password', protect, changePassword);
router.post('/forgot-password', forgotPassword);
router.patch('/reset-password/:token', resetPassword);

// create request register mentor 
router.post('/mentor/register',protect,restrictTo('mentee'),registerMentorRequest);

//rate mentor
router.post('/mentor/rate/:id',protect,restrictTo('mentee'),ratingMentor);

//CRUD report mentor
router.post('/reports', protect, restrictTo('mentee'), createReport);
router.get('/reports', protect, restrictTo('mentee'), getAllReportFromUser);
router.get('/reports/:id', protect, restrictTo('mentee'), getReportById);
router.put('/reports/:id', protect,restrictTo('mentee'), updateReportById);
router.delete('/reports/:id', protect, restrictTo('mentee'), delReportById);

// user crud question
router.post('/questions',protect,restrictTo('mentee'),createQuestion);
router.get('/questions',protect, restrictTo('mentee', 'mentor'),viewListQuestionById);
router.get('/questions/new',protect, restrictTo('mentee', 'mentor'),viewListNewOrdoingQuestion);
router.get('/questions/done',protect, restrictTo('mentee', 'mentor'),viewListDoneQuestion);
router.get('/questions/:id',protect,restrictTo('mentee', 'mentor'),getQuestionById);
router.put('/questions/:id',protect,restrictTo('mentee'),updateQuestionById);
router.delete('/questions/:id',protect,restrictTo('mentee'),delQuestionById);

// select metor for resolve question
// router.get('/matching/suggestions/:id',protect,restrictTo('mentee'),listMentorSelectedInOneQuestion);
// router.post('/matching/suggestions/:id',protect,restrictTo('mentee'),selectMentor);

//add favor mentor and list favor mentor
router.put('/favorite-mentor/:id',protect,restrictTo('mentee'),addFavoriteMentorById);
router.get('/favorite-mentor',protect,restrictTo('mentee'),viewListFavoriteMentor);
router.get('/favorite-mentor/count',protect,restrictTo('mentee'),countMentorFaverite)

//UPLOAD API
//Upload avatar
router.post('/upload-file', cors(), protect,restrictTo('mentee', 'mentor'),upload.single('avatar'), uploadAvatar);

//Upload images for report mentor
router.post('/reports/upload-file', cors(), protect,restrictTo('mentee', 'mentor'), upload.array('img[]'), uploadImagesReport);

//Upload CV file for register mentor
router.post('/mentor/register/upload-file', cors(), protect,restrictTo('mentee'), upload.single('cv'), uploadCVFile);


//profile function
router.get('/',protect,restrictTo('mentee', 'mentor'),viewUserInfo);
router.put('/',protect,restrictTo('mentee', 'mentor'),editProfileUserById);

//vỉew history point transaction
router.get('/pointIn',protect,restrictTo('mentee', 'mentor'),viewPointInTransactionUser);
router.get('/pointOut',protect,restrictTo('mentee', 'mentor'),viewPointOutTransactionUser);

// get all skill for all role
router.get('/skills',getAllSkills);

//notify
router.get('/notify',protect,restrictTo('mentee', 'mentor'),getAllNotification);
router.put('/notify/:id',protect,restrictTo('mentee', 'mentor'),clickNotify)

//payment
router.post('/payment',protect,restrictTo('mentee','mentor'),createPayemnt);
export default router;
