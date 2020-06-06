import { Component, OnInit, OnDestroy } from '@angular/core';
import { CreateProfilePopupComponent } from '../shared/create-profile-popup/create-profile-popup.component';
import { store, dispatcher } from '../../Store/app.store';
import { User } from '../../Store/models';
import { ActionTypes } from '../../Store/actions';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit, OnDestroy {
  userData: User;
  private unSubscriber = new Subject();
  constructor(
    private api: ApiService,
    private router: Router,
    private dialog: MatDialog
  ) {
    store
      .pipe(takeUntil(this.unSubscriber))
      .subscribe((user: any) => this.userData = user.userdetails);
  }

  ngOnInit(): void {
    this.initUser();
  }


  initUser() {
    this.api.getRequest('login/getuserdetails').then((data: User) => {
      if (!data.name && !data.nickname) {
        this.openCreateProfilePopup();
      } else {
        dispatcher.next({ type: ActionTypes.INIT_USER, payload: data });
      }
    }).catch((err) => { this.router.navigate(['/login']); });
  }

  openCreateProfilePopup() {
    this.dialog.open(CreateProfilePopupComponent, {
      width: '680px',
      maxHeight: 'calc(100vh - 20px)',
      disableClose: true
    });
  }

  ngOnDestroy() {
    this.unSubscriber.next();
    this.unSubscriber.complete();
  }

}
