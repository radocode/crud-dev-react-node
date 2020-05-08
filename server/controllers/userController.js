'use strict';

var User = require('../models/userModel');

var genericError = { message: 'Error generico', data: null };

exports.read_a_user = function (req, res) {
    User.getUser(req.params.userId, function (err, user) {
        if (err) {
            genericError.data = err;
            res.status(500).json(genericError);
        }
        res.json({ data: user, code: 200 });
    });
};

exports.login_user = function (req, res) {
    var user_login = new User(req.body);
    if (!user_login.mail && !user_login.pass) {
        res.status(400).send({ error: true, message: 'Login no puede ser invalido, nulo o vacio' });
    } else {
        User.loginUser(user_login, function (err, user) {
            if (err) {
                genericError.data = err;
                res.status(500).json(genericError);
            }
            res.json({ data: user, code: 200 });
        });
    }
};

exports.create_a_user = function (req, res) {
    var new_user = new User(req.body);
    if (!new_user.mail || !new_user.nombre || !new_user.pass || !new_user.tipo_usuario_id) {
        res.status(400).send({ error: true, message: 'User no puede ser nulo o vacio' });
    } else {
        User.registerUser(new_user, function (err, user) {
            if (err) {
                genericError.data = err;
                res.status(500).json(genericError);
            }
            res.json({ data: user, code: 200 });
        });
    }
};
