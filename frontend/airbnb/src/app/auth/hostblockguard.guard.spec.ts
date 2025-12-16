import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { hostblockguardGuard } from './hostblockguard.guard';

describe('hostblockguardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => hostblockguardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
