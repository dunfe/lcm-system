import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        default:"",  
    },
    password: {
        type: String,
        default:"",  
    },
    passport_id: {
        type: String,
        default:"", 
    },
    display_name: {
        type: String,
        default:"",  
    },
    email: {
        type: String,
        default:"",  
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
        default:"",  
    },
    user_detail:
        {
            date_of_birth: { type: Date, default:"",},
            gender: { type: String, default:"",},
            phone: { type: String, default:"",},
            address: { type: String, default:"",},
            profile_picture: {         
                data: Buffer,
                contentType: String,
                default:"",
            },
            total_request: { type: Number,default:"",},
        },
    current_point: { type: Number, default: 0},
    point_out_history: [
        {
            method: { type: String, default:"",},
            amount: { type: Number, min: 1, default: 1,},
            ref: { type: String, default:"",},
            note: { type: String, default:"",},
            created_date: {
                type: Date,
                default: Date.now(),
            },
        
        }
    ],
    point_in_history:[ 
        {
            method:{ type: String, default:"",},
            amount: { type: Number, min: 1, default:1,},
            ref: { type: String, default:"",},
            note: { type: String, default:"",},
            created_date: {
                type: Date,
                default: Date.now(),
            },
        },
    ]
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