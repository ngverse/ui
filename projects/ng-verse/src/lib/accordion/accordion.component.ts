import {
  Component,
  contentChildren,
  effect,
  input,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AccordionItemComponent } from './accordion-item.component';

@Component({
  selector: 'app-accordion',
  imports: [],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss',
})
export class AccordionComponent implements OnDestroy {
  accordionItems = contentChildren(AccordionItemComponent);
  multi = input(false);
  sub: Subscription | undefined;

  constructor() {
    effect(() => {
      if (this.multi()) {
        return;
      }
      this.sub?.unsubscribe();

      this.sub = new Subscription();
      const accordions = this.accordionItems();
      let openedAccordion: AccordionItemComponent | undefined;

      for (const item of accordions) {
        this.sub.add(
          item.opened.subscribe(() => {
            if (openedAccordion === item) {
              return;
            }
            if (openedAccordion) {
              openedAccordion.close();
            }
            openedAccordion = item;
          })
        );
      }
    });
  }
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
