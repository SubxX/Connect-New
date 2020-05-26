import { Component, OnInit, Inject } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
  constructor(
    private dialogRef: MatDialogRef<SecurityTwofaComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
  }

  stepperHandeler() {
    if (this.stepCounter + 1 === 4) {
      this.dialogRef.close();
    } else {
      ++this.stepCounter;
    }
    if (this.stepCounter === 2) { this.dialogRef.disableClose = true; }
  }


}
