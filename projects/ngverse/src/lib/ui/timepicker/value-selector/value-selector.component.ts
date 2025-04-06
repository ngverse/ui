import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { FontIconComponent } from '@/ui/icon/font-icon.component';

@Component({
  selector: 'app-value-selector',
  imports: [FontIconComponent],
  templateUrl: './value-selector.component.html',
  styleUrl: './value-selector.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValueSelectorComponent {
  padLeft = input.required<boolean>();
  min = input.required<number>();
  max = input.required<number>();

  value = input.required<number>();
  valueChange = output<number>();

  formattedValue = computed(() => {
    if (this.padLeft()) {
      return this.value().toString().padStart(2, '0');
    }

    return this.value().toString();
  });

  increaseValue() {
    this.valueChange.emit(
      this.value() + 1 > this.max() ? this.min() : this.value() + 1
    );
  }

  decreaseValue() {
    this.valueChange.emit(
      this.value() - 1 < this.min() ? this.max() : this.value() - 1
    );
  }
}
