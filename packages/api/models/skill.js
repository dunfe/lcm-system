import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
    name: { 
        type: String,
        unique: true,
        required: [true, 'Please input skill name'],
    },
    createdAt: { type: Date, default: Date.now()},
    modifieAt : {type: Date}
});


// skillSchema.methods.checkName = function (skillName) {
//     if(this.name.toLowerCase() == skillName.toLowerCase()){
//         return false;
//     } else { 
//         return true;
//     }
// }

var skill = mongoose.model('skill', skillSchema);

export default skill;