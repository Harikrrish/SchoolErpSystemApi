const Student = require('../models/student.model.js');
const User = require('../models/user.model.js');
const Role = require('../models/role.model.js');

exports.getAllStudents = async (req, res) => {
    let allStudents = await Student.find();
    res.json({ data: allStudents, success: true });
};

exports.createStudent = async (req, res) => {

    let role = await Role.findOne({ roleName: { $eq: 'Parent' } });
    const user = new User({
        name: req.body.parentName,
        email: req.body.parentEmail,
        password: req.body.parentPassword,
        mobile: req.body.parentMobile,
        roleId: role.id
    });

    user.save();

    let name = req.body.name;
    let standard = req.body.class;
    let section = req.body.section;
    let dob = req.body.dob;
    const student = new Student({
        name: name,
        standard: standard,
        section: section,
        dob: dob,
        parentId: user.id,
        totalPaidAmount: 0,
        dueAmount: 0
    });

    student.save()
        .then(data => {
            res.json({ data: true, message: 'Student Created Successfully' });
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

exports.payFeesAmount = async (req, res) => {

    let student = await Student.findOne({ _id: { $eq: req.params.studentId } });

    Student.findByIdAndUpdate(req.params.studentId, {
        dueAmount: 0,
        totalPaidAmount: Number(student.totalPaidAmount) + Number(student.dueAmount)
    }, { new: true })
        .then(student => {
            if (student) {
                res.json({ data: true, message: 'Paid Successfully' });
            }
        }).catch(err => {
            res.json({ data: false, message: "Error updating payment with id " + req.params.studentId });
        });
};

exports.getParent = async (req, res) => {
    let parent = await User.findOne({ _id: { $eq: req.params.parentId } });
    res.json({ data: parent, success: true });
}

exports.getStudentDetails = async (req, res) => {
    let student = await Student.findOne({ parentId: { $eq: req.params.parentId } });
    res.json({ data: student, success: true });
}

exports.setPayment = async (req, res) => {

    let student = await Student.findOne({ _id: { $eq: req.params.selectedStudentId } });

    Student.findByIdAndUpdate(req.params.selectedStudentId, {
        dueAmount: Number(student.dueAmount) + Number(req.body.termFees)
    }, { new: true })
        .then(student => {
            if (student) {
                res.json({ data: true, message: 'Payment Updated Successfully' });
            }
        }).catch(err => {
            res.json({ data: false, message: "Error updating payment with id " + req.params.selectedStudentId });
        });
};