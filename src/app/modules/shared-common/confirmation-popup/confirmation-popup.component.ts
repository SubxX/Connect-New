import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-popup',
  templateUrl: './confirmation-popup.component.html',
  styleUrls: ['./confirmation-popup.component.css']
})
export class ConfirmationPopupComponent implements OnInit {

  constructor(private dialog: MatDialogRef<ConfirmationPopupComponent>) { }

  ngOnInit(): void {
  }

  closePopup(state: boolean) {
    this.dialog.close(state);
  }

}
