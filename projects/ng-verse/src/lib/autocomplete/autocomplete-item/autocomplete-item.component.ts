import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
} from '@angular/core';
import { SELECTION_EMITTER } from '@ng-verse/autocomplete/autocomplete.component';
import { ListboxItemDirective } from '@ng-verse/listbox/listbox-item.directive';

@Component({
  selector: 'app-autocomplete-item',
  templateUrl: './autocomplete-item.component.html',
  styleUrl: './autocomplete-item.component.scss',
  hostDirectives: [
    {
      directive: ListboxItemDirective,
      inputs: ['disabled'],
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteItemComponent {
  value = input.required<unknown>();
  host = inject<ElementRef<HTMLElement>>(ElementRef<HTMLElement>);
  private readonly selectionEmitter = inject(SELECTION_EMITTER, {
    skipSelf: true,
  });
  listboxItem = inject(ListboxItemDirective);

  constructor() {
    this.listboxItem.activated.subscribe(() => {
      this.selectionEmitter.next(this);
    });
  }
}
