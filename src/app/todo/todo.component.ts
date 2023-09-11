import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Todo } from "../todo";
import { DataService } from "../data/data.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: [ './todo.component.css' ]
})
export class TodoComponent {
  pageTitle = 'Todo details';
  errorMessage = '';
  todo!: Todo;

  constructor(private route: ActivatedRoute,
              private dataService: DataService) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getProduct(id);
    }
  }

  getProduct(id: string): void {
    this.dataService.getTodoById(id).subscribe({
      next: todo => this.todo = todo,
      error: err => this.errorMessage = err
    });
  }


  onSubmit(form: NgForm) {
    this.dataService.updateTodo(this.todo)
      .subscribe({
        next: todo => this.todo = todo,
        error: err => this.errorMessage = err
      });
  }
}
