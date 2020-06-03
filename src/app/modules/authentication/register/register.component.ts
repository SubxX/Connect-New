import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmailVerificationPopupComponent } from '../../shared/email-verification-popup/email-verification-popup.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  acceptTOC = false;
  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.initForm();
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
      this.api.postRequest('register', this.registerForm.value)
        .then(data => this.openEmailVerificationPopUp(this.registerForm.value))
        .catch(err => console.log(err));
    }
  }

  openEmailVerificationPopUp(userData: any) {
    this.dialog.open(EmailVerificationPopupComponent, {
      width: '680px',
      maxHeight: 'calc(100vh - 20px)',
      disableClose: true,
      data: userData
    });
  }

}
