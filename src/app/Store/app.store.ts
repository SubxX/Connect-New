import { Subject } from 'rxjs';
import { ActionTypes } from './actions';
import { User, Event } from './models';

let state: any = {
  userdetails: {}
};

export const store = new Subject<any>();
export const dispatcher = new Subject<Event>();


dispatcher.subscribe((data: Event) => {
  switch (data.type) {
    case ActionTypes.INIT_USER:
      state.userdetails = data.payload;
      store.next(state);
      break;
  }
});
