import { TestBed } from '@angular/core/testing';

import { MenuEventService } from './menu-event.service';

describe('MenuEventService', () => {
  let service: MenuEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
