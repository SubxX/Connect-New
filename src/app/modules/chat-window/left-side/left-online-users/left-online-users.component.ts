import { Component, OnInit, OnDestroy } from '@angular/core';
import { store, dispatcher } from '../../../../Store/app.store';
import { ActionTypes } from '../../../../Store/actions';
import { Users } from '../../../../Store/models';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { trigger, transition, query, style, stagger, animate, keyframes } from '@angular/animations';
import { UserProfilePopupComponent } from '../../../shared/user-profile-popup/user-profile-popup.component';
import { ApiService } from '../../../../services/api.service';
import { ChatWindowComponent } from '../../chat-window.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-left-online-users',
  templateUrl: './left-online-users.component.html',
  styleUrls: ['./left-online-users.component.css'],
  animations: [
    trigger('userlistani', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),
        query(':enter', stagger('200ms', [
          animate('.5s ease-in', keyframes([
            style({ opacity: 0, transform: 'translateX(-30%)', offset: 0 }),
            style({ opacity: .5, transform: 'translateX(-10%)', offset: 0.3 }),
            style({ opacity: 1, transform: 'translateX(0)', offset: 1 }),
          ]))]), { optional: true }),


        query(':leave', stagger('200ms', [
          animate('300ms ease-out', keyframes([
            style({ opacity: 1, transform: 'translateX(-30%)', offset: 0 }),
            style({ opacity: .5, transform: 'translateX(-10%)', offset: 0.3 }),
            style({ opacity: 0, transform: 'translateX(0)', offset: 1 }),
          ]))]), { optional: true })
      ]),
    ]),
  ]
})
export class LeftOnlineUsersComponent implements OnInit, OnDestroy {
  onUsers: Array<Users>;
  onlineUsersId: any;
  currentUserId: any;

  currentChatPersonId: any;
  private unSubscriber = new Subject();

  constructor(private api: ApiService, private cWindow: ChatWindowComponent, private router: Router) {
    store
      .pipe(takeUntil(this.unSubscriber))
      .subscribe((data) => {
        this.currentUserId = data.userdetails._id;
        this.onUsers = data.onlineUsers; this.onlineUsersId = data.onUsers;
        this.currentChatPersonId = data.chat.person._id;
      });
  }

  ngOnInit(): void {
  }

  viewUserProfile(user, e) {
    e.stopPropagation();
    this.cWindow.leftbarToggle(false);
    this.api.popupOpener(UserProfilePopupComponent, 400, false,
      { data: { ...user, on: this.onlineUsersId.includes(user._id) }, currentUser: this.currentUserId }
    );
  }

  startChat(e, clickable, user) {
    if (!clickable) {
      e.stopPropagation();
      this.api.initChatPerson(user, this.currentUserId);
      this.cWindow.leftbarToggle(false);
    } else {
      return;
    }
  }

  ngOnDestroy() {
    this.unSubscriber.next();
    this.unSubscriber.complete();
  }

}
