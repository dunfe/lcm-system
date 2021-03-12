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
    display_name: {
        type: String,
        required: true,
        minlength: [3, 'Display name must have atleast 3 character!'],
        maxlength: [40, 'Display name must have less than 40 characters!']
    },
    email: {
        type: String, 
        unique: true,
        required: [true, 'Please provide your email'],
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    login_type: {
        type: String,
        default:"local"
    },
    role: {
        type: String
    },
    date_of_birth: { type: Date, default: undefined},
    gender: { type: String},
    phone_number: { type: String},
    address: { type: String},
    profile_picture: String,
    current_job: { type: String},
    achievement: [
        { type: String}
    ],
    level: {
        type: Number,
        default: 0,
    },
    github: { type: String },
    current_point: { type: Number, default: 0},
    point_in_history: [
        {
            from: { type: String },
            amount: { type: Number, default: 0},
            method_name: { type: String },
            updateAt: Date,
            created_date: {
                type: Date,
                default: Date.now(),
            },
            note: String
        }
    ],
    point_out_history: [
        {
            to: { type: String },
            amount: { type: Number, default: 0},
            method_name: { type: String },
            updateAt: Date,
            created_date: {
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
            total_rating_1: {type: Number, default: 0},
            total_rating_2: {type: Number, default: 0},
            total_rating_3: {type: Number, default: 0},
            total_rating_4: {type: Number, default: 0},
            total_rating_5: {type: Number, default: 0},
            average_rating: { 
                type: Number,
                min: [0, 'Rating must be above 0.0'],
                max: [5, 'Rating must be under 5.0'] 
            }
        },
    created_date: {
        type: Date,
        default: Date.now(),
    },
    done_request: { 
        type: Number,
        min: [0, 'Must be above 0']
    },
    reviews: [
        {
            fromID: String,
            review_content: {
                type: String
            },
            rate: {
                type: Number,
                min: [0, 'Rating must be above 0.0'],
                max: [5, 'Rating must be under 5.0'] 
            },
        }
    ],
    point_out_history: [
        {
            method: { type: String},
            amount: { type: Number, min: 1},
            note: { type: String},
            ref: { type: String},
            created_date: {
                type: Date,
                default: Date.now(),
            },
        }
    ],
    point_in_history: [
        {
            method:{ type: String},
            amount: { type: Number, min: 1},
            ref: { type: String},
            note: { type: String},
            created_date: {
                type: Date,
                default: Date.now(),
            },
        }
    ],
});

var mentor = mongoose.model('mentor', mentorSchema);

export default mentor;