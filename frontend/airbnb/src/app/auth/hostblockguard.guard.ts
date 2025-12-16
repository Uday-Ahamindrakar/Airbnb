import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';

export const hostblockguardGuard: CanActivateFn = (route, state) => {
   const userService = inject(UserService);
  const router = inject(Router);

  const user = userService.getActiveUserValue();

  // not logged in
  if (!user) {
    return router.createUrlTree(['']);
  }

  // HOST should NOT access checkout
  if (userService.isHost()) {
    return router.createUrlTree(['/host-dashboard']);
  }

  // ROLE_USER allowed
  return true;
};
