import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import {
  Component,
  computed,
  contentChildren,
  effect,
  ElementRef,
  input,
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
import { Subscription } from 'rxjs';
import { OptionComponent } from './option/option.component';
import { SelectIconComponent } from './select-icon.component';

type OnTouchedFunction = (() => void) | undefined;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type OnChangeFunction = ((_: any) => void) | undefined;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CompareWith = (o1: any, o2: any) => boolean;

@Component({
  selector: 'app-select',
  imports: [
    CdkConnectedOverlay,
    CdkOverlayOrigin,
    ReactiveFormsModule,
    SelectIconComponent,
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
})
export class SelectComponent implements ControlValueAccessor, Validator {
  isOpen = signal(false);

  label = input.required<string>();

  private _registerOnChange: OnChangeFunction;
  private _onTouched: OnTouchedFunction;

  options = contentChildren(OptionComponent);

  keyManager!: ActiveDescendantKeyManager<OptionComponent>;

  value = signal<unknown>(undefined);

  optionsContainer = viewChild<ElementRef<HTMLElement>>('optionsContainer');

  compareWith = input<CompareWith>((o1: unknown, o2: unknown) => o1 === o2);

  selectedOption = computed(() => {
    return this.options().find((opt) =>
      this.compareWith()(opt.value(), this.value())
    );
  });

  selectedOptionLabel = computed(() => {
    const selectedOption = this.selectedOption();
    if (selectedOption) {
      return selectedOption.el.nativeElement.textContent;
    }
    return;
  });

  sub: Subscription | undefined;

  triggerElement = viewChild('triggerElement', {
    read: ElementRef,
  });

  constructor() {
    effect(() => {
      const options = this.options();
      this.keyManager?.destroy();
      this.keyManager = new ActiveDescendantKeyManager(options).withWrap();

      this.sub?.unsubscribe();
      this.sub = new Subscription();

      for (const option of options) {
        this.sub.add(
          option.clicked.subscribe(() => {
            this.value.set(option.value());
            this.emitChangeValue();
            this.close();
          })
        );
      }
    });
  }

  overlayWidth = computed(() => {
    const triggerElement = this.triggerElement() as
      | ElementRef<HTMLElement>
      | undefined;
    if (triggerElement) {
      return triggerElement.nativeElement.clientWidth;
    }
    return 0;
  });

  onKeydown($event: KeyboardEvent) {
    if ($event.key === 'Enter') {
      const value = this.keyManager.activeItem?.value;
      if (value) {
        this.value.set(value());
        this.emitChangeValue();
      }
      this.close();
    } else {
      this.keyManager.onKeydown($event);
    }
  }

  emitChangeValue() {
    if (this._registerOnChange) {
      this._registerOnChange(this.value());
    }
  }

  panelOpened() {
    if (this._onTouched) {
      this._onTouched();
    }
    const selectedOption = this.selectedOption();
    this.optionsContainer()?.nativeElement.focus();
    if (selectedOption) {
      this.keyManager.setActiveItem(selectedOption);
    } else {
      this.keyManager.setFirstItemActive();
    }
  }

  validate(control: AbstractControl<boolean>): ValidationErrors | null {
    const hasRequired = control.hasValidator(Validators.required);
    return hasRequired &&
      (control.value === null || control.value === undefined)
      ? { required: true }
      : null;
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
