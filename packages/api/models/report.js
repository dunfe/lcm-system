import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
    report_title: { type: String},
    created_by : { type: String},
    report_content: { type: String},
    img: [{
        data: Buffer,
        contentType: String
    }],
    created_date: { type: Date, default: Date.now},
});

var report = mongoose.model('report', reportSchema);

export default report;