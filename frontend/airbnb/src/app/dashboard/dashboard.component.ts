import { Component } from '@angular/core';
import { HomeComponent } from './home/home/home.component';
import { AppHeaderComponent } from './layout/app-header/app-header.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HomeComponent, AppHeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
