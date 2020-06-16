import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SecurityTwofaComponent } from './security-twofa/security-twofa.component';
import { CreateProfilePopupComponent } from './create-profile-popup/create-profile-popup.component';
import { SharedCommonModule } from '../shared-common/shared-common.module';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { SecurityStatusComponent } from './security-status/security-status.component';
import { UserProfilePopupComponent } from './user-profile-popup/user-profile-popup.component';

@NgModule({
  declarations: [
    CreateProfilePopupComponent,
    SecurityTwofaComponent,
    UpdateProfileComponent,
    SecurityStatusComponent,
    UserProfilePopupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedCommonModule
  ],
  exports: [
    CreateProfilePopupComponent,
    SecurityTwofaComponent,
    UpdateProfileComponent,
    SecurityStatusComponent,
    UserProfilePopupComponent
  ],
  entryComponents: [
    CreateProfilePopupComponent,
    SecurityTwofaComponent,
    UpdateProfileComponent,
    SecurityStatusComponent,
    UserProfilePopupComponent
  ]
})
export class SharedModule { }
