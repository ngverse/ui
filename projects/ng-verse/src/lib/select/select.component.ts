import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  effect,
  ElementRef,
  forwardRef,
  inject,
  Injector,
  input,
  OnDestroy,
  signal,
  viewChild,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';

import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { PopoverOriginDirective } from '../popover/popover-origin.directive';
import { PopoverComponent } from '../popover/popover.component';
import { OptionComponent } from './option.component';
import { SelectIconComponent } from './select-icon.component';

type OnTouchedFunction = (() => void) | undefined;
type ValidatorChangeFunction = (() => void) | undefined;

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
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: SelectComponent,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: SelectComponent,
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent
  implements ControlValueAccessor, Validator, OnDestroy
{
  stretch = input<boolean>(false);
  multiple = input(false);
  required = input(false);
  placeholder = input<string>();
  compareWith = input<CompareWith>((o1: unknown, o2: unknown) => o1 === o2);
  isOpen = signal(false);
  disabled = signal(false);
  values = signal<unknown[]>([]);

  private _onTouched: OnTouchedFunction;
  options = contentChildren(
    forwardRef(() => OptionComponent),
    { descendants: true }
  );

  keyManager = new ActiveDescendantKeyManager(this.options, inject(Injector));
  selectOptions = viewChild.required<ElementRef<HTMLElement>>('selectOptions');
  private _validatorChangeFn: ValidatorChangeFunction;
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

  onKeydown($event: KeyboardEvent) {
    if ($event.key === 'Enter') {
      this.toggleValue(this.keyManager.activeItem?.value());
    }
    this.keyManager.onKeydown($event);
  }

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

  constructor() {
    effect(() => {
      this.required();
      this._validatorChangeFn?.();
    });
  }

  registerOnValidatorChange?(fn: () => void): void {
    this._validatorChangeFn = fn;
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
    this.selectOptions().nativeElement.focus();
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

  validate(control: AbstractControl<boolean>): ValidationErrors | null {
    const hasRequired = control.hasValidator(Validators.required);
    if (!hasRequired) {
      return null;
    }
    const values = this.values();
    const anyNotEmpty = values?.some(
      (v) => v !== null && v !== undefined && v !== ''
    );
    if (anyNotEmpty) {
      return null;
    }
    return { required: true };
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

    if (!this._registerOnChangeFn) {
      return;
    }
    const flattenedValues = this.multiple() ? this.values() : this.values()[0];

    this._registerOnChangeFn(flattenedValues);

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

  ngOnDestroy(): void {
    this.keyManager.destroy();
  }
}
