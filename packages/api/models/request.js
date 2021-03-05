import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
    request_title: { type: String},
    created_by: { type: Object},
    received_by: { type: String, default: "admin"},
    request_content: { type: String},
    picture: {         
        data: Buffer,
        contentType: String
    },
    created_date: { type: Date, default: Date.now},
    note: { type: String },
});

var request = mongoose.model('request', requestSchema);

export default request;