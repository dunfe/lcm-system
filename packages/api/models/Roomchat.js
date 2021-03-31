import mongoose from 'mongoose';
import user from './user.js'

const room = new mongoose.Schema({
    name: { type: String, default: "" },
    users: [user],
    messages: [
        {
            room: String,
            user: user,
            message_line: String,
            created_at: { type: Date, default: Date.now },
        }
    ],
    created_at: Date,
    updated_at: { type: Date, default: Date.now },
});

var Room = mongoose.model('Room', room);

export default Room;