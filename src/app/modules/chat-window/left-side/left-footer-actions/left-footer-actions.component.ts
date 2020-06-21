import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { ChatWindowComponent } from '../../chat-window.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-left-footer-actions',
  templateUrl: './left-footer-actions.component.html',
  styleUrls: ['./left-footer-actions.component.css']
})
export class LeftFooterActionsComponent implements OnInit {
  dnToggle = false;
  constructor(
    private api: ApiService,
    private chat: ChatWindowComponent,
    private router: Router
  ) { }

  ngOnInit(): void {
    localStorage.getItem('theme') === 'darkTheme' ? this.dnToggle = true : this.dnToggle = false;
    this.switchTheme(this.dnToggle);
  }

  logOut() {
    this.chat.logoutSocketEvent();
    this.api.logOut();
  }

  switchTheme(state?: boolean) {
    const root = document.getElementsByTagName('html')[0];
    if (state) {
      root.className = 'darkTheme';
      localStorage.setItem('theme', 'darkTheme');
    } else {
      root.className = '';
      localStorage.removeItem('theme');
    }
  }

  resetChatPerson() {
    this.chat.leftbarToggle(false);
    this.api.resetChatPerson();
    this.router.navigate(['/chatapp/profile']);
  }

}
