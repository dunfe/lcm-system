import mongoose from 'mongoose';

const rateSchema = new mongoose.Schema({
    rateExchange: {type: Number, default:"1"},
    createAt: { type: Date, default: Date.now()},
    modifiedAt : {type: Date}
});

var rate = mongoose.model('rate', rateSchema);

export default rate;