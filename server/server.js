const express = require('express'),
  app = express(),
  bodyParser = require('body-parser');
port = process.env.PORT || 4000;

const mysql = require('mysql');
const config = require('./config/config');

var cors = require('cors')

app.use(cors());

// Configs de la DB
const mc = mysql.createConnection({
  host: config.config.host,
  database: config.config.database,
  user: config.config.user,
  password: config.config.password
});
// conectando a la DB por primera vez
mc.connect();

const server = app.listen(port);

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Process terminated');
  })
});

process.on('uncaughtException', (err, origin) => {
  console.log("error and origin: ", err, origin);
});

console.log('API server started on: ' + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./routes/appRoutes'); // importando la ruta
routes(app); // registrando la ruta al app