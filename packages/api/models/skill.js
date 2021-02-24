import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const skillSchema = new Schema({
    skill_name: { type: String},
    status: { type: String},
    created_date: { type: Date},
    last_modified_date : {type: Date}
});

var skill = mongoose.model('skill', skillSchema);

export default skill;