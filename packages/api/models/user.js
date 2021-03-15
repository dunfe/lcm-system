import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import validator from 'validator';
import express from 'express';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please input username!']  
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Password must have atleast 6 character']
    },
    passport_id: {
        type: String,
        default:"", 
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
        type: String,
        enum: ["mentee", "admin", "mentor", "staff"],
        default: "mentee",
    },
    level: {
        type: Number,
        default: 0,
    },
    created_date: {
        type: Date,
        default: Date.now(),
    },
    last_modified_date: {
        type: Date,
        default: undefined,  
    },
    user_detail:
        {
            date_of_birth: { type: Date, default:""},
            gender: { type: String, default:""},
            phone: { type: String, default:""},
            address: { type: String, default:""},
            profile_picture: { type: String, default:""},
            total_question: { type: Number,default: 0},
        },
    current_point: { type: Number, default: 0},
    point_out_history: [
        {
            method: { type: String, default:"",},
            beforePoint: {type: Number,min: 1, default: 1},
            afterPoint: {type: Number, min: 1, default: 1},
            amount: { type: Number, min: 1, default: 1,},
            money: { type: Number, min: 1, default: 1,},
            ref: { type: String, default:"",},
            note: { type: String, default:"",},
            status: { type: String, default:"",},
            created_date: {
                type: Date,
                default: Date.now(),
            },
        
        }
    ],
    point_in_history:[ 
        {
            method:{ type: String, default:"",},
            beforePoint: {type: Number,min: 1, default: 1},
            afterPoint: {type: Number, min: 1, default: 1},
            amount: { type: Number, min: 1, default:1,},
            money: { type: Number, min: 1, default: 1,},
            ref: { type: String, default:"",},
            note: { type: String, default:"",},
            created_date: {
                type: Date,
                default: Date.now(),
            },
        },
    ],
    passwordChangedAt: {
        type: Date,
        default: null,
    },
    passwordResetToken: { type: String, default:"",},
    passwordResetExpires: {
        type: Date,
        default: null,
    },
});

userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

userSchema.methods.validPassword = async  function (password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return  compare
};

userSchema.pre('save', function(next){
    if (!this.isModified('password') || this.isNew){
        return next();
    } 

    this.passwordChangedAt = Date.now() - 1000;
    next();
});

userSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    console.log({resetToken}, this.passwordResetToken);

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    
    return resetToken;
};

userSchema.methods.changePasswordAter = function (JWTTimestamp){
    if(this.passwordChangedAt) {
        const changeTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        console.log(changeTimestamp, JWTTimestamp);
        return JWTTimestamp < changeTimestamp;
    }

    // False means NOT changed
    return false;
}

var user = mongoose.model('user', userSchema);

export default user;