import { Component, OnInit, OnDestroy } from '@angular/core';
import { SecurityTwofaComponent } from '../../shared/security-twofa/security-twofa.component';
import { ApiService } from '../../../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { store, dispatcher } from '../../../Store/app.store';
import { User } from '../../../Store/models';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { trigger, transition, style, animate } from '@angular/animations';
import { ActionTypes } from 'src/app/Store/actions';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 }))
      ])
    ]),
  ]
})
export class ProfileComponent implements OnInit, OnDestroy {
  private unSubscriber = new Subject();
  currentUser: User;
  constructor(private api: ApiService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    store
      .pipe(takeUntil(this.unSubscriber))
      .subscribe(({ userdetails }) => {
        if (Object.keys(userdetails).length > 0) {
          this.currentUser = userdetails;
        }
      });
  }

  setTfaPopup(tp) {
    if (this.currentUser.security.type === 'NONE') {
      this.dialog.open(SecurityTwofaComponent, {
        width: '400px',
        maxHeight: 'calc(100vh - 20px)',
        disableClose: false,
        data: { type: tp, email: this.currentUser.email }
      });
    } else if (this.currentUser.security.type === tp) {
      this.removeSecurity();
    }
  }

  removeSecurity() {
    this.api.postRequest('security/phasetwo', { type: 'NONE' })
      .then((res: any) => {
        this.updateStoreSecurity(false, 'NONE');
      }).catch(err => console.log(err));
  }

  updateStoreSecurity(state: boolean, tp: string) {
    const data = { status: state, type: tp };
    dispatcher.next({ type: ActionTypes.UPDATE_SECURITY, payload: data });
  }


  ngOnDestroy() {
    this.unSubscriber.next();
    this.unSubscriber.complete();
  }

}
