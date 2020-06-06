export interface User {
  _id: string;
  name: string;
  nickname: string;
  profilepic: string;
  email: string;
  gender: string;
  security: { status: boolean, type: string };
  registrationDate: Date;
}

export interface Event {
  type: string;
  payload?: any;
}
