import { Injectable, signal } from '@angular/core';
import { SelectableStack } from '../utils/selectable-stack';
import { A11yRadioButtonDirective } from './radio-button.directive';

@Injectable()
export class A11yRadioStack extends SelectableStack<A11yRadioButtonDirective> {
  private _panels = signal<A11yRadioButtonDirective[]>([]);

  constructor() {
    super();

    this.toHorizontal();
    this.toVertical();
    this.withWrap();
  }
}
