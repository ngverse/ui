import { Highlightable } from '@angular/cdk/a11y';
import { Signal } from '@angular/core';
import { BaseStack } from '../utils/base-stack';

export interface SelectableOption extends Highlightable {
  a11yIsSelected: Signal<boolean>;
}

export class SelectableStack<T extends SelectableOption> extends BaseStack<T> {
  focus() {
    const selected = this.items().find((i) => i.a11yIsSelected());

    if (selected) {
      this.setActiveItem(selected);
    } else {
      this._listKeyManager.setActiveItem(0);
    }
  }
}
