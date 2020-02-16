import { TestBed } from '@angular/core/testing';

import { ConstestAdministrationService } from './constest-administration.service';

describe('ConstestAdministrationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConstestAdministrationService = TestBed.get(ConstestAdministrationService);
    expect(service).toBeTruthy();
  });
});
