import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SharedCommonModule } from '../shared-common/shared-common.module';
import { SharedPublicModule } from '../shared-public/shared-public.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    HomeComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    SharedCommonModule,
    SharedPublicModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthenticationModule { }
