import {
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  effect,
  ElementRef,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { ListboxDirective } from '@ng-verse/listbox/listbox.directive';
import { ListboxState } from '@ng-verse/listbox/listbox.state';
import { PopoverOriginDirective } from '@ng-verse/popover/popover-origin.directive';
import { PopoverComponent } from '@ng-verse/popover/popover.component';
import { MultiSelectIconComponent } from './multi-select-icon.component';
import { MultiSelectItemComponent } from './multi-select-item/multi-select-item.component';
import { MultiSelectState } from './multi-select.state';

type OnTouchedFunction = (() => void) | undefined;

type OnChangeFunction = ((_: unknown) => void) | undefined;

type CompareWith = (o1: unknown, o2: unknown) => boolean;

@Component({
  selector: 'app-multi-select',
  imports: [
    ReactiveFormsModule,
    MultiSelectIconComponent,
    ReactiveFormsModule,
    PopoverComponent,
    PopoverOriginDirective,
    ListboxDirective,
  ],
  templateUrl: './multi-select.component.html',
  styleUrl: './multi-select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: MultiSelectComponent,
    },
    MultiSelectState,
    ListboxState,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiSelectComponent implements ControlValueAccessor {
  isOpen = signal(false);

  state = inject(MultiSelectState);

  optionLabel = input<string>();
  optionValue = input<string>();

  placeholder = input.required<string>();

  private _registerOnChange: OnChangeFunction;
  private _onTouched: OnTouchedFunction;
  listbox = viewChild.required(ListboxDirective);

  options = contentChildren(MultiSelectItemComponent, { descendants: true });

  selectButton = viewChild('selectButton', {
    read: ElementRef<HTMLElement>,
  });

  value = signal<unknown>(undefined);

  compareWith = input<CompareWith>((o1: unknown, o2: unknown) => o1 === o2);

  toggle() {
    this.isOpen.update((isOpen) => !isOpen);
  }

  constructor() {
    effect(() => {
      const options = this.options();
      this.state.options.set(options);
      if (!options) {
        return;
      }
      this.listenOnOptionChange(options);
    });
  }

  listenOnOptionChange(options: readonly MultiSelectItemComponent[]) {
    for (const option of options) {
      option.activated.subscribe(() => {
        this.state.toggleValue(option.value());
        if (this._registerOnChange) {
          this._registerOnChange(this.state.values());
        }
      });
    }
  }

  close() {
    this.isOpen.set(false);
  }

  open() {
    this.isOpen.set(true);
  }

  panelOpened() {
    if (this._onTouched) {
      this._onTouched();
    }
    this.listbox().focus();
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
}
