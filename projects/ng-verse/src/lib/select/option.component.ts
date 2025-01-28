import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  inject,
  input,
} from '@angular/core';
import { ListboxItemDirective } from '../listbox/listbox-item.directive';
import { OptionGroupComponent } from './option-group.component';
import { SelectCheckIconComponent } from './select-check-icon.component';
import { SelectComponent } from './select.component';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrl: './option.component.scss',
  imports: [SelectCheckIconComponent, ListboxItemDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionComponent {
  value = input.required<unknown>();
  isSelected = () => this.select.isSelected(this.value());
  optionGroup = inject(OptionGroupComponent, { optional: true });

  select = inject<SelectComponent>(forwardRef(() => SelectComponent));
  disabled = input(false);

  inGroup = !!this.optionGroup;

  private host = inject<ElementRef<HTMLElement>>(ElementRef<HTMLElement>);

  get content() {
    return this.host.nativeElement.textContent;
  }
}
