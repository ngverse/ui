import { computed, Injectable, signal } from '@angular/core';
import { OptionComponent } from './option/option.component';
type CompareWith = (o1: unknown, o2: unknown) => boolean;

@Injectable()
export class SelectState {
  value = signal<unknown>(undefined);

  options = signal<readonly OptionComponent[]>([]);

  compareWith: CompareWith = (o1: unknown, o2: unknown) => o1 === o2;

  disabled = signal(false);

  selectedOption = computed(() => {
    const value = this.value();
    if (value) {
      return this.findOptionByValue(value);
    }
    return undefined;
  });

  selectedOptionLabel = computed(() => {
    const selectedOption = this.selectedOption();
    if (selectedOption) {
      return selectedOption.host.nativeElement.textContent;
    }
    return;
  });

  findOptionByValue(value: unknown) {
    return this.options().find((option) =>
      this.compareWith(option.value(), value)
    );
  }
}
