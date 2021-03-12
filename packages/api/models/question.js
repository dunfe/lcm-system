import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    question_title: { 
        type: String,
        required: [true, 'Please input question title']
     },
    created_by: { 
        type: String,
        required: [true, 'Please input creator id']
    },
    received_by: { 
        type: String, 
        required: [true, 'Please input receiver id']
    },
    question_point: {
        type: Number, 
        default: 15,
        min: [1, 'Question point must be above 1']
    },
    question_skill: [
        {type: String}
    ],
    question_time: {
        type: Number, 
        default: 10,
        min: [5, 'Question time need atleast 5 mins!']
    },
    question_content: { 
        type: String,
        required: [true, 'Please input question!']
    },
    created_date: { type: Date, default: Date.now},
    status: { 
        type: String,
        enum: ["new", "doing", "done"],
        default: "new",
    },
    note: { type: String },
});

var question = mongoose.model('question', questionSchema);

export default question;