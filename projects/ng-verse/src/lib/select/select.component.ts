import {
  Component,
  contentChildren,
  effect,
  ElementRef,
  inject,
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
import { PopoverOriginDirective } from '@ng-verse/popover/popover-origin.directive';
import { PopoverComponent } from '@ng-verse/popover/popover.component';
import { OptionComponent } from './option/option.component';
import { SelectIconComponent } from './select-icon.component';
import { SelectState } from './select.state';

type OnTouchedFunction = (() => void) | undefined;

type OnChangeFunction = ((_: unknown) => void) | undefined;

type CompareWith = (o1: unknown, o2: unknown) => boolean;

@Component({
  selector: 'app-select',
  imports: [
    ReactiveFormsModule,
    SelectIconComponent,
    PopoverOriginDirective,
    PopoverComponent,
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: SelectComponent,
    },
    SelectState,
  ],
})
export class SelectComponent implements ControlValueAccessor, OnDestroy {
  isOpen = signal(false);

  stretch = input<boolean>(false);

  placeholder = input.required<string>();

  compareWith = input<CompareWith>((o1: unknown, o2: unknown) => o1 === o2);

  private _registerOnChange: OnChangeFunction;
  private _onTouched: OnTouchedFunction;

  selectState = inject(SelectState);

  options = contentChildren(OptionComponent, { descendants: true });

  keyManager: ActiveDescendantKeyManager<OptionComponent> | undefined;

  listbox = viewChild.required('listbox', {
    read: ElementRef<HTMLElement>,
  });

  selectButton = viewChild('selectButton', {
    read: ElementRef<HTMLElement>,
  });

  onKeydown($event: KeyboardEvent) {
    if ($event.key === 'Enter') {
      const activeOptin = this.keyManager?.activeItem;
      if (activeOptin) {
        activeOptin.clicked.emit();
      }
    }
    this.keyManager?.onKeydown($event);
  }

  writeValue(value: unknown): void {
    this.selectState.value.set(value);
  }
  registerOnChange(fn: OnChangeFunction): void {
    this._registerOnChange = fn;
  }

  registerOnTouched(fn: OnTouchedFunction): void {
    this._onTouched = fn;
  }

  constructor() {
    effect(() => {
      const options = this.options();
      this.selectState.options.set(options);
      if (!options) {
        return;
      }
      this.createKeyManager(options);
      this.listenOnOptionChange(options);
    });
  }

  createKeyManager(options: readonly OptionComponent[]) {
    this.keyManager?.destroy();
    this.keyManager = new ActiveDescendantKeyManager(options);
    this.keyManager.change.subscribe(() => {
      const activeOption = this.keyManager?.activeItem;
      if (activeOption) {
        this.scrollIntoOption(activeOption);
      }
    });
  }

  listenOnOptionChange(options: readonly OptionComponent[]) {
    for (const option of options) {
      option.clicked.subscribe(() => {
        this.selectState.value.set(option.value());
        if (this._registerOnChange) {
          this._registerOnChange(this.selectState.value());
        }
        this.isOpen.set(false);
      });
    }
  }

  setDisabledState?(isDisabled: boolean): void {
    this.selectState.disabled.set(isDisabled);
  }

  scrollIntoOption(option: OptionComponent) {
    option.host.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });
  }

  panelOpened() {
    this.listbox().nativeElement.focus();
    const value = this.selectState.value();
    if (value) {
      const valueOption = this.selectState.findOptionByValue(value);
      if (valueOption) {
        this.keyManager?.setActiveItem(valueOption);
        this.scrollIntoOption(valueOption);
      }
    } else {
      this.keyManager?.setFirstItemActive();
    }

    this.isOpen.set(true);
  }

  toggle() {
    this.isOpen.update((isOpen) => !isOpen);
  }

  panelClosed() {
    if (this._onTouched) {
      this._onTouched();
    }
  }

  ngOnDestroy(): void {
    this.keyManager?.destroy();
  }
}
