import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import express from 'express';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        default:"",  
    },
    passportid: {
        type: String,
        default:"",
    },
    password: {
        type: String,
        default:"",  
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            validator: function(el) {
                return el === this.password;
            },
            message: 'Password are not the same',
        }
    },
    passport_id: {
        type: String,
        default:"", 
    },
    display_name: {
        type: String,
        default:"",  
    },
    email: {
        type: String,
        default:"",  
        unique: true,
    },
    login_type: {
        type: String,
        default:"local"
    },
    token:{
        type : String,
        default:""
    },
    role: {
        type: String,
        enum: ["user", "admin", "mentor", "staff"],
        default: "user",
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
        default:"",  
    },
    user_detail:
        {
            date_of_birth: { type: Date, default:"",},
            gender: { type: String, default:"",},
            phone: { type: String, default:"",},
            address: { type: String, default:"",},
            profile_picture: {         
                data: Buffer,
                contentType: String,
                default:"",
            },
            total_request: { type: Number,default:"",},
        },
    current_point: { type: Number, default: 0},
    point_out_history: [
        {
            method: { type: String, default:"",},
            amount: { type: Number, min: 1, default: 1,},
            ref: { type: String, default:"",},
            note: { type: String, default:"",},
            created_date: {
                type: Date,
                default: Date.now(),
            },
        
        }
    ],
    point_in_history:[ 
        {
            method:{ type: String, default:"",},
            amount: { type: Number, min: 1, default:1,},
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

userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
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

var user = mongoose.model('user', userSchema);

export default user;