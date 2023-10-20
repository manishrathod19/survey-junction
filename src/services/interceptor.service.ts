import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { SharedService } from './shared.service';

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(private shared: SharedService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.shared.isLoading = true;
    return next.handle(request).pipe(
      finalize(() => {
        this.shared.isLoading = false;
      })
    );
  }
}
