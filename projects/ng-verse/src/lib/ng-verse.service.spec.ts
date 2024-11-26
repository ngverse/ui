import { TestBed } from '@angular/core/testing';

import { NgVerseService } from './ng-verse.service';

describe('NgVerseService', () => {
  let service: NgVerseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgVerseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
