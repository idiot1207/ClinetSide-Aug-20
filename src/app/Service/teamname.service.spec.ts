import { TestBed } from '@angular/core/testing';

import { TeamnameService } from './teamname.service';

describe('TeamnameService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TeamnameService = TestBed.get(TeamnameService);
    expect(service).toBeTruthy();
  });
});
