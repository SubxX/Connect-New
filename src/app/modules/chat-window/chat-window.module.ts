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
import { LeftSearchBarComponent } from './left-side/left-search-bar/left-search-bar.component';
import { LeftOnlineUsersComponent } from './left-side/left-online-users/left-online-users.component';
import { LeftFooterActionsComponent } from './left-side/left-footer-actions/left-footer-actions.component';

@NgModule({
  declarations: [
    ChatWindowComponent,
    ProfileComponent,
    ChatWindowChildComponent,
    WelcomeComponent,
    MessageComponent,
    LeftSearchBarComponent,
    LeftOnlineUsersComponent,
    LeftFooterActionsComponent
  ],
  imports: [
    CommonModule,
    ChatWindowRoutingModule,
    SharedModule,
    MatDialogModule
  ]
})
export class ChatWindowModule { }
