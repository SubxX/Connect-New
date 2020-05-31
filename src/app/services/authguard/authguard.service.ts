import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  constructor(private router: Router, private api: ApiService) { }

  canActivate() {
    const token = this.api.getToken();
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    } else { return true; }

  }
}
