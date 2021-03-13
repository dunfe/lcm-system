import express from 'express';

const router = express.Router();

// const authCheck = (req, res, next) =>{
//     if(!req.user){
//         res.redirect('/');
//     }else{
//         next();
//     }
// };

// router.get('/',authCheck, (req,res) =>{
//     res.send( req.user);
// });

router.get(
    '/profile',
    (req, res, next) => {
      res.json({
        message: 'You made it to the secure route',
        user: req.user,
        token: req.query.secret_token
      })
    }
  );

export default router;