import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationPopupComponent } from '../../shared/authentication-popup/authentication-popup.component';
import { CreateProfilePopupComponent } from '../../shared/create-profile-popup/create-profile-popup.component';
import { ForgotPasswordPopupComponent } from '../../shared/forgot-password-popup/forgot-password-popup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.forgotPasswordPopup();
  }

  toggleCheckBox(elem) {
    elem.classList.toggle('checked');
  }
  openAuthenticationPopUp(tp: string, mail: string) {
    this.dialog.open(AuthenticationPopupComponent, {
      width: '680px',
      maxHeight: 'calc(100vh - 20px)',
      disableClose: true,
      data: { type: tp, email: mail }
    });
  }

  openCreateProfilePopup(AuthData) {
    this.dialog.open(CreateProfilePopupComponent, {
      width: '680px',
      maxHeight: 'calc(100vh - 20px)',
      disableClose: true,
      data: AuthData
    });
  }

  forgotPasswordPopup() {
    this.dialog.open(ForgotPasswordPopupComponent, {
      width: '400px',
      maxHeight: 'calc(100vh - 20px)'
    });
  }

}
