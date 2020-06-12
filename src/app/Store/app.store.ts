import { Subject, BehaviorSubject } from 'rxjs';
import { ActionTypes } from './actions';
import { User, Event } from './models';

let state: any = {
  userdetails: {},
  onlineUsers: [],
  onUsers: []
};

export const store = new BehaviorSubject<any>(state);
export const dispatcher = new Subject<Event>();


dispatcher.subscribe((data: Event) => {
  switch (data.type) {
    case ActionTypes.INIT_USER:
      state.userdetails = data.payload;
      state.onUsers = [];
      store.next(state);
      break;
    case ActionTypes.UPDATE_SECURITY:
      store.next({ ...state, userdetails: { ...state.userdetails, security: data.payload } });
      break;
    case ActionTypes.INIT_USERS:
      state.onlineUsers = [...data.payload];
      store.next(state);
      break;
    case ActionTypes.UPDATE_ONLINE_USERS:
      const idsAr = data.payload.map((ids) => ids.id);
      store.next({ ...state, onUsers: [...idsAr] });
      break;
  }
});
