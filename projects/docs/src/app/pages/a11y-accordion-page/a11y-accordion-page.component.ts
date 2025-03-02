import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ShowCaseComponent } from '../../blueprint/show-case/show-case.component';
import { ApiSectionComponent } from '../../core/kit-page/api-section/api-section.component';
import { KitPageComponent } from '../../core/kit-page/kit-page.component';
import { ApiSection } from '../../core/kit-page/kit-page.types';
import { OverviewSectionHeaderComponent } from '../../core/kit-page/overview-section/overview-section-header/overview-section-header.component';
import { OverviewSectionComponent } from '../../core/kit-page/overview-section/overview-section.component';
import { ShowCaseA11yAccordionComponent } from '../../examples/a11y-accordion/show-case-a11y-accordion/show-case-a11y-accordion.component';

@Component({
  selector: 'doc-a11y-accordion-page',
  imports: [
    KitPageComponent,
    ApiSectionComponent,
    OverviewSectionComponent,
    OverviewSectionHeaderComponent,
    ShowCaseA11yAccordionComponent,
    ShowCaseComponent,
  ],
  templateUrl: './a11y-accordion-page.component.html',
  styleUrl: './a11y-accordion-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class A11yAccordionPageComponent {
  api: ApiSection = {
    directives: [
      {
        name: 'A11yAccordionGroupDirective',
        selector: '[A1yyAccordion]',
        description: 'the root directive for a11y accordion group',
      },
      {
        name: 'A11yAccordionDirective',
        selector: '[ktA11yAccordion]',
        description: 'the root directive for a11y accordion',
      },
      {
        name: 'A11yAccordionHeaderDirective',
        selector: '[ktA11yAccordionHeader]',
        description:
          'the header of accordion header, it serves as a label for accordion',
        inputs: [
          {
            name: 'a11yAriaLevel',
            type: 'string',
            description:
              'the level of the header, default is 3, the values should be from 1...6',
          },
        ],
      },
      {
        name: 'A11yAccordionTitleDirective',
        selector: 'button[ktA11yAccordionTitle]',
        description:
          'the toggle button of the accordion, it must be inside accordion header',
        inputs: [
          {
            name: 'a11yIsExpanded',
            type: 'boolean',
            description:
              'adds proper aria attribute, when the accordion is expanded',
            required: true,
          },
        ],
      },
      {
        name: 'A11yAccordionPanelDirective',
        selector: '[ktA11yAccordionPanel]',
        description: 'the content of the accordion',
      },
    ],
  };
}
