import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, shareReplay } from 'rxjs';
import { Property } from '../model/listing';

@Injectable({
  providedIn: 'root',
})
export class HostService {
  private allPropertiesUrl = 'http://localhost:8080/listing/all-properties';

  private propertiesSubject = new BehaviorSubject<Property[]>([]);
  properties$ = this.propertiesSubject.asObservable();
  private propertiesCache$!: Observable<Property[]>;

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

  // getAllProperties(): Observable<Property[]> {
  //   return this.http.get<Property[]>(this.allPropertiesUrl);
  // }
}
