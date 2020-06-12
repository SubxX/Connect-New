import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { ApiService } from '../api.service';
import { finalize, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private api: ApiService) { }

  intercept(req, next) {
    const urrAr = [...req.url.split('/')];
    if (!urrAr.includes('chat')) { this.api.loaderStateHandeler(true); }
    const token = this.api.getToken();
    const headersConfig = {};
    if (token) {
      headersConfig['authorization'] = token;
    }
    const clone = req.clone({ setHeaders: headersConfig });
    return next.handle(clone)
      .pipe(
        delay(500),
        finalize(() => this.api.loaderStateHandeler(false))
      );
  }
}
