// import { HttpInterceptorFn } from '@angular/common/http';
// import { inject, PLATFORM_ID } from '@angular/core';
// import { isPlatformBrowser } from '@angular/common';

// export const authInterceptor: HttpInterceptorFn = (req, next) => {

//   const platformId = inject(PLATFORM_ID);

//   if (isPlatformBrowser(platformId)) {
//     const token = localStorage.getItem('access_token');

//     if (token) {
//       const authReq = req.clone({
//         setHeaders: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       return next(authReq);
//     }
//   }

//   return next(req);
// };



import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { EMPTY, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return Date.now() > payload.exp * 1000;
  } catch {
    return true; // malformed token = invalid
  }
}

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  const router = inject(Router);

  // SSR → do nothing
  if (!isPlatformBrowser(platformId)) {
    return next(req);
  }

  const token = localStorage.getItem('access_token');

  // No token → continue unauthenticated
  if (!token) {
    return next(req);
  }

  // Token expired → logout immediately
  if (isTokenExpired(token)) {
    localStorage.removeItem('access_token');
    router.navigate(['/login']);
    return EMPTY; // cancel request
  }

  // Valid token → attach header
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  // Backend safety net
  return next(authReq).pipe(
    catchError(err => {
      if (err.status === 401) {
        localStorage.removeItem('access_token');
        router.navigate(['/login']);
      }
      return throwError(() => err);
    })
  );
};

