import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    title: { 
        type: String,
        required: [true, 'Please input question title']
     },
    createdBy: { 
        type: String,
        required: [true, 'Please input creator id']
    },
    receivedBy: { 
        type: String, 
        required: [true, 'Please input receiver id']
    },
    point: {
        type: Number, 
        default: 15,
        min: [1, 'Question point must be above 1']
    },
    skill: [
        {type: String}
    ],
    time: {
        type: Number, 
        default: 10,
        min: [5, 'Question time need atleast 5 mins!']
    },
    content: { 
        type: String,
        required: [true, 'Please input question!']
    },
    createAt: { type: Date, default: Date.now},
    status: { 
        type: String,
        enum: ["new", "doing", "done"],
        default: "new",
    },
    note: { type: String },
});

var question = mongoose.model('question', questionSchema);

export default question;