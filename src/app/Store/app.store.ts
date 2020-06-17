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
      store.next(currentVal);
      break;
    case ActionTypes.UPDATE_CHAT_ARRAY_RECEIVER:
      const chatARreceiver = [...data.payload];
      currentVal.chat.messages = chatARreceiver;
      store.next(currentVal);
      break;
    case ActionTypes.UPDATE_CHAT_ARRAY_SENDER:
      const chatARsender = [...currentVal.chat.messages, data.payload];
      currentVal.chat.messages = chatARsender;
      store.next(currentVal);
      break;
  }
});
