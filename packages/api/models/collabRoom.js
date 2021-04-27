import mongoose from 'mongoose';

const colabRoomSchema = new mongoose.Schema({
    menteeInfo: {
        _id: String,
        displayName: String,
        level: Number,
        avatar: String
    },
    mentorInfo:{
        _id: String,
        displayName: String,
        level: Number,
        avatar: String
    },
    questionInfo:{
        _id: String,
        title: String,
        content: String,
    },
    createAt: {
        type: Date,
        default: Date.now()
    },
    sid: String,
    account_sid: String,
    chat_service_sid: String,
    messaging_service_sid: String,
    friendly_name: String,
    unique_name: String,
    attributes: {
        topic: String
    },
    date_created: String,
    date_updated: String,
    state: String,
    timers: {
        date_inactive: String,
        date_closed: String
    },
    url: String,
    links: {
        participants: String,
        messages: String,
        webhooks: String
    }
})

const colabRoom = mongoose.model('colabRoom', colabRoomSchema);

export default colabRoom;