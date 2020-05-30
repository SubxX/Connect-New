import { Component, OnInit, Inject } from '@angular/core';
import { dispatcher } from '../../../Store/app.store';
import { ActionTypes } from '../../../Store/actions';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-create-profile-popup',
  templateUrl: './create-profile-popup.component.html',
  styleUrls: ['./create-profile-popup.component.css']
})
export class CreateProfilePopupComponent implements OnInit {
  ddOpen = false;
  fname: any;
  profileForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateProfilePopupComponent>,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.initProfileForm();
  }

  initProfileForm() {
    this.profileForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      nickname: ['', [Validators.required]],
      gender: ['']
    }, { validator: this.genderValidator });
  }

  genderValidator(control: AbstractControl) {
    control.get('gender').value ? control.get('gender').setErrors(null) :
      control.get('gender').setErrors({ gendererror: true });
  }

  submit() {
    console.log(this.profileForm.status);
    const { firstname, lastname, nickname, gender } = this.profileForm.value;
    const updatedOBJ = { name: `${firstname} ${lastname}`, gender, nickname };
    this.api.postRequest('register/createprofile', updatedOBJ).then(
      data => dispatcher.next({ type: ActionTypes.INIT_USER, payload: data }),
      err => console.log(err)
    );
    this.dialogRef.close();
  }

  selectGender(gender) {
    this.profileForm.controls.gender.setValue(gender);
    this.ddOpen = false;
  }

}
