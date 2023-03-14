import { TestBed } from '@angular/core/testing';

import { GetFileService } from './get-file.service';

describe('GetFileService', () => {
  let service: GetFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
