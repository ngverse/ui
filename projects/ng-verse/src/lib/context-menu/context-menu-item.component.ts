import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  inject,
  input,
} from '@angular/core';
import { ListboxItemDirective } from '../listbox/listbox-item.directive';
import { ContextMenuComponent } from './context-menu.component';

@Component({
  selector: 'app-context-menu-item',
  imports: [ListboxItemDirective],
  templateUrl: './context-menu-item.component.html',
  styleUrl: './context-menu-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'menuitem',
    '(click)': 'onClick()',
  },
})
export class ContextMenuItemComponent {
  menu = inject<ContextMenuComponent>(forwardRef(() => ContextMenuComponent));

  disabled = input(false);

  onClick() {
    this.menu.isOpen.set(false);
  }
}
