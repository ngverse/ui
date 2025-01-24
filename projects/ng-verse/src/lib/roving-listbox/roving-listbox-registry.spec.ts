import { TestBed } from '@angular/core/testing';

import { RovingListboxRegistry } from './roving-listbox-registry';

describe('RovingListboxRegistry', () => {
  let service: RovingListboxRegistry;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RovingListboxRegistry],
    });
    service = TestBed.inject(RovingListboxRegistry);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
