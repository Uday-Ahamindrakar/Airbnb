import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PropertyDetailsComponent } from './dashboard/home/property-details/property-details.component';
import { HomeComponent } from './dashboard/home/home/home.component';

export const routes: Routes = [
    {path: '', component: DashboardComponent,
        children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      {path: 'property/:id', component: PropertyDetailsComponent}
      
    ]
    },

];
