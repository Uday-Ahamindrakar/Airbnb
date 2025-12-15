import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PropertyDetailsComponent } from './dashboard/home/property-details/property-details.component';
import { HomeComponent } from './dashboard/home/home/home.component';
import { CalendarComponent } from './dashboard/home/calendar/calendar.component';
import { CheckoutComponent } from './dashboard/home/checkout/checkout.component';
import { Sign } from 'crypto';
import { SignupComponent } from './auth/signup/signup.component';

export const routes: Routes = [
    {path: '', component: DashboardComponent,
        children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      {path: 'property/:id', component: PropertyDetailsComponent},
      {path: 'checkout', component: CheckoutComponent},
      {path: 'signup', component: SignupComponent},
    ]
    },

];
