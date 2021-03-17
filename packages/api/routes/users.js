import express from 'express';
import {changePassword} from '../controller/user.js';
import {forgotPassword, resetPassword} from '../controller/auth.js'
import passport from 'passport';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.post(
    '/register',
    async (req, res, next) => {
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
                    return next(error);
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
                                    avatar: user.detail.avatar
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
router.get('/google', passport.authenticate('google', {
    scope:
        ['profile', 'email']
}));

router.get('/google/redirect', (req, res, next) =>
    passport.authenticate('google', {
        successRedirect: 'http://localhost:3001',
        failureRedirect: 'http://localhost:3001/login'
    }, (err, user) => {

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
                avatar: user.detail.avatar
            }                          
        }
        console.log(data)
        res.cookie('user', JSON.stringify({
            user: {
                token,
                data
            }
        }))
        res.redirect('http://localhost:3001');
    })(req, res, next)
);

// auth with facebook
router.get('/facebook', passport.authenticate('facebook', {
    scope:
        ['email']
}));

router.get('/facebook/redirect', (req, res, next) =>
    passport.authenticate('facebook', {
        successRedirect: 'http://localhost:3001',
        failureRedirect: 'http://localhost:3001/login'
    }, (err, user) => {

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
                avatar: user.detail.avatar
            }                          
        }
        res.cookie('user', JSON.stringify({
            user: {
                token,
                data
            }
        }))
        res.redirect('http://localhost:3001');
    })(req, res, next)
);

// auth with github
router.get('/github',
    passport.authenticate('github', {scope: ['user:email']}));

router.get('/github/redirect', (req, res, next) =>
    passport.authenticate('github', {
        successRedirect: 'http://localhost:3001',
        failureRedirect: 'http://localhost:3001/login'
    }, (err, user) => {

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
                avatar: user.detail.avatar
            }                          
        }
        res.cookie('user', JSON.stringify({
            user: {
                token,
                data
            }
        }))
        res.redirect('http://localhost:3001');
    })(req, res, next)
);

router.get('/logout', (req, res) => {
    req.logOut();
    res.json({message: 'logout successful'});
})

router.post('/:id/admin', changePassword);
router.post('/forgot-password', forgotPassword);
router.patch('/reset-password/:token', resetPassword);

// router.post('/create', createUser);

export default router;