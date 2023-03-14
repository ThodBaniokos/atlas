import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountService } from '../services/account.service';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

  constructor(private accountService: AccountService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {


    if (request.headers.get('Skip-Authorization')) {


      // remove the header, not needed in the api
      request = request.clone({
        headers: request.headers.delete('Skip-Authorization')
      });
    }
    else if (!request.headers.get('Authorization')) {
      if (this.accountService.userValue()?.token !== null) {

        // add authorization header
        request = request.clone({
          setHeaders: {Authorization: `${this.accountService.userValue()?.token}`}
        });
      }
    }

    // handle request
    return next.handle(request);
  }
}
