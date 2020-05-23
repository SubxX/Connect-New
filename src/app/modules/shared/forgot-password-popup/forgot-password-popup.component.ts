import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { MatDialogRef } from '@angular/material/dialog';

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
  constructor(private dialogRef: MatDialogRef<ForgotPasswordPopupComponent>) { }

  ngOnInit(): void {
  }
  next() {
    if (this.step + 1 !== 5) {
      ++this.step;
    }
    if (this.step > 1) { }
    this.dialogRef.disableClose = true;
  }

  closeDialog() {
    this.dialogRef.close();
  }


}
