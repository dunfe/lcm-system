import mongoose from 'mongoose';

const mentorSchema = new mongoose.Schema({
    username: {
        type: String,  
    },
    password: {
        type: String,
    },
    display_name: {
        type: String,
    },
    email: {
        type: String,
    },
    login_type: {
        type: String,
        enum: ["basic", "facebook", "google", "git"],
        default: "basic",
    },
    role: {
        type: String,
        enum: ["user", "admin", "mentor", "staff"],
    },
    date_of_birth: { type: Date},
    gender: { type: String},
    phone_number: { type: String},
    address: { type: String},
    profile_picture: {         
        data: Buffer,
        contentType: String
    },
    current_job: { type: String},
    achievement: [
        { type: String}
    ],
    level: {
        type: Number,
        default: 0,
    },
    github: { type: String},
    current_point: { type: Number, default: 0},
    point_in_history: [
        {
            fromUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
            point_in: { type: Number, default: 15},
            method_name: { type: String},
            updateAt: Date,
            note: { type: String},
        }
    ],
    bonus_point: {
        from: {type: String},
        content: {type: String},
        point: { type: Number},
    },
    skill: [
        {type: String},
    ],
    bio: { type: String},
    rate: 
        {
            total_rating_1: {type: Number, default: 0},
            total_rating_2: {type: Number, default: 0},
            total_rating_3: {type: Number, default: 0},
            total_rating_4: {type: Number, default: 0},
            total_rating_5: {type: Number, default: 0},
            average_rating: { type: Float64Array}
        },
    created_date: {
        type: Date,
        default: Date.now(),
    },
    done_request: { type: Number},
    reviews: [
        {
            userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
            review: String,
            rate: { type: Number, min: 1, max: 5},
        }
    ],
    point_out_history: [
        {
            method: { type: String},
            amount: { type: Number, min: 1},
            note: { type: String},
            ref: { type: String},
            created_date: {
                type: Date,
                default: Date.now(),
            },
        }
    ],
    point_in_history: [
        {
            method:{ type: String},
            amount: { type: Number, min: 1},
            ref: { type: String},
            note: { type: String},
            created_date: {
                type: Date,
                default: Date.now(),
            },
        }
    ],
});

var mentor = mongoose.model('mentor', mentorSchema);

export default mentor;