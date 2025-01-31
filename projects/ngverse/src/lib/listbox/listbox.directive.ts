import { Directionality } from '@angular/cdk/bidi';
import {
  afterRenderEffect,
  Directive,
  effect,
  inject,
  Injector,
  input,
  OnDestroy,
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
export class ListboxDirective implements OnDestroy {
  withWrap = input(true);
  orientation = input<'horizontal' | 'vertical'>('vertical');
  value = input<unknown>(undefined, { alias: 'appListbox' });
  compareWith = input<CompareWith>((o1: unknown, o2: unknown) => o1 === o2);
  multiple = input(false);
  withTypeAhead = input(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selected = output<any>();

  private registry = inject(ListboxRegistry);
  private directonality = inject(Directionality);
  private keyManager = new ListboxKeyManager(
    this.registry.items,
    inject(Injector)
  );

  onKeydown($event: KeyboardEvent) {
    this.keyManager.focusTarget(true);
    this.keyManager.onKeydown($event);
  }

  constructor() {
    afterRenderEffect(() => {
      const orientation = this.orientation();
      const withWrap = this.withWrap();
      const withTypeAhead = this.withTypeAhead();

      untracked(() => {
        let keyManager = this.keyManager;
        keyManager?.destroy();

        if (withWrap) {
          keyManager = keyManager.withWrap();
        }
        if (withTypeAhead) {
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
          this.selected.emit(item.value());
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
        //If there is no value activate firrst item
        if (Array.isArray(value)) {
          if (value.length === 0) {
            this.keyManager.setFirstItemActive();
            return;
          }
          //find the last value and try to find the item
          //if it is found activate item
          //if there is no value found we activate first item
          const lastValue = value[value.length - 1];
          const item = items.find((i) => compareWith(i.value(), lastValue));
          if (item) {
            if (this.keyManager.activeItem !== item) {
              this.keyManager.setActiveItem(item);
            }
          } else {
            this.keyManager.setFirstItemActive();
          }
        }
      } else {
        //If there is no value we activate first
        if (value === undefined || value === null || value === '') {
          this.keyManager.setFirstItemActive();
          return;
        } else {
          //Otherwise we try to find the item by value and activate
          //if not found activate first
          const item = items.find((i) => compareWith(i.value(), value));
          if (item) {
            if (this.keyManager.activeItem !== item) {
              this.keyManager.setActiveItem(item);
            }
          } else {
            this.keyManager.setFirstItemActive();
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

  reset() {
    this.keyManager.focusTarget(false);
    this.keyManager.setActiveItem(-1);
  }

  ngOnDestroy(): void {
    this.keyManager?.destroy();
  }
}
