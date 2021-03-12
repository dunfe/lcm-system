import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
    report_title: { 
        type: String,
        required: [true, 'Please input report title!'] 
    },
    created_by : { 
        type: String,
        required: [true, 'Please input id of creator!'] 
    },
    report_content: { 
        type: String,
        required: [true, 'Please input report content!'] 
    },
    img: [String],
    created_date: { type: Date, default: Date.now},
});

var report = mongoose.model('report', reportSchema);

export default report;