import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SecurityTwofaComponent } from './security-twofa/security-twofa.component';
import { CreateProfilePopupComponent } from './create-profile-popup/create-profile-popup.component';
import { SharedCommonModule } from '../shared-common/shared-common.module';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { SecurityStatusComponent } from './security-status/security-status.component';

@NgModule({
  declarations: [
    CreateProfilePopupComponent,
    SecurityTwofaComponent,
    UpdateProfileComponent,
    SecurityStatusComponent
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
    SecurityStatusComponent
  ],
  entryComponents: [
    CreateProfilePopupComponent,
    SecurityTwofaComponent,
    UpdateProfileComponent,
    SecurityStatusComponent
  ]
})
export class SharedModule { }
