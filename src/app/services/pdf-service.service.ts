// pdf-service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, retry } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  constructor(private http: HttpClient) { }

  getHeaders() {
    console.log('header-token:  ' + localStorage.getItem('token'));
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'DEVICE_DATE': new Date().toISOString(),
        'Authorization': localStorage.getItem('token') || ''
        // 'Authorization': this.authToken || ''
      })
    };
  }

  getPdfWithHeaders(authToken: string | null, teamname: string | undefined | null, option: string | undefined | null, startDate: string | undefined | null, endDate: string | undefined | null): Observable<any> {
    // Replace 'YOUR_API_ENDPOINT' with your actual PDF endpoint
    const pdfUrl = 'http://172.16.10.212:8762/api/web/v1/pdf/employee/';

    // Set the Authorization header with the token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);

    // Construct the URL with parameters
    const apiUrl = `${pdfUrl}${option}?startDate=${startDate}&endDate=${endDate}&team=${teamname}`;

    // Make the HTTP GET request with headers
    return this.http.get<any>(apiUrl, this.getHeaders())

  }
}
