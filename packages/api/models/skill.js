import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
    skill_name: { 
        type: String,
        required: [true, 'Please input skill name'],
    },
    created_date: { type: Date, default: Date.now()},
    last_modified_date : {type: Date}
});


var skill = mongoose.model('skill', skillSchema);

export default skill;