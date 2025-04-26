import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { FontIconComponent } from '@/ui/icon/font-icon.component';

@Component({
  selector: 'app-part-selector',
  imports: [FontIconComponent],
  templateUrl: './part-selector.component.html',
  styleUrl: './part-selector.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PartSelectorComponent {
  value = input.required<number>();
  valueChange = output<number>();

  formattedValue = computed(() => {
    return this.value().toString().padStart(2, '0').padEnd(2, '0');
  });

  increaseValue() {
    this.valueChange.emit(this.value() + 1);
  }

  decreaseValue() {
    this.valueChange.emit(this.value() - 1);
  }
}
