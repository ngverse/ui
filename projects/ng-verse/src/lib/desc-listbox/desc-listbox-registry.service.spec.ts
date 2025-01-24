import { TestBed } from '@angular/core/testing';

import { DescListboxRegistry } from './desc-listbox-registry';

xdescribe('DescListboxRegistry', () => {
  let service: DescListboxRegistry;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DescListboxRegistry);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
