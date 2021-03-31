import Room from '../models/Roomchat.js';
import mongoose from 'mongoose';
import {useridFromToken} from '../controller/mentor.js'
import User from '../models/user.js'

const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;

export function createRoom(message) {
    return async (req, res,next) => {
        
    }
}

export function createMessage(message) {
    return async (req, res,next) => {
        if(!ObjectId.isValid(req.params.id)) { 
            return res.status(400).json({
                status: 'fail',
                message: `Invalid id ${req.params.id}`
            })
        };
        let userId = await useridFromToken(req,res);
        var user = await User.findById(userId);
        var messages = {
            room: req.params.id,
            user: user,
            message_line: message
        };
        Room.findByIdAndUpdate(req.params.id, { $push: { messages : messages }}, { new: false }, (err, doc) => {
            if(!err){
                next();
            } else {
                return res.status(400).json({
                    status: 'fail',
                    message: 'Something wrong, try again later'
                })
            }
        });
        
    }
}