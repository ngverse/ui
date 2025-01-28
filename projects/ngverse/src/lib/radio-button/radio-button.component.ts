import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  inject,
  input,
} from '@angular/core';
import { RadioButtonIconComponent } from './radio-button-icon.component';
import { RadioGroupComponent } from './radio-group.component';

let inputId = 0;

function genInputId() {
  return `radio-button-${inputId++}`;
}

@Component({
  selector: 'app-radio-button',
  imports: [RadioButtonIconComponent],
  templateUrl: './radio-button.component.html',
  styleUrl: './radio-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioButtonComponent {
  disabled = input<boolean>();
  value = input.required<unknown>();
  radioGroup = inject<RadioGroupComponent>(
    forwardRef(() => RadioGroupComponent)
  );

  id = input(genInputId());

  radioButtonDisabled = computed(() => {
    return this.disabled() || this.radioGroup.disabled();
  });

  name = this.radioGroup.name;

  selected = computed(() => {
    return this.radioGroup.compareWith()(this.radioGroup.value(), this.value());
  });

  toggle() {
    this.radioGroup.selected(this.value());
  }
}
