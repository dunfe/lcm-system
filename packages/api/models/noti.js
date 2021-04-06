import mongoose from 'mongoose';

const notiSchema = new mongoose.Schema({
    title: { type: String },
    receivedById: { type: String },
    content: { type: String },
    read: {
        type: Boolean,
        default: false
    },
    createdAt: { type: Date, default: Date.now },
});

var noti = mongoose.model('noti', notiSchema);

export default noti;
