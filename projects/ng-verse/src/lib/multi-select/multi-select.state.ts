import { computed, Injectable, signal } from '@angular/core';
type CompareWith = (o1: unknown, o2: unknown) => boolean;

interface MultiSelectItemProxy {
  content: string | null;
  value: () => unknown;
}

@Injectable()
export class MultiSelectState {
  values = signal<unknown[] | undefined>([]);

  options = signal<readonly MultiSelectItemProxy[]>([]);

  compareWith: CompareWith = (o1: unknown, o2: unknown) => o1 === o2;

  disabled = signal(false);

  selectedOptions = computed(() => {
    const values = this.values();
    const valueOptions = [];

    if (values?.length) {
      for (const value of values) {
        const valueOption = this.findOptionByValue(value);
        if (valueOption) {
          valueOptions.push(valueOption);
        }
      }
      return valueOptions;
    }

    return undefined;
  });

  selectedOptionsLabel = computed(() => {
    const selectedOptions = this.selectedOptions();
    if (selectedOptions?.length) {
      return selectedOptions.map((opt) => opt.content).join(', ');
    }
    return;
  });

  findOptionByValue(value: unknown) {
    return this.options().find((option) =>
      this.compareWith(option.value(), value)
    );
  }

  toggleValue(value: unknown) {
    let values = this.values();

    if (values === undefined) {
      values = [];
    }

    const isUniqueValue = !values.some((v) => this.compareWith(v, value));

    if (isUniqueValue) {
      values.push(value);
      this.values.set([...values]);
    } else {
      const valueIndex = values?.findIndex((v) => this.compareWith(v, value));
      if (valueIndex !== undefined) {
        values?.splice(valueIndex, 1);
        this.values.set([...values]);
      }
    }
  }

  isSelected(value: unknown) {
    return this.values()?.some((v) => this.compareWith(v, value));
  }

  writeValues(values: unknown[]) {
    this.values.set(values);
  }
}
