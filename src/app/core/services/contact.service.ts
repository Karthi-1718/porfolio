import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { ContactForm, ApiResponse } from '../models/portfolio.models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private readonly apiUrl = `${environment.apiUrl}/api/contact`;

  constructor(private http: HttpClient) {}

  sendMessage(formData: ContactForm): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.apiUrl, formData).pipe(
      timeout(15000),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let message = 'An unexpected error occurred. Please try again.';

    if (error.status === 429) {
      message = 'Too many requests. Please wait 15 minutes before trying again.';
    } else if (error.status === 400) {
      message = error.error?.message ?? 'Invalid form data. Please check your inputs.';
    } else if (error.status === 0) {
      message = 'Unable to connect to the server. Please check your internet connection.';
    } else if (error.error?.message) {
      message = error.error.message;
    }

    return throwError(() => new Error(message));
  }
}
