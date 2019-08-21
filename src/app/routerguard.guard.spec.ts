import { TestBed, async, inject } from '@angular/core/testing';

import { RouterguardGuard } from './routerguard.guard';

describe('RouterguardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RouterguardGuard]
    });
  });

  it('should ...', inject([RouterguardGuard], (guard: RouterguardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
