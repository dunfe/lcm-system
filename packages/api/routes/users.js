import express from 'express';
import { register, login } from '../controller/user.js';
import passport from 'passport';

const router = express.Router();

router.post('/register', passport.authenticate("register", {
  successRedirect : '/home',
  failureRedirect : '/',
  //failureFlash : true
}));

router.post('/login', passport.authenticate("local-login", {
  successRedirect : '/profile',
  failureRedirect : '/',
  //failureFlash : true
}));

// auth with google+
router.get('/google', passport.authenticate('google', {scope: 
    ['profile','email']}));

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('/profile/');
});

// auth with facebook
router.get('/facebook', passport.authenticate('facebook', {scope: 
  ['email']}));

router.get('/facebook/redirect', passport.authenticate('facebook'), (req, res) => {
  res.redirect('/profile/');
});

// auth with github
router.get('/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/github/redirect', passport.authenticate('github'), (req, res) => {
    res.redirect('/profile/');
});


router.get('/logout',(req,res) =>{
    req.logout();
    res.redirect('/');
})

export default router;