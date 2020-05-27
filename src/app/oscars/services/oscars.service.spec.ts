import { TestBed } from '@angular/core/testing';

import { OscarsService } from './oscars.service';

describe('OscarsService', () => {
  let service: OscarsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OscarsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
