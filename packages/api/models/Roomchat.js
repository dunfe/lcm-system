import mongoose from 'mongoose';
import user from './user.js'

const room = new mongoose.Schema({
    name: { type: String, lowercase: true, unique: true },
    topic: String,
    users: [user],
    messages: [message],
    created_at: Date,
    updated_at: { type: Date, default: Date.now },
});

const message = new mongoose.Schema({
    room: room,
    user: user,
    message_line: String,
    created_at: { type: Date, default: Date.now },
});

var Room = mongoose.model('Room', room);
var Message = mongoose.model('Message', message);

export default {Room, Message};