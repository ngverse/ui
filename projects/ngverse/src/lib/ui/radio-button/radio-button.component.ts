import { FontIconComponent } from '@/ui/font-icon/font-icon.component';
import { _IdGenerator } from '@angular/cdk/a11y';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  inject,
  input,
} from '@angular/core';
import { RadioGroupComponent } from './radio-group.component';
@Component({
  selector: 'app-radio-button',
  imports: [FontIconComponent],
  templateUrl: './radio-button.component.html',
  styleUrl: './radio-button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioButtonComponent {
  disabled = input<boolean>();
  id = input(inject(_IdGenerator).getId('radio-button-'));
  value = input.required<unknown>();

  private radioGroup = inject<RadioGroupComponent>(
    forwardRef(() => RadioGroupComponent)
  );
  name = this.radioGroup.name;

  radioButtonDisabled = computed(() => {
    return this.disabled() || this.radioGroup.disabled();
  });

  selected = computed(() => {
    return this.radioGroup.compareWith()(this.radioGroup.value(), this.value());
  });

  toggle() {
    this.radioGroup.selected(this.value());
  }
}
