import { TestBed } from '@angular/core/testing';

import { ListboxRegistry } from './listbox-registry';

xdescribe('ListboxRegistry', () => {
  let service: ListboxRegistry<unknown>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListboxRegistry);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
