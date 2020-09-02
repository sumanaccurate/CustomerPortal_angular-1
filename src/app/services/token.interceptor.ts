import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';

import { LocalStorageService } from './local-storage.service';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private refreshingInProgress: boolean;
  private accessTokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private localStorageService: LocalStorageService,
              private authService: AuthService,
              private router: Router) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem('token') != null) {
        const clonedReq = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'))
        });
        return next.handle(clonedReq).pipe(
          catchError(err => {
            // in case of 401 http error
            if (err instanceof HttpErrorResponse && err.status === 401) {
              // get refresh tokens
              const refreshToken = this.localStorageService.getItem('refreshToken');
    
              // if there are tokens then send refresh token request
              if (refreshToken &&  localStorage.getItem('token')) {
                return this.refreshToken(req, next);
              }
    
              // otherwise logout and redirect to login page
              return this.logoutAndRedirect(err);
            }
    
            // in case of 403 http error (refresh token failed)
            if (err instanceof HttpErrorResponse && err.status === 403) {
              // logout and redirect to login page
              return this.logoutAndRedirect(err);
            }
            // if error has status neither 401 nor 403 then just return this error
            return throwError(err);
          }) 
        );
    }
    else
        return next.handle(req.clone());
}



  private addAuthorizationHeader(request: HttpRequest<any>, token: string): HttpRequest<any> {
    if (token) {
      return request.clone({setHeaders: {Authorization: `Bearer ${token}`}});
    }

    return request;
  }

  private logoutAndRedirect(err): Observable<HttpEvent<any>> {
    this.authService.logout();
    this.router.navigateByUrl('/login');

    return throwError(err);
  }

  private refreshToken(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.refreshingInProgress) {
      this.refreshingInProgress = true;
      this.accessTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((res) => {
          this.refreshingInProgress = false;
          this.accessTokenSubject.next(res.BearerToken);
          // repeat failed request with new token
          return next.handle(this.addAuthorizationHeader(request, res.BearerToken));
        })
      );
    } else {
      // wait while getting new token
      return this.accessTokenSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap(token => {
          // repeat failed request with new token
          return next.handle(this.addAuthorizationHeader(request, token));
        }));
    }
  }
}
