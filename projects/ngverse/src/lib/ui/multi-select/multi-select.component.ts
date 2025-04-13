import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
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
import { toSignal } from '@angular/core/rxjs-interop';
import { ControlValueAccessor } from '@angular/forms';
import { map } from 'rxjs';
import { SelectLabelDirective } from '../select/select-label.directive';
import { SelectPlaceholderDirective } from '../select/select-placeholder.directive';
import { MultiSelectOptionComponent } from './multi-select-option.component';

type OnTouchedFunction = (() => void) | undefined;

export type OnChangeFunction = ((_: unknown) => void) | undefined;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CompareWith = (o1: any, o2: any) => boolean;

@Component({
  selector: 'app-multi-select',
  imports: [],
  templateUrl: './multi-select.component.html',
  styleUrl: './multi-select.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiSelectComponent implements ControlValueAccessor, OnDestroy {
  placeholder = input<string>();
  emptyText = input<string>();

  options = contentChildren<MultiSelectOptionComponent>(
    forwardRef(() => MultiSelectOptionComponent),
    { descendants: true }
  );
  private keyManager = new ActiveDescendantKeyManager(
    this.options,
    inject(Injector)
  ).withTypeAhead();

  templateLabel = contentChild<SelectLabelDirective>(SelectLabelDirective);

  templatePlaceholder = contentChild<SelectPlaceholderDirective>(
    SelectPlaceholderDirective
  );

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
    this._selectionModel.setSelection(...(values as unknown[]));
  }

  toggleValue(option: MultiSelectOptionComponent) {
    this.keyManager.setActiveItem(option);
    const value = option.value();

    this._selectionModel.toggle(value);

    this._registerOnChangeFn?.(this._selectionModel.selected);
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
