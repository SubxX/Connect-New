import { Component, OnInit } from '@angular/core';
import { AuthenticationPopupComponent } from '../../shared-public/authentication-popup/authentication-popup.component';
import { ForgotPasswordPopupComponent } from '../../shared-public/forgot-password-popup/forgot-password-popup.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';
import { EmailVerificationPopupComponent } from '../../shared-public/email-verification-popup/email-verification-popup.component';

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
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.api.getToken()) { this.router.navigate(['/chatapp']); }
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
          this.api.setToken(this.rememberMe, data.token);
          this.router.navigate(['/chatapp']);
        }
      })
      .catch((err: any) => {
        if (err.error.verificationdue) {
          this.api.popupOpener(EmailVerificationPopupComponent, 680, true, this.loginForm.value, true)
            .subscribe(state => { if (state) { this.login(); } });
        } else if (err.error.auth_method) {
          this.openAuthenticationPopUp(err.error.auth_method, this.loginForm.controls.email.value);
        } else { this.loginErr = true; }
      });
  }

  openAuthenticationPopUp(tp: string, mail: string) {
    this.api.popupOpener(AuthenticationPopupComponent, 680, true, { type: tp, email: mail, remember: this.rememberMe });
  }


  forgotPasswordPopup() {
    this.api.popupOpener(ForgotPasswordPopupComponent, 400, false);
  }


}
