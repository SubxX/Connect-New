import { Component, OnInit, OnDestroy } from '@angular/core';
import { dispatcher, store } from '../../../../Store/app.store';
import { ActionTypes } from '../../../../Store/actions';
import { Users } from '../../../../Store/models';
import { ApiService } from '../../../../services/api.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { trigger, transition, query, style, stagger, animate, keyframes } from '@angular/animations';


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
  unSubscriber = new Subject();

  constructor(private api: ApiService) {
    store
      .pipe(takeUntil(this.unSubscriber))
      .subscribe((data) => { this.onUsers = data.onlineUsers; });
  }

  ngOnInit(): void {
    this.initUsers();
  }

  initUsers() {
    this.api.getRequest('chat/getusers')
      .then((data: Array<Users>) => {
        dispatcher.next({ type: ActionTypes.INIT_USERS, payload: data });
      })
      .catch((err) => {
        console.log(err);
        this.onUsers = [];
      });
  }

  ngOnDestroy() {
    this.unSubscriber.next();
    this.unSubscriber.complete();
  }
}
