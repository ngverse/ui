import { Highlightable } from '@angular/cdk/a11y';
import { Component, ElementRef, inject, input, signal } from '@angular/core';
import { SELECTION_EMITTER } from '@ng-verse/autocomplete/autocomplete.component';

@Component({
  selector: 'app-autocomplete-item',
  templateUrl: './autocomplete-item.component.html',
  styleUrl: './autocomplete-item.component.scss',
  host: {
    '(click)': 'onSelect()',
    '[class.focused]': 'focused()',
    '[attr.role]': '"listitem"'
  }
})
export class AutocompleteItemComponent implements Highlightable {
  value = input.required<unknown>();
  focused = signal(false);

  private readonly el = inject(ElementRef);
  private readonly autocompleteComponent = inject(SELECTION_EMITTER, {skipSelf: true});

  onSelect() {
    this.autocompleteComponent.next(this);
  }

  setActiveStyles(): void {
    this.focused.set(true);
  }

  innerText() {
    return this.el.nativeElement.innerText ?? '';
  }

  setInactiveStyles(): void {
    this.focused.set(false);
  }

  scrollIntoView() {
    this.el?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}
