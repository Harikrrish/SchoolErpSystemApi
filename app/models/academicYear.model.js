const mongoose = require('mongoose');

const AcademicYearSchema = mongoose.Schema({
    year: String,
    classes: Array
}, {
    timestamps: true
});

module.exports = mongoose.model('AcademicYear', AcademicYearSchema);