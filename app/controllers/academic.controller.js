const Academic = require('../models/academicYear.model.js');

exports.getAllAcademicYears = async (req, res) => {
    let allAcademicYears = await Academic.find();
    res.json({ data: allAcademicYears, success: true });
};

exports.createAcademicYear = async (req, res) => {

    let academicYear = req.body.year;
    let classes = req.body.classes;
    let existingYear = await Academic.findOne({ year: { $eq: academicYear } });
    if (existingYear) {
        res.json({ data: false, message: 'Year already exists' });
    }
    else {
        const academic = new Academic({
            year: academicYear,
            classes: classes
        });

        academic.save()
            .then(data => {
                res.json({ data: true, message: 'Academic Year Created Successfully' });
            }).catch(err => {
                res.status(500).send({
                    message: err.message
                });
            });
    }
};

exports.update = async (req, res) => {
    let academicYear = req.body.year;
    let classes = req.body.classes;
    let existingYear = await Academic.find({ year: { $eq: academicYear }});
    let isYearExists = existingYear.find(a=>a.id !== req.params.yearId);
    if (isYearExists) {
        res.json({ data: false, message: 'Year already exists' });
    }
    else {
        Academic.findByIdAndUpdate(req.params.yearId, {
            year: academicYear,
            classes: classes
        }, { new: true })
            .then(year => {
                if (year) {
                    res.json({ data: true, message: 'Year Updated Successfully' });
                }
                else {
                    return res.status(404).send({
                        message: "Year not found with id " + req.params.yearId
                    });
                }
            }).catch(err => {
                res.json({ data: false, message: "Error updating year with id " + req.params.yearId });
            });
    }
};

exports.remove = (req, res) => {
    Academic.findByIdAndRemove(req.params.yearId)
        .then(year => {
            if (year) {
                res.json({ data: true, message: "Year deleted successfully!" });
            }
            else {
                res.json({ data: false, message: "Year not found with id " + req.params.yearId });
            }
        }).catch(err => {
            res.json({ data: false, message: "Could not delete year with id " + req.params.yearId });
        });
};