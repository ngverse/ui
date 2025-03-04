import { _IdGenerator } from '@angular/cdk/a11y';
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

@Component({
  selector: 'app-accordion-item',
  imports: [ExpandIconComponent],
  templateUrl: './accordion-item.component.html',
  styleUrl: './accordion-item.component.css',
  animations: [EXPAND_ON_ENTER_ANIMATION, COLLAPSE_ON_LEAVE],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block mb-3 pb-3 border-b border-divider',
  },
})
export class AccordionItemComponent {
  disabled = input<boolean>();
  label = input<string>();
  accordion = inject<AccordionComponent>(forwardRef(() => AccordionComponent));
  accordionBodyId = inject(_IdGenerator).getId('accordion-item-body-');
  accordionTriggerId = inject(_IdGenerator).getId('accordion-item-trigger-');

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
