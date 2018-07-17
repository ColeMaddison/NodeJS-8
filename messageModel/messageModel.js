const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    username: {type: String, required: true},
    message: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    show: {
        type: Number, 
        required: true,
        min: 1,
        max: 60
    },
    endsAt: {type: Number}
});

module.exports = mongoose.model('MessageModel', MessageSchema);