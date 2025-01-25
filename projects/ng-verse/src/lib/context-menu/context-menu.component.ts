import {
  ChangeDetectionStrategy,
  Component,
  input,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { ListboxRegistry } from '../listbox/listbox-registry';
import { ListboxDirective } from '../listbox/listbox.directive';
import { PopoverComponent } from '../popover/popover.component';
import { ContextMenuTriggerDirective } from './context-menu-trigger.directive';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrl: './context-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PopoverComponent, ListboxDirective],
  providers: [ListboxRegistry],
})
export class ContextMenuComponent implements OnInit {
  trigger = input.required<ContextMenuTriggerDirective>();

  popover = viewChild.required(PopoverComponent);

  isOpen = signal(false);
  clientX = signal<number>(0);
  clientY = signal<number>(0);
  itemsList = viewChild.required(ListboxDirective);

  opened() {
    this.itemsList().focus();
  }

  ngOnInit(): void {
    this.trigger().triggered.subscribe(($event) => {
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
  closed() {
    this.itemsList().reset();
  }
}
