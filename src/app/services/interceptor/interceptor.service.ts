import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req, next) {
    const token = localStorage.getItem('authorization') || sessionStorage.getItem('authorization');
    const headersConfig = {};
    if (token) {
      headersConfig['authorization'] = token;
    }
    const clone = req.clone({ setHeaders: headersConfig });
    return next.handle(clone);
  }
}
