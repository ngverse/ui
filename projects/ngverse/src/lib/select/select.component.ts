import {
  ChangeDetectionStrategy,
  Component,
  computed,
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

import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { PopoverOriginDirective } from '../popover/popover-origin.directive';
import { PopoverComponent } from '../popover/popover.component';
import { OptionComponent } from './option.component';
import { SelectIconComponent } from './select-icon.component';

type OnTouchedFunction = (() => void) | undefined;

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
    '[attr.aria-expanded]': 'isOpen()',
  },
})
export class SelectComponent implements ControlValueAccessor, OnDestroy {
  multiple = input(false);
  placeholder = input<string>();
  options = contentChildren<OptionComponent>(
    forwardRef(() => OptionComponent),
    { descendants: true }
  );
  private keyManager = new ActiveDescendantKeyManager(
    this.options,
    inject(Injector)
  ).withTypeAhead();

  selectOption = viewChild<ElementRef<HTMLElement>>('selectOption');

  compareWith = input<CompareWith, CompareWith>(
    (o1: unknown, o2: unknown) => o1 === o2,
    {
      transform: (value) => {
        this._selectionModel.compareWith = value;
        this._selectionModel.setSelection(this._selectionModel.selected);
        return value;
      },
    }
  );
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

  private _selectionModel = new SelectionModel(true);
  private _onTouched: OnTouchedFunction;
  private _registerOnChangeFn: OnChangeFunction;

  values = toSignal(
    this._selectionModel.changed.pipe(map(() => this._selectionModel.selected))
  );

  selectedOptions = computed(() => {
    const valueOptions = this.options().filter((option) =>
      this.isSelected(option.value())
    );
    return valueOptions;
  });

  selectedOptionsLabel = computed(() => {
    const selectedOptions = this.selectedOptions();
    if (selectedOptions?.length) {
      return selectedOptions.map((opt) => opt.content).join(', ');
    }
    return;
  });

  isSelected(value: unknown) {
    this.values();
    return this._selectionModel.isSelected(value);
  }

  writeValue(values: unknown): void {
    if (values === null || values === undefined || values === '') {
      this._selectionModel.clear();
      return;
    }
    if (this.multiple()) {
      this._selectionModel.setSelection(...(values as unknown[]));
    } else {
      this._selectionModel.setSelection(values);
    }
  }

  toggleValue(option: OptionComponent) {
    this.keyManager.setActiveItem(option);
    const value = option.value();
    if (!this.multiple()) {
      this._selectionModel.clear(false);
    }
    this._selectionModel.toggle(value);
    const flattenedValues = this.multiple()
      ? this._selectionModel.selected
      : this._selectionModel.selected[0];

    this._registerOnChangeFn?.(flattenedValues);

    if (!this.multiple()) {
      this.isOpen.set(false);
    }
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
    this.selectOption()?.nativeElement.focus();
    this.keyManager.activeItem?.scrollIntoView();
    const selectedOptions = this.selectedOptions();

    if (selectedOptions.length) {
      this.keyManager.setActiveItem(selectedOptions[0]);
    }
  }
  panelClosed() {
    this._onTouched?.();
  }

  ngOnDestroy(): void {
    this.keyManager.destroy();
  }
}
