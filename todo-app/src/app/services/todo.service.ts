import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

export interface TodoItem {
  id: number;
  title: string;
  description?: string;
  dueDate?: string;
  isCompleted: boolean;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:5087/api/todos'; //for production app, the api value shouldn't be hardcoded here, but put in an environment variable

  constructor(private http: HttpClient) { }

  getTodos(): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(this.apiUrl);
  }

  getTodo(id: number): Observable<TodoItem> {
    return this.http.get<TodoItem>(`${this.apiUrl}/${id}`);
  }

  createTodo(todo: Partial<TodoItem>): Observable<TodoItem> {
    return this.http.post<TodoItem>(this.apiUrl, todo);
  }

  updateTodo(id: number, todo: Partial<TodoItem>): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, todo);
  }

  completeTodo(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/complete`, {});
  }

  incompleteTodo(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/incomplete`, {})
  }

  deleteTodo(id:number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
