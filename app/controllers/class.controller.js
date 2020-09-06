const Standard = require('../models/class.model.js');

exports.createClass = async (req, res) => {

    let standardClass = Number(req.body.class);
    let section = req.body.section;
    let existingClass = await Standard.findOne({ standard: { $eq: standardClass }, section: { $eq: section } });
    if (existingClass) {
        res.json({ data: false, message: 'Class and Section already exists' });
    }
    else {
        const standard = new Standard({
            standard: standardClass,
            section: section
        });

        standard.save()
            .then(data => {
                res.json({ data: true, message: 'Class Created Successfully' });
            }).catch(err => {
                res.status(500).send({
                    message: err.message
                });
            });
    }
};

exports.getAllClasses = async (req, res) => {

    let existingClass = await Standard.find();
    res.json({ data: existingClass, success: true });
};

exports.update = async (req, res) => {
    let standardClass = Number(req.body.class);
    let section = req.body.section;
    let existingClass = await Standard.find({ standard: { $eq: standardClass }, section: { $eq: section } });
    let isClassExists = existingClass.find(a => a.id !== req.params.classId);
    if (isClassExists) {
        res.json({ data: false, message: 'Class already exists' });
    }
    else {
        Standard.findByIdAndUpdate(req.params.classId, {
            standard: req.body.class,
            section: req.body.section
        }, { new: true })
            .then(standard => {
                if (standard) {
                    res.json({ data: true, message: 'Class Updated Successfully' });
                }
                else {
                    return res.status(404).send({
                        message: "Class not found with id " + req.params.classId
                    });
                }
            }).catch(err => {
                res.json({ data: false, message: "Error updating class with id " + req.params.classId });
            });
    }
};

exports.remove = (req, res) => {
    Standard.findByIdAndRemove(req.params.classId)
        .then(standard => {
            if (standard) {
                res.json({ data: true, message: "Class deleted successfully!" });
            }
            else {
                res.json({ data: false, message: "Class not found with id " + req.params.classId });
            }
        }).catch(err => {
            res.json({ data: false, message: "Could not delete class with id " + req.params.classId });
        });
};
