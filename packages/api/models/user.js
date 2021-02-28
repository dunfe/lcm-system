import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
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
        default: "user",
    },
    level: {
        type: Number,
        default: 0,
    },
    created_date: {
        type: Date,
        default: Date.now(),
    },
    last_modified_date: {
        type: Date,
    },
    user_detail:
        {
            date_of_birth: { type: Date},
            gender: { type: String},
            phone: { type: String},
            address: { type: String},
            profile_picture: {         
                data: Buffer,
                contentType: String
            },
            total_request: { type: Number},
        },
    current_point: { type: Number, default: 0},
    point_out_history: [
        {
            method: { type: String},
            amount: { type: Number, min: 1},
            ref: { type: String},
            note: { type: String},
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

userSchema.pre('save', async function(next) {
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.isPasswordValid = async function(value){
    try {
        return await bcrypt.compare(value, this.password);
    } catch (error) {
        throw new Error(error);
    }
};

var user = mongoose.model('user', userSchema);

export default user;