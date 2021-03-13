import express from 'express';
import User from '../models/user.js'
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
    async (req, res, next) => {
      var token = req.query.secret_token;
      const user = await User.findById(req.user._id);

      res.json({
        message: 'You made it to the secure route',
        user: user,
        token: req.query.secret_token
      })
    }
  );

export default router;