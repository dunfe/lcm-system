import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const mentorSchema = new Schema({
    name: { type: String},
    LCM_mentor: { type: Boolean},
    online_status: { type: Boolean},
    job: { type: String},
    introduction: { type: String},
    skill_description: { type: String},
    service : { type: String},
    total_money_in: { type: Int16Array, default: 0},
    total_money_out: { type: Int16Array, default: 0},
    total_money_current: { type: Int16Array},
    total_money_receive: { type: Int16Array},
    total_request_receive: { type: Int16Array},
    total_request_finish: { type: Int16Array},
    total_request_deny: { type: Int16Array},
    total_hours_be_hired: { type: Int16Array, default: 0 },
    rating_1: { type: Int16Array },
    rating_2: { type: Int16Array },
    rating_3: { type: Int16Array },
    rating_4: { type: Int16Array },
    rating_5: { type: Int16Array },
    average_rating: { type: Float32Array},
    status: { type: String},
    created_date: { type: Date, default: Date.now},
    last_modified_date : {type: Date}
});

var mentor = mongoose.model('mentor', mentorSchema);

export default mentor;