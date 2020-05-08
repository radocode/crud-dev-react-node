'use strict';

var sql = require('../db/db');

// encriptacion de password
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Constructor del modelo
var User = function (user) {
    this.id = user.id;
    this.tipo_usuario_id = user.tipo_usuario_id;
    this.nombre = user.nombre;
    this.mail = user.mail;
    this.pass = user.pass;
};

// Users
User.registerUser = function (user, result) {
    // encriptacion de password antes de guardar
    bcrypt.hash(user.pass, saltRounds, function (err, hash) {
        sql.query("INSERT into usuario (tipo_usuario_id,nombre,mail,pass) values (?,?,?,?)",
            [user.tipo_usuario_id, user.nombre, user.mail, hash],
            function (err, res) {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                } else {
                    console.log('Resultado registro de usuario: ', res);
                    result(null, res);
                }
            });
    });
}

User.getUser = function (user, result) {
    sql.query("SELECT id, tipo_usuario_id, nombre, mail from usuario where id = ?",
        [user.id],
        function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                console.log('Usuario encontrado: ', res);
                result(null, res);
            }
        });
}

User.loginUser = function (user, result) {
    // hasheando la pass para comprobarla contra la BD
    bcrypt.hash(user.pass, saltRounds, function (err, hash) {
        sql.query("SELECT id, tipo_usuario_id, nombre, mail from usuario where mail = ?",
            [user.mail],
            function (err, res) {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                } else {
                    // si el hash corresponde, el login es valido!
                    console.log('Usuario a comprobar login: ', res);
                    bcrypt.compare(res[0].pass, hash, function (err, re) {
                        result(null, res);
                    });
                }
            });
    });
}

module.exports = User;
