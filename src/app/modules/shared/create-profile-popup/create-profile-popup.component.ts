import { Component, OnInit } from '@angular/core';
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
  profilePic: any;

  formData = new FormData();

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
    const img = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (ev) => {
      this.profilePic = ev.target.result;
    };
    reader.readAsDataURL(img);
    this.formData.has('image') ? this.formData.set('image', img) : this.formData.append('image', img);
  }

  selectGender(gender) {
    this.profileForm.controls.gender.setValue(gender);
    this.ddOpen = false;
  }


  submit() {
    const { firstname, lastname, nickname, gender } = this.profileForm.value;
    const updatedOBJ = { name: `${firstname} ${lastname}`, gender, nickname };
    this.formData.has('data') ? this.formData.set('data', JSON.stringify(updatedOBJ))
      : this.formData.append('data', JSON.stringify(updatedOBJ));
    this.api.postRequest('register/createprofile', this.formData)
      .then(data => { dispatcher.next({ type: ActionTypes.INIT_USER, payload: data }); this.dialogRef.close(); })
      .catch(err => console.log(err));
  }

}
