import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/users.js';
import skillRoutes from './routes/skills.js';
import mentorRoutes from './routes/mentors.js';
import adminRoutes from './routes/admins.js';
import staffRoutes from './routes/staff.js';
import menteeRoutes from './routes/mentee.js';
import paymentRouters from './routes/payment.js';
import auth from './middleware/auth.js';
import cookieSession from 'cookie-session';
import passport from 'passport';
import db from './db/db.js';
import passportSetup from "./config/passport-setup.js";


const app = express();
dotenv.config();
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cookieSession({
    name: "",
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.CookieKey]
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/protected', auth, (req, res) => {
    res.end(`Hi ${req.user.username}, you are authenticated!`);
});

app.use('/staff', staffRoutes);
app.use('/api/users', userRoutes);
app.use('/admin',skillRoutes);
app.use('/admin',adminRoutes);
app.use('/mentee',menteeRoutes);
app.use('/payment', paymentRouters);
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
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// Connect to MongoDB

let PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'test') {
    PORT = 9999;
    mongoose.connect(process.env.MONGODB_URI_TEST, {
        auth: {
            user: 'admin',
            password: 'BbYS998aXvXRWgA'
        },
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(() => {
        console.log('Connected to mongoDB');
        return app.listen(9999);
    })
        .then(() => console.log(`server running on port ${PORT}`))
        .catch(err => console.log(err.message));
} else {
    mongoose.connect(process.env.MONGODB_URI, {
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log('Connected to mongoDB');
        return app.listen(3000);
    })
        .then(() => console.log('server running on port 3000'))
        .catch(err => console.log(err.message));
}

// db.connectDB;


export default app;
