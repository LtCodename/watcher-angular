import { TestBed } from '@angular/core/testing';

import { FilmingService } from './filming.service';

describe('Filming.ServiceService', () => {
  let service: FilmingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilmingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
