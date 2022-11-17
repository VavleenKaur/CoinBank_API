const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    emailId: {
        type: String,
        required: [true, 'Email Id is required']
    },
    coinBalance: {
        type: Number,
        default: 100
    }
});


const User = mongoose.model('user', UserSchema);

module.exports = User;