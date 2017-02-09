var express = require('express');
var router = express.Router();
var mongojs = require("mongojs");
var db = mongojs('mongodb://admin:admin@ds147069.mlab.com:47069/heroku_8p81d1zw', ['todos']);

// GET /todos
router.get('/todos', function(req, res, next) {
    db.todos.find(function(error, todos) {
        if(error) { res.send(error); }
        res.json(todos);
    });
});

module.exports = router;