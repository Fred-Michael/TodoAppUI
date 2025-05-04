import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoService, TodoItem } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css']
})
export class TodoDetailComponent implements OnInit {
  todo?: TodoItem;

  constructor(private route: ActivatedRoute, private todoService: TodoService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log("ID received: ", id);
    this.todoService.getTodo(id).subscribe((data) => (this.todo = data));
  }
}
