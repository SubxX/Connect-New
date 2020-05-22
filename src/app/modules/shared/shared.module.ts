import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationPopupComponent } from './authentication-popup/authentication-popup.component';
import { CreateProfilePopupComponent } from './create-profile-popup/create-profile-popup.component';
import { EmailVerificationPopupComponent } from './email-verification-popup/email-verification-popup.component';
import { AuthenticationPopupTwoComponent } from './authentication-popup-two/authentication-popup-two.component';
import { ForgotPasswordPopupComponent } from './forgot-password-popup/forgot-password-popup.component';

@NgModule({
  declarations: [
    AuthenticationPopupComponent,
    CreateProfilePopupComponent,
    EmailVerificationPopupComponent,
    AuthenticationPopupTwoComponent,
    ForgotPasswordPopupComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AuthenticationPopupComponent,
    CreateProfilePopupComponent,
    EmailVerificationPopupComponent
  ],
  entryComponents: [
    AuthenticationPopupComponent,
    CreateProfilePopupComponent,
    EmailVerificationPopupComponent
  ]
})
export class SharedModule { }
