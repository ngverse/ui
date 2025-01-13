import {
  computed,
  Injectable,
  InputSignal,
  Signal,
  signal,
} from '@angular/core';

export type CompareWith = (o1: unknown, o2: unknown) => boolean;
export type OnChangeFunction = ((_: unknown) => void) | undefined;

export interface OptionProxy {
  content: string | null;
  value: () => unknown;
}

@Injectable()
export class SelectState {
  values = signal<unknown[] | undefined>([]);

  options!: Signal<readonly OptionProxy[]>;

  isOpen = signal(false);

  compareWith: CompareWith = (o1: unknown, o2: unknown) => o1 === o2;

  disabled = signal(false);

  multiple!: InputSignal<boolean>;

  registerOnChange: OnChangeFunction;

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

    if (!this.multiple()) {
      values = [value];
      this.values.set([...values]);
      this.isOpen.set(false);
      this.emitOnChange();
      return;
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
        this.emitOnChange();
      }
    }
  }

  firstSelectedOptionIndex() {
    const selectedOptions = this.selectedOptions();
    if (!selectedOptions) {
      return -1;
    }
    const selectedOption = selectedOptions[0];
    if (selectedOption) {
      return this.options().indexOf(selectedOption);
    }
    return -1;
  }

  private emitOnChange() {
    if (this.registerOnChange) {
      if (this.multiple()) {
        this.registerOnChange(this.values());
      } else {
        const values = this.values();
        if (values === undefined || values.length === 0) {
          this.registerOnChange(undefined);
        } else {
          this.registerOnChange(values[0]);
        }
      }
    }
  }

  isSelected(value: unknown) {
    return this.values()?.some((v) => this.compareWith(v, value));
  }

  writeValue(values: unknown[] | unknown) {
    if (this.multiple()) {
      this.values.set(values as unknown[]);
    } else {
      this.values.set([values]);
    }
  }
}
