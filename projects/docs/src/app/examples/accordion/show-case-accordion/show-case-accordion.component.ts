import { Component } from '@angular/core';
import { AccordionBodyComponent } from '@ng-verse/accordion/accordion-body.component';
import { AccordionHeaderComponent } from '@ng-verse/accordion/accordion-header.component';
import { AccordionItemComponent } from '@ng-verse/accordion/accordion-item.component';
import { AccordionComponent } from '@ng-verse/accordion/accordion.component';

@Component({
  selector: 'exp-show-case-accordion',
  imports: [
    AccordionComponent,
    AccordionItemComponent,
    AccordionHeaderComponent,
    AccordionBodyComponent,
  ],
  templateUrl: './show-case-accordion.component.html',
  styleUrl: './show-case-accordion.component.scss',
})
export class ShowCaseAccordionComponent {
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
