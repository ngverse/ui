import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import {
  Component,
  contentChildren,
  effect,
  ElementRef,
  inject,
  InjectionToken,
  input,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { AutocompleteItemComponent } from '@ng-verse/autocomplete/autocomplete-item/autocomplete-item.component';
import { PopoverTriggerDirective } from '@ng-verse/popover/popover-trigger.directive';
import { Subject } from 'rxjs';
import { PopoverComponent } from '../popover/popover.component';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type OnChangeFunction = ((_: any) => void) | undefined;

export type OnTouchedFunction = (() => void) | undefined;

export const SELECTION_EMITTER = new InjectionToken<
  Subject<AutocompleteItemComponent>
>('SELECTION_EMITTER');

@Component({
  selector: 'app-autocomplete',
  imports: [
    CdkOverlayOrigin,
    CdkConnectedOverlay,
    FormsModule,
    PopoverComponent,
    PopoverTriggerDirective,
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
  ],
  host: {
    '(keydown)': 'onKeydown($event)',
  },
})
export class AutocompleteComponent implements ControlValueAccessor {
  label = input.required<string>();
  displayWith = input<((value: unknown) => string) | null>(null);

  private readonly options = contentChildren(AutocompleteItemComponent);

  private readonly elementRef = inject(ElementRef);

  isOpen = signal(false);
  inputValue = signal('');

  private readonly selectionEmitter = inject(SELECTION_EMITTER, { self: true });

  keyManager!: ActiveDescendantKeyManager<AutocompleteItemComponent>;

  _onChange: OnChangeFunction;
  _onTouched: OnTouchedFunction;

  constructor() {
    this.selectionEmitter.pipe(takeUntilDestroyed()).subscribe((comp) => {
      this.select(comp);
    });

    effect(() => {
      const options = this.options();
      this.keyManager?.destroy();
      this.keyManager = new ActiveDescendantKeyManager(options).withWrap();
    });
  }

  close() {
    console.log("CLOSE")
    this.isOpen.set(false);
  }

  open() {
    console.log("OPEN!")
    this.isOpen.set(true);
    this.keyManager.setFirstItemActive()
  }

  select(comp: AutocompleteItemComponent) {
    const displayWith = this.displayWith();
    this.inputValue.set(
      displayWith ? displayWith(comp.value()) : comp.innerText()
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

  onInput($event: Event) {
    const value = ($event.target as HTMLInputElement)?.value.trim() ?? '';
    if (!this.isOpen()) {
      this.open();
    }
    this._onChange?.(value);
  }

  onKeydown(event: KeyboardEvent) {
    console.log('KE');
    if (event.key !== 'Enter') {
      this.keyManager.onKeydown(event);
      this.scrollToActiveOption();
    } else if (this.keyManager.activeItem) {
      // event.stopPropagation();
      // event.preventDefault();
      this.select(this.keyManager.activeItem as AutocompleteItemComponent);
    }
  }

  private scrollToActiveOption() {
    const activeItem = this.keyManager?.activeItem;
    if (activeItem) {
      activeItem.scrollIntoView();
    }
  }
}
