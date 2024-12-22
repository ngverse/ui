import { SelectionModel } from '@angular/cdk/collections';
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import {
  afterRender,
  Component,
  computed,
  contentChildren, effect,
  ElementRef, inject, input,
  signal,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MultiSelectIconComponent } from './multi-select-icon.component';
import { MultiSelectItemComponent } from './multi-select-item/multi-select-item.component';
import { CompareWith, MultiSelectState, OnTouchedFunction } from '@ng-verse/multi-select/multi-select.state';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { OnChangeFunction } from '@ng-verse/radio-button/radio-button.state';

@Component({
  selector: 'app-multi-select',
  imports: [
    CdkConnectedOverlay,
    CdkOverlayOrigin,
    ReactiveFormsModule,
    MultiSelectIconComponent,
  ],
  templateUrl: './multi-select.component.html',
  styleUrl: './multi-select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: MultiSelectComponent,
    },
    MultiSelectState
  ]
})
export class MultiSelectComponent implements ControlValueAccessor {
  label = input.required<string>();

  isOpen = signal(false);
  overlayWidth = signal(0);


  selectedLabel = computed(() => {
    return this.options().filter((option) =>
      option.selected()).map((option) => option.innerText()).join(', ');
  });

  private readonly options = contentChildren(MultiSelectItemComponent);
  private readonly optionsContainer = viewChild<CdkConnectedOverlay>('optionsContainer');
  private readonly triggerElement = viewChild('triggerElement', {
    read: ElementRef,
  });
  private readonly multiSelectState = inject(MultiSelectState);

  constructor() {
    this.updateOverlayWidth();
    this.subscribeToSelectionChange();
  }

  writeValue(obj: unknown[] | unknown | null | undefined) {
    if (Array.isArray(obj)) {
      this.multiSelectState.setSelection(...obj);
    } else {
      this.multiSelectState.clear();
    }
  }

  registerOnChange(fn: OnChangeFunction): void {
    this.multiSelectState._onChange = fn;
  }

  registerOnTouched(fn: OnTouchedFunction): void {
    this.multiSelectState._onTouched = fn;
  }

  toggle() {
    this.isOpen.update((isOpen) => !isOpen);
  }

  close() {
    this.isOpen.set(false);
  }

  open() {
    this.isOpen.set(true);
  }

  private updateOverlayWidth(): void {
    afterRender({
      read: () => {
        this.overlayWidth.set(this.triggerElement()?.nativeElement.clientWidth);
      }
    } );
  }

  private subscribeToSelectionChange() {
    this.multiSelectState.changed
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        setTimeout(() => {
          this.updateOverlayPosition();
        }, 1);

      });
  }
  private updateOverlayPosition() {
    this.optionsContainer()?.overlayRef?.updatePosition();
  }
}
