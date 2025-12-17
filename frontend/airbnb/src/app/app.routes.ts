import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PropertyDetailsComponent } from './dashboard/home/property-details/property-details.component';
import { HomeComponent } from './dashboard/home/home/home.component';
import { CalendarComponent } from './dashboard/home/calendar/calendar.component';
import { CheckoutComponent } from './dashboard/home/checkout/checkout.component';
import { Sign } from 'crypto';
import { SignupComponent } from './auth/signup/signup.component';
import { authGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { HostdashboardComponent } from './host-dashboard/hostdashboard/hostdashboard.component';
import { hostguardGuard } from './auth/hostguard.guard';
import { hostblockguardGuard } from './auth/hostblockguard.guard';
import { HostProfileComponent } from './dashboard/profile/host-profile/host-profile.component';
import { HostListingComponent } from './host-dashboard/host-listing/host-listing.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'property/:id', component: PropertyDetailsComponent },
      {
        path: 'checkout',
        component: CheckoutComponent,
        canActivate: [authGuard, hostblockguardGuard],
      },

      { path: 'signup', component: SignupComponent },
    ],
  },
  {
    path: 'host-dashboard',
    component: HostdashboardComponent,
    canActivate: [authGuard, hostguardGuard],
    children:[
      {path : '', component : HostProfileComponent},
      {path : 'mylisting', component: HostListingComponent}
    ]
  },
];
