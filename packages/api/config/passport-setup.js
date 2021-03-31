import passport from 'passport';
import dotenv from 'dotenv';
import GoogleStrategy from 'passport-google-oauth20'
import GithubStrategy from 'passport-github2'
import LocalStrategy from 'passport-local'
import FacebookStrategy from 'passport-facebook';
import User from '../models/user.js';

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
        }else if(userEmail){
            return done(null, false, {message : 'email đã được sử dụng, vui lòng chọn email khác'});
        }else{
            const newUser = new User();
        // lưu thông tin cho tài khoản local
            newUser.username = username;
            newUser.password = newUser.generateHash(password);
            newUser.email = req.body.email;
            newUser.fullname = req.body.fullname;
            newUser.save(function (err) {
            if (err) return done(null, false,{ message: err });
                return done(null, newUser)
            });
        }
        
    } catch (error) {
        console.log(error);
        return done(null, false,{ message: error });
    }
}));

passport.use('local-login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
},
async function (req, username, password, done) { 
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
        callbackURL: "/api/users/google/redirect"
    }, async (accessToken, refreshToken, profile, done) => {
        // passport callback function
        try {
            const user = await User.findOne({passportId: profile.id});
            const userEmail = await User.findOne({'email': profile._json.email});
            if(userEmail){
                console.log('user is: ', userEmail)
                return done(null,userEmail);
            }else if(user){
                //return done(null, false, {message : 'email đã được sử dụng để đăng kí, vui lòng chọn email khác'});
                return done(null,user);
            }else{
                const newUser = new User();
                newUser.username = profile.id;
                newUser.passportId = profile.id
                newUser.password = profile.id;
                newUser.email = profile._json.email;
                newUser.loginType = profile.provider;
                newUser.fullname = profile.displayName;
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
        callbackURL: 'api/users/facebook/redirect',
        profileFields: ['email','gender','locale','displayName']
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const user = await User.findOne({passportId: profile.id});
            const userEmail = await User.findOne({'email': profile._json.email});
            if(userEmail){
                console.log('user is: ', userEmail)
                return done(null,userEmail);
            }else if(user){
                //return done(null, false, {message : 'email đã được sử dụng để đăng kí, vui lòng chọn email khác'});
                return done(null,user);
            }else{
                const newUser = new User();
                newUser.username = profile.id;
                newUser.passportId = profile.id
                newUser.password = profile.id;
                newUser.email = profile._json.email;
                newUser.loginType = profile.provider;
                newUser.fullname = profile.displayName;
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
    new GithubStrategy({
        // options for google strategy
        clientID: process.env.clientGhID,
        clientSecret: process.env.clientGhSecret,
        callbackURL: '/api/users/github/redirect'
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const email = profile.username+"@gmail.com";
            const user = await User.findOne({passportId: profile.id});
            const userEmail = await User.findOne({'email': email});
            if(userEmail){
                console.log('user is: ', userEmail)
                return done(null,userEmail);
            }else if(user){
                //return done(null, false, {message : 'email đã được sử dụng để đăng kí, vui lòng chọn email khác'});
                return done(null,user);
            }else{
                const newUser = new User();
                newUser.username = profile.id;
                newUser.passportId = profile.id
                newUser.password = profile.id;
                newUser.email = email;
                newUser.loginType = profile.provider;
                newUser.fullname = profile.username;
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

export default passport;