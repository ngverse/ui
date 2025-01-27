import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  ElementRef,
  forwardRef,
  input,
  signal,
  viewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

import { ListboxRegistry } from '../listbox/listbox-registry';
import { ListboxDirective } from '../listbox/listbox.directive';
import { PopoverOriginDirective } from '../popover/popover-origin.directive';
import { PopoverComponent } from '../popover/popover.component';
import { OptionComponent } from './option.component';
import { SelectIconComponent } from './select-icon.component';

type OnTouchedFunction = (() => void) | undefined;

export type OnChangeFunction = ((_: unknown) => void) | undefined;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CompareWith = (o1: any, o2: any) => boolean;

@Component({
  selector: 'app-select',
  imports: [
    ReactiveFormsModule,
    SelectIconComponent,
    PopoverOriginDirective,
    PopoverComponent,
    ListboxDirective,
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: SelectComponent,
    },
    ListboxRegistry,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent implements ControlValueAccessor {
  multiple = input(false);
  placeholder = input<string>();
  compareWith = input<CompareWith>((o1: unknown, o2: unknown) => o1 === o2);
  isOpen = signal(false);
  disabled = signal(false);
  values = signal<unknown[]>([]);

  listbox = viewChild.required(ListboxDirective);

  private _onTouched: OnTouchedFunction;
  options = contentChildren<OptionComponent>(
    forwardRef(() => OptionComponent),
    { descendants: true }
  );

  selectOptions = viewChild.required<ElementRef<HTMLElement>>('selectOptions');
  private _registerOnChangeFn: OnChangeFunction;

  findOptionByValue(value: unknown) {
    return this.options().find((option) =>
      this.compareWith()(option.value(), value)
    );
  }

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

  isSelected(value: unknown) {
    return this.values()?.some((v) => this.compareWith()(v, value));
  }

  writeValue(values: unknown): void {
    if (values === null || values === undefined || values === '') {
      this.values.set([]);
      return;
    }
    const coerced: unknown[] = this.multiple()
      ? (values as unknown[])
      : [values];
    this.values.set(coerced);
  }

  registerOnChange(fn: OnChangeFunction): void {
    this._registerOnChangeFn = fn;
  }

  registerOnTouched(fn: OnTouchedFunction): void {
    this._onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  panelOpened() {
    this.listbox().focus();
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

  toggleValue(value: unknown) {
    let values = this.values();
    if (!this.multiple()) {
      values = [value];
    } else {
      const isUniqueValue = !values.some((v) => this.compareWith()(v, value));

      if (isUniqueValue) {
        values = [...values, value];
      } else {
        values = values.filter((v) => !this.compareWith()(v, value));
      }
    }

    this.values.set(values);

    const flattenedValues = this.multiple() ? this.values() : this.values()[0];

    this._registerOnChangeFn?.(flattenedValues);

    if (!this.multiple()) {
      this.isOpen.set(false);
    }
  }

  toggle() {
    this.isOpen.update((isOpen) => !isOpen);
  }

  panelClosed() {
    this._onTouched?.();
  }
}
