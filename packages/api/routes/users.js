import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import profileRoutes from './profile-routes.js';

const router = express.Router();

// router.post('/register', passport.authenticate("register", {
//   successRedirect : '/login',
//   failureRedirect : '/',
//   //failureFlash : true
// }));

router.post(
  '/register',
  passport.authenticate('register', { session: false }),
  async (req, res, next) => {
    res.json({
      message: 'Signup successful',
      user: req.user
    });
  }
);

// router.post('/login', passport.authenticate("local-login", {
//   successRedirect : '/profile',
//   failureRedirect : '/',
//   //failureFlash : true
// }));

router.post(
  '/login',
  async (req, res, next) => {
    passport.authenticate(
      'local-login',
      async (err, user, info) => {
        try {
          if (err || !user) {
            const error = new Error('An error occurred.');

            return next(error);
          }

          req.login(
            user,
            { session: false },
            async (error) => {
              if (error) return next(error);

              const body = { _id: user._id, username: user.username };
              const token = jwt.sign({ user: body }, 'TOP_SECRET');

              return res.json({ token });
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
router.get('/google', passport.authenticate('google', {scope: 
    ['profile','email']}));

// router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
//     //res.redirect('/profile/');
//     res.send(req.user);
// });
router.get('/google/redirect',
async (req, res, next) => {
  passport.authenticate(
    'google',
    async (err, user, info) => {
      try {
        if (err || !user) {
          const error = new Error('An error occurred.');
          return next(error);
        }
        req.login(
          user,
          { session: false },
          async (error) => {
            if (error) return next(error);
            const body = { _id: user._id};
            const token = jwt.sign({ user: body }, 'TOP_SECRET');
            return res.json({ token });
          }
        );
      } catch (error) {
        return next(error);
      }
    }
  )(req, res, next);
}
);

// auth with facebook
router.get('/facebook', passport.authenticate('facebook', {scope: 
  ['email']}));

router.get('/facebook/redirect',
async (req, res, next) => {
  passport.authenticate(
    'facebook',
    async (err, user, info) => {
      try {
        if (err || !user) {
          const error = new Error('An error occurred.');
          return next(error);
        }
        req.login(
          user,
          { session: false },
          async (error) => {
            if (error) return next(error);
            const body = { _id: user._id};
            const token = jwt.sign({ user: body }, 'TOP_SECRET');
            return res.json({ token });
          }
        );
      } catch (error) {
        return next(error);
      }
    }
  )(req, res, next);
}
);

// auth with github
router.get('/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/github/redirect',
async (req, res, next) => {
  passport.authenticate(
    'github',
    async (err, user, info) => {
      try {
        if (err || !user) {
          const error = new Error('An error occurred.');
          return next(error);
        }
        req.login(
          user,
          { session: false },
          async (error) => {
            if (error) return next(error);
            const body = { _id: user._id};
            const token = jwt.sign({ user: body }, 'TOP_SECRET');
            return res.json({ token });
          }
        );
      } catch (error) {
        return next(error);
      }
    }
  )(req, res, next);
}
);

router.get('/logout',(req,res) =>{
    req.logout();
    res.redirect('/');
})

export default router;