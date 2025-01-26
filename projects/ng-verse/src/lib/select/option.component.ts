import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  inject,
  input,
} from '@angular/core';
import { ListboxItemDirective } from '../listbox/listbox-item.directive';
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

  disabled = input(false);

  private host = inject<ElementRef<HTMLElement>>(ElementRef<HTMLElement>);

  select = inject<SelectComponent>(forwardRef(() => SelectComponent));

  get content() {
    return this.host.nativeElement.textContent;
  }
}
