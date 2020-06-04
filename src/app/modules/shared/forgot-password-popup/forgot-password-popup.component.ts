import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { MatDialogRef } from '@angular/material/dialog';
import { Validators, AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-forgot-password-popup',
  templateUrl: './forgot-password-popup.component.html',
  styleUrls: ['./forgot-password-popup.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(800, style({ opacity: 1 }))
      ])
    ])
  ]
})
export class ForgotPasswordPopupComponent implements OnInit {
  totalSteps = new Array<any>(4);
  step = 3;
  resetPassForm: FormGroup;
  errStatus = false;
  errType: string;
  constructor(
    private dialogRef: MatDialogRef<ForgotPasswordPopupComponent>,
    private fb: FormBuilder,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.resetPassForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      code: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      newPass: ['', [Validators.required]],
      conNewpass: ['', [Validators.required]]
    }, { validator: this.customValidator });
  }

  customValidator(control: AbstractControl) {
    if (control.get('newPass').value !== control.get('conNewpass').value) {
      control.get('conNewpass').setErrors({ ConfirmPassword: true });
    } else { return null; }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  next() {
    this.api.postRequest('login/changepassword', { step: this.step, ...this.resetPassForm.value })
      .then(data => {
        ++this.step;
        if (this.errStatus) { this.errStatus = false; this.errType = ''; }
      })
      .catch(({ error }) => {
        this.errStatus = true;
        this.errType = error.err;
      });
    if (this.step > 1) { this.dialogRef.disableClose = true; }
  }



}
