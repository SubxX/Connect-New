import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { MatDialogRef } from '@angular/material/dialog';
import { Validators, AbstractControl, FormBuilder, FormGroup } from '@angular/forms';

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
  step = 1;
  resetPassForm: FormGroup;


  constructor(
    private dialogRef: MatDialogRef<ForgotPasswordPopupComponent>,
    private fb: FormBuilder
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
    if (control.get('conNewpass').value !== control.get('newPass').value) {
      control.get('conNewpass').setErrors({ ConfirmPassword: true });
    } else { return null; }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  next(step) {
    this.step++;
    if (this.step > 1) {
      this.dialogRef.disableClose = true;
    }
  }



}
