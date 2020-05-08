'use strict';

const mysql = require('mysql');
const config = require('../config/config');

const connection = mysql.createConnection({
    host: config.config.host,
    database: config.config.database,
    user: config.config.user,
    password: config.config.password
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;