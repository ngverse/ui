import {
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { LucideAngularModule, Circle, CircleCheck } from 'lucide-angular';
import { RadioButtonState } from './radio-button.state';

@Component({
  selector: 'app-radio-button',
  imports: [LucideAngularModule],
  templateUrl: './radio-button.component.html',
  styleUrl: './radio-button.component.scss',
})
export class RadioButtonComponent {
  Circle = Circle;
  CircleCheck = CircleCheck;

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
