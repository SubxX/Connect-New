import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmailVerificationPopupComponent } from '../../shared/email-verification-popup/email-verification-popup.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  toggleCheckBox(elem) {
    elem.classList.toggle('checked');
  }
  openEmailVerificationPopUp(userData?: any) {
    this.dialog.open(EmailVerificationPopupComponent, {
      width: '680px',
      maxHeight: 'calc(100vh - 20px)',
      disableClose: true,
      data: userData
    });
  }
}
