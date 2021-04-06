import mongoose from 'mongoose';

const notiSchema = new mongoose.Schema({
    titleForMentee: { type: String },
    titleForMentor: { type: String },
    receivedById: [
        { type: String }
    ],
    content: { type: String },
    status: { 
        type: String,
        enum: ["new",  "seen"],
        default: "new",
    },
    createdAt: { type: Date, default: Date.now },
});

var noti = mongoose.model('noti', notiSchema);

export default noti;
