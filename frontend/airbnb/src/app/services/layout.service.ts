import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  constructor() { }

  private homePage = new BehaviorSubject<boolean>(false);
  isHomePage$ = this.homePage.asObservable();

  setHomePage(isHome: boolean) {
    this.homePage.next(isHome);
  }
}
