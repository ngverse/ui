import { Component, computed, inject, input } from '@angular/core';
import { RadioButtonState } from './radio-button.state';
import { RadioButtonIconComponent } from './radio-button-icon.component';

@Component({
  selector: 'app-radio-button',
  imports: [RadioButtonIconComponent],
  templateUrl: './radio-button.component.html',
  styleUrl: './radio-button.component.scss',
})
export class RadioButtonComponent {
  disabled = input<boolean>();

  radioButtonState = inject(RadioButtonState);

  value = input.required<unknown>();

  selected = computed(() => {
    return this.radioButtonState.compareWith(
      this.radioButtonState.getValue(),
      this.value()
    );
  });

  toggle() {
    this.radioButtonState.setValue(this.value());
  }
}
