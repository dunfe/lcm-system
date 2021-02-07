const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

const { MONGODB_URI } = require('./config/config');
const userRoutes = require('./routes/user');
const auth = require('./middleware/auth');

app.use(bodyParser.json());

app.use('/api/protected', auth, (req,res) => {
  res.end(`Hi ${req.user.username}, you are authenticated!`);
});

app.use('/api/users', userRoutes);

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
mongoose.connect(MONGODB_URI, { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then (() => {
  console.log('Connected to mongoDB');
  return app.listen(3000);
})
.then(() => console.log('server running on port 3000'))
.catch(err => console.log(err.message));

