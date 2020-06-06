import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-verification-popup',
  templateUrl: './email-verification-popup.component.html',
  styleUrls: ['./email-verification-popup.component.css']
})
export class EmailVerificationPopupComponent implements OnInit {
  code = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EmailVerificationPopupComponent>,
    private api: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }


  verifyEmail() {
    if (this.code.hasError('invalid')) {
      delete this.code.errors.invalid;
      this.code.updateValueAndValidity({ onlySelf: true });
    }
    if (this.code.status === 'VALID') {
      this.api.postRequest('register/verification', { email: this.data.email, emailValid: this.code.value })
        .then((data) => {
          this.dialogRef.close();
          this.router.navigate(['/login']);
        })
        .catch(err => this.code.setErrors({ invalid: 'Invalid Code' }));
    }
  }

}
