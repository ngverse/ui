import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiSectionComponent } from '../../core/kit-page/api-section/api-section.component';
import { KitPageComponent } from '../../core/kit-page/kit-page.component';
import { ApiSection } from '../../core/kit-page/kit-page.types';
import { OverviewSectionComponent } from '../../core/kit-page/overview-section/overview-section.component';

@Component({
  selector: 'doc-a11y-accordion-page',
  imports: [KitPageComponent, OverviewSectionComponent, ApiSectionComponent],
  templateUrl: './a11y-accordion-page.component.html',
  styleUrl: './a11y-accordion-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class A11yAccordionPageComponent {
  api: ApiSection = {
    directives: [
      {
        name: 'A1yyAccordion',
        selector: '[A1yyAccordion]',
        description: 'this is acc',
        inputs: [
          {
            description: "Defines the button's color type",
            type: 'primary | secondary | danger | success | none',
            name: 'color',
            default: 'primary',
            required: true,
          },
        ],
      },
    ],
  };
}
