import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ServerErrorComponent } from '../modules/shared-common/server-error/server-error.component';
import { ConfirmationPopupComponent } from '../modules/shared-common/confirmation-popup/confirmation-popup.component';
import { Router } from '@angular/router';
import { dispatcher } from '../Store/app.store';
import { ActionTypes } from '../Store/actions';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  loaderState = new BehaviorSubject<boolean>(false);
  scrollEv = new BehaviorSubject<string>('');

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

  popupOpener(component: any, wdth: number, closable: boolean, passedData?: any, needRef?: boolean) {
    const opts: any = {
      width: `${wdth}px`,
      disableClose: closable,
      maxHeight: 'calc(100vh - 20px)',
      data: passedData ? passedData : {}
    };
    const ref = this.dialog.open(component, opts);
    if (needRef) { return ref.afterClosed(); } else { return; }
  }

  serverErrorPopup() {
    this.dialog.open(ServerErrorComponent, { width: '330px', maxHeight: 'calc(100vh - 20px)' });
  }

  confirmationPopup() {
    const reference = this.dialog.open(ConfirmationPopupComponent, { width: `300px`, disableClose: true });
    return reference.afterClosed();
  }

  refreshChat(senderID, receiver) {
    this.getRequest(`chat/getmessages/${senderID}/${receiver._id}`)
      .then((data) => {
        console.log(data);
        dispatcher.next({ type: ActionTypes.UPDATE_CHAT_ARRAY_RECEIVER, payload: data });
        this.scrollEv.next('refresh');
      })
      .catch((err) => { this.serverErrorPopup(); });
  }

  resetChatPerson() {
    dispatcher.next({ type: ActionTypes.UPDATE_CHAT, payload: { person: {}, messages: [] } });
  }

  initChatPerson(user, currentUserId) {
    this.loaderStateHandeler(true);
    this.getRequest(`chat/getmessages/${currentUserId}/${user._id}`)
      .then((data) => {
        dispatcher.next({ type: ActionTypes.UPDATE_CHAT, payload: { person: user, messages: data } });
        this.router.navigate(['/chatapp/chat']);
        this.scrollEv.next('new');
        this.loaderStateHandeler(false);
      })
      .catch((err) => { console.log(err); this.loaderStateHandeler(false); this.serverErrorPopup(); });
  }

}
