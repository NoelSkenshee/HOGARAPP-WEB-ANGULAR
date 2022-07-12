import { TestBed } from '@angular/core/testing';

import { UnexpiredService } from './unexpired.service';

describe('UnexpiredService', () => {
  let service: UnexpiredService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnexpiredService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
