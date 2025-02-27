import {
  ChangeDetectionStrategy,
  Component,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { parentOrNewInstance } from './resolve-registry';

describe('ResolveRegistry', () => {
  it('should return a registry without parent provider', () => {
    TestBed.configureTestingModule({
      providers: [provideExperimentalZonelessChangeDetection()],
    }).runInInjectionContext(() => {
      const service = parentOrNewInstance(GnTestRegistry);
      expect(service).toBeTruthy();
    });
  });
  it('should return parent provider if exists', () => {
    const parentService = new GnTestRegistry();
    const fixture = TestBed.configureTestingModule({
      imports: [GnResolveRegistryTestComponent],
      providers: [
        provideExperimentalZonelessChangeDetection(),
        {
          provide: GnTestRegistry,
          useValue: parentService,
        },
      ],
    }).createComponent(GnResolveRegistryTestComponent);
    const compService = fixture.componentRef.injector.get(GnTestRegistry);

    expect(compService).toBe(parentService);
  });
});

class GnTestRegistry {
  a = 1;
}

@Component({
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: GnTestRegistry,
      useFactory: () => parentOrNewInstance(GnTestRegistry),
    },
  ],
})
class GnResolveRegistryTestComponent {}
