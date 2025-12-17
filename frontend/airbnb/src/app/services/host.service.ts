import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, shareReplay } from 'rxjs';
import { Property } from '../model/listing';
import { CreatePropertyPayload } from '../model/create-property-payload';

@Injectable({
  providedIn: 'root',
})
export class HostService {
  private allPropertiesUrl = 'http://localhost:8080/listing/all-properties';
  private addPropertyUrl = 'http://localhost:8080/listing/add-property';

  // private propertiesSubject = new BehaviorSubject<Property[]>([]);
  // properties$ = this.propertiesSubject.asObservable();
  private propertiesCache$!: Observable<Property[]>;

  private selectedHostMenu = new BehaviorSubject<String>('profile');
  selectHostMunu$ = this.selectedHostMenu.asObservable();

  constructor(private http: HttpClient) {}

  getAllActiveProperties(): Observable<Property[]> {
    if (!this.propertiesCache$) {
      this.propertiesCache$ = this.http
        .get<Property[]>(this.allPropertiesUrl)
        .pipe(
          shareReplay(1) // <-- Cache the latest response
        );
    }
    return this.propertiesCache$;
  }

  setSelectedHostMenu(value: String) {
    this.selectedHostMenu.next(value);
  }

  //   addProperty(property: CreatePropertyPayload, email: String): Observable<string> {
  //   const headers = new HttpHeaders({
  //     'X-User-Id': ''+email,        
  //     'X-User-Role': 'ROLE_HOST'
  //   });

  //   return this.http.post<string>(
  //     this.addPropertyUrl,
  //     property,          
  //     { headers }        
  //   );
  // }
  addProperty(
  property: CreatePropertyPayload,
  email: string
): Observable<string> {

  const headers = new HttpHeaders({
    'X-User-Id': email,
    'X-User-Role': 'ROLE_HOST'
  });

  return this.http.post(
    this.addPropertyUrl,
    property,
    {
      headers,
      responseType: 'text'
    }
  );
}

}


  // getAllProperties(): Observable<Property[]> {
  //   return this.http.get<Property[]>(this.allPropertiesUrl);
  // }

