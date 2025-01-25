import { Directionality } from '@angular/cdk/bidi';
import {
  afterNextRender,
  afterRenderEffect,
  Directive,
  inject,
  Injector,
  input,
  output,
  untracked,
} from '@angular/core';
import { DescListboxKeyManager } from './desc-listbox-key-manager';
import { DescListboxRegistry } from './desc-listbox-registry';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CompareWith = (o1: any, o2: any) => boolean;
@Directive({
  selector: '[appDescListbox]',
  host: {
    '(keydown)': 'onKeydown($event)',
    tabIndex: '0',
  },
  exportAs: 'appDescListbox',
  providers: [
    {
      provide: DescListboxRegistry,
      useFactory: () => {
        const injector = inject(Injector, { skipSelf: true });
        const parentListboxState = injector.get(DescListboxRegistry, null);
        return parentListboxState ?? new DescListboxRegistry();
      },
    },
  ],
})
export class DescListboxDirective {
  value = input<unknown>(undefined, { alias: 'appDescListbox' });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  valueChange = output<any>();
  registry = inject(DescListboxRegistry);
  compareWith = input<CompareWith>((o1: unknown, o2: unknown) => o1 === o2);
  multiple = input(false);
  withTypeAhead = input(false);
  withWrap = input(true);
  orientation = input<'horizontal' | 'vertical'>('vertical');
  directonality = inject(Directionality);

  keyManager = new DescListboxKeyManager(this.registry.items, inject(Injector));

  onKeydown($event: KeyboardEvent) {
    this.keyManager.onKeydown($event);
  }

  constructor() {
    afterNextRender(() => {
      const orientation = this.orientation();
      const withWrap = this.withWrap();

      let keyManager = this.keyManager;

      if (withWrap) {
        keyManager = keyManager.withWrap();
      }
      if (this.withTypeAhead()) {
        keyManager = keyManager.withTypeAhead();
      }
      if (orientation === 'vertical') {
        keyManager = this.keyManager.withVerticalOrientation(true);
      } else {
        keyManager = this.keyManager
          .withHorizontalOrientation(this.directonality.value)
          .withVerticalOrientation(false);
      }
      this.keyManager = keyManager;
    });

    afterRenderEffect(() => {
      const items = this.registry.items();
      const value = this.value();
      const compareWith = this.compareWith();
      const multiple = this.multiple();
      untracked(() => {
        if (
          value === undefined ||
          value === null ||
          value === '' ||
          !(value as []).length
        ) {
          this.keyManager.setFirstItemActive();
        } else {
          if (multiple) {
            const values = value as [];

            const lastValue = values[values.length - 1];
            const item = items.find((i) => compareWith(i.value(), lastValue));
            if (item) {
              this.keyManager.setActiveItem(item);
            }
          } else {
            const item = items.find((i) => compareWith(i.value(), value));
            if (item) {
              this.keyManager.setActiveItem(item);
            } else {
              this.keyManager.setFirstItemActive();
            }
          }
        }
      });
    });
  }

  focus() {
    const item = this.keyManager.activeItem;
    if (item) {
      item.host.nativeElement.focus();
    } else {
      this.keyManager?.setFirstItemActive();
    }
  }
}
