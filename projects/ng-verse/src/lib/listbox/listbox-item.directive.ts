import { ListKeyManagerOption } from '@angular/cdk/a11y';
import {
  Directive,
  ElementRef,
  inject,
  input,
  Input,
  OnDestroy,
  output,
  signal,
} from '@angular/core';
import { ListboxRegistry } from './listbox-registry';

@Directive({
  selector: '[appListboxItem]',
  host: {
    '[tabindex]': '_isActive() ? 0 : -1',
    '(click)': 'clicked.emit()',
  },
})
export class ListboxItemDirective<T = unknown>
  implements ListKeyManagerOption, OnDestroy
{
  private host = inject<ElementRef<HTMLElement>>(ElementRef);
  _isActive = signal(false);
  private registry = inject(ListboxRegistry);

  value = input<T>(undefined, { alias: 'appListboxItem' });

  clicked = output<void>();

  // ListKeyManagerOption currently has `disabled` as a boolean,
  // not a signal type. Therefore, we need to use the @Input decorator here.
  @Input()
  disabled?: boolean;
  getLabel?() {
    return this.host.nativeElement.textContent || '';
  }

  constructor() {
    this.registry.add(this);
  }

  activate(focus?: boolean) {
    this._isActive.set(true);
    if (focus) {
      this.host.nativeElement.focus();
    }
  }

  deactivate() {
    this._isActive.set(false);
  }

  ngOnDestroy(): void {
    this.registry.remove(this);
  }
}
