import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';

export const hostguardGuard: CanActivateFn = () => {
   const userService = inject(UserService);
  const router = inject(Router);

  const user = userService.getActiveUserValue();

  // not logged in
  if (!user) {
    return router.createUrlTree(['']);
  }

  // only HOST allowed
  if (!userService.isHost()) {
    return router.createUrlTree(['']);
  }

  return true;
};