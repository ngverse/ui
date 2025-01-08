import {
  CdkListbox,
  CdkOption,
  ListboxValueChangeEvent,
} from '@angular/cdk/listbox';
import {
  Component,
  computed,
  ElementRef,
  input,
  signal,
  viewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

import { PopoverTriggerDirective } from '@ng-verse/popover/popover-trigger.directive';
import { PopoverComponent } from '@ng-verse/popover/popover.component';
import { SelectIconComponent } from './select-icon.component';

type OnTouchedFunction = (() => void) | undefined;

type OnChangeFunction = ((_: unknown) => void) | undefined;

type CompareWith = (o1: unknown, o2: unknown) => boolean;

type ComplexOption = Record<string, unknown>;

@Component({
  selector: 'app-select',
  imports: [
    ReactiveFormsModule,
    SelectIconComponent,
    CdkListbox,
    CdkOption,
    PopoverTriggerDirective,
    PopoverComponent,
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: SelectComponent,
    },
  ],
})
export class SelectComponent implements ControlValueAccessor {
  isOpen = signal(false);

  optionLabel = input<string>();
  optionValue = input<string>();

  stretch = input<boolean>(false);

  options = input.required<unknown[]>();

  placeholder = input.required<string>();

  private _registerOnChange: OnChangeFunction;
  private _onTouched: OnTouchedFunction;

  listBox = viewChild(CdkListbox);

  selectButton = viewChild('selectButton', {
    read: ElementRef<HTMLElement>,
  });

  value = signal<unknown>(undefined);

  compareWith = input<CompareWith>((o1: unknown, o2: unknown) => o1 === o2);

  selectedOptionLabel = computed(() => {
    const compareWith = this.compareWith();
    const selectedOption = this.options().find((option) => {
      const optionValue = this.getOptionValue(option);
      return compareWith(optionValue, this.value());
    });
    if (selectedOption === undefined) {
      return;
    }
    return this.getOptionLabel(selectedOption);
  });

  listboxValue = computed<unknown[]>(() => {
    const value = this.value();
    if (value === undefined || value === null || value === '') {
      return [];
    }
    return [value];
  });

  getOptionLabel(option: unknown) {
    const optionLabel = this.optionLabel();
    if (optionLabel) {
      return (option as ComplexOption)[optionLabel];
    }
    return option;
  }

  getOptionValue(option: unknown) {
    const optionValue = this.optionValue();
    if (optionValue) {
      return (option as ComplexOption)[optionValue];
    }
    return option;
  }

  listboxValueChange($event: ListboxValueChangeEvent<unknown>) {
    const value = $event.value[0];
    this.value.set(value);
    if (this._registerOnChange) {
      this._registerOnChange(this.value());
    }
    this.isOpen.set(false);
    this.selectButton()?.nativeElement.focus();
  }

  panelClosed() {
    if (this._onTouched) {
      this._onTouched();
    }
    this.isOpen.set(false);
  }

  panelOpened() {
    console.log('CATCHED');
    this.listBox()?.focus();
    this.isOpen.set(true);
  }

  writeValue(obj: unknown): void {
    this.value.set(obj);
  }
  registerOnChange(fn: OnChangeFunction): void {
    this._registerOnChange = fn;
  }

  registerOnTouched(fn: OnTouchedFunction): void {
    this._onTouched = fn;
  }
}
