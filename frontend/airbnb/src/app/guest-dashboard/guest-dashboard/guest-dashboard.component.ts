import { Component } from '@angular/core';
import { AppHeaderComponent } from '../../dashboard/layout/app-header/app-header.component';
import { AppFooterComponent } from '../../dashboard/layout/app-footer/app-footer.component';
import { GuestMenuComponent } from '../guest-menu/guest-menu.component';


@Component({
  selector: 'app-guest-dashboard',
  standalone: true,
  imports: [AppHeaderComponent, AppFooterComponent,GuestMenuComponent ],
  templateUrl: './guest-dashboard.component.html',
  styleUrl: './guest-dashboard.component.css'
})
export class GuestDashboardComponent {

}
