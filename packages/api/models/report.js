import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
    title: { 
        type: String,
        required: [true, 'Please input report title!'] 
    },
    createBy : { 
        type: String,
        required: [true, 'Please input id of creator!'] 
    },
    content: { 
        type: String,
        required: [true, 'Please input report content!'] 
    },
    img: String,
    createdAt: { type: Date, default: Date.now},
});

var report = mongoose.model('report', reportSchema);

export default report;