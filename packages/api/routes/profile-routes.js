import express from 'express';

const router = express.Router();

const authCheck = (req, res, next) =>{
    if(!req.user){
        res.redirect('/');
    }else{
        next();
    }
};

router.get('/',authCheck, (req,res) =>{
    res.send( req.user);
});

export default router;