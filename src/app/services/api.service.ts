import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  loaderState = new BehaviorSubject<boolean>(false);

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
    if (localStorage.getItem('authorization')) { localStorage.removeItem('authorization'); }
    if (sessionStorage.getItem('authorization')) { sessionStorage.removeItem('authorization'); }
  }

  getToken() {
    return (localStorage.getItem('authorization') || sessionStorage.getItem('authorization'));
  }

  setToken(remember: boolean, token: string) {
    remember ? localStorage.setItem('authorization', token) : sessionStorage.setItem('authorization', token);
  }

  loaderStateHandeler(state: boolean) {
    this.loaderState.next(state);
  }


}
