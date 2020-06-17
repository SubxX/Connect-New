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

export interface Users {
  _id: string;
  name: string;
  nickname: string;
  gender: string;
  profilepic: string;
  lastmessage?: string;
  chattedwith: number;
  registrationDate: Date;
}

export const socketUrl = 'http://localhost:3000';
