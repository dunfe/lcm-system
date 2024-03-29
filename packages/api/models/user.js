import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from "crypto";
import validator from 'validator';
import express from 'express';
import validate from '../validator/user.validation.js';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please input username!']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
    },
    passportId: {
        type: String,
        default: "",
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
        default: "local"
    },
    role: {
        type: String,
        enum: ["mentee", "admin", "mentor", "staff", "banned"],
        default: "mentee",
    },
    level: {
        type: Number,
        default: 0,
    },
    github: { type: String, default:"" },
    skill: [{type: String, default:"" }],
    bio: { type: String, default:"" },
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
    requestDone: {
        type: Number,
        min: [0, 'Must be above 0']
    },
    favoriteMentor: [
        {
            mentorId: { type: String, default: "" },
            mentorName: {type:String, default: ""}
        }
    ],
    matchingMentor: [
         { type: String, default: "" }
    ],
    reviews: [
        {
            fromID: String,
            name: { type: String },
            content: {
                type: String
            },
            star: {
                type: Number,
                min: [0, 'Rating must be above 0.0'],
                max: [5, 'Rating must be under 5.0']
            },
        }
    ],
    detail:
    {
        dob: { type: Date, default: "" },
        gender: { type: String, default: "" },
        phone: { type: String, default: "" },
        address: { type: String, default: "" },
        avatar: { type: String, default: "" },
        currentJob: { type: String, default: "" },
        achievement: [{ type: String }],
        totalQuestion: { type: Number, default: 0 },
    },
    currentPoint: { type: Number, default: 0 },
    pointOutHistory: [
        {
            method: { type: String, default: "", },
            pointBefore: { type: Number, min: 0, default: 0 },
            pointAfter: { type: Number, min: 0, default: 0 },
            amount: { type: Number, min: 0, default: 0 },
            money: { type: Number, min: 0, default: 0 },
            ref: { type: String, default: "", },
            note: { type: String, default: "", },
            status: { type: String, default: "", },
            createAt: {
                type: Date,
                default: Date.now(),
            },

        }
    ],
    pointInHistory: [
        {
            method: { type: String, default: "", },
            pointBefore: { type: Number, min: 0, default: 0 },
            pointAfter: { type: Number, min: 0, default: 0 },
            amount: { type: Number, min: 0, default: 0 },
            money: { type: Number, min: 0, default: 0 },
            ref: { type: String, default: "", },
            note: { type: String, default: "", },
            createAt: {
                type: Date,
                default: Date.now(),
            },
        },
    ],
    passwordChangedAt: {
        type: Date,
        default: null,
    },
    passwordResetToken: { type: String, default: "", },
    passwordResetExpires: {
        type: Date,
        default: null,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    modifieAt: {
        type: Date,
        default: undefined,
    }
});

userSchema.path('username').validate(function (input){
    return validate.isAlphaNumericOnly(input) && validate.isLongEnough(input);
}, "Username  only contains Alpha or numerical characters and must have atleast 6  characters")
userSchema.path('password').validate(function (input){
    return validate.isGoodPassword(input) && validate.isLongEnough(input);
},"Password contains at least one number, one lowercase, one uppercase letter and it's at least six characters long");

userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

// userSchema.methods.isGoodPassward = function (password){
//     var regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
//     return regex.test(password);
// }

userSchema.methods.validPassword = async function (password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare
};

userSchema.pre('save', async function (next) {
    // if (!this.isModified('password') || this.isNew) {
    //     return next();
    // }
    
    this.password = await bcrypt.hash(this.password, 10);
    this.passwordChangedAt = Date.now() - 1000;
    next();
});

userSchema.methods.createRandomPassword = function () {
    const result           = [];
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( var i = 0; i < 9; i++ ) {
        result.push(characters.charAt(Math.floor(Math.random() * 
        62)));
     }

     return result.join('');
}

userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // console.log({ resetToken }, this.passwordResetToken);

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    return resetToken;
};

userSchema.methods.changePasswordAter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changeTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        console.log(changeTimestamp, JWTTimestamp);
        return JWTTimestamp < changeTimestamp;
    }

    // False means NOT changed
    return false;
}


var user = mongoose.model('user', userSchema);

export default user;
