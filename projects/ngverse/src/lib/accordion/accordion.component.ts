import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
} from '@angular/core';
import { AccordionItemComponent } from './accordion-item.component';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionComponent {
  multi = input<boolean>();

  openedAccordion = signal<AccordionItemComponent | undefined>(undefined);

  open(item: AccordionItemComponent) {
    if (!this.multi()) {
      this.openedAccordion()?.isOpen.set(false);
      this.openedAccordion.set(item);
    }
    item.isOpen.set(true);
  }

  close(item: AccordionItemComponent) {
    item.isOpen.set(false);
    if (!this.multi() && this.openedAccordion() === item) {
      this.openedAccordion.set(undefined);
    }
  }
}
