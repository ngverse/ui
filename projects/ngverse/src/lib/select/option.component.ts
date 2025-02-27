import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { A11yOptionDirective } from '@ngverse/kit';
import { OptionGroupComponent } from './option-group.component';
import { SelectCheckIconComponent } from './select-check-icon.component';
import { SelectComponent } from './select.component';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrl: './option.component.css',
  imports: [SelectCheckIconComponent, A11yOptionDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionComponent {
  value = input.required<unknown>();
  disabled = input<boolean>();

  isActive = signal(false);
  optionGroup = inject(OptionGroupComponent, { optional: true });

  element = inject(ElementRef<HTMLElement>).nativeElement as HTMLElement;

  select = inject<SelectComponent>(forwardRef(() => SelectComponent));

  inGroup = !!this.optionGroup;

  private host = inject<ElementRef<HTMLElement>>(ElementRef<HTMLElement>);
  isSelected = () => this.select.isSelected(this.value());

  get content() {
    return this.host.nativeElement.textContent;
  }
  onClick() {
    this.select.toggleValue(this);
  }
}
