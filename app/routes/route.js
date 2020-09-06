
const express = require('express');
const users = require('../controllers/user.controller.js');
const standard = require('../controllers/class.controller.js');
const academic = require('../controllers/academic.controller.js');
const student = require('../controllers/student.controller.js');

const router = express.Router();

router.route('/login')
    .get(users.login);

router.route('/users')
    .get(users.findAll)

    .post(users.create);

router.route('/createClass')
    .post(standard.createClass);

router.route('/createAcademicYear')
    .post(academic.createAcademicYear);

router.route('/createStudent')
    .post(student.createStudent);

router.route('/getAllClasses')
    .get(standard.getAllClasses);

router.route('/getAllAcademicYears')
    .get(academic.getAllAcademicYears);

router.route('/getAllStudents')
    .get(student.getAllStudents);

router.route('/:classId')

    .put(standard.update)

    .delete(standard.remove);

router.route('/updateYear/:yearId')

    .put(academic.update)

    .delete(academic.remove);

router.route('/setPayment/:selectedStudentId')

    .put(student.setPayment)

router.route('/payFeesAmount/:studentId')

    .put(student.payFeesAmount)

router.route('/getParent/:parentId')

    .get(student.getParent)

router.route('/getStudentDetails/:parentId')

    .get(student.getStudentDetails)

router.route('/:userId')

    .put(users.update)

    .delete(users.remove);

// router.param('userId', users.load);

module.exports = router;