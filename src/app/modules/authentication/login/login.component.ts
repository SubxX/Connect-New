import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationPopupComponent } from '../../shared/authentication-popup/authentication-popup.component';
import { AuthenticationPopupTwoComponent } from '../../shared/authentication-popup-two/authentication-popup-two.component';
import { CreateProfilePopupComponent } from '../../shared/create-profile-popup/create-profile-popup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.openCreateProfilePopup('subham');
  }

  toggleCheckBox(elem) {
    elem.classList.toggle('checked');
  }
  openAuthenticationPopUp(AuthData, type: any) {
    this.dialog.open(type === 'tf' ? AuthenticationPopupComponent : AuthenticationPopupTwoComponent, {
      width: '680px',
      maxHeight: 'calc(100vh - 20px)',
      disableClose: true,
      data: AuthData
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

}
