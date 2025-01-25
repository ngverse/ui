import { Directionality } from '@angular/cdk/bidi';
import {
  afterNextRender,
  afterRenderEffect,
  Directive,
  effect,
  inject,
  Injector,
  input,
  output,
  untracked,
} from '@angular/core';
import { ListboxItemDirective } from './listbox-item.directive';
import { ListboxKeyManager } from './listbox-key-manager';
import { ListboxRegistry } from './listbox-registry';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CompareWith = (o1: any, o2: any) => boolean;

@Directive({
  selector: '[appListbox]',
  providers: [
    {
      provide: ListboxRegistry,
      useFactory: () => {
        const injector = inject(Injector, { skipSelf: true });
        const parentListboxState = injector.get(ListboxRegistry, null);
        return parentListboxState ?? new ListboxRegistry();
      },
    },
  ],
  host: {
    '(keydown)': 'onKeydown($event)',
  },
  exportAs: 'appListbox',
})
export class ListboxDirective<T = unknown> {
  withWrap = input(true);
  orientation = input<'horizontal' | 'vertical'>('vertical');
  value = input<T>(undefined, { alias: 'appListbox' });
  compareWith = input<CompareWith>((o1: T, o2: T) => o1 === o2);
  valueChange = output<T>();
  multiple = input(false);
  withTypeAhead = input(false);

  private registry = inject(ListboxRegistry);
  private directonality = inject(Directionality);

  keyManager = new ListboxKeyManager(this.registry.items, inject(Injector));

  onKeydown($event: KeyboardEvent) {
    this.keyManager.focusTarget(true);
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

      this.activateOnValue(multiple, compareWith, items, value);
    });

    effect(() => {
      const items = this.registry.items();
      for (const item of items) {
        item.clicked.subscribe(() => {
          this.valueChange.emit(item.value() as T);
        });
      }
    });
  }

  private activateOnValue(
    isMultiple: boolean,
    compareWith: CompareWith,
    items: readonly ListboxItemDirective[],
    value: unknown
  ) {
    untracked(() => {
      this.keyManager.focusTarget(false);

      if (isMultiple) {
        if (Array.isArray(value)) {
          if (value.length === 0) {
            this.keyManager.setFirstItemActive();
            return;
          }

          const lastValue = value[value.length - 1];
          const item = items.find((i) => compareWith(i.value(), lastValue));
          if (item && this.keyManager.activeItem !== item) {
            this.keyManager.setActiveItem(lastValue);
          }
          return;
        }
      } else {
        if (value === undefined || value === null || value === '') {
          this.keyManager.setFirstItemActive();
          return;
        } else {
          const item = items.find((i) => compareWith(i.value(), value));
          if (item && this.keyManager.activeItem !== item) {
            this.keyManager.setActiveItem(item);
          }
        }
      }
    });
  }

  focus() {
    const item = this.keyManager.activeItem;
    if (item) {
      item.activate(true);
    } else {
      this.keyManager.focusTarget(true);
      this.keyManager.setFirstItemActive();
    }
  }
}
