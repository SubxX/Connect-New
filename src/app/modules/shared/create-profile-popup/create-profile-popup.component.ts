import { Component, OnInit, Inject } from '@angular/core';
import { dispatcher } from '../../../Store/app.store';
import { ActionTypes } from '../../../Store/actions';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  profilePic: string;
  constructor(
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
      gender: ['', [Validators.required]]
    });
  }

  onFileChange(e) {
    const formData = new FormData();
    const img = e.target.files[0];
    formData.append('files', img);
    this.api.postRequest('register/uploadprofilepic', formData)
      .then((pic: any) => this.profilePic = pic.profilepic)
      .catch(err => console.log(err));
  }

  selectGender(gender) {
    this.profileForm.controls.gender.setValue(gender);
    this.ddOpen = false;
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


}
