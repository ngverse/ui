import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  OnDestroy,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ListboxDirective } from '../listbox/listbox.directive';
import { ListboxState } from '../listbox/listbox.state';
import { PopoverComponent } from '../popover/popover.component';
import { ContextMenuTriggerDirective } from './context-menu-trigger.directive';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrl: './context-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    tabIndex: '0',
  },
  imports: [PopoverComponent, ListboxDirective],
  providers: [ListboxState],
})
export class ContextMenuComponent implements OnInit, OnDestroy {
  trigger = input.required<ContextMenuTriggerDirective>();

  popover = viewChild.required(PopoverComponent);

  isOpen = signal(false);
  clientX = signal<number>(0);
  clientY = signal<number>(0);
  listbox = viewChild.required(ListboxDirective);
  listsboxState = inject(ListboxState);
  itemsSub = new Subscription();

  constructor() {
    effect(() => {
      const isOpen = this.isOpen();
      this.clientX();
      this.clientY();
      if (isOpen) {
        this.popover().updateCoordinates();
      }
    });

    effect(() => {
      const items = this.listsboxState.items();
      this.itemsSub.unsubscribe();
      this.itemsSub = new Subscription();
      for (const item of items) {
        this.itemsSub.add(
          item.activated.subscribe(() => {
            this.isOpen.set(false);
          })
        );
      }
    });
  }
  ngOnDestroy(): void {
    this.itemsSub.unsubscribe();
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

  opened() {
    this.listbox().focus(true);
  }
}
