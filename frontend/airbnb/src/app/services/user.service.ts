import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Property } from '../model/listing';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private loginUrl = 'http://localhost:8080/auth/login';

  private propertiesSubject = new BehaviorSubject<Property | null>(null);
  properties$ = this.propertiesSubject.asObservable();

  constructor(private http: HttpClient) {}

  setProperty(property: Property) {
    this.propertiesSubject.next(property);
  }

  login(email: string, password: string): Observable<string> {
    return this.http.post(
      this.loginUrl,
      { email, password },
      { responseType: 'text' } 
    );
  }
}
