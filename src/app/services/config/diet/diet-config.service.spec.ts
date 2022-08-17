import { TestBed } from '@angular/core/testing';

import { DietConfigService } from './diet-config.service';

describe('DietConfigService', () => {
  let service: DietConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DietConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
