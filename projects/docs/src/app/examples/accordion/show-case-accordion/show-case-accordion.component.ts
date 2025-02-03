import { Component } from '@angular/core';
import { AccordionBodyComponent } from '@ng-verse/accordion/accordion-body.component';
import { AccordionItemComponent } from '@ng-verse/accordion/accordion-item.component';
import { AccordionComponent } from '@ng-verse/accordion/accordion.component';

@Component({
  selector: 'doc-show-case-accordion',
  imports: [AccordionComponent, AccordionItemComponent, AccordionBodyComponent],
  templateUrl: './show-case-accordion.component.html',
  styleUrl: './show-case-accordion.component.scss',
})
export class ShowCaseAccordionComponent {
  items = [
    {
      title: 'How to add ng-verse to a project?',
      description: 'run: ng add ng-verse',
    },
    {
      title: 'How to add an element?',
      description: 'run: ng g ng-verse:element [name]',
    },
    {
      title: 'How to customize an element?',
      description: 'The source code is yours. do whatever you want to',
    },
    {
      title: 'How to style an element',
      description:
        'Elements come with default styles for a polished look right out of the box, but you can easily customize them within their SCSS files to suit your needs.',
    },
    {
      title: 'Why it is called element and not component?',
      description:
        'The term element is used because ng-verse is not limited to components.  It includes directives, pipes, functions, and more, making element a broader and more inclusive term.',
    },
  ];
}
