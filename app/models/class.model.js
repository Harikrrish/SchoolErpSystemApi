const mongoose = require('mongoose');

const ClassSchema = mongoose.Schema({
    standard: Number,
    section: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Class', ClassSchema);