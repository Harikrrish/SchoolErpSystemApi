const User = require('../models/user.model.js');
const Role = require('../models/role.model.js');

exports.create = (req, res) => {

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        userName: req.body.userName,
        mobile: req.body.mobile
    });

    user.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

exports.findAll = (req, res) => {
    User.find()
        .then(users => {
            res.send(users);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Users."
            });
        });
};

exports.findOne = (req, res) => {
    User.findById(req.params.userId)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Error retrieving user with id " + req.params.userId
            });
        });
};

exports.update = (req, res) => {
    User.findByIdAndUpdate(req.params.userId, {
        name: req.body.name || "Hari",
        content: req.body.content
    }, { new: true })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Error updating user with id " + req.params.userId
            });
        });
};

exports.remove = (req, res) => {
    User.findByIdAndRemove(req.params.userId)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.send({ message: "User deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Could not delete user with id " + req.params.userId
            });
        });
};

exports.login = (req, res) => {
    let email = req.query.email;
    let password = req.query.password;
    User.findOne({ email: { $eq: email }, password: { $eq: password } })
        .then(async user => {
            if (user) {
                let role = await Role.findOne({ _id: { $eq: user.roleId } });
                res.json({ data: true, roleName: role.roleName, userId: user._id, message: 'Logged In Successfully' });
            }
            else {
                res.json({ data: false, message: 'Please enter valid email and password' });
            }

        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};