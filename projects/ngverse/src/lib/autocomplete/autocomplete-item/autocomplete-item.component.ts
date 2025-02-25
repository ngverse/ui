import { Highlightable } from '@angular/cdk/a11y';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-autocomplete-item',
  templateUrl: './autocomplete-item.component.html',
  styleUrl: './autocomplete-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteItemComponent implements Highlightable {
  isActive = signal(false);
  value = input.required<unknown>();
  host = inject<ElementRef<HTMLElement>>(ElementRef<HTMLElement>);

  select() {
    console.log('HELLI');
  }

  setActiveStyles(): void {
    this.isActive.set(true);
  }
  setInactiveStyles(): void {
    this.isActive.set(false);
  }
}
