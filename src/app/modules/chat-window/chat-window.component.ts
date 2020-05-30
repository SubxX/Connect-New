import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateProfilePopupComponent } from '../shared/create-profile-popup/create-profile-popup.component';
import { store, dispatcher } from '../../Store/app.store';
import { User } from '../../Store/models';
import { ActionTypes } from '../../Store/actions';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {
  userData: User;

  constructor(
    private dialog: MatDialog,
    private api: ApiService
  ) {
    store.subscribe(user => this.userData = user.userdetails);
  }

  ngOnInit(): void {
    this.initUser();
    // document.getElementsByTagName('html')[0].className = 'lightTheme';
    // setTimeout(() => document.getElementsByTagName('html')[0].className = 'darkTheme', 5000);
  }


  initUser() {
    this.api.getRequest('login/getuserdetails').then((data: User) => {
      if (!data.name && !data.nickname) {
        this.openCreateProfilePopup(data);
      } else {
        dispatcher.next({ type: ActionTypes.INIT_USER, payload: data });
      }
    }).catch((err) => { console.log(err); });
  }

  openCreateProfilePopup(AuthData) {
    this.dialog.open(CreateProfilePopupComponent, {
      width: '680px',
      maxHeight: 'calc(100vh - 20px)',
      disableClose: true,
      data: AuthData
    });
  }

  // openTfaPopup() {
  //   this.dialog.open(SecurityTwofaComponent, {
  //     width: '400px',
  //     maxHeight: 'calc(100vh - 20px)',
  //     data: { type: '2FA' }
  //   });
  // }

}
