import {
  afterRender,
  Component,
  contentChildren,
  ElementRef, inject, InjectionToken, Injector,
  input,
  signal,
  viewChild
} from '@angular/core';
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AutocompleteItemComponent } from '@ng-verse/autocomplete/autocomplete-item/autocomplete-item.component';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type OnChangeFunction = ((_: any) => void) | undefined;

export type OnTouchedFunction = (() => void) | undefined;

export const SELECTION_EMITTER = new InjectionToken<Subject<AutocompleteItemComponent>>('SELECTION_EMITTER');

@Component({
  selector: 'app-autocomplete',
  imports: [
    CdkOverlayOrigin,
    CdkConnectedOverlay,
    FormsModule
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
      useValue: new Subject()
    }
  ],
  host: {
    '(keydown)': 'onKeydown($event)',
    '(document:click)': 'clickout($event)'
  }
})
export class AutocompleteComponent implements ControlValueAccessor {
  label = input.required<string>();
  requireSelection = input(false, {transform: coerceBooleanProperty});
  overlayWidth = signal(0);

  private readonly options = contentChildren(AutocompleteItemComponent);
  private readonly triggerElement = viewChild('triggerElement', {
    read: ElementRef,
  });

  private readonly optionsContainer = viewChild<ElementRef<HTMLElement>>('optionsContainer')

  private readonly elementRef = inject(ElementRef);

  isOpen = signal(false);
  filter = signal('');

  private selectedFromList = false;

  private readonly selectionEmitter = inject(SELECTION_EMITTER, {self: true});

  keyManager = new ActiveDescendantKeyManager(this.options, inject(Injector)).withWrap();

  _onChange: OnChangeFunction;
  _onTouched: OnTouchedFunction;

  constructor() {
    this.updateOverlayWidth();

    this.selectionEmitter.pipe(takeUntilDestroyed()).subscribe((comp) => {
      this.select(comp);
    });
  }

  close() {
    this.isOpen.set(false);
    this.keyManager?.setActiveItem(-1);

    if (this.requireSelection() && !this.selectedFromList) {
      this.filter.set('');
    }

    this.selectedFromList = false;
  }

  open() {
    this.isOpen.set(true);
    if (this.requireSelection() && this.filter().length) {
      for(const option of this.options()) {
        if (option.value() === this.filter()) {
          option.selected.set(true);
          this.keyManager?.setActiveItem(option);
          this.selectedFromList = true;
          break;
        }
      }
    } else {
      this.keyManager?.setFirstItemActive();
    }
  }

  select(comp: AutocompleteItemComponent) {
    this.selectedFromList = true;
    this.filter.set((comp.value() as string) ?? '');
    this._onChange?.(comp.value());
    this._onTouched?.();
    this.close();
  }

  writeValue(obj: string | null | undefined) {
    if (obj !== null && obj !== undefined) {
      this.filter.set(obj);
    } else {
      this.filter.set('')
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

    this.selectedFromList = false;

    this._onChange?.(value);
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key !== 'Enter') {
      this.keyManager?.onKeydown(event);
      this.scrollToActiveOption();
    } else if (this.keyManager?.activeItem) {
      event.stopPropagation();
      event.preventDefault();
      this.select(this.keyManager.activeItem as AutocompleteItemComponent);
    }
  }

  clickout(event: Event) {
    if (event.target instanceof HTMLElement && this.isOpen()) {
      if (!this.elementRef.nativeElement.contains(event.target) && !this.optionsContainer()?.nativeElement.contains(event.target)) {
        this.close();
      }
    }
  }

  private updateOverlayWidth(): void {
    afterRender({
      read: () => {
        this.overlayWidth.set(this.triggerElement()?.nativeElement.clientWidth);
      }
    } );
  }

  private scrollToActiveOption() {
    const activeItem = this.keyManager?.activeItem;
    if (activeItem) {
      activeItem.scrollIntoView();
    }
  }
}
