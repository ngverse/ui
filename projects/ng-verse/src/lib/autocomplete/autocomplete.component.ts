import {
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  inject,
  InjectionToken,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { AutocompleteItemComponent } from '@ng-verse/autocomplete/autocomplete-item/autocomplete-item.component';
import { ListboxDirective } from '@ng-verse/listbox/listbox.directive';
import { ListboxState } from '@ng-verse/listbox/listbox.state';
import { PopoverOriginDirective } from '@ng-verse/popover/popover-origin.directive';
import { Subject } from 'rxjs';
import { PopoverComponent } from '../popover/popover.component';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type OnChangeFunction = ((_: any) => void) | undefined;
type OnTouchedFunction = (() => void) | undefined;

export const SELECTION_EMITTER = new InjectionToken<
  Subject<AutocompleteItemComponent>
>('SELECTION_EMITTER');

@Component({
  selector: 'app-autocomplete',
  imports: [
    FormsModule,
    PopoverComponent,
    PopoverOriginDirective,
    ListboxDirective,
  ],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.scss',
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
    ListboxState,
  ],
  host: {
    '(keydown)': 'onKeydown($event)',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteComponent implements ControlValueAccessor {
  label = input.required<string>();
  displayWith = input<((value: unknown) => string) | null>(null);
  value = signal<unknown>(undefined);
  isOpen = signal(false);
  inputValue = signal('');

  private readonly options = contentChildren(AutocompleteItemComponent);

  disabled = signal(false);

  private readonly listbox = viewChild.required(ListboxDirective);
  private readonly selectionEmitter = inject(SELECTION_EMITTER, { self: true });

  _onChange: OnChangeFunction;
  _onTouched: OnTouchedFunction;

  constructor() {
    this.selectionEmitter.pipe(takeUntilDestroyed()).subscribe((comp) => {
      this.select(comp);
    });
  }

  close() {
    this.isOpen.set(false);
  }

  open() {
    this.isOpen.set(true);
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

  onKeydown(event: KeyboardEvent) {
    this.listbox().onKeydown(event);
  }

  onInput($event: Event) {
    const value = ($event.target as HTMLInputElement)?.value.trim() ?? '';
    if (!this.isOpen()) {
      this.open();
    }
    this._onChange?.(value);
  }

  panelOpened() {
    this.listbox().activeByIndex(-1);
  }
}
