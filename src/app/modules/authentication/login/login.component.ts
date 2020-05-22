import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationPopupComponent } from '../../shared/authentication-popup/authentication-popup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  toggleCheckBox(elem) {
    elem.classList.toggle('checked');
  }
  openAuthenticationPopUp(AuthData?: any) {
    this.dialog.open(AuthenticationPopupComponent, {
      width: '680px',
      maxHeight: 'calc(100vh - 20px)',
      disableClose: true,
      data: AuthData
    });
  }
}
