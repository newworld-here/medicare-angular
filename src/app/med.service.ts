import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from '../environments/environment.prod';
const API_URL: string = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class MedService {

constructor(private http: HttpClient) { }
private handleError(error: HttpErrorResponse): any {
  if (error.status === 0) {
    // A client-side or network error occurred. Handle it accordingly.
    console.log('>>>>>>>>>>>>>>>>>>', error);
  //  alert('No Internet');
    console.error('An error occurred:', error.error);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong.
    console.error(
      `Backend returned code ${error.status}, body was: `, error.error);
  }
  // Return an observable with a user-facing error message.
  return throwError(
    'Something bad happened; please try again later.');
}
getService(serviceName: string): any {
  return this.http.get(API_URL + serviceName).pipe(catchError(this.handleError));
}
get(): any {
  // https://jsonip.com/
  return this.http.get('https://api.db-ip.com/v2/free/self');
}
postService(serviceName: string, data: any): any {
  return this.http.post(API_URL + serviceName, data).pipe(catchError(this.handleError));
}
}
