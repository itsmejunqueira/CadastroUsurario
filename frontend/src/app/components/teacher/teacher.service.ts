import { Teacher } from './teacher.model';
import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpClient} from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  baseUrl = "http://localhost:3001/teachers"

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition:"right",
      verticalPosition: "top",
      panelClass: isError? ['msg-error'] : ['msg-sucess']
    });
  }

  create(Teacher: Teacher): Observable<Teacher> {
    return this.http.post<Teacher>(this.baseUrl, Teacher).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  read(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(this.baseUrl).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  readById(id: any): Observable<Teacher> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Teacher>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }



  update(teacher
: Teacher): Observable<Teacher> {
    const url = `${this.baseUrl}/${teacher
  .id}`;
    return this.http.put<Teacher>(url, teacher
  ).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

   delete(id: number): Observable<Teacher> {
   const url = `${this.baseUrl}/${id}`;
   return this.http.delete<Teacher>(url).pipe(
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
