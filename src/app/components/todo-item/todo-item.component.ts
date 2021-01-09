import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from 'src/app/models/Todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo = new Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();

  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }

  // Set Dynamic Classes 
  setClasses() {
    let classes = {
      todo: true,
      'is-complete': this.todo.completed // only add this class, if...
    }
    return classes;
  }

  // Toggle the completed state
  onToggle(todo: Todo) {
    // ... in UI
    console.log('toggle');
    todo.completed = !todo.completed;
    // ... on Server
    this.todoService.toggleCompleted(todo).subscribe(todo =>
      console.log(todo));
  }

  /*  Emit the affected Todo as Output upwards to the html...
      Html catches it in "(deleteTodo)="deleteTodo()""...
      And triggers the method in the todos.component. */
  onDelete(todo: Todo) {
    this.deleteTodo.emit(todo);
  }

}
