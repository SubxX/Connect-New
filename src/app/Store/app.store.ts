import { Subject, BehaviorSubject } from 'rxjs';
import { ActionTypes } from './actions';
import { User, Event } from './models';

let state: any = {
  userdetails: {}
};

export const store = new BehaviorSubject<any>(state);
export const dispatcher = new Subject<Event>();


dispatcher.subscribe((data: Event) => {
  switch (data.type) {
    case ActionTypes.INIT_USER:
      state.userdetails = data.payload;
      store.next(state);
      break;
    case ActionTypes.UPDATE_SECURITY:
      const tempstate = { ...state.userdetails };
      tempstate.security = data.payload;
      store.next({ userdetails: { ...state.userdetails, ...tempstate } });
      break;
  }
});
