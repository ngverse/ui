import { TestBed } from '@angular/core/testing';

import { ListboxKeyManager } from './listbox-key-manager';

xdescribe('ListboxKeyManager', () => {
  let service: ListboxKeyManager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListboxKeyManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
