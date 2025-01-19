import { DrawerCloseDirective } from './drawer-close.directive';
import { TestBed } from '@angular/core/testing';
import { DrawerRef } from '@ng-verse/drawer/drawer-ref';

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
