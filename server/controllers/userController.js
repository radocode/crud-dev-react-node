'use strict';

var User = require('../models/userModel');


exports.read_a_user = function (req, res) {
    User.getUser(req.params.userId, function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.create_a_user = function (req, res) {
    var new_user = new User(req.body);
    if (!new_user.mail || !new_user.nombre || !new_user.tipo_usuario_id) {
        res.status(400).send({ error: true, message: 'User no puede ser nulo o vacio' });
    } else {
        User.registerUser(new_user, function (err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    }
};
