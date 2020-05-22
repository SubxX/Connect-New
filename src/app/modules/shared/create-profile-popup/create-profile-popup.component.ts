import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-profile-popup',
  templateUrl: './create-profile-popup.component.html',
  styleUrls: ['./create-profile-popup.component.css']
})
export class CreateProfilePopupComponent implements OnInit {
  ddOpen = false;
  constructor() { }

  ngOnInit(): void {
  }

}
