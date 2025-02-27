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
    classes: [
      {
        name: 'A11yAccordion',
        description: 'this is acc',
        fields: [
          {
            name: 'color',
            type: 'primary | secondary | danger | success | none',
            default: 'primary',
            description: 'this is acc',
          },
        ],
        methods: [
          {
            name: 'open',
            description: 'open',
            returnType: 'void',
            params: [
              {
                name: 'index',
                type: 'number',
                description: 'index',
              },
            ],
          },
        ],
      },
    ],
    components: [
      {
        name: 'A1yyAccordion',
        selector: '[A1yyAccordion]',
        description: 'this is acc',
        methods: [
          {
            name: 'open',
            description: 'open',
            returnType: 'void',
            params: [
              {
                name: 'index',
                type: 'number',
                description: 'index',
              },
            ],
          },
        ],
        inputs: [
          {
            description:
              "Defines the <a href='https://www.google.com'>Google</a>  button's color type",
            type: 'primary | secondary | danger | success | none',
            name: 'color',
            default: 'primary',
            required: true,
          },
        ],
        outputs: [
          {
            name: 'pageChange',
            description:
              'Emits when the page has been changed with the new page number',
            type: 'number',
          },
        ],
      },
    ],
    directives: [
      {
        name: 'A1yyAccordion',
        selector: '[A1yyAccordion]',
        description: 'this is acc',
        inputs: [
          {
            description:
              "Defines the <a href='https://www.google.com'>Google</a>  button's color type",
            type: 'primary | secondary | danger | success | none',
            name: 'color',
            default: 'primary',
            required: true,
          },
        ],
        outputs: [
          {
            name: 'pageChange',
            description:
              'Emits when the page has been changed with the new page number',
            type: 'number',
          },
        ],
      },
    ],
    interfaces: [
      {
        name: 'MatDialogRef',
        description: 'DIALOG REF',
        fields: [
          {
            name: 'close',
            type: '() => void',
            description: 'close dialog',
          },
          {
            name: 'afterClosed',
            type: '() => Observable<void>',
            description: 'afterClosed',
          },
        ],
      },
    ],
  };
}
