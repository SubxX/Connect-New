import { Component, OnInit, OnDestroy } from '@angular/core';
import { store, dispatcher } from '../../../Store/app.store';
import { ActionTypes } from '../../../Store/actions';
import { Users } from '../../../Store/models';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { ChatWindowComponent } from '../chat-window.component';

@Component({
  selector: 'app-chat-window-child',
  templateUrl: './chat-window-child.component.html',
  styleUrls: ['./chat-window-child.component.css']
})
export class ChatWindowChildComponent implements OnInit, OnDestroy {
  private unSubscriber = new Subject();
  msg: any;
  currentUserId: any;
  currentUser: any;

  chatPerson: Users;
  chatMessages: any;
  onlineUsers: any;

  msgDebouse = new Subject();

  constructor(private router: Router, private api: ApiService, private cWindow: ChatWindowComponent) {
    store
      .pipe(takeUntil(this.unSubscriber))
      .subscribe(({ userdetails, chat, onUsers }) => {
        if (!chat.person._id) { this.router.navigate(['/chatapp/welcome']); }
        this.currentUserId = userdetails._id;
        this.currentUser = userdetails;

        this.chatPerson = chat.person;
        this.chatMessages = chat.messages;
        this.onlineUsers = onUsers;
      });
  }

  ngOnInit(): void {
  }


  sendMessage() {
    if (this.msg) {
      const payload = {
        senderId: this.currentUserId,
        receiverId: this.chatPerson._id,
        msg: this.msg,
      };
      this.api.postRequest(`chat`, payload)
        .then((data) => {
          dispatcher.next({ type: ActionTypes.UPDATE_CHAT_ARRAY_SENDER, payload: data });
          this.cWindow.refreshEvent.next(this.chatPerson);
          this.msg = '';
        })
        .catch((err) => { console.log(err); });
    } else { return false; }
  }

  detectEnter(e) {
    if (e.which === 13) {
      this.sendMessage();
    }
  }

  ngOnDestroy() {
    this.unSubscriber.next();
    this.unSubscriber.complete();
  }
}
