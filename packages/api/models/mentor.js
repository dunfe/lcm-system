import mongoose from 'mongoose';
import validator from 'validator';

const mentorSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please input username!'] 
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Password must have atleast 6 character']
    },
    fullname: {
        type: String,
        required: true,
        minlength: [3, 'Display name must have atleast 3 character!'],
        maxlength: [40, 'Display name must have less than 40 characters!']
    },
    email: {
        type: String, 
        required: [true, 'Please provide your email'],
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    loginType: {
        type: String,
        default:"local"
    },
    role: {
        type: String
    },
    dob: { type: Date, default: undefined},
    gender: { type: String},
    phoneNumber: { type: String},
    address: { type: String},
    avatar: String,
    currentJob: { type: String},
    achievement: [
        { type: String}
    ],
    level: {
        type: Number,
        default: 0,
    },
    github: { type: String },
    currentPoint: { type: Number, default: 0},
    pointInHistory: [
        {
            from: { type: String },
            amount: { type: Number, default: 0},
            method: { type: String },
            updatedAt: Date,
            createdAt: {
                type: Date,
                default: Date.now(),
            },
            note: String
        }
    ],
    pointOutHistory: [
        {
            to: { type: String },
            amount: { type: Number, default: 0},
            name: { type: String },
            updatedAt: Date,
            createdAt: {
                type: Date,
                default: Date.now(),
            },
            note: String
        }
    ],
    skill: [
        {type: String},
    ],
    bio: { type: String},
    rate: 
        {
            totalRating1: {type: Number, default: 0},
            totalRating2: {type: Number, default: 0},
            totalRating3: {type: Number, default: 0},
            totalRating4: {type: Number, default: 0},
            totalRating5: {type: Number, default: 0},
            avgRating: { 
                type: Number,
                min: [0, 'Rating must be above 0.0'],
                max: [5, 'Rating must be under 5.0'] 
            }
        },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    requestDone: { 
        type: Number,
        min: [0, 'Must be above 0']
    },
    reviews: [
        {
            fromID: String,
            content: {
                type: String
            },
            rate: {
                type: Number,
                min: [0, 'Rating must be above 0.0'],
                max: [5, 'Rating must be under 5.0'] 
            },
        }
    ],
    pointOutHistory: [
        {
            method: { type: String},
            amount: { type: Number, min: 1},
            note: { type: String},
            ref: { type: String},
            createdAt: {
                type: Date,
                default: Date.now(),
            },
        }
    ],
    pointInHistory: [
        {
            method:{ type: String},
            amount: { type: Number, min: 1},
            ref: { type: String},
            note: { type: String},
            createdAt: {
                type: Date,
                default: Date.now(),
            },
        }
    ],
});

var mentor = mongoose.model('mentor', mentorSchema);

export default mentor;