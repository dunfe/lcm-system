import mongoose from 'mongoose';

const room = new mongoose.Schema({
    name: { type: String, default: "" },
    users: [
        {
            userId: { type: String, default: "" },
            fullname: { type: String, default: "" }
        }
    ],
    messages: [
        {
            room: String,
            userId: { type: String, default: "" },
            fullname: { type: String, default: "" },
            message_line: String,
            created_at: { type: Date, default: Date.now },
        }
    ],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

var Room = mongoose.model('Room', room);

export default Room;