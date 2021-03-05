import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import express from 'express';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String},
    passportid:{type: String},
    fullname: {type: String},
    email: { type: String},
    password: { type: String},
    status : { type: String},
    created_date: { type: Date, default: Date.now},
    last_modified_date : {type: Date},
});

userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

var user = mongoose.model('user', userSchema);

export default user;