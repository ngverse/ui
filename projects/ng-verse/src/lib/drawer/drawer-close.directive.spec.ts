import { TestBed } from '@angular/core/testing';
import { DrawerRef } from '../drawer/drawer-ref';
import { DrawerCloseDirective } from './drawer-close.directive';

describe('DrawerCloseDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DrawerCloseDirective],
      providers: [{ provide: DrawerRef, useValue: new DrawerRef(null) }],
    }).compileComponents();
  });

  it('should create an instance', () => {
    const directive = TestBed.runInInjectionContext(
      () => new DrawerCloseDirective()
    );
    expect(directive).toBeTruthy();
  });
});
