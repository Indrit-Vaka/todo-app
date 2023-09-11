import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { TodoComponent } from './todo/todo.component';
import { FormsModule } from "@angular/forms";
import { NotFoundComponent } from './not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'todo', component: TodoComponent },
      { path: '**', component: NotFoundComponent }
    ])
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
