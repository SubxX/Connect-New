import { Component, OnInit, Inject } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../../services/api.service';
import { FormControl, Validators } from '@angular/forms';
import { dispatcher } from '../../../Store/app.store';
import { ActionTypes } from '../../../Store/actions';

@Component({
  selector: 'app-security-twofa',
  templateUrl: './security-twofa.component.html',
  styleUrls: ['./security-twofa.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(800, style({ opacity: 1 }))
      ])
    ])
  ]
})
export class SecurityTwofaComponent implements OnInit {
  steps = new Array<number>(3);
  stepCounter = 1;
  qrCode: any;
  pass = new FormControl('', Validators.required);
  code = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]);
  tfaError = false;
  errType = '';
  constructor(
    private dialogRef: MatDialogRef<SecurityTwofaComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private api: ApiService
  ) { }

  ngOnInit(): void {
  }

  stepperHandeler() {
    if (this.stepCounter === 1) {
      this.setSecurityMethodPhaseOne();
    } else if (this.stepCounter === 2) {
      this.setSecurityMethodPhaseTwo();
    } else if (this.stepCounter === 3) {
      this.dialogRef.close();
    }
  }


  setSecurityMethodPhaseOne() {
    this.api.postRequest('security/phaseone', { password: this.pass.value, type: this.data.type, email: this.data.email })
      .then((res: any) => {
        res.status && this.data.type === '2FA' ? this.qrCode = res.val : console.log(res);
        this.removeAlert();
        ++this.stepCounter;
        this.dialogRef.disableClose = true;
      })
      .catch(err => this.setAlert(err.error));
  }

  setSecurityMethodPhaseTwo() {
    this.api.postRequest('security/phasetwo', { type: this.data.type, code: this.code.value })
      .then((res: any) => {
        console.log(res);
        this.removeAlert();
        this.updateStoreSecurity(true, '2FA');
        ++this.stepCounter;
      }).catch(err => this.setAlert(err.error));
  }

  setAlert(type) {
    this.tfaError = true;
    this.errType = type;
  }

  removeAlert() {
    this.tfaError = false;
    this.errType = '';
  }

  updateStoreSecurity(state: boolean, tp: string) {
    const data = { status: state, type: tp };
    dispatcher.next({ type: ActionTypes.UPDATE_SECURITY, payload: data });
  }

}
