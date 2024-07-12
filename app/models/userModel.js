const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fullName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: String,
        default: "Level 0"
    }
},

{ timestamps: true });

module.exports = mongoose.model('userModel', userSchema);