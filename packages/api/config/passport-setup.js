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
      secretOrKey: 'TOP_SECRET',
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
},function(req, username, password, done){
    console.log(username);
    console.log(password);
    User.findOne({
      'username' : username       
  }, function(err, user){
      if(err){
          return done(err)
      }
      if(user){
        console.log('user đã tồn tại')
          return done(null, false, {
              message : 'user đã được sử dụng, vui lòng chọn email khác'    
          })
      }
      if(password != req.body.repassword){
        console.log('password không khớp với repassword');
        return done(null, false, {
            message : 'password không khớp với repassword, vui lòng nhập lại'    
        })
      }
      var newUser = new User();
        // lưu thông tin cho tài khoản local
        newUser.username = username;
        newUser.password = newUser.generateHash(password);
        newUser.email = req.body.email;
        newUser.display_name = req.body.display_name;
        // lưu user
        newUser.save(function (err) {
            if (err)
            throw err;
        return done(null, newUser);
    });
})
}));

passport.use('local-login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
},
function (req, username, password, done) { 
    console.log(username);
    User.findOne({'username': username}, function (err, User) {
        console.log(username);
        if (err)
            return done(err);
        // if no user is found, return the message
        if (!User)
            return done(null, false, { message: 'User not found' });
        // if the user is found but the password is wrong
        if (!User.validPassword(password))
            return done(null, false, { message: 'Wrong Password' }); 
        // all is well, return successful user
        return done(null, User);
    });
})
);

passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: process.env.clientGgID,
        clientSecret: process.env.clientGgSecret,
        callbackURL: '/api/users/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        // passport callback function
        console.log('passport callback function fired:');
        console.log(profile);
        console.log(accessToken);
        User.findOne({passportid: profile.id}).then((currentUser) =>{
            if(currentUser){
                console.log('user is: ', currentUser)
                done(null,currentUser)
            }else{
                new User({
                    username: null,
                    passportid: profile.id,
                    password: null,
                    display_name: profile.displayName,
                    email: profile.emails[0].value,
                    login_type: profile.provider,
                    token: accessToken
                }).save().then((newUser) => {
                    console.log('new user created '+ newUser)
                    done(null,newUser)
                });
            }
        });
    })
);

passport.use(
    new FacebookStrategy({
        // options for google strategy
        clientID: process.env.clientFbID,
        clientSecret: process.env.clientFbSecret,
        callbackURL: process.env.callback_FB_url,
        profileFields: ['email','gender','locale','displayName']
    }, (accessToken, refreshToken, profile, done) => {
        // passport callback function
        console.log('passport callback function fired:');
        console.log(profile);
        console.log(accessToken);
        User.findOne({passportid: profile.id}).then((currentUser) =>{
            if(currentUser){
                console.log('user is: ', currentUser)
                done(null,currentUser)
            }else{
                new User({
                    username: null,
                    passportid: profile.id,
                    password: null,
                    display_name: profile.displayName,
                    email: profile.emails[0].value,
                    login_type: profile.provider,
                    token: accessToken
                }).save().then((newUser) => {
                    console.log('new user created '+ newUser)
                    done(null,newUser)
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
    }, (accessToken, refreshToken, profile, done) => {
        // passport callback function
        console.log('passport callback function fired:');
        console.log(profile);
        console.log(accessToken);
        User.findOne({passportid: profile.id}).then((currentUser) =>{
            if(currentUser){
                console.log('user is: ', currentUser)
                done(null,currentUser)
            }else{
                new User({
                    username: null,
                    passportid: profile.id,
                    password: null,
                    display_name: profile.displayName,
                    email: profile._json.email,
                    login_type: profile.provider,
                    token: accessToken
                }).save().then((newUser) => {
                    console.log('new user created '+ newUser)
                    done(null,newUser)
                });
            }
        });
    })
);

export default passport;