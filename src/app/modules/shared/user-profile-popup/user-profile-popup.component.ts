import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Users } from '../../../Store/models';

@Component({
  selector: 'app-user-profile-popup',
  templateUrl: './user-profile-popup.component.html',
  styleUrls: ['./user-profile-popup.component.css']
})
export class UserProfilePopupComponent implements OnInit {
  userData: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) private user: any,
    private dialogRef: MatDialogRef<UserProfilePopupComponent>
  ) { }

  ngOnInit(): void {
    this.userData = this.user.data;
  }
  closePopup() {
    this.dialogRef.close();
  }
}
