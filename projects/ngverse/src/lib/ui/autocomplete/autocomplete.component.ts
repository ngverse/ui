import { PopoverOriginDirective } from '@/ui/popover/popover-origin.directive';
import { PopoverComponent } from '@/ui/popover/popover.component';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import {
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  inject,
  InjectionToken,
  Injector,
  input,
  OnDestroy,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { AutocompleteItemComponent } from './autocomplete-item/autocomplete-item.component';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type OnChangeFunction = ((_: any) => void) | undefined;
type OnTouchedFunction = (() => void) | undefined;

export const SELECTION_EMITTER = new InjectionToken<
  Subject<AutocompleteItemComponent>
>('SELECTION_EMITTER');

@Component({
  selector: 'app-autocomplete',
  imports: [FormsModule, PopoverOriginDirective, PopoverComponent],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: AutocompleteComponent,
    },
    {
      provide: SELECTION_EMITTER,
      useValue: new Subject(),
    },
  ],
  // host: {
  //   '(keydown)': 'onKeydown($event)',
  // },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteComponent implements ControlValueAccessor, OnDestroy {
  label = input.required<string>();
  displayWith = input<((value: unknown) => string) | null>(null);
  value = signal<unknown>(undefined);
  isOpen = signal(false);
  inputValue = signal('');
  private readonly options = contentChildren(AutocompleteItemComponent, {
    descendants: true,
  });

  keyManager = new ActiveDescendantKeyManager(this.options, inject(Injector));

  disabled = signal(false);

  private readonly selectionEmitter = inject(SELECTION_EMITTER, { self: true });

  _onChange: OnChangeFunction;
  _onTouched: OnTouchedFunction;

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.setValue(this.keyManager.activeItem?.value());
    }
    this.keyManager.onKeydown(event);
  }

  constructor() {
    this.selectionEmitter.pipe(takeUntilDestroyed()).subscribe((comp) => {
      this.select(comp);
    });
  }
  ngOnDestroy(): void {
    this.keyManager.destroy();
  }

  close() {
    this.isOpen.set(false);
  }

  open() {
    this.isOpen.set(true);
  }

  setValue(value: unknown) {
    this.inputValue.set(value as string);
  }

  select(comp: AutocompleteItemComponent) {
    const displayWith = this.displayWith();
    this.inputValue.set(
      displayWith
        ? displayWith(comp.value())
        : (comp.host.nativeElement.textContent ?? '')
    );
    this._onChange?.(comp.value());
    this._onTouched?.();
    this.close();
  }

  writeValue(obj: string | null | undefined) {
    if (obj !== null && obj !== undefined) {
      this.inputValue.set(obj);
    } else {
      this.inputValue.set('');
    }
  }

  registerOnChange(fn: OnChangeFunction): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: OnTouchedFunction): void {
    this._onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  onInput($event: Event) {
    this.keyManager.setActiveItem(-1);
    const value = ($event.target as HTMLInputElement)?.value.trim() ?? '';
    if (!this.isOpen()) {
      this.open();
    }
    this._onChange?.(value);
  }
}
