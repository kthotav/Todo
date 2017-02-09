import { Component, OnInit } from '@angular/core';

import { TodoService } from './todo.service';

import { Todos } from './todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  constructor(private todoService: TodoService) { }

  private todos: Todos[];

  // properties 
  private title: string;

  ngOnInit() {
    this.getTodosData();
    console.log(location.hostname);
  }

  getTodosData() {
    this.todoService.getTodos().subscribe(
      (data) => {
        this.todos = data;
        console.log(this.todos);
      }
    )
  }

  addTodo(event) {
    event.preventDefault();
    var newTodo = {
      title: this.title,
      isDone: false
    }
    this.todoService.postTodo(newTodo).subscribe(
      (data) => {
        console.log(data);
        this.todos.push(data);
      });
  }

  submitTodo(todo) {
    var newTodo = {
      title: todo,
      isDone: false
    }
    this.todoService.postTodo(newTodo).subscribe(
      (data) => {
        console.log(data);
        this.todos.push(data);
      });
  }

  deleteTodo(todo) {
    this.todoService.deleteTodo(todo._id).subscribe(
      (data) => {
        console.log(data);
        var index = this.todos.indexOf(todo);
        this.todos.splice(index, 1);
      });
  }

  updateTodo(todo) {
    var updateTodo = {
      _id: todo._id,
      title: todo.title,
      isDone: !todo.isDone
    }
    this.todoService.updateTodo(updateTodo).subscribe(
      (data) => {
        console.log(data);
      }
    )
  }

}
