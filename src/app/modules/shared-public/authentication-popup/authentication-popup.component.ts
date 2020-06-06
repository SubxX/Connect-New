import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-authentication-popup',
  templateUrl: './authentication-popup.component.html',
  styleUrls: ['./authentication-popup.component.css']
})
export class AuthenticationPopupComponent implements OnInit {
  qrCode: any;
  code = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]);
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private api: ApiService,
    private dialogRef: MatDialogRef<AuthenticationPopupComponent>
  ) { }

  ngOnInit(): void {
  }

  checkCodeAndLogin() {
    if (this.code.hasError('invalid')) {
      delete this.code.errors.invalid;
      this.code.updateValueAndValidity({ onlySelf: true });
    }
    if (this.code.status === 'VALID') {
      const payLoad = { code: this.code.value, email: this.data.email, type: this.data.type };
      this.api.postRequest('login/authenticataion-based-login', payLoad)
        .then((res: any) => {
          this.api.setToken(this.data.remember, res.token);
          this.router.navigate(['/chatapp']);
          this.dialogRef.close();
        })
        .catch(err => {
          this.code.setErrors({ invalid: 'Invalid Code' });
        });
    }
  }

}
