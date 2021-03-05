import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import express from 'express';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        default:"",  
    },
    password: {
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
    },
    login_type: {
        type: String,
        enum: ["basic", "facebook", "google", "git"],
        default: "basic",
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
    ]
});

userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

var user = mongoose.model('user', userSchema);

export default user;