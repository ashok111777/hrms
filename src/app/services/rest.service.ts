import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { GlobalService } from './global.service';
import { LoaderService } from './loader.service';
import { AlertService } from './alerts.service';



@Injectable({
  providedIn: 'root'
})
export class RestService {
  authToken: string;
  baseUrl: string = '';
  constructor(private httpClient: HttpClient,
    public alert: AlertService,
    public loaderService: LoaderService
  ) { }

  getHeaders() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'DEVICE_DATE': new Date().toISOString(),
        'Authorization': localStorage.getItem('token') || ''
      })
    };
  }


  getService(url: string): Observable<{}> {
    const finalUrl = environment.baseApiUrl + url;
    return this.httpClient.get<any>(finalUrl, this.getHeaders())
      .pipe(
        retry(0), // retry a failed request up to 1 times
        map(this.extractData),
        catchError(this.handleError) // then handle the error
      );
  }
  getCountryService(): Observable<{}> {
    const finalUrl = 'assets/js/country_state.json';
    return this.httpClient.get<any>(finalUrl, this.getHeaders())
      .pipe(
        retry(0), // retry a failed request up to 1 times
        map(this.extractData),
        catchError(this.handleError) // then handle the error
      );
  }

  onboarding(url: string) {
    const finalUrl = environment.baseApiUrl + url;
    return this.httpClient.post<any>(finalUrl, undefined)
      .pipe(retry(0), map(this.extractData), catchError(this.handleError));
  }


  postLoginData(url: string, postData: any) {
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const finalUrl = environment.baseApiUrl + url;
    return this.httpClient.post<any>(finalUrl, JSON.stringify(postData), headers)
      .pipe(
        retry(0), // retry a failed request up to 1 times
        map(this.extractData),
        catchError(this.handleError) // then handle the error
      );
  }

  postDatanewuser(url: string, postData: any) {
    if (!this.authToken) {
      this.alert.showAlert('Login again', 'Token not found');
    }
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authToken
      })
    };
    const finalUrl = environment.baseApiUrl + url;
    return this.httpClient.post<any>(finalUrl, (JSON.stringify(postData)), headers || this.getHeaders())
      .pipe(
        retry(0), // retry a failed request up to 1 times
        map(this.extractData),
        catchError(this.handleError) // then handle the error
      );
  }

  postDataemp(url: string, postData: FormData): Observable<any> {
    if (!this.authToken) {
      this.alert.displayAlert('Login again', 'Token not found');
    }
    const headers = new HttpHeaders({
      'Authorization': this.authToken
    });
    const finalUrl = environment.baseApiUrl + url;
    return this.httpClient.post<any>(finalUrl, postData, { headers }).pipe(
      retry(1), // Retry a failed request once
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  putformdata(url: string, updatemethod: FormData): Observable<any> {
    if (!this.authToken) {
      this.alert.displayAlert('Login again', 'Token not found');
    }
    const headers = new HttpHeaders({
      'Authorization': this.authToken
    });
    const finalUrl = environment.baseApiUrl + url;
    return this.httpClient.put<any>(finalUrl, updatemethod, { headers }).pipe(
      retry(1), // Retry a failed request once
      map(this.extractData),
      catchError(this.handleError)
    );
  }



  putData(url: string) {
    if (!this.getHeaders) {
      this.alert.showAlert('Login again', 'Token not found');
    }
    const finalUrl = environment.baseApiUrl + url;
    return this.httpClient.put<any>(finalUrl, null, this.getHeaders())
      .pipe(
        retry(0), // retry a failed request up to 1 times
        map(this.extractData),
        catchError(this.handleError) // then handle the error
      );
  }

  update(url: string, data: any) {
    if (!this.authToken) {
      this.alert.showAlert('Login again', 'Token not found');
    }
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authToken
      })
    };
    const finalUrl = environment.baseApiUrl + url;

    return this.httpClient.put<any>(finalUrl, (JSON.stringify(data)), headers || this.getHeaders())
      .pipe(
        retry(0), // retry a failed request up to 1 times
        map(this.extractData),
        catchError(this.handleError) // then handle the error
      );
  }

  deleteTemplate(url: string) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json;",
      'Authorization': this.authToken
    });
    const finalUrl = environment.baseApiUrl + url;
    const options = {
      headers: headers,
    };
    return this.httpClient.delete<any>(finalUrl, options).pipe(
      retry(0),
      map(this.extractData),
      catchError(this.handleError)
    );
  }


  private extractData(res: Response) {
    let body = res;
    return body || {};
  }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      //console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    const err = {
      status: error.status,
      error: error.error
    };
    // Return an observable with a user-facing error message.
    return throwError(() => (error.error));
  }

  deleteData(url: string) {
    const finalUrl = environment.baseApiUrl + url;
    const headers = new HttpHeaders({
      'Authorization': this.authToken
    });

    return this.httpClient.delete<any>(finalUrl, this.getHeaders())
      .pipe(
        retry(0), // retry a failed request up to 1 times
        map(this.extractData),
        catchError(this.handleError) // then handle the error
      );
  }
}
