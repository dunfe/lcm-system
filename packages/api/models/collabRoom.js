import mongoose from 'mongoose';

const colabRoomSchema = new mongoose.Schema({
    menteeInfo: {
        _id: String,
        displayName: String,
        level: Number,
    },
    mentorInfo:{
        _id: String,
        displayName: String,
        level: Number,
    },
    content: String,
    note: String,
    createAt: {
        type: Date,
        default: Date.now()
    }
})

const colabRoom = mongoose.model('colabRoom', colabRoomSchema);

export default colabRoom;