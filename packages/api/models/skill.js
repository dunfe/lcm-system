import mongoose from 'mongoose';

const skillSchema = new Schema({
    skill_name: { type: String },
    created_date: { type: Date},
    last_modified_date : {type: Date}
});


var skill = mongoose.model('skill', skillSchema);

export default skill;