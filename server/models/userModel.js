'use strict';

var sql = require('../db/db');

// Constructor del modelo
var User = function (user) {
    this.id = user.id;
    this.tipo_usuario_id = user.tipo_usuario_id;
    this.nombre = user.nombre;
    this.mail = user.mail;
};

// Users
User.registerUser = function (user, result) {
    sql.query("INSERT into usuario (tipo_usuario_id,nombre,mail,pass) values (?,?,?,?)",
        [user.tipo_usuario_id, user.nombre, user.mail, user.pass],
        function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                console.log('Resultado registro de usuario: ', res);
                result(null, res);
            }
        });
}

User.getUser = function (user, result) {
    sql.query(`SELECT id, tipo_usuario_id, nombre, mail from usuario where id=${user.id}`,
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

module.exports = User;
