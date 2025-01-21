import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import {
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  ElementRef,
  inject,
  Injector,
  input,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { PopoverAlphaComponent } from '../popover/popover-alpha/popover-alpha.component';
import { ContextMenuItemComponent } from './context-menu-item/context-menu-item.component';
import { ContextMenuTriggerDirective } from './context-menu-trigger.directive';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrl: './context-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    tabIndex: '0',
  },
  imports: [PopoverAlphaComponent],
})
export class ContextMenuComponent implements OnInit {
  trigger = input.required<ContextMenuTriggerDirective>();

  popover = viewChild.required(PopoverAlphaComponent);

  isOpen = signal(false);
  clientX = signal<number>(0);
  clientY = signal<number>(0);
  items = contentChildren(ContextMenuItemComponent, { descendants: true });
  keyManager = new ActiveDescendantKeyManager(this.items, inject(Injector));
  itemsList = viewChild.required<ElementRef<HTMLElement>>('itemsList');

  onKeydown($event: KeyboardEvent) {
    if ($event.key === 'Enter') {
      this.keyManager.activeItem?.selected.emit();
      this.isOpen.set(false);
    }
    this.keyManager.onKeydown($event);
  }

  opened() {
    this.itemsList().nativeElement.focus();
  }

  ngOnInit(): void {
    this.trigger().openTriggered.subscribe(($event) => {
      $event.stopPropagation();
      $event.preventDefault();
      this.clientX.set($event.clientX);
      this.clientY.set($event.clientY);
      const isOpen = this.isOpen();
      if (!isOpen) {
        this.isOpen.set(true);
      }
    });
  }
}
