import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Todo } from "../todo";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  rootUrl = "https://todo-api-func.azurewebsites.net/api"

  constructor(private http: HttpClient) {

  }

  createTodo(todo: Todo): Observable<any> {
    return this.http.post(this.rootUrl + '/todo', todo)
  }

  getTodos(): Observable<any> {
    return this.http.get(this.rootUrl + '/todo')
  }

  getTodoById(id: string): Observable<any> {
    return this.http.get(this.rootUrl + '/todo/' + id)
  }

  updateTodo(todo: Todo): Observable<any> {
    return this.http.put(this.rootUrl + '/todo/' + todo.id, todo)
  }

  updateTodos(todos: Todo[]): Observable<any> {
    return this.http.put(this.rootUrl + '/todo/', todos)
  }

  deleteTodo(id: string): Observable<any> {
    return this.http.delete(this.rootUrl + '/todo/' + id)
  }
}
