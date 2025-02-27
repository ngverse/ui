import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  forwardRef,
  inject,
  input,
  signal,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

import {
  A11yOptionGroupDirective,
  A11ySelectDirective,
  A11ySelectTriggerDirective,
  DynamicValueModel,
  PopoverComponent,
  PopoverOriginDirective,
  ValueModelCompareWith,
} from '@ngverse/kit';
import { OptionComponent } from './option.component';
import { SelectIconComponent } from './select-icon.component';

type OnTouchedFunction = (() => void) | undefined;

export type OnChangeFunction = ((_: unknown) => void) | undefined;

@Component({
  selector: 'app-select',
  imports: [
    ReactiveFormsModule,
    SelectIconComponent,
    PopoverOriginDirective,
    PopoverComponent,
    A11ySelectTriggerDirective,
    A11yOptionGroupDirective,
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: SelectComponent,
    },
  ],
  hostDirectives: [A11ySelectDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent implements ControlValueAccessor {
  placeholder = input<string>();
  options = contentChildren<OptionComponent>(
    forwardRef(() => OptionComponent),
    { descendants: true }
  );

  private _valueModel = new DynamicValueModel();

  a11ySelect = inject(A11ySelectDirective);

  multiple = input<boolean, boolean>(false, {
    transform: (value) => {
      this._valueModel.setMultiple(value);
      return value;
    },
  });

  compareWith = input<ValueModelCompareWith, ValueModelCompareWith>(
    (o1: unknown, o2: unknown) => o1 === o2,
    {
      transform: (value) => {
        this._valueModel.setCompareWith(value);
        return value;
      },
    }
  );
  isOpen = signal(false);
  disabled = signal(false);
  stretch = input(true);

  selectedOptions = computed(() => {
    const valueOptions = this.options().filter((option) =>
      this.isSelected(option.value())
    );
    return valueOptions;
  });

  selectedOptionsLabel = computed(() => {
    const selectedOptions = this.selectedOptions();
    if (selectedOptions?.length) {
      return selectedOptions.map((opt) => opt.content).join(', ');
    }
    return;
  });

  private _onTouched: OnTouchedFunction;
  private _registerOnChangeFn: OnChangeFunction;

  isSelected(value: unknown) {
    return this._valueModel.isSelected(value);
  }

  writeValue(values: unknown): void {
    this._valueModel.setValue(values);
  }

  toggleValue(option: OptionComponent) {
    const value = option.value();

    this._valueModel.toggleValue(value);

    this._registerOnChangeFn?.(this._valueModel.value());

    if (!this.multiple()) {
      this.isOpen.set(false);
    }
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

  togglePanel() {
    this.isOpen.update((isOpen) => !isOpen);
  }

  panelOpened() {
    this.a11ySelect?.focus();
  }
  panelClosed() {
    this._onTouched?.();
  }
}
