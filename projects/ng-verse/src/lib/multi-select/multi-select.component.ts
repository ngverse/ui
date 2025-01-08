import { CdkListbox, CdkOption } from '@angular/cdk/listbox';
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  input,
  signal,
  viewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { MultiSelectCheckIconComponent } from './multi-select-check.component';
import { MultiSelectIconComponent } from './multi-select-icon.component';

type OnTouchedFunction = (() => void) | undefined;

type OnChangeFunction = ((_: unknown) => void) | undefined;

type CompareWith = (o1: unknown, o2: unknown) => boolean;

type ComplexOption = Record<string, unknown>;

@Component({
  selector: 'app-multi-select',
  imports: [
    CdkConnectedOverlay,
    CdkOverlayOrigin,
    ReactiveFormsModule,
    MultiSelectIconComponent,
    CdkListbox,
    CdkOption,
    ReactiveFormsModule,
    MultiSelectCheckIconComponent,
  ],
  templateUrl: './multi-select.component.html',
  styleUrl: './multi-select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: MultiSelectComponent,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiSelectComponent implements ControlValueAccessor {
  isOpen = signal(false);

  listboxFormControl = new FormControl();

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

  selectedOptionLabel = signal<string>('');

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
      return (option as ComplexOption)[optionLabel] as string;
    }
    return option as string;
  }

  generateSelectedLabels() {
    const values = this.listboxFormControl.value;
    const compareWith = this.compareWith();
    const options = this.options();
    const labels: string[] = [];
    for (const value of values) {
      const foundOption = options.find((opt) =>
        compareWith(this.getOptionValue(opt), value)
      );
      if (foundOption) {
        labels.push(this.getOptionLabel(foundOption));
      }
    }
    this.selectedOptionLabel.set(labels.join(', '));
  }

  getOptionValue(option: unknown) {
    const optionValue = this.optionValue();
    if (optionValue) {
      return (option as ComplexOption)[optionValue];
    }
    return option;
  }

  constructor() {
    this.listboxFormControl.valueChanges.subscribe(() => {
      if (this._registerOnChange) {
        this._registerOnChange(this.listboxFormControl.value);
      }
      this.generateSelectedLabels();
    });
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
    this.listboxFormControl.setValue(obj, { emitEvent: false });
    this.value.set(obj);
  }
  registerOnChange(fn: OnChangeFunction): void {
    this._registerOnChange = fn;
  }

  registerOnTouched(fn: OnTouchedFunction): void {
    this._onTouched = fn;
  }
}
