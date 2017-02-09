import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
// import { MaterialModule } from '@angular/material';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { TodoComponent } from './components/todo/todo.component';
import { TodoService } from './components/todo/todo.service';


@NgModule({
  declarations: [
    AppComponent,
    TodoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot()
    // MaterialModule.forRoot()
  ],
  providers: [TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
