import { TestBed } from '@angular/core/testing';

import { ElementRef, Injector, signal } from '@angular/core';
import { ListboxItemDirective } from './listbox-item.directive';
import { ListboxKeyManager } from './listbox-key-manager';
import { ListboxRegistry } from './listbox-registry';

describe('ListboxKeyManager', () => {
  let service: ListboxKeyManager;
  let firstItem: ListboxItemDirective;
  let secondItem: ListboxItemDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        ListboxRegistry,
        {
          provide: ElementRef,
          useValue: {
            nativeElement: {
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              focus: () => {},
            },
          },
        },
      ],
    }).compileComponents();
    TestBed.runInInjectionContext(() => {
      firstItem = new ListboxItemDirective();
      secondItem = new ListboxItemDirective();
      const items = signal([firstItem, secondItem]);
      service = new ListboxKeyManager(items, TestBed.inject(Injector));
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should pass focusTarget=false on item by default', () => {
    const spy = spyOn(firstItem, 'activate');
    service.focusTarget(false);
    service.setActiveItem(0);
    expect(spy).toHaveBeenCalledWith(false);
  });
  it('should pass focusTarget=true on item', () => {
    const spy = spyOn(firstItem, 'activate');
    service.focusTarget(true);
    service.setActiveItem(0);
    expect(spy).toHaveBeenCalledWith(true);
  });
  it('should deactivate previous item', () => {
    const spy = spyOn(firstItem, 'deactivate');
    service.setActiveItem(0);
    service.setActiveItem(1);
    expect(spy).toHaveBeenCalled();
  });
});
