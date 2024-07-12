const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true
    }   
},
{ timestamps: true });

module.exports = mongoose.model('contactModel', contactSchema);