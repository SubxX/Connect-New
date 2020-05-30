import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationPopupComponent } from './authentication-popup/authentication-popup.component';
import { CreateProfilePopupComponent } from './create-profile-popup/create-profile-popup.component';
import { EmailVerificationPopupComponent } from './email-verification-popup/email-verification-popup.component';
import { ForgotPasswordPopupComponent } from './forgot-password-popup/forgot-password-popup.component';
import { SecurityTwofaComponent } from './inner-app-popups/security-twofa/security-twofa.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AuthenticationPopupComponent,
    CreateProfilePopupComponent,
    EmailVerificationPopupComponent,
    ForgotPasswordPopupComponent,
    SecurityTwofaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    AuthenticationPopupComponent,
    CreateProfilePopupComponent,
    EmailVerificationPopupComponent,
    SecurityTwofaComponent
  ],
  entryComponents: [
    AuthenticationPopupComponent,
    CreateProfilePopupComponent,
    EmailVerificationPopupComponent,
    SecurityTwofaComponent
  ]
})
export class SharedModule { }
