'use strict';

var Ticket = require('../models/ticketModel');

var genericError = { message: 'Error generico', data: null };

exports.list_all_tickets = function (req, res) {
    Ticket.getTickets(req, function (err, ticket) {
        console.log('controller')
        if (err) {
            genericError.data = err;
            res.status(500).json(genericError);
        }
        console.log('res', ticket);
        res.send({ data: ticket, code: 200 });
    });
};



exports.create_a_ticket = function (req, res) {
    var new_ticket = new Ticket(req.body);
    if (!new_ticket.ticket_pedido) {
        res.status(400).send({ error: true, message: 'Ticket no puede ser nulo o vacio' });
    } else {
        Ticket.createTicket(new_ticket, function (err, ticket) {
            if (err) {
                genericError.data = err;
                res.status(500).json(genericError);
            }
            res.json({ data: ticket, code: 200 });
        });
    }
};

exports.update_a_ticket = function (req, res) {
    Ticket.updateTicket(req.params.ticketId, new Task(req.body), function (err, ticket) {
        if (err) {
            genericError.data = err;
            res.status(500).json(genericError);
        }
        res.json({ data: ticket, code: 200 });
    });
};


exports.delete_a_ticket = function (req, res) {
    Ticket.deleteTicket(req.params.ticketId, function (err, ticket) {
        if (err) {
            genericError.data = err;
            res.status(500).json(genericError);
        }
        res.json({ code: 200, data: ticket, message: `Ticket borrado ${req.params.ticketId}` });
    });
};