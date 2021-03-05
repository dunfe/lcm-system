import passport from 'passport';
import dotenv from 'dotenv';
import GoogleStrategy from 'passport-google-oauth20'
import GithubStrategy from 'passport-github2'
import LocalStrategy from 'passport-local'
import FacebookStrategy from 'passport-facebook';
import user from '../models/user.js';

GoogleStrategy.Strategy;
GithubStrategy.Strategy;
LocalStrategy.Strategy;
dotenv.config();


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) =>{
    user.findById(id).then((user) => {
        done(null, user);
        console.log(user);
    }).catch(function (err) {
        console.log(err);
    })
});

// passport.use(new LocalStrategy(
//     function (username,password,done) {
//         user.find({where : {
//             username : username
//         }}).then(function (user) {
//             bcrypt.compare(password, user.password, function (err,result) {
//                 if (err) { return done(err); }
//                 if(!result) {
//                     return done(null, false, { message: 'Incorrect username and password' });
//                 }
//                 return done(null, user);
//             })
//         }).catch(function (err) {
//             return done(err);
//         })
//     }
// ));

passport.use('local', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
},
function (req, username, password, done) { 
    user.findOne({'username': username}, function (err, user) {
        if (err)
            return done(err);
        // if no user is found, return the message
        if (!user)
            return done(null, false, req.flash('loginMessage', 'No user found.'));
        // if the user is found but the password is wrong
        if (!user.validPassword(password))
            return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); 
        // all is well, return successful user
        return done(null, user);
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
        user.findOne({passportid: profile.id}).then((currentUser) =>{
            if(currentUser){
                console.log('user is: ', currentUser)
                done(null,currentUser)
            }else{
                new user({
                    username: profile.displayName,
                    passportid: profile.id,
                    fullname: profile.displayName,
                    email: profile.emails[0].value
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
        user.findOne({passportid: profile.id}).then((currentUser) =>{
            if(currentUser){
                console.log('user is: ', currentUser)
                done(null,currentUser)
            }else{
                new user({
                    username: null,
                    passportid: profile.id,
                    fullname: profile.displayName,
                    email: profile.emails[0].value
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
        user.findOne({passportid: profile.id}).then((currentUser) =>{
            if(currentUser){
                console.log('user is: ', currentUser)
                done(null,currentUser)
            }else{
                new user({
                    username: profile.displayName,
                    passportid: profile.id,
                    fullname: profile.displayName,
                    email: null
                }).save().then((newUser) => {
                    console.log('new user created '+ newUser)
                    done(null,newUser)
                });
            }
        });
    })
);

export default passport;