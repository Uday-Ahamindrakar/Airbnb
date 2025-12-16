import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { hostguardGuard } from './hostguard.guard';

describe('hostguardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => hostguardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
