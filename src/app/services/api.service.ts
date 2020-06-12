import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ServerErrorComponent } from '../modules/shared-common/server-error/server-error.component';
import { ConfirmationPopupComponent } from '../modules/shared-common/confirmation-popup/confirmation-popup.component';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  loaderState = new BehaviorSubject<boolean>(false);

  baseUrl = 'http://localhost:3000/api/';

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private router: Router) { }


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
    this.router.navigate(['/login']);
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

  popupOpener(component: any, wdth: number, closable: boolean, passedData?: any) {
    const opts: any = {
      width: `${wdth}px`,
      disableClose: closable,
      maxHeight: 'calc(100vh - 20px)',
      data: passedData ? passedData : {}
    };
    this.dialog.open(component, opts);
  }

  serverErrorPopup() {
    this.dialog.open(ServerErrorComponent, { width: '330px', maxHeight: 'calc(100vh - 20px)' });
  }

  confirmationPopup() {
    const reference = this.dialog.open(ConfirmationPopupComponent, { width: `300px`, disableClose: true });
    return reference.afterClosed();
  }


}
