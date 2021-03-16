import mongoose from 'mongoose';

const notiSchema = new mongoose.Schema({
    title: { type: String },
    createdAt: { type: String },
    receivedBy: { type: String },
    content: { type: String },
    createdAt: { type: Date, default: Date.now },
});

var noti = mongoose.model('noti', notiSchema);

export default noti;