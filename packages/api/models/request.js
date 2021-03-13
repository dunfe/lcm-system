import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
    request_title: { type: String },
    created_by: { type: String },
    received_by: { type: String, default: "admin" },
    request_content: { type: String },
    picture: {         
        data: Buffer,
        contentType: String
    },
    created_date: { type: Date, default: Date.now},
    note: { type: String },
    status: {type: String,enum: ["Not Done", "Done"],
    default: "Not Done",}
});

var request = mongoose.model('request', requestSchema);

export default request;