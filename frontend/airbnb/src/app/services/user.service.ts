import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Property } from '../model/listing';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private loginUrl = 'http://localhost:8080/auth/login';

  // private logoutUrl = 'http://localhost:8080/auth/logout';

  private activeUserUrl = 'http://localhost:8080/listing/getUserDetails';

  private propertiesSubject = new BehaviorSubject<Property | null>(null);
  properties$ = this.propertiesSubject.asObservable();

  private activeUserSubject = new BehaviorSubject<User | null>(null);
  activeUser$ = this.activeUserSubject.asObservable();

  private _loggedIn$ = new BehaviorSubject<boolean>(false);
  loggedIn$ = this._loggedIn$.asObservable();

  private showLoginPopup$ = new Subject<void>();
  showLogin$ = this.showLoginPopup$.asObservable();

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient
  ) {
    if (isPlatformBrowser(this.platformId)) {
      // login status
      const token = localStorage.getItem('access_token');
      this._loggedIn$.next(!!token);

      // restore user
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        this.activeUserSubject.next(JSON.parse(storedUser));
      }
    }
  }

  requestLogin() {
    this.showLoginPopup$.next();
  }

  // constructor(
  //   @Inject(PLATFORM_ID) platformId: Object,
  //   private http: HttpClient
  // ) {
  //   if (isPlatformBrowser(platformId)) {
  //     this._loggedIn$.next(!!localStorage.getItem('access_token'));
  //   }

  //   const storedUser = localStorage.getItem('user');
  //   if (storedUser) {
  //     this.activeUserSubject.next(JSON.parse(storedUser));
  //   }
  // }

  // private hasToken(): boolean {
  //   if (typeof window === 'undefined') return false;
  //   return !!localStorage.getItem('access_token');
  // }

  setLoggedIn(token: string) {
    localStorage.setItem('access_token', token);
    this._loggedIn$.next(true);
  }

  logout() {
    localStorage.removeItem('access_token');

    localStorage.removeItem('user');
    this.activeUserSubject.next(null);
    this._loggedIn$.next(false);
  }

  setActiveUser(user: User | null) {
    this.activeUserSubject.next(user);
  }

  setProperty(property: Property) {
    this.propertiesSubject.next(property);
  }

  getActiveUser(): Observable<User> {
    return this.http.get<User>(this.activeUserUrl);
  }

  login(email: string, password: string): Observable<string> {
    return this.http.post(
      this.loginUrl,
      { email, password },
      { responseType: 'text' }
    );
  }

  getActiveUserValue(): User | null {
    return this.activeUserSubject.value;
  }

  isHost(): boolean {
    return (
      this.activeUserSubject.value?.roles?.some(
        (r) => r.roleName === 'ROLE_HOST'
      ) ?? false
    );
  }
}
