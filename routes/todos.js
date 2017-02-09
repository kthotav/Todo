var express = require('express');
var router = express.Router();
var mongojs = require("mongojs");


var env = process.env.NODE_ENV || 'development';
var config = require('../config')[env];

// set database
var db = mongojs(config.url, ['todos']);


// GET /todos
router.get('/todos', function(req, res, next) {
    db.todos.find(function(error, todos) {
        if (error) { 
            handleError(res, error.message, "Failed to get todos."); 
        }
        else { 
            res.status(200).json(todos); 
        }
    });
});


// GET /todos/:id
router.get('/todo/:id', function(req, res, next) {
    db.todos.findOne({_id: mongojs.ObjectId(req.params.id)}, function(error, todo) {
        if (error) { 
            handleError(res, error.message, "Failed to get todo."); 
        }
        else {
            res.status(200).json(todo); 
        } 
        
    });
});


// POST /todo
router.post('/todo', function(req, res, next) {
    var todo = req.body;
    if(!todo.title || !(todo.isDone + '')) {
        handleError(res, "Invalid title", "Must provide a title.", 400);
    } 
    else {
        db.todos.save(todo, function(error, todo) {
            if (error) { 
                handleError(res, error.message, "Failed to create new todo.");
            } 
            else {
                res.status(201).json(todo);
            }
            
        });
    }
});


// DELETE /todo/:id
router.delete('/todo/:id', function(req, res, next) {
    db.todos.remove({_id: mongojs.ObjectId(req.params.id)}, function(error, todo) {
        if (error) { 
            handleError(res, error.message, "Failed to delete todo.");  
        } else {
            res.status(200).json(todo);
        }
        
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
         handleError(res, "Invalid title", "Must provide a title.", 400)
    } else {

        db.todos.update({_id: mongojs.ObjectId(req.params.id)}, updatedTodo, {}, function(error, todo) {
            if (error) { 
                handleError(res, error.message, "Failed to update todo.");
            }
            else {
                res.status(200).json(todo);
            }
        });
    }
});

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({ "status": code,  "error": message});
}

module.exports = router;