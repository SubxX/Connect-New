import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-left-online-users',
  templateUrl: './left-online-users.component.html',
  styleUrls: ['./left-online-users.component.css']
})
export class LeftOnlineUsersComponent implements OnInit {
  ar = new Array<any>(15);
  constructor() { }

  ngOnInit(): void {
  }

}
