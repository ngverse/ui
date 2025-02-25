import { A11yAccordionHeaderDirective } from '@/kit/a11y-accordion/a11y-accordion-header.directive';
import { A11yAccordionPanelDirective } from '@/kit/a11y-accordion/a11y-accordion-panel.directive';
import { A11yAccordionTitleDirective } from '@/kit/a11y-accordion/a11y-accordion-title.directive';
import { A11yAccordionDirective } from '@/kit/a11y-accordion/a11y-accordion.directive';
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
  imports: [
    ExpandIconComponent,
    A11yAccordionDirective,
    A11yAccordionHeaderDirective,
    A11yAccordionPanelDirective,
    A11yAccordionTitleDirective,
  ],
  templateUrl: './accordion-item.component.html',
  styleUrl: './accordion-item.component.css',
  animations: [EXPAND_ON_ENTER_ANIMATION, COLLAPSE_ON_LEAVE],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionItemComponent {
  disabled = input<boolean>();
  label = input<string>();
  accordion = inject<AccordionComponent>(forwardRef(() => AccordionComponent));

  ariaLevel = input<string>('3');

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
