'use strict';

var sql = require('../db/db');

// Constructor del modelo
var Ticket = function (ticket) {
    this.id = ticket.id;
    this.usuario_id = ticket.usuario_id;
    this.ticket_pedido = ticket.ticket_pedido;
};
// CRUD tickets
Ticket.getTickets = function (result) {
    sql.query("SELECT id,usuario_id,ticket_pedido from ticket",
        function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                console.log('Select ticket result: ', res);
                result(null, res);
            }
        });
};
// Crear ticket
Ticket.createTicket = function (ticket, result) {
    sql.query("INSERT into ticket (usuario_id, ticket_pedido) values (?,?)",
        [ticket.tipo_usuario_id, ticket.ticket_pedido],
        function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                console.log('Insert ticket result: ', res.insertId);
                result(null, res.insertId);
            }
        });
}
// Actualizar ticket
Ticket.updateTicket = function (ticket, result) {
    sql.query("UPDATE ticket SET usuario_id = ?, ticket_pedido = ? where id = ?",
        [ticket.usuario_id, ticket.ticket_pedido, ticket.id],
        function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                console.log('Update ticket result: ', rows);
                result(null, res);
            }
        });
}
// Eliminar ticket
Ticket.deleteTicket = function (ticket, result) {
    sql.query("DELETE from ticket where id = ?", [ticket.id],
        function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                console.log('Delete ticket result: ', rows);
                result(null, res);
            }
        });
}
module.exports = Ticket;
