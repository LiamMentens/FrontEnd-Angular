import { TestBed } from '@angular/core/testing';

import { StemService } from './stem.service';

describe('StemService', () => {
  let service: StemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
