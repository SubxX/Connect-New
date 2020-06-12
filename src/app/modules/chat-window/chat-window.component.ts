import { Component, OnInit, OnDestroy } from '@angular/core';
import { CreateProfilePopupComponent } from '../shared/create-profile-popup/create-profile-popup.component';
import { store, dispatcher } from '../../Store/app.store';
import { User, socketUrl, Users } from '../../Store/models';
import { ActionTypes } from '../../Store/actions';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { takeUntil, take } from 'rxjs/operators';
import { Subject } from 'rxjs';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit, OnDestroy {
  userData: User;
  private unSubscriber = new Subject();
  private test = new Subject();
  socket: any;

  constructor(
    private api: ApiService,
    private router: Router
  ) {
    store
      .pipe(takeUntil(this.unSubscriber))
      .subscribe((user: any) => this.userData = user.userdetails);
    this.socket = io(socketUrl);
  }

  ngOnInit(): void {
    this.initUser();
    this.initOnlineUsers();
    this.socket.on('onusers', data => dispatcher.next({ type: ActionTypes.UPDATE_ONLINE_USERS, payload: data }));
  }


  initUser() {
    this.api.getRequest('login/getuserdetails').then((data: User) => {
      !data.name && !data.nickname ? this.api.popupOpener(CreateProfilePopupComponent, 680, true) :
        dispatcher.next({ type: ActionTypes.INIT_USER, payload: data });
      this.socketLoggedUserEvent();
    }).catch((err) => {
      console.log(err);
      this.api.logOut();
    });
  }

  initOnlineUsers() {
    this.api.getRequest('chat/getusers')
      .then((data: Array<Users>) => {
        dispatcher.next({ type: ActionTypes.INIT_USERS, payload: data });
      })
      .catch((err) => {
        console.log(err);
        dispatcher.next({ type: ActionTypes.INIT_USERS, payload: [] });
      });
  }

  leftbarToggle(state) {
    if (state) {
      document.querySelector('.left-holder').classList.add('left-holder-open');
      document.querySelector('.chat-window').classList.add('display-overlay');
      setTimeout(() => { document.querySelector('.chat-window').classList.add('overlay-shown'); }, 250);
    } else {
      document.querySelector('.left-holder').classList.remove('left-holder-open');
      document.querySelector('.chat-window').classList.remove('overlay-shown');
      setTimeout(() => { document.querySelector('.chat-window').classList.remove('display-overlay'); }, 500);
    }
  }

  socketLoggedUserEvent() {
    store
      .pipe(takeUntil(this.test))
      .subscribe(({ userdetails }) => {
        if (userdetails._id) {
          this.socket.emit('LOGGED_IN', { id: userdetails._id });
          this.test.next();
          this.test.complete();
        }
      });
  }

  noPropagation(e) {
    e.stopPropagation();
  }

  logoutSocketEvent() {
    this.socket.emit('logout', {});
  }

  ngOnDestroy() {
    this.unSubscriber.next();
    this.unSubscriber.complete();
  }

}
