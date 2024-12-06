import { Component, output, signal } from '@angular/core';
import { COLLAPSE_ON_LEAVE, EXPAND_ON_ENTER_ANIMATION } from './animations';
import { ExpandIconComponent } from './expand-icon.component';

@Component({
  selector: 'app-accordion-item',
  imports: [ExpandIconComponent],
  templateUrl: './accordion-item.component.html',
  styleUrl: './accordion-item.component.scss',
  animations: [EXPAND_ON_ENTER_ANIMATION, COLLAPSE_ON_LEAVE],
})
export class AccordionItemComponent {
  opened = output();
  closed = output();
  isOpen = signal(false);

  toggle() {
    const newIsOpen = !this.isOpen();
    if (newIsOpen) {
      this.open();
    } else {
      this.close();
    }
  }

  open() {
    this.isOpen.set(true);
    this.opened.emit();
  }

  close() {
    this.isOpen.set(false);
    this.closed.emit();
  }
}
