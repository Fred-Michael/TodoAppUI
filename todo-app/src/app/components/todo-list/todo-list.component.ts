import { Component, OnInit } from '@angular/core';
import { TodoService, TodoItem } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})

export class TodoListComponent implements OnInit {
  todos: TodoItem[] = [];
  newTodo: Partial<TodoItem> = { title: '', description: '', dueDate: '' };
  showDateError = false;
  showDescriptionError = false;
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  addTodo() {
    if (!this.newTodo.title) {
      alert("Title is required");
      return;
    }
    if (!this.newTodo.dueDate) {
      this.showDateError = true;
      return;
    }

    this.showDateError = false;
    this.todoService.createTodo(this.newTodo).subscribe(() => {
      this.loadTodos();
      this.newTodo = { title: '', description: '', dueDate: '' };
    });
  }

  validateDescription() {
    if (this.newTodo.description && this.newTodo.description.length > 500) {
      this.showDescriptionError = true;
      this.newTodo.description = this.newTodo.description.substring(0, 500);
    } else {
      this.showDescriptionError = false;
    }
  }
  
  loadTodos() {
    this.todoService.getTodos().subscribe((data) => this.todos = data);
  }

  markComplete(id: number) {
    this.todoService.completeTodo(id).subscribe(() => this.loadTodos());
  }

  markIncomplete(id: number) {
    this.todoService.incompleteTodo(id).subscribe(() => this.loadTodos());
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id).subscribe(() => this.loadTodos());
  }

  toggleCompletion(id: number, isCompleted: boolean) {
    if (isCompleted) {
      this.todoService.incompleteTodo(id).subscribe(() => this.loadTodos());
    } else {
      this.todoService.completeTodo(id).subscribe(() => this.loadTodos());
    }
  }
}
