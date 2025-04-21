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
import { MultiOptionComponent } from './multi-option.component';
import { MultiSelectLabelDirective } from './multi-select-label.directive';

type OnTouchedFunction = (() => void) | undefined;

export type OnChangeFunction = ((_: unknown) => void) | undefined;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CompareWith = (o1: any, o2: any) => boolean;

@Component({
  selector: 'app-multi-select',
  imports: [
    ReactiveFormsModule,
    PopoverOriginDirective,
    PopoverComponent,
    FontIconComponent,
    NgTemplateOutlet,
  ],
  templateUrl: './multi-select.component.html',
  styleUrl: './multi-select.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: MultiSelectComponent,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'combobox',
    class: 'inline-block group',
    '[attr.aria-expanded]': 'isOpen()',
  },
})
export class MultiSelectComponent<T>
  implements ControlValueAccessor, OnDestroy
{
  placeholder = input<string>();
  emptyText = input<string>();
  selectLabel = contentChild<MultiSelectLabelDirective>(
    MultiSelectLabelDirective
  );

  options = contentChildren<MultiOptionComponent<T>>(
    forwardRef(() => MultiOptionComponent),
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
  private _values = signal<T[]>([]);

  private _onTouched: OnTouchedFunction;
  private _registerOnChangeFn: OnChangeFunction;

  selectedOptions = computed(() => {
    const selectedOptions = this.options().filter((option) =>
      this._values().some((v) => this.compareWith()(v, option.value()))
    );
    return selectedOptions;
  });

  selectedOptionsLabel = computed(() => {
    return this.selectedOptions()
      ?.map((opt) => opt.content)
      .join(', ');
  });

  isSelected(value: unknown) {
    return this._values().some((v) => this.compareWith()(v, value));
  }

  writeValue(value: T[] | null | undefined): void {
    if (value === null || value === undefined) {
      this._values.set([]);
    } else {
      this._values.set(value);
    }
  }

  toggleValue(option: MultiOptionComponent<T>) {
    this.keyManager.setActiveItem(option);
    const isSelected = this.isSelected(option.value());

    if (isSelected) {
      this._values.update((values) =>
        values.filter((v) => !this.compareWith()(v, option.value()))
      );
    } else {
      this._values.update((values) => [...values, option.value()]);
    }

    this._registerOnChangeFn?.(this._values());
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
    const selectedOption = this.selectedOptions();

    if (selectedOption.length) {
      this.keyManager.setActiveItem(selectedOption[0]);
    }
  }
  panelClosed() {
    this._onTouched?.();
  }

  ngOnDestroy(): void {
    this.keyManager.destroy();
  }

  clear($event: Event) {
    this._values.set([]);
    this._registerOnChangeFn?.(this._values());
    $event.stopPropagation();
  }
}
