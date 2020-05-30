export interface User {
  _id: string;
  name: string;
  nickname: string;
  profilepic: string;
  email: string;
  gender: string;
}

export interface Event {
  type: string;
  payload?: any;
}
