import { Subject, BehaviorSubject } from 'rxjs';
import { ActionTypes } from './actions';
import { User, Event } from './models';
import { Action } from 'rxjs/internal/scheduler/Action';

let state: any = {
  userdetails: {},
  onlineUsers: [],
  onUsers: [],
  chat: {
    person: {},
    messages: []
  }
};

export const store = new BehaviorSubject<any>(state);
export const dispatcher = new Subject<Event>();


dispatcher.subscribe((data: Event) => {
  let currentVal = store.getValue();
  switch (data.type) {
    case ActionTypes.INIT_USER:
      currentVal.userdetails = data.payload;
      store.next(currentVal);
      break;
    case ActionTypes.UPDATE_SECURITY:
      currentVal.userdetails.security = data.payload;
      store.next(currentVal);
      break;
    case ActionTypes.UPDATE_PROFILEPIC:
      currentVal.userdetails.profilepic = data.payload.profilepic;
      store.next(currentVal);
      break;
    case ActionTypes.INIT_USERS:
      currentVal.onlineUsers = [...data.payload];
      store.next(currentVal);
      break;
    case ActionTypes.UPDATE_ONLINE_USERS:
      const idsAr = data.payload.map((ids) => ids.id);
      currentVal.onUsers = idsAr;
      store.next(currentVal);
      break;
    case ActionTypes.UPDATE_CHAT:
      currentVal.chat = data.payload;
      currentVal.onlineUsers.map(user => {
        if (user._id === currentVal.chat.person._id) {
          user.newmsgCount = 0;
        }
        return user;
      });
      store.next(currentVal);
      break;
    case ActionTypes.UPDATE_CHAT_ARRAY_RECEIVER:
      const chatARreceiver = [...data.payload];
      currentVal.chat.messages = chatARreceiver;
      currentVal.onlineUsers.map(user => {
        if (user._id === currentVal.chat.person._id) {
          user.lastmessage = chatARreceiver[chatARreceiver.length - 1].msgBody;
        } return user;
      });
      store.next(currentVal);
      break;
    case ActionTypes.UPDATE_CHAT_ARRAY_SENDER:
      const chatARsender = [...currentVal.chat.messages, data.payload];
      currentVal.onlineUsers.map(user => {
        if (user._id === currentVal.chat.person._id) { user.lastmessage = data.payload.msgBody; }
        return user;
      });
      currentVal.chat.messages = chatARsender;
      store.next(currentVal);
      break;
    case ActionTypes.UPDATE_LAST_MESSAGE:
      currentVal.onlineUsers.map(user => {
        if (user._id === data.payload.sender) {
          user.lastmessage = data.payload.msg;
          ++user.newmsgCount;
        }
        return user;
      });
      store.next(currentVal);
      break;
  }
});
