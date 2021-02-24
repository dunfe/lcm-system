import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'

import userRoutes from './routes/user.js';
import skillRoutes from './routes/skills.js';

import auth from './middleware/auth.js';

const app = express();

dotenv.config()

app.use(bodyParser.json());

app.use('/api/protected', auth, (req,res) => {
  res.end(`Hi ${req.user.username}, you are authenticated!`);
});

app.use('/api/users', userRoutes);
app.use('/admin',skillRoutes);

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

