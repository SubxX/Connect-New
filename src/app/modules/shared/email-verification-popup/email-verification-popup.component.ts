import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-email-verification-popup',
  templateUrl: './email-verification-popup.component.html',
  styleUrls: ['./email-verification-popup.component.css']
})
export class EmailVerificationPopupComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any) { }

  ngOnInit(): void {
  }

}
