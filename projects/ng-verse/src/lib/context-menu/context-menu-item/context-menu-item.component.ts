import { Highlightable } from '@angular/cdk/a11y';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  Input,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-context-menu-item',
  imports: [],
  templateUrl: './context-menu-item.component.html',
  styleUrl: './context-menu-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'menuitem',
    '[class.active]': 'itemActive()',
  },
})
export class ContextMenuItemComponent implements Highlightable {
  host = inject<ElementRef<HTMLElement>>(ElementRef<HTMLElement>);

  itemActive = signal(false);

  @Input()
  disabled?: boolean | undefined;

  setActiveStyles(): void {
    this.itemActive.set(true);
  }
  setInactiveStyles(): void {
    this.itemActive.set(false);
  }
  getLabel?(): string {
    return this.host.nativeElement.textContent as string;
  }
}
