import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    question_title: { type: String},
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    received_by: { type: String , default : ""},
    question_point: {type: Number, default: 15},
    question_skill: [
        {type: String}
    ],
    question_time: {type: Number, default: 10},
    question_content: { type: String},
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