import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { store, dispatcher } from '../../../Store/app.store';
import { ActionTypes } from '../../../Store/actions';
import { Users } from '../../../Store/models';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { ChatWindowComponent } from '../chat-window.component';

@Component({
  selector: 'app-chat-window-child',
  templateUrl: './chat-window-child.component.html',
  styleUrls: ['./chat-window-child.component.css']
})
export class ChatWindowChildComponent implements OnInit, OnDestroy, AfterViewInit {
  private unSubscriber = new Subject();
  msg: any;
  currentUserId: any;
  currentUser: any;

  chatPerson: Users;
  chatMessages: any;
  onlineUsers: any;

  scrollSmooth = false;

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

  ngAfterViewInit() {
    this.api.scrollEv
      .pipe(takeUntil(this.unSubscriber))
      .subscribe((data) => {
        data === 'new' ? this.scrollSmooth = false : this.scrollSmooth = true;
        this.scrollFunc();
      });
  }

  sendMessage() {
    this.scrollSmooth = true;
    if (this.msg) {
      const payload = {
        senderId: this.currentUserId,
        receiverId: this.chatPerson._id,
        msg: this.msg,
      };
      this.api.postRequest(`chat`, payload)
        .then((data) => {
          dispatcher.next({ type: ActionTypes.UPDATE_CHAT_ARRAY_SENDER, payload: data });
          this.cWindow.refreshEvent.next({ person: this.chatPerson, newmsg: data });
          this.msg = '';
          this.scrollFunc();
        })
        .catch((err) => { console.log(err); });
    } else { return false; }
  }

  scrollFunc() {
    setTimeout(() => {
      document.querySelector('.chat-threads-holder').scrollTop = document.querySelector('.chat-threads-holder').scrollHeight;
    }, 10);
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
