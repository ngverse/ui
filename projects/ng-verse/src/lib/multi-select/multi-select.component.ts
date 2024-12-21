import { SelectionModel } from '@angular/cdk/collections';
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import {
  Component,
  computed,
  contentChildren,
  ElementRef,
  signal,
  viewChild,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MultiSelectIconComponent } from './multi-select-icon.component';
import { MultiSelectItemComponent } from './multi-select-item/multi-select-item.component';

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
})
export class MultiSelectComponent {
  isOpen = signal(false);
  selectionModel = new SelectionModel(true);

  options = contentChildren(MultiSelectItemComponent);

  triggerElement = viewChild('triggerElement', {
    read: ElementRef,
  });

  overlayWidth = computed(() => {
    const triggerElement = this.triggerElement() as
      | ElementRef<HTMLElement>
      | undefined;
    if (triggerElement) {
      return triggerElement.nativeElement.clientWidth;
    }
    return 0;
  });

  toggle() {
    this.isOpen.update((isOpen) => !isOpen);
  }

  close() {
    this.isOpen.set(false);
  }

  open() {
    this.isOpen.set(true);
  }
}
