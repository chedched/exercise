import { TestBed } from '@angular/core/testing';

import { LangdetectionService } from './langdetection.service';

describe('LangdetectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LangdetectionService = TestBed.get(LangdetectionService);
    expect(service).toBeTruthy();
  });
});
