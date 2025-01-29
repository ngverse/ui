import { TestBed } from '@angular/core/testing';

import {
  ElementRef,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { ListboxItemDirective } from './listbox-item.directive';
import { ListboxRegistry } from './listbox-registry';

describe('ListboxRegistry', () => {
  let service: ListboxRegistry<unknown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        ListboxRegistry,
        { provide: ElementRef, useValue: {} },
        provideExperimentalZonelessChangeDetection(),
      ],
    }).compileComponents();
    service = TestBed.inject(ListboxRegistry);
  });

  it('should be created', () => {
    TestBed.runInInjectionContext(() => {
      expect(service).toBeTruthy();
    });
  });
  it('should add item', () => {
    TestBed.runInInjectionContext(() => {
      const dir = new ListboxItemDirective();
      service.add(dir);
      //ListboxItemDircetive automatically adds itself as well
      //so the count will be 2 not 1
      expect(service.items().length).toBe(2);
    });
  });
  it('should remove item', () => {
    TestBed.runInInjectionContext(() => {
      const item = new ListboxItemDirective();
      service.remove(item);
      expect(service.items().length).toBe(0);
    });
  });
});
