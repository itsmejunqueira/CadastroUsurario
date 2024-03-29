import { User } from './user.model';
import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpClient} from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = "http://localhost:3001/users"

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition:"right",
      verticalPosition: "top",
      panelClass: isError? ['msg-error'] : ['msg-sucess']
    });
  }

  create(User: User): Observable<User> {
    return this.http.post<User>(this.baseUrl, User).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  read(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  readById(id: any): Observable<User> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<User>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }



  update(user: User): Observable<User> {
    const url = `${this.baseUrl}/${user.id}`;
    return this.http.put<User>(url, user).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

   delete(id: number): Observable<User> {
   const url = `${this.baseUrl}/${id}`;
   return this.http.delete<User>(url).pipe(
    map(obj => obj),
    catchError(e => this.errorHandler(e))
   );
   }

   errorHandler(e: any): Observable<any> {
    console.log(e)
    this.showMessage("Ocorreu um erro!" , true);
    return EMPTY
  };
  
}
