import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  inject,
  input,
  signal,
} from '@angular/core';
import {
  COLLAPSE_ON_LEAVE,
  EXPAND_ON_ENTER_ANIMATION,
} from './accordion-animations';
import { AccordionComponent } from './accordion.component';
import { ExpandIconComponent } from './expand-icon.component';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionItemComponent {
  disabled = input<boolean>();
  label = input<string>();
  accordion = inject(forwardRef(() => AccordionComponent));

  expanded = input<boolean, boolean>(false, {
    transform: (value) => {
      if (value) {
        this.accordion.open(this);
      } else {
        this.accordion.close(this);
      }
      return value;
    },
  });

  id = input(genId());
  accordionContentId = genAccordionContentId();

  isOpen = signal(false);

  toggle() {
    const isOpen = this.isOpen();
    if (isOpen) {
      this.accordion.close(this);
    } else {
      this.accordion.open(this);
    }
  }
}
