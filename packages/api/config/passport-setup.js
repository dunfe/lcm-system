import passport from 'passport';
import dotenv from 'dotenv';
import GoogleStrategy from 'passport-google-oauth20'
import GithubStrategy from 'passport-github2'
import LocalStrategy from 'passport-local'
import FacebookStrategy from 'passport-facebook';
import User from '../models/user.js';
import body from 'body-parser'
import jwt from 'jsonwebtoken';
import passportJWT  from 'passport-jwt'

var ExtractJWT = passportJWT.ExtractJwt;
var JWTstrategy = passportJWT.Strategy;

GoogleStrategy.Strategy;
GithubStrategy.Strategy;
LocalStrategy.Strategy;
dotenv.config();


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        // console.log(user);
      done(err, user);
    });
  });

passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.SECRET_KEY,
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use('register', new LocalStrategy({
    usernameField : 'username',
    passswordField : 'password',
    passReqToCallback : true
},async function(req, username, password, done){
    try {
        const user = await User.findOne({'username': username});
        const userEmail = await User.findOne({'email': req.body.email});
        if (user) {
            return done(null, false, {message : 'username đã được sử dụng, vui lòng chọn username khác'});
        }
        // if(password != req.body.passwordConfirm){
        //     return done(null, false, {message : 'password không khớp với passwordConfirm, vui lòng nhập lại'});
        // }
        if(userEmail){
            return done(null, false, {message : 'email đã được sử dụng, vui lòng chọn email khác'});
        }
        const newUser = new User();
        // lưu thông tin cho tài khoản local
        newUser.username = username;
        newUser.password = newUser.generateHash(password);
        newUser.email = req.body.email;
        newUser.display_name = req.body.display_name;
        newUser.save(function (err) {
            if (err) throw err;
                return done(null, newUser)
        });
    } catch (error) {
        console.log(error);
        return done(null, false);
    }
}));

passport.use('local-login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
},
async function (req, username, password, done) { 
    console.log(username);
    console.log(password);
    try {
        const user = await User.findOne({'username': username});
      if (!user) {
        return done(null, false, { message: 'User not found' });
      }
      const checkPassword = await(user.validPassword(password));
      if (!checkPassword) {
        return done(null, false, { message: 'Wrong Password' });
      }
      return done(null, user);
    } catch (error) {
        console.log(error);
        return done(null, false,{ message: error });
    }
})
);

passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: process.env.clientGgID,
        clientSecret: process.env.clientGgSecret,
        //callbackURL: '/api/users/google/redirect'
        callbackURL: '/api/users/google/redirect'
    }, async (accessToken, refreshToken, profile, done) => {
        // passport callback function
        console.log('passport callback function fired:');
        console.log(profile);
        try {
            const user = await User.findOne({passport_id: profile.id});
            const userEmail = await User.findOne({'email': profile._json.email});
            if(user){
                console.log('user is: ', user)
                done(null,user);
            }else if(userEmail){
                return done(null, false, {message : 'email đã được sử dụng để đăng kí, vui lòng chọn email khác'});
            }else{
                const newUser = new User();
                newUser.username = profile.id;
                newUser.passport_id = profile.id
                newUser.password = profile.id;
                newUser.email = profile._json.email;
                newUser.login_type = profile.provider;
                newUser.display_name = profile.displayName;
                newUser.save(function (err) {
                if (err) throw err;
                    return done(null, newUser)
                });
            }
        } catch (error) {
            console.log(error);
            return done(null, false,{ message: error });
        }
    })
);

passport.use(
    new FacebookStrategy({
        // options for google strategy
        clientID: process.env.clientFbID,
        clientSecret: process.env.clientFbSecret,
        callbackURL: process.env.callback_FB_url,
        profileFields: ['email','gender','locale','displayName']
    }, async (accessToken, refreshToken, profile, done) => {
        // passport callback function
        console.log('passport callback function fired:');
        console.log(profile);
        const userEmail = await User.findOne({'email': profile._json.email});
        User.findOne({passport_id: profile.id}).then((currentUser) =>{
            if(currentUser){
                console.log('user is: ', currentUser)
                return done(null,currentUser);
            }else if(userEmail){
                return done(null, false, {message : 'email đã được sử dụng để đăng kí, vui lòng chọn email khác'});
            }else{
                new User({
                    username: profile.id,
                    passport_id: profile.id,
                    password: profile.id,
                    display_name: profile.displayName,
                    email: profile._json.email,
                    login_type: profile.provider,
                    token: accessToken
                }).save().then((newUser) => {
                    console.log('new user created '+ newUser)
                    return done(null,newUser)
                });
            }
        });
    })
);

passport.use(
    new GithubStrategy({
        // options for google strategy
        clientID: process.env.clientGhID,
        clientSecret: process.env.clientGhSecret,
        callbackURL: '/api/users/github/redirect'
    }, async (accessToken, refreshToken, profile, done) => {
        // passport callback function
        console.log('passport callback function fired:');
        console.log(profile);
        const email = profile.username+"@gmail.com";
        const userEmail = await User.findOne({'email': email});
        User.findOne({passport_id: profile.id}).then((currentUser) =>{
            if(currentUser){
                console.log('user is: ', currentUser)
                return done(null,currentUser);
            }else if(userEmail){
                return done(null, false, {message : 'email đã được sử dụng để đăng kí, vui lòng chọn email khác'});
            }else{
                new User({
                    username: profile.id,
                    passport_id: profile.id,
                    password: profile.id,
                    display_name: profile.username,
                    email: email,
                    login_type: profile.provider,
                    token: accessToken
                }).save().then((newUser) => {
                    console.log('new user created '+ newUser)
                    return done(null,newUser);
                });
            }
        });
    })
);

export default passport;