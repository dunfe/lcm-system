import mongoose from 'mongoose';

const rateSchema = new mongoose.Schema({
    rateExchange: {type: Number, default:"1"},
    created_date: { type: Date, default: Date.now()},
    last_modified_date : {type: Date}
});

var rate = mongoose.model('rate', rateSchema);

export default rate;