import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'
import cors from 'cors';
import { MongoMemoryServer } from 'mongodb-memory-server';

import userRoutes from './routes/users.js';
import skillRoutes from './routes/skills.js';
import mentorRoutes from './routes/mentors.js';
import adminRoutes from './routes/admins.js';
import staffRoutes from './routes/staff.js';
import auth from './middleware/auth.js';
import passportSetup from './config/passport-setup.js';
import cookieSession from 'cookie-session';
import passport from 'passport';
import db from './db/db.js';


const app = express();

app.use(cors());
dotenv.config()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieSession({
  name:  "",
  maxAge: 24*60*60*1000,
  keys: [process.env.CookieKey]
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/protected', auth, (req,res) => {
  res.end(`Hi ${req.user.username}, you are authenticated!`);
});

app.use('/staff',staffRoutes);
app.use('/api/users', userRoutes);
app.use('/admin',skillRoutes);
app.use('/admin',adminRoutes);
app.use('/', mentorRoutes);

app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`
  });
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });
});

//CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// Connect to MongoDB

if (process.env.NODE_ENV === 'test') {
  console.log('Connecting to a mock db for testing purposes.');


  const mongoServer = new MongoMemoryServer();

  mongoose.Promise = Promise;
  mongoServer.getUri()
      .then((mongoUri) => {
          const mongooseOpts = {
              useNewUrlParser: true,
              useCreateIndex: true,
              useUnifiedTopology: true
          };

          mongoose.connect(mongoUri, mongooseOpts);

          mongoose.connection.on('error', (e) => {
              if (e.message.code === 'ETIMEDOUT') {
                  console.log(e);
                  mongoose.connect(mongoUri, mongooseOpts);
              }
              console.log(e);
          });

          mongoose.connection.once('open', () => {
              console.log(`MongoDB successfully connected to ${mongoUri}`);
          });
      });
} else {
  mongoose.connect(process.env.MONGODB_URI,{
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then (() => {
    console.log('Connected to mongoDB');
    return app.listen(3000);
  })
  .then(() => console.log('server running on port 3000'))
  .catch(err => console.log(err.message));
}

// db.connectDB;



export default app;