import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) { }


  postRequest(url, payload) {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.baseUrl}${url}`, payload).subscribe(
        data => resolve(data),
        err => reject(err)
      );
    });
  }

  getRequest(url) {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.baseUrl}${url}`).subscribe(
        data => resolve(data),
        err => reject(err)
      );
    });
  }


}
