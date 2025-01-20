import { Highlightable } from '@angular/cdk/a11y';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  inject,
  output,
  signal,
} from '@angular/core';
import { ContextMenuComponent } from '../context-menu.component';

@Component({
  selector: 'app-context-menu-item',
  imports: [],
  templateUrl: './context-menu-item.component.html',
  styleUrl: './context-menu-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'menuitem',
    '[class.is-active]': 'isActive()',
    '(click)': 'onClick()',
  },
})
export class ContextMenuItemComponent implements Highlightable {
  selected = output();
  isActive = signal(false);
  host = inject<ElementRef<HTMLElement>>(ElementRef<HTMLElement>);

  contextMenu = inject(forwardRef(() => ContextMenuComponent));

  onClick() {
    this.selected.emit();
    this.contextMenu.isOpen.set(false);
  }

  setActiveStyles(): void {
    this.isActive.set(true);
  }
  setInactiveStyles(): void {
    this.isActive.set(false);
  }
}
