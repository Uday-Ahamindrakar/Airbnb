import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, shareReplay } from 'rxjs/operators';
import { Property } from '../model/listing';
import { CreatePropertyPayload } from '../model/create-property-payload';
import { environment } from '../../environments/environment';

@Injectable({
 providedIn: 'root',
})
export class HostService {
private baseUrl = environment.apiBaseUrl;

private allPropertiesUrl = `${this.baseUrl}/listing/all-properties`;
private addPropertyUrl = `${this.baseUrl}/listing/add-property`;
private deletePropertyUrl = `${this.baseUrl}/listing/properties`;
private hostNameUrl = `${this.baseUrl}/listing/hostname`;



  /* 🔥 TRIGGER FOR REFRESH */
  private refresh$ = new BehaviorSubject<void>(undefined);

  /* 🔥 SHARED PROPERTIES STREAM */
  private properties$ = this.refresh$.pipe(
    switchMap(() => this.http.get<Property[]>(this.allPropertiesUrl)),
    shareReplay(1) // cache latest value
  );

  /* Host menu selection */
  private selectedHostMenu = new BehaviorSubject<string>('profile');
  selectedHostMenu$ = this.selectedHostMenu.asObservable();

  constructor(private http: HttpClient) {}

  /* ✅ Always returns fresh data when refresh$ emits */
  getAllActiveProperties(): Observable<Property[]> {
    return this.properties$;
  }

  /* 🔥 Call this after add / delete */
  refreshProperties(): void {
    this.refresh$.next();
  }

  setSelectedHostMenu(value: string): void {
    this.selectedHostMenu.next(value);
  }

  addProperty(
    property: CreatePropertyPayload,
    email: string
  ): Observable<string> {
    const headers = new HttpHeaders({
      'X-User-Id': email,
      'X-User-Role': 'ROLE_HOST',
    });

    return this.http.post(this.addPropertyUrl, property, {
      headers,
      responseType: 'text',
    });
  }

  deleteProperty(id: number): Observable<string> {
    return this.http.delete(`${this.deletePropertyUrl}/${id}`, {
      responseType: 'text',
    });
  }

  getHostNameById(id : number) : Observable<string>{
    return this.http.get(`${this.hostNameUrl}/${id}`,{responseType : 'text'});
  }
}