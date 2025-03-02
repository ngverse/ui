import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ChevronDownIcon } from '@ngverse/icons-lu';
import {
  A11yAccordionDirective,
  A11yAccordionGroupDirective,
  A11yAccordionHeaderDirective,
  A11yAccordionPanelDirective,
  A11yAccordionTitleDirective,
} from '@ngverse/kit';

@Component({
  selector: 'doc-show-case-a11y-accordion',
  imports: [
    A11yAccordionGroupDirective,
    A11yAccordionDirective,
    A11yAccordionHeaderDirective,
    A11yAccordionTitleDirective,
    A11yAccordionPanelDirective,
    ChevronDownIcon,
  ],
  templateUrl: './show-case-a11y-accordion.component.html',
  styleUrl: './show-case-a11y-accordion.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowCaseA11yAccordionComponent {
  expansions = signal([false, false]);

  accordions = [
    {
      label: 'Section 1',
      body: 'Body 1',
    },
    {
      label: 'Section 2',
      body: 'Body 2',
    },
  ];

  toggle(index: number) {
    this.expansions.update((expansions) => {
      expansions[index] = !expansions[index];
      return expansions;
    });
  }
}
