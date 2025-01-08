import { Highlightable } from '@angular/cdk/a11y';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  Input,
  signal
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

  @HostListener("click")
  onClick(){
    console.log("CLICKED")
  }

  setActiveStyles(): void {
    console.log('ACTIVE');
    this.itemActive.set(true);
  }
  setInactiveStyles(): void {
    console.log('NOT ACTIVE');
    this.itemActive.set(false);
  }
  getLabel?(): string {
    return this.host.nativeElement.textContent as string;
  }
}
