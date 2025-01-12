import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
} from '@angular/core';
import { ListboxItemDirective } from '@ng-verse/listbox/listbox-item.directive';

@Component({
  selector: 'app-context-menu-item',
  imports: [],
  templateUrl: './context-menu-item.component.html',
  styleUrl: './context-menu-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'menuitem',
  },
  hostDirectives: [
    {
      directive: ListboxItemDirective,
      outputs: ['activated'],
    },
  ],
})
export class ContextMenuItemComponent {
  host = inject<ElementRef<HTMLElement>>(ElementRef<HTMLElement>);
}
