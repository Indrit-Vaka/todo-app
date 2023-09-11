import { Component, OnInit } from '@angular/core';
import { DataService } from "./data/data.service";
import { Todo } from "./todo";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {

    title = 'todo';

    todos: Todo[] = []

    errorMessage = '';
    sortColumn: string = '';
    sortDirection: 'asc' | 'desc' = 'asc';


    constructor(private service: DataService) {

    }

    ngOnInit(): void {
        this.loadData()
    }

    loadData() {
        this.service.getTodos()
            .subscribe({
                next: todos => {
                    this.todos = todos
                    this.addEmptyTodo()
                },
                error: err => this.errorMessage = err
            })
    }


    deleteTodo(id: string | undefined) {
        if (id == undefined) return;
        this.saveAll()
        this.service.deleteTodo(id)
            .subscribe({
                error: err => this.errorMessage = err,
                next: next => this.loadData()
            })
    }



    saveAll() {
        this.service.updateTodos(this.todos.filter(todo => todo.title !== undefined)).subscribe({
            error: err => this.errorMessage = err,
            next: next => this.loadData()
        })

    }

    addEmptyTodo() {
        this.todos.push({
            id: undefined,
            title: undefined,
            description: undefined,
            createdTime: undefined,
            isCompleted: undefined,
        })
    }

    onTitleChange(todo: Todo) {
        if (todo.createdTime === undefined) {
            this.addEmptyTodo();
            todo.createdTime = new Date()
        }
    }

    deleteEmptyTodoTodo(todo: Todo) {
        this.todos = this.todos.filter(v => v !== todo)
    }
    sortBy(column: string) {
        let sameColumn = this.sortColumn === column;
        if (sameColumn) {
            this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortColumn = column;
            this.sortDirection = 'asc';
        }

        this.todos = this.todos
            .map(v=> (<any>v))
            .filter((todo) => todo[column] !== undefined)
            .sort((a, b) => {
                const valueA = a[column];
                const valueB = b[column];
                if (typeof valueA === 'boolean' && typeof valueB === 'boolean') {
                    return this.sortDirection === 'asc' ? (valueA === valueB ? 0 : valueA ? -1 : 1) : (valueA === valueB ? 0 : valueA ? 1 : -1);
                }

                return this.sortDirection === 'asc'
                    ? valueA?.localeCompare(valueB)
                    : valueB?.localeCompare(valueA);
            })
            .concat(this.todos.map(v=> (<any>v)).filter((todo) => todo[column] === undefined));
    }

    getSortClass(column: string):string {
        if(this.sortColumn !== column)
            return 'bi bi-sort-up'
        return this.sortDirection === 'asc' ?'bi bi-sort-down' : 'bi-sort-up'
    }


}
