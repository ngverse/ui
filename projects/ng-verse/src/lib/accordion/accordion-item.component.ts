import { Component, input, output, signal } from '@angular/core';
import { ExpandIconComponent } from './expand-icon.component';
import { COLLAPSE_ON_LEAVE, EXPAND_ON_ENTER_ANIMATION } from './accordion-animations';

let accordionId = 0;
let accordionContentId = 0;

function genId() {
  return `accordion-item-${accordionId++}`;
}

function genAccordionContentId() {
  return `accordion-item-content-${accordionContentId++}`;
}

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
  disabled = input<boolean>();

  id = input(genId());
  accordionContentId = genAccordionContentId();

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
