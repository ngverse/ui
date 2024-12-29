import { afterRender, Component, ElementRef, inject, input, signal } from '@angular/core';
import { Highlightable } from '@angular/cdk/a11y';
import { SELECTION_EMITTER } from '@ng-verse/autocomplete/autocomplete.component';

@Component({
  selector: 'app-autocomplete-item',
  imports: [],
  templateUrl: './autocomplete-item.component.html',
  styleUrl: './autocomplete-item.component.scss',
  host: {
    '(click)': 'onSelect()',
    '[class.selected]': 'selected()',
    '[class.focused]': 'focused()',
    '[attr.role]': '"listitem"'
  }
})
export class AutocompleteItemComponent implements Highlightable {
  value = input.required<unknown>();
  selected = signal(false);
  focused = signal(false);

  innerText = signal('');
  private readonly el = inject(ElementRef);
  constructor() {
    afterRender({
      read: () => {
        this.innerText.set(this.el?.nativeElement.innerText ?? '');
      }
    } );
  }

  private readonly autocompleteComponent = inject(SELECTION_EMITTER, {skipSelf: true});

  onSelect() {
    this.autocompleteComponent.next(this);
  }

  setActiveStyles(): void {
    this.focused.set(true)
  }

  setInactiveStyles(): void {
    this.focused.set(false)
  }

  scrollIntoView() {
    this.el?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}
