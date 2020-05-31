import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  loaderState = new Subject<boolean>();

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

  logOut() {
    if (localStorage.getItem('authorization')) { localStorage.clear(); }
    if (sessionStorage.getItem('authorization')) { sessionStorage.clear(); }
  }

  getToken() {
    return (localStorage.getItem('authorization') || sessionStorage.getItem('authorization'));
  }

  loaderStateHandeler(state: boolean) {
    this.loaderState.next(state);
  }

}
