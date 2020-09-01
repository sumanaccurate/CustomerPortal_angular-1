import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../interfaces/user.interface';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';

interface LoginResponse {
  BearerToken;
  RefreshToken;
  // user: User;
  IDbint;
  UserTypetxt;
  UserCodetxt;
  Divisionvtxt;
}
  
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$ = new BehaviorSubject(null);

  constructor(private http: HttpClient,private router: Router,
              private localStorageService: LocalStorageService) { }

  login(loginForm): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.ApiUrl}/UserMaster/Login`, loginForm)
      .pipe(
        tap(response => {
          // this.user$.next(response.user);
          this.setToken('token', response.BearerToken);
          this.setToken('refreshToken', response.RefreshToken);
          this.setToken('IDbint', response.IDbint);
          this.setToken('UserType', response.UserTypetxt);
          this.setToken('UserCode', response.UserCodetxt);
          if(response.UserTypetxt!=="SuperAdmin"){
            this.setToken('Division', response.Divisionvtxt);
          }
        })
      );
  }

  logout(): void {
    this.localStorageService.removeItem('token');
    this.localStorageService.removeItem('refreshToken');
    this.localStorageService.removeItem('IDbint');
    this.localStorageService.removeItem('UserTypetxt');
    this.localStorageService.removeItem('UserCodetxt');
    this.localStorageService.removeItem('Divisionvtxt');
    this.router.navigate(['/user/login']);
    // this.user$.next(null);
  }

  getCurrentUser(): Observable<User> {
    return this.user$.pipe(
      switchMap(user => {
        // check if we already have user data
        if (user) {
          return of(user);
        }

        const token = this.localStorageService.getItem('token');
        // if there is token then fetch the current user
        if (token) {
          return this.fetchCurrentUser();
        }

        return of(null);
      })
    );
  }

  fetchCurrentUser(): Observable<User> {
    return this.http.get<User>(`${environment.ApiUrl}/current-user`)
      .pipe(
        tap(user => {
          this.user$.next(user);
        })
      );
  }

  refreshToken(): Observable<{BearerToken: string; RefreshToken: string}> {
    const RefreshToken = this.localStorageService.getItem('refreshToken');

    return this.http.post<{BearerToken: string; RefreshToken: string}>(
      `${environment.ApiUrl}/UserMaster/Refresh`,
      {
        RefreshToken
      }).pipe(
        tap(response => {
          this.setToken('token', response.BearerToken);
          this.setToken('refreshToken', response.RefreshToken);
        })
    );
  }

  private setToken(key: string, token: string): void {
    this.localStorageService.setItem(key, token);
  }
}
