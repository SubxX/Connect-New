import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SecurityTwofaComponent } from '../shared/inner-app-popups/security-twofa/security-twofa.component';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {
  lightheme = 'true';

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    document.getElementsByTagName('html')[0].className = 'lightTheme';
    setTimeout(() => document.getElementsByTagName('html')[0].className = 'darkTheme', 5000);
    this.openTfaPopup();
  }

  openTfaPopup() {
    this.dialog.open(SecurityTwofaComponent, {
      width: '400px',
      maxHeight: 'calc(100vh - 20px)',
      data: { type: '2FA' }
    });
  }

}
