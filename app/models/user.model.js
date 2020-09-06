const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: String,
    mobile: String,
    email: String,
    password: String,
    roleId: String
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);