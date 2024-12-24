import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import {
  AfterContentInit,
  afterRender,
  Component,
  computed,
  contentChildren,
  ElementRef, inject, input,
  signal,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MultiSelectIconComponent } from './multi-select-icon.component';
import { MultiSelectItemComponent } from './multi-select-item/multi-select-item.component';
import { MultiSelectState, OnTouchedFunction } from '@ng-verse/multi-select/multi-select.state';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { OnChangeFunction } from '@ng-verse/radio-button/radio-button.state';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';

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
  ],
  host: {
    '(keydown)': 'onKeydown($event)'
  }
})
export class MultiSelectComponent implements ControlValueAccessor, AfterContentInit {
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
  private keyManager!: ActiveDescendantKeyManager<MultiSelectItemComponent>;

  constructor() {
    this.updateOverlayWidth();
    this.subscribeToSelectionChange();
  }

  ngAfterContentInit() {
    this.keyManager = new ActiveDescendantKeyManager(this.options())
      .withWrap();
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

  onKeydown(event: KeyboardEvent) {
    if (event.key !== 'Enter') {
      this.keyManager.onKeydown(event);
      this.scrollToActiveOption();
    } else if (this.keyManager.activeItem) {
      event.stopPropagation();
      event.preventDefault();
      this.multiSelectState.toggle(this.keyManager.activeItem);
    }
  }

  toggle() {
    this.isOpen.update((isOpen) => !isOpen);

    if (!this.multiSelectState.hasSelectedValues() && this.isOpen()) {
      this.keyManager.setActiveItem(0);
    }
  }

  close() {
    this.isOpen.set(false);
    this.keyManager.setActiveItem(-1);
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

  private scrollToActiveOption() {
    const activeItem = this.keyManager.activeItem;
    if (activeItem) {
      activeItem.scrollIntoView();
    }
  }
}
