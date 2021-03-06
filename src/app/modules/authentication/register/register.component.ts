import { Component, OnInit } from '@angular/core';
import { EmailVerificationPopupComponent } from '../../shared-public/email-verification-popup/email-verification-popup.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  acceptTOC = false;
  registerErr = false;
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
    if (this.api.getToken()) { this.router.navigate(['/chatapp']); }
  }

  initForm() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmpassword: ['', [Validators.required]]
    }, { validator: this.customValidator });
  }

  customValidator(control: AbstractControl) {
    if (control.get('confirmpassword').value !== control.get('password').value) {
      control.get('confirmpassword').setErrors({ ConfirmPassword: true });
    } else { return null; }
  }

  register() {
    if (this.registerForm.status === 'VALID') {
      if (this.registerErr) { this.registerErr = false; }
      this.api.postRequest('register', this.registerForm.value)
        .then(data => this.openEmailVerificationPopUp(this.registerForm.value))
        .catch(err => { if (err.error === 'exists') { this.registerErr = true; } });
    }
  }

  openEmailVerificationPopUp(userData: any) {
    this.api.popupOpener(EmailVerificationPopupComponent, 680, true, userData);
  }

}
