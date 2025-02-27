import { TestBed } from '@angular/core/testing';

import { A11yTabStack } from './tab-stack';

xdescribe('TabRegistryService', () => {
  let service: A11yTabStack;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(A11yTabStack);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
