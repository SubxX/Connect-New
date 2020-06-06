import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationPopupComponent } from './authentication-popup/authentication-popup.component';
import { EmailVerificationPopupComponent } from './email-verification-popup/email-verification-popup.component';
import { ForgotPasswordPopupComponent } from './forgot-password-popup/forgot-password-popup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedCommonModule } from '../shared-common/shared-common.module';

@NgModule({
  declarations: [
    AuthenticationPopupComponent,
    EmailVerificationPopupComponent,
    ForgotPasswordPopupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedCommonModule
  ],
  exports: [
    AuthenticationPopupComponent,
    EmailVerificationPopupComponent,
    ForgotPasswordPopupComponent
  ],
  entryComponents: [
    AuthenticationPopupComponent,
    EmailVerificationPopupComponent,
    ForgotPasswordPopupComponent
  ]
})
export class SharedPublicModule { }
