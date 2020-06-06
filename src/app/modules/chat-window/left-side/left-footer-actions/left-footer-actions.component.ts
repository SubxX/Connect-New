import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-left-footer-actions',
  templateUrl: './left-footer-actions.component.html',
  styleUrls: ['./left-footer-actions.component.css']
})
export class LeftFooterActionsComponent implements OnInit {
  dnToggle = false;
  constructor(
    private router: Router,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    localStorage.getItem('theme') === 'darkTheme' ? this.dnToggle = true : this.dnToggle = false;
    this.switchTheme(this.dnToggle);
  }

  logOut() {
    this.api.logOut();
    this.router.navigate(['/login']);
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
