const mongoose = require('mongoose');

const RoleSchema = mongoose.Schema({
    roleName: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Role', RoleSchema);