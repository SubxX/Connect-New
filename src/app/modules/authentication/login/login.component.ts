import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationPopupComponent } from '../../shared/authentication-popup/authentication-popup.component';
import { ForgotPasswordPopupComponent } from '../../shared/forgot-password-popup/forgot-password-popup.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  rememberMe = false;
  loginErr = false;
  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initLoginform();
  }

  initLoginform() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    this.api.postRequest('login', this.loginForm.value)
      .then((data: any) => {
        if (data.token) {
          this.rememberMe ? localStorage.setItem('authorization', data.token) : sessionStorage.setItem('authorization', data.token);
          this.router.navigate(['/chatapp']);
        }
      })
      .catch((err) => {
        this.loginErr = true;
        console.log(err);
      });
  }

  openAuthenticationPopUp(tp: string, mail: string) {
    this.dialog.open(AuthenticationPopupComponent, {
      width: '680px',
      maxHeight: 'calc(100vh - 20px)',
      disableClose: true,
      data: { type: tp, email: mail }
    });
  }


  forgotPasswordPopup() {
    this.dialog.open(ForgotPasswordPopupComponent, {
      width: '400px',
      maxHeight: 'calc(100vh - 20px)'
    });
  }


}
