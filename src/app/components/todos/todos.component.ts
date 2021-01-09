import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/Todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos!: Todo[];

  // initialize services in constructor
  constructor(private todoService: TodoService) { }

  ngOnInit() {
    // like "await Promise".then(...)
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  // Delete the todo 
  deleteTodo(todo: Todo) {
    console.log('delete me');
    // ... in UI (could also do it in the subsribe to be more safe)
    this.todos = this.todos.filter(t => t.id !== todo.id);
    // ... on Server
    this.todoService.deleteTodo(todo).subscribe();
  }

  // Add Todo
  addTodo(todo: Todo) {
    this.todoService.addTodo(todo).subscribe(todo => {
      this.todos.push(todo);
    });
  }

}
