import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-security-status',
  templateUrl: './security-status.component.html',
  styleUrls: ['./security-status.component.css']
})
export class SecurityStatusComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private dialog: MatDialogRef<SecurityStatusComponent>
  ) { }

  ngOnInit(): void {
  }

  closePopup() {
    this.dialog.close();
  }

}
