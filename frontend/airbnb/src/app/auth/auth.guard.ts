import { CanActivateFn, Router } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { UserService } from '../services/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  const userService = inject(UserService);

  
  if (!isPlatformBrowser(platformId)) {
    return false;
  }

  const token = localStorage.getItem('access_token');

  if (!token) {
    // router.navigate(['/home']); 
    userService.requestLogin();
    return router.createUrlTree(['/home']);
  }

  return true; 
};