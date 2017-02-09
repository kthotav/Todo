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


// GET /todos/:id
router.get('/todo/:id', function(req, res, next) {
    db.todos.findOne({_id: mongojs.ObjectId(req.params.id)}, function(error, todo) {
        if(error) { res.send(error); }
        res.json(todo);
    });
});


// POST /todo
router.post('/todo', function(req, res, next) {
    var todo = req.body;
    if(!todo.title || !(todo.isDone + '')) {
        res.status(400);
        res.json({
            "error": "bad data"
        });
    } 
    else {
        db.todos.save(todo, function(error, todo) {
            if(error) { res.send(error); }
            res.json(todo);
        });
    }
});


// DELETE /todo/:id
router.delete('/todo/:id', function(req, res, next) {
    db.todos.remove({_id: mongojs.ObjectId(req.params.id)}, function(error, todo) {
        if(error) { res.send(error); }
        res.json(todo);
    });
});


// PUT /todo/:id
router.put('/todo/:id', function(req, res, next) {

    var todo = req.body;
    var updatedTodo = {
        title: todo.title,
        isDone: todo.isDone
    };

    if(!updatedTodo) {
        res.status(400);
        res.json({
            "error": "bad data"
        });
    } else {

        db.todos.update({_id: mongojs.ObjectId(req.params.id)}, updatedTodo, {}, function(error, todo) {
            if(error) { res.send(error); }
            res.json(todo);
        });
    }
});

module.exports = router;