import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllAlertsComponent } from './all-alerts/all-alerts.component';
import { InputErrorsComponent } from './input-errors/input-errors.component';
import { LoaderComponent } from './loader/loader.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AllAlertsComponent,
    InputErrorsComponent,
    LoaderComponent,
    ServerErrorComponent
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
    ServerErrorComponent
  ],
  entryComponents: [
    AllAlertsComponent,
    InputErrorsComponent,
    LoaderComponent,
    ServerErrorComponent
  ]
})
export class SharedCommonModule { }
