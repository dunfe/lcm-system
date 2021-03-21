import mongoose from 'mongoose';

const rateSchema = new mongoose.Schema({
    rateExchange: {type: Number, default:"1"},
    createAt: { type: Date, default: Date.now()},
    modifiedAt : {type: Date}
});

var rateExchange = mongoose.model('exchangeRate', rateSchema);

export default rateExchange;