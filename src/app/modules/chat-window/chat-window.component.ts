import { Component, OnInit, OnDestroy } from '@angular/core';
import { CreateProfilePopupComponent } from '../shared/create-profile-popup/create-profile-popup.component';
import { store, dispatcher } from '../../Store/app.store';
import { User } from '../../Store/models';
import { ActionTypes } from '../../Store/actions';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit, OnDestroy {
  userData: User;
  private unSubscriber = new Subject();
  constructor(
    private api: ApiService,
    private router: Router
  ) {
    store
      .pipe(takeUntil(this.unSubscriber))
      .subscribe((user: any) => this.userData = user.userdetails);
  }

  ngOnInit(): void {
    this.initUser();
  }


  initUser() {
    this.api.getRequest('login/getuserdetails').then((data: User) => {
      if (!data.name && !data.nickname) {
        this.api.popupOpener(CreateProfilePopupComponent, 680, true);
      } else {
        dispatcher.next({ type: ActionTypes.INIT_USER, payload: data });
      }
    }).catch((err) => {
      console.log(err);
      this.api.logOut();
    });
  }

  ngOnDestroy() {
    this.unSubscriber.next();
    this.unSubscriber.complete();
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

  noPropagation(e) {
    e.stopPropagation();
  }
}
