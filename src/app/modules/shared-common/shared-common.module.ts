import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllAlertsComponent } from './all-alerts/all-alerts.component';
import { InputErrorsComponent } from './input-errors/input-errors.component';
import { LoaderComponent } from './loader/loader.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationPopupComponent } from './confirmation-popup/confirmation-popup.component';

@NgModule({
  declarations: [
    AllAlertsComponent,
    InputErrorsComponent,
    LoaderComponent,
    ServerErrorComponent,
    ConfirmationPopupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    AllAlertsComponent,
    InputErrorsComponent,
    LoaderComponent,
    ServerErrorComponent,
    ConfirmationPopupComponent
  ],
  entryComponents: [
    AllAlertsComponent,
    InputErrorsComponent,
    LoaderComponent,
    ServerErrorComponent,
    ConfirmationPopupComponent
  ]
})
export class SharedCommonModule { }
