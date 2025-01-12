import { computed, Injectable, signal } from '@angular/core';
import { OptionComponent } from './option/option.component';
export type SelectCompareWith = (o1: unknown, o2: unknown) => boolean;
export type SelectOnChangeFunction = ((_: unknown) => void) | undefined;

@Injectable()
export class SelectState {
  value = signal<unknown>(undefined);

  options = signal<readonly OptionComponent[]>([]);

  compareWith: SelectCompareWith = (o1: unknown, o2: unknown) => o1 === o2;
  registerOnChange: SelectOnChangeFunction;

  disabled = signal(false);

  isOpen = signal(false);

  selectedOption = computed(() => {
    const value = this.value();
    if (value) {
      return this.findOptionByValue(value);
    }
    return undefined;
  });

  selectedOptionIndex = computed(() => {
    const selectedOption = this.selectedOption();
    if (selectedOption) {
      return this.options().indexOf(selectedOption);
    }
    return -1;
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

  isSelected(value: unknown) {
    return this.compareWith(this.value(), value);
  }

  setValue(value: unknown) {
    this.value.set(value);
    this.isOpen.set(false);
    this.registerOnChange?.(value);
  }

  writeValue(value: unknown) {
    this.value.set(value);
  }
}
