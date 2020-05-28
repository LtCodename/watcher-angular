import { TestBed } from '@angular/core/testing';

import { AddPanelService } from './add-panel.service';

describe('AddPanelService', () => {
  let service: AddPanelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddPanelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
