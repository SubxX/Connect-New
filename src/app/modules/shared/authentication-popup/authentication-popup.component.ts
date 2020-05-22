import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-authentication-popup',
  templateUrl: './authentication-popup.component.html',
  styleUrls: ['./authentication-popup.component.css']
})
export class AuthenticationPopupComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any) { }

  ngOnInit(): void {
  }

}
