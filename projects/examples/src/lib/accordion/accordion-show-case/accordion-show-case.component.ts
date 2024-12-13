import { Component } from '@angular/core';
import { AccordionComponent } from '../../../../../ng-verse/src/lib/accordion/accordion.component';
import { AccordionItemComponent } from '../../../../../ng-verse/src/lib/accordion/accordion-item/accordion-item.component';
import { AccordionHeaderComponent } from '../../../../../ng-verse/src/lib/accordion/accordion-item/accordion-header.component';
import { AccordionBodyComponent } from '@ng-verse/accordion/accordion-item/accordion-body.component';

@Component({
  selector: 'exp-accordion-show-case',
  imports: [
    AccordionComponent,
    AccordionItemComponent,
    AccordionHeaderComponent,
    AccordionBodyComponent,
  ],
  templateUrl: './accordion-show-case.component.html',
  styleUrl: './accordion-show-case.component.scss',
})
export class AccordionShowCaseComponent {
  items = [
    {
      title: 'Frequently Asked Questions',
      description:
        'Find answers to the most commonly asked questions about our product and services.',
    },
    {
      title: 'Key Features and Benefits',
      description:
        'Discover the unique features that set our product apart and how they can benefit you.',
    },
    {
      title: 'How to Get Started',
      description:
        'A step-by-step guide on setting up your account and making the most of our platform.',
    },
    {
      title: 'Troubleshooting Tips',
      description:
        'Common issues and quick solutions to help you get back on track without a hitch.',
    },
    {
      title: 'Product Specifications',
      description:
        'Detailed technical specifications of our product, including dimensions, materials, and performance capabilities.',
    },
  ];
}
