import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../services/layout.service';
import { AppHeaderComponent } from '../../dashboard/layout/app-header/app-header.component';

import { AppFooterComponent } from '../../dashboard/layout/app-footer/app-footer.component';
import { HostMenuComponent } from '../host-menu/host-menu.component';

@Component({
  selector: 'app-hostdashboard',
  standalone: true,
  imports: [AppHeaderComponent, AppFooterComponent,HostMenuComponent],
  templateUrl: './hostdashboard.component.html',
  styleUrl: './hostdashboard.component.css'
})
export class HostdashboardComponent implements OnInit{
  constructor(private layoutService : LayoutService){}
  ngOnInit(): void {
    this.layoutService.setHideMainMenu(true);
    this.layoutService.setHostDashboard(false);
  }

}
