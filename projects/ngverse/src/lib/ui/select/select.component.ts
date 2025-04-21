import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  contentChildren,
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
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

import { FontIconComponent } from '@/ui/font-icon/font-icon.component';
import { PopoverOriginDirective } from '@/ui/popover/popover-origin.directive';
import { PopoverComponent } from '@/ui/popover/popover.component';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { NgTemplateOutlet } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { OptionComponent } from './option.component';
import { SelectLabelDirective } from './select-label.directive';

type OnTouchedFunction = (() => void) | undefined;

export type OnChangeFunction = ((_: unknown) => void) | undefined;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CompareWith = (o1: any, o2: any) => boolean;

@Component({
  selector: 'app-select',
  imports: [
    ReactiveFormsModule,
    PopoverOriginDirective,
    PopoverComponent,
    FontIconComponent,
    NgTemplateOutlet,
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: SelectComponent,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'combobox',
    class: 'inline-block group',
    '[attr.aria-expanded]': 'isOpen()',
  },
})
export class SelectComponent<T> implements ControlValueAccessor, OnDestroy {
  placeholder = input<string>();
  emptyText = input<string>();
  showClear = input(false);
  selectLabel = contentChild<SelectLabelDirective>(SelectLabelDirective);

  options = contentChildren<OptionComponent<T>>(
    forwardRef(() => OptionComponent),
    { descendants: true }
  );
  private keyManager = new ActiveDescendantKeyManager(
    this.options,
    inject(Injector)
  ).withTypeAhead();

  optionsList = viewChild<ElementRef<HTMLElement>>('optionsList');

  compareWith = input<CompareWith>((o1: unknown, o2: unknown) => o1 === o2);
  isOpen = signal(false);
  disabled = signal(false);
  stretch = input(true);

  activeDescendantId = toSignal(
    this.keyManager.change.pipe(map(() => this.keyManager.activeItem?.id()))
  );

  onKeydown($event: KeyboardEvent) {
    if ($event.key === 'Enter' && this.keyManager.activeItem) {
      this.toggleValue(this.keyManager.activeItem);
    }
    this.keyManager.onKeydown($event);
  }
  private _value = signal<T | null | undefined>(null);

  private _onTouched: OnTouchedFunction;
  private _registerOnChangeFn: OnChangeFunction;

  selectedOption = computed(() => {
    const selectedOption = this.options().find((option) =>
      this.compareWith()(option.value(), this._value())
    );

    return selectedOption;
  });

  selectedOptionLabel = computed(() => {
    const selectedOption = this.selectedOption();
    return selectedOption?.getLabel();
  });

  isSelected(value: unknown) {
    return this.compareWith()(value, this._value());
  }

  writeValue(value: T | null | undefined): void {
    this._value.set(value);
  }

  toggleValue(option: OptionComponent<T>) {
    this.keyManager.setActiveItem(option);

    this._value.set(option.value() as T);

    this._registerOnChangeFn?.(this._value());
    this.isOpen.set(false);
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

  togglePanel() {
    this.isOpen.update((isOpen) => !isOpen);
  }

  panelOpened() {
    this.optionsList()?.nativeElement.focus();
    this.keyManager.activeItem?.scrollIntoView();
    const selectedOption = this.selectedOption();

    if (selectedOption) {
      this.keyManager.setActiveItem(selectedOption);
    }
  }
  panelClosed() {
    this._onTouched?.();
  }

  ngOnDestroy(): void {
    this.keyManager.destroy();
  }

  clear($event: Event) {
    this._value.set(null);
    this._registerOnChangeFn?.(this._value());
    $event.stopPropagation();
  }
}
