import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';

@Injectable()
export class TodoService {

  constructor(private http: Http) { }

  private hostURL = 'https://murmuring-journey-74080.herokuapp.com/api/';

   // GET /todos
  getTodos() {
    const headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    headers.append('Accept', 'application/json');
    return this.http.get(this.hostURL + 'todos', options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  // POST /todo
  postTodo(data) {
    const body = JSON.stringify(data);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.hostURL + 'todo', body, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  // DELETE /todo/:id
  deleteTodo(id) {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(this.hostURL + 'todo/' + id, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  // PUT /todo/:id
  updateTodo(data) {
    console.log(data);
    const body = JSON.stringify(data);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.hostURL + 'todo/' + data._id, body, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  // error
  handleError(error:any) {
    return Observable.throw(error);
  }

}
