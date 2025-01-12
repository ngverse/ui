import {
  Component, ElementRef,
  inject,
  input,
} from '@angular/core';
import { ListboxItemDirective } from '@ng-verse/listbox/listbox-item.directive';
import { SELECTION_EMITTER } from '@ng-verse/autocomplete/autocomplete.component';

@Component({
  selector: 'app-autocomplete-item',
  templateUrl: './autocomplete-item.component.html',
  styleUrl: './autocomplete-item.component.scss',
  hostDirectives: [
    {
      directive: ListboxItemDirective,
      inputs: ['disabled'],
    },
  ]
})
export class AutocompleteItemComponent {
  value = input.required<unknown>();
  host = inject<ElementRef<HTMLElement>>(ElementRef<HTMLElement>);
  private readonly selectionEmitter = inject(SELECTION_EMITTER, {skipSelf: true});
  listboxItem = inject(ListboxItemDirective);

  constructor() {
    this.listboxItem.activated.subscribe(() => {
      this.selectionEmitter.next(this);
    });
  }
}
