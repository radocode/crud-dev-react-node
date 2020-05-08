'use strict';

var Ticket = require('../models/ticketModel');

exports.list_all_tickets = function (req, res) {
    Ticket.getTickets(function (err, ticket) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', ticket);
        res.send(ticket);
    });
};



exports.create_a_ticket = function (req, res) {
    var new_ticket = new Ticket(req.body);
    if (!new_ticket.ticket_pedido) {
        res.status(400).send({ error: true, message: 'Ticket no puede ser nulo o vacio' });
    } else {
        Ticket.createTicket(new_ticket, function (err, ticket) {
            if (err)
                res.send(err);
            res.json(ticket);
        });
    }
};

exports.update_a_ticket = function (req, res) {
    Ticket.updateTicket(req.params.ticketId, new Task(req.body), function (err, ticket) {
        if (err)
            res.send(err);
        res.json(ticket);
    });
};


exports.delete_a_ticket = function (req, res) {
    Ticket.deleteTicket(req.params.ticketId, function (err, ticket) {
        if (err)
            res.send(err);
        res.json({ message: `Ticket borrado ${req.params.ticketId}` });
    });
};