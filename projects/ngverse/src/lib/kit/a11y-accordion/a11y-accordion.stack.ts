import { FocusKeyManager } from '@angular/cdk/a11y';
import { inject, Injectable, Injector, signal } from '@angular/core';
import { A11yAccordionTitleDirective } from './a11y-accordion-title.directive';

@Injectable()
export class A1yyAccordionStack {
  protected _items = signal<readonly A11yAccordionTitleDirective[]>([]);
  private _focusKeyManager = new FocusKeyManager(this._items, inject(Injector));

  items = this._items.asReadonly();

  add(item: A11yAccordionTitleDirective) {
    this._items.update((items) => [...items, item]);
  }
  remove(item: A11yAccordionTitleDirective) {
    this._items.update((items) => items.filter((i) => i !== item));
  }

  onKeydown(event: KeyboardEvent) {
    this._focusKeyManager.onKeydown(event);
  }
}
