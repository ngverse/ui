import {
  CdkListbox,
  CdkOption,
  ListboxValueChangeEvent,
} from '@angular/cdk/listbox';
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
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
import { SelectIconComponent } from './select-icon.component';

type OnTouchedFunction = (() => void) | undefined;

type OnChangeFunction = ((_: unknown) => void) | undefined;

type CompareWith = (o1: unknown, o2: unknown) => boolean;

type ComplexOption = Record<string, unknown>;

@Component({
  selector: 'app-select',
  imports: [
    CdkConnectedOverlay,
    CdkOverlayOrigin,
    ReactiveFormsModule,
    SelectIconComponent,
    CdkListbox,
    CdkOption,
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
    if (value === undefined || value === null) {
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
    this.close();
    this.selectButton()?.nativeElement.focus();
  }

  close() {
    this.isOpen.set(false);
  }

  open() {
    this.isOpen.set(true);
  }

  panelOpened() {
    if (this._onTouched) {
      this._onTouched();
    }
    this.listBox()?.focus();
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
