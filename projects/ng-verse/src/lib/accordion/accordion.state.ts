import { Injectable, signal, WritableSignal } from '@angular/core';

export interface AccordionItemProxy {
  isOpen: WritableSignal<boolean>;
}

@Injectable()
export class AccordionState {
  openedAccordion = signal<AccordionItemProxy | undefined>(undefined);
  multi = signal<boolean | undefined>(undefined);

  open(item: AccordionItemProxy) {
    if (!this.multi()) {
      this.openedAccordion()?.isOpen.set(false);
      this.openedAccordion.set(item);
    }
    item.isOpen.set(true);
  }

  close(item: AccordionItemProxy) {
    item.isOpen.set(false);
    if (this.multi() && this.openedAccordion() === item) {
      this.openedAccordion.set(undefined);
    }
  }
}
