import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import {
  afterRenderEffect,
  Directive,
  ElementRef,
  inject,
  Injector,
  input,
  output,
  untracked,
} from '@angular/core';
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

  keyManager = new ActiveDescendantKeyManager(
    this.registry.items,
    inject(Injector)
  );

  private host = inject<ElementRef<HTMLElement>>(ElementRef);

  onKeydown($event: KeyboardEvent) {
    if ($event.key === 'Enter' && this.keyManager.activeItem) {
      const activeItem = this.keyManager.activeItem;
      if (activeItem) {
        this.valueChange.emit(activeItem.value());
      }
    }
    this.keyManager.onKeydown($event);
  }

  constructor() {
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
    this.host.nativeElement.focus();
  }
}
