import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-left-footer-actions',
  templateUrl: './left-footer-actions.component.html',
  styleUrls: ['./left-footer-actions.component.css']
})
export class LeftFooterActionsComponent implements OnInit {
  dnToggle = false;
  constructor(
    private api: ApiService
  ) { }

  ngOnInit(): void {
    localStorage.getItem('theme') === 'darkTheme' ? this.dnToggle = true : this.dnToggle = false;
    this.switchTheme(this.dnToggle);
  }

  logOut() {
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

}
