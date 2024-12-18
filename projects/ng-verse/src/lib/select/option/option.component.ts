import { Highlightable } from '@angular/cdk/a11y';
import {
  Component,
  ElementRef,
  inject,
  input,
  output,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrl: './option.component.scss',
  host: {
    class: 'hello',
  },
})
export class OptionComponent implements Highlightable {
  value = input.required<unknown>();
  el = inject<ElementRef<HTMLElement>>(ElementRef);
  clicked = output();
  active = signal(false);
  setActiveStyles(): void {
    this.active.set(true);
  }
  setInactiveStyles(): void {
    this.active.set(false);
  }
  disabled?: boolean | undefined;
  getLabel?(): string {
    return '';
  }
}
