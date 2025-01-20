import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
} from '@angular/core';
import { SELECTION_EMITTER } from '../autocomplete.component';

@Component({
  selector: 'app-autocomplete-item',
  templateUrl: './autocomplete-item.component.html',
  styleUrl: './autocomplete-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteItemComponent {
  value = input.required<unknown>();
  host = inject<ElementRef<HTMLElement>>(ElementRef<HTMLElement>);
  private readonly selectionEmitter = inject(SELECTION_EMITTER, {
    skipSelf: true,
  });
}
