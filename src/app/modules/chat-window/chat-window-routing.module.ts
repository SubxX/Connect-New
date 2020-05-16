import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatWindowComponent } from './chat-window.component';
import { ProfileComponent } from './profile/profile.component';
import { ChatWindowChildComponent } from './chat-window-child/chat-window-child.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {
    path: '', component: ChatWindowComponent, children: [
      { path: 'welcome', component: WelcomeComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'chat', component: ChatWindowChildComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatWindowRoutingModule { }
