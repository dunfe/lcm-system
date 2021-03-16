import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
    title: {  
        type: String,
        required: [true, 'Please input request title!']  
    },
    createdBy: { 
        type: String,
        required: [true, 'Please input id of creator!'] 
    },
    receivedBy: { type: String, default: "admin" },
    content: { 
        type: String,
        required: [true, 'Please input report content!'] 
     },
     status: {
         type: String,
         enum: ["new", "done"],
         default: "new"
     },
    picture: String,
    createAt: { type: Date, default: Date.now},
    note: { type: String },
    status: {type: String,enum: ["Not Done", "Done"],
    default: "Not Done",}
});

var request = mongoose.model('request', requestSchema);

export default request;