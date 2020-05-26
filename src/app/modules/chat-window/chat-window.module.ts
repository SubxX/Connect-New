import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatWindowRoutingModule } from './chat-window-routing.module';

import { ProfileComponent } from './profile/profile.component';
import { ChatWindowChildComponent } from './chat-window-child/chat-window-child.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ChatWindowComponent } from './chat-window.component';
import { MessageComponent } from './message/message.component';

import { MatDialogModule } from '@angular/material/dialog';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ChatWindowComponent,
    ProfileComponent,
    ChatWindowChildComponent,
    WelcomeComponent,
    MessageComponent
  ],
  imports: [
    CommonModule,
    ChatWindowRoutingModule,
    SharedModule,
    MatDialogModule
  ]
})
export class ChatWindowModule { }
