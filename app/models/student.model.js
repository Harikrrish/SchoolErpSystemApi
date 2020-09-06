const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
    name: String,
    dob: Date,
    standard: Number,
    section: String,
    academicYear: String,
    parentId: String,
    totalPaidAmount: Number,
    dueAmount: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Student', StudentSchema);