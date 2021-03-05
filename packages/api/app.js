import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'

import userRoutes from './routes/users.js';
import skillRoutes from './routes/skills.js';
import mentorRoutes from './routes/mentors.js';
import adminRoutes from './routes/admins.js';

import profileRoutes from './routes/profile-routes.js';
import auth from './middleware/auth.js';
//import isAuth from './middleware/auth.js';
import passportSetup from './config/passport-setup.js';
import cookieSession from 'cookie-session';
import passport from 'passport';
import flash from 'connect-flash';

const app = express();
dotenv.config()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieSession({
  maxAge: 24*60*60*1000,
  keys: [process.env.CookieKey]
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/protected', auth, (req,res) => {
  res.end(`Hi ${req.user.username}, you are authenticated!`);
});

app.use('/api/users', userRoutes);
app.use('/profile', profileRoutes);
app.use('/admin',skillRoutes);
app.use('/admin',adminRoutes);
app.use('/', mentorRoutes);

app.get('/', (req, res) => {
  res.send('hello');
});

app.get('/home', (req, res) => {
  res.send('hello home');
});

// Support respone status
app.use((req, res, next) => {
  const err = new Error('not found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ error: { message: err.message}});
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then (() => {
  console.log('Connected to mongoDB');
  return app.listen(3000);
})
.then(() => console.log('server running on port 3000'))
.catch(err => console.log(err.message));