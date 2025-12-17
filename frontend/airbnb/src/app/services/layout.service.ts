import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  constructor() { }

  private homePage = new BehaviorSubject<boolean>(false);
  isHomePage$ = this.homePage.asObservable();

  private hideMenu = new BehaviorSubject<boolean>(false);
  hideMenu$ = this.hideMenu.asObservable();

  private host_dashboard = new BehaviorSubject<boolean>(false);
  host_dashboard$ = this.host_dashboard.asObservable();

  setHideMainMenu(hideMenu: boolean) {
    this.hideMenu.next(hideMenu);
  }

  setHomePage(isHome: boolean) {
    this.homePage.next(isHome);
  }

  setHostDashboard(value : boolean){
    this.host_dashboard.next(value);
  }


}
