import { Component, OnInit, OnDestroy } from '@angular/core';
import { SecurityTwofaComponent } from '../../shared/security-twofa/security-twofa.component';
import { ApiService } from '../../../services/api.service';
import { store, dispatcher } from '../../../Store/app.store';
import { User } from '../../../Store/models';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { trigger, transition, style, animate } from '@angular/animations';
import { ActionTypes } from 'src/app/Store/actions';
import { SecurityStatusComponent } from '../../shared/security-status/security-status.component';
import { UpdateProfileComponent } from '../../shared/update-profile/update-profile.component';

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

  constructor(private api: ApiService) {
    store
      .pipe(takeUntil(this.unSubscriber))
      .subscribe(({ userdetails }) => {
        if (Object.keys(userdetails).length > 0) {
          this.currentUser = userdetails;
        }
      });
  }

  ngOnInit(): void {
  }

  setTfaPopup(tp) {
    if (this.currentUser.security.type === 'NONE') {
      this.api.popupOpener(SecurityTwofaComponent, 400, false, { type: tp, email: this.currentUser.email });
    } else {
      if (this.currentUser.security.type === tp) {
        this.api.confirmationPopup().subscribe(state => {
          if (state) { this.removeSecurity(); } else { return; }
        });
      } else { this.securityMethodState(this.currentUser.security.type); }
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

  securityMethodState(tp) {
    this.api.popupOpener(SecurityStatusComponent, 330, false, { type: tp });
  }

  openEditFormPopup(tp: string) {
    this.api.popupOpener(UpdateProfileComponent, 350, false, { type: tp });
  }

  updateProfilePic(e) {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    this.api.postRequest('register/updateprofilepic', formData)
      .then((data: any) => { dispatcher.next({ type: ActionTypes.UPDATE_PROFILEPIC, payload: data }); })
      .catch(err => console.log(err));
  }

  ngOnDestroy() {
    this.unSubscriber.next();
    this.unSubscriber.complete();
  }

}
