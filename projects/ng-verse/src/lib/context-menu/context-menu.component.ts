import {
  ChangeDetectionStrategy,
  Component,
  input,
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
export class ContextMenuComponent {
  trigger = input.required<ContextMenuTriggerDirective>();
  isOpen = signal(false);

  clientX = signal<number>(0);
  clientY = signal<number>(0);
  private listbox = viewChild.required(ListboxDirective);

  opened() {
    this.listbox().focus();
  }

  closed() {
    this.listbox().reset();
  }
}
