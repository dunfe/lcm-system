import mongoose from 'mongoose';

const notiSchema = new mongoose.Schema({
    noti_title: { type: String },
    created_by: { type: String },
    received_by: { type: String },
    noti_content: { type: String },
    created_date: { type: Date, default: Date.now },
});

var noti = mongoose.model('noti', notiSchema);

export default noti;