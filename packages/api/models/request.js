import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
    request_title: {  
        type: String,
        required: [true, 'Please input request title!']  
    },
    created_by: { 
        type: String,
        required: [true, 'Please input id of creator!'] 
    },
    received_by: { type: String, default: "admin" },
    request_content: { 
        type: String,
        required: [true, 'Please input report content!'] 
     },
     status: {
         type: String,
         enum: ["new", "done"],
         default: "new"
     },
    picture: String,
    created_date: { type: Date, default: Date.now},
    note: { type: String },
    status: {type: String,enum: ["Not Done", "Done"],
    default: "Not Done",}
});

var request = mongoose.model('request', requestSchema);

export default request;