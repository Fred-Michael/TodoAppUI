import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService, TodoItem } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css']
})
export class TodoEditComponent implements OnInit {
  todo: Partial<TodoItem> = { title: '', description: '', dueDate: '' };

  constructor(private route: ActivatedRoute, private router: Router, private todoService: TodoService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.todoService.getTodo(id).subscribe((data) => (this.todo = data));
  }

  updateTodo(): void {
    if (!this.todo.title) {
      alert("Title is required");
      return;
    }
    this.todoService.updateTodo(Number(this.todo.id), this.todo).subscribe(() => {
      alert("Todo item Updated!");
      this.router.navigate(['/']);
    });
  }
}