import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import {
  CdkListbox,
  CdkOption,
  ListboxValueChangeEvent,
} from '@angular/cdk/listbox';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { LucideAngularModule, ChevronDown } from 'lucide-angular';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
type OnTouchedFunction = (() => void) | undefined;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
type OnChangeFunction = ((_: any) => void) | undefined;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
type ValidatorChangeFunction = (() => void) | undefined;

type Option = unknown;
@Component({
  selector: 'app-select',
  imports: [
    CdkConnectedOverlay,
    CdkOverlayOrigin,
    CdkListbox,
    CdkOption,
    ReactiveFormsModule,
    LucideAngularModule,
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
  options = input.required<Array<Option>>();

  ChevronDown = ChevronDown;

  cdkListPost = viewChild(CdkListbox);

  label = input.required<string>();

  private _registerOnChange: OnChangeFunction;
  private _validatorChangeFn: ValidatorChangeFunction;
  private _onTouched: OnTouchedFunction;

  value = signal<unknown>(undefined);

  valueName = input<string>();
  displayName = input<string>();

  displayValue = computed(() => {
    const value = this.value();
    if (value) {
      return value;
    }
    return this.label();
  });

  triggerElement = viewChild('triggerElement', {
    read: ElementRef,
  });

  overlayWidth = computed(() => {
    const triggerElement = this.triggerElement() as
      | ElementRef<HTMLElement>
      | undefined;
    if (triggerElement) {
      return triggerElement.nativeElement.clientWidth;
    }
    return 0;
  });

  listBoxValue = computed(() => [this.value()]);

  constructor() {
    effect(() => {
      const list = this.cdkListPost();
      if (list) {
        list.focus();
      }
    });
  }

  valueChange($event: ListboxValueChangeEvent<unknown>) {
    const value = $event.value ? $event.value[0] : $event.value;
    this.value.set(value);
    this.close();
    if (this._registerOnChange) {
      this._registerOnChange(value);
    }
  }

  writeValue(obj: any): void {
    this.value.set(obj);
  }
  registerOnChange(fn: OnChangeFunction): void {
    this._registerOnChange = fn;
  }
  registerOnValidatorChange(fn: ValidatorChangeFunction): void {
    this._validatorChangeFn = fn;
  }

  registerOnTouched(fn: OnTouchedFunction): void {
    this._onTouched = fn;
  }

  toggle() {
    this.isOpen.update((isOpen) => !isOpen);
  }

  close() {
    this.isOpen.set(false);
  }

  open() {
    this.isOpen.set(true);
  }
}
