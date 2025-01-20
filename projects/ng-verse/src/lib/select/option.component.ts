import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { ListboxItemDirective } from '@ng-verse/listbox/listbox-item.directive';
import { SelectCheckIconComponent } from './select-check-icon.component';
import { SelectComponent } from './select.component';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrl: './option.component.scss',
  imports: [SelectCheckIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: ListboxItemDirective,
      inputs: ['disabled'],
    },
  ],
  host: {
    '[class.selected]': 'isSelected()',
  },
})
export class OptionComponent {
  isActive = signal(false);
  value = input.required<unknown>();
  isSelected = () => this.select.isSelected(this.value());

  private host = inject<ElementRef<HTMLElement>>(ElementRef<HTMLElement>);

  select = inject<SelectComponent>(forwardRef(() => SelectComponent));

  private listboxItem = inject(ListboxItemDirective);

  constructor() {
    this.listboxItem.activated.subscribe(() => {
      this.select.toggleValue(this.value());
    });
  }

  get content() {
    return this.host.nativeElement.textContent;
  }
}
