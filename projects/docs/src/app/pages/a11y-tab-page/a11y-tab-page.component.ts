import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ShowCaseComponent } from '../../blueprint/show-case/show-case.component';
import { ApiSectionComponent } from '../../core/kit-page/api-section/api-section.component';
import { KitPageComponent } from '../../core/kit-page/kit-page.component';
import { ApiSection } from '../../core/kit-page/kit-page.types';
import { OverviewSectionHeaderComponent } from '../../core/kit-page/overview-section/overview-section-header/overview-section-header.component';
import { OverviewSectionComponent } from '../../core/kit-page/overview-section/overview-section.component';
import { ShowCaseA11yTabComponent } from '../../examples/a11y-tab/show-case-a11y-tab/show-case-a11y-tab.component';

@Component({
  selector: 'doc-a11y-tab-page',
  imports: [
    KitPageComponent,
    ShowCaseComponent,
    ApiSectionComponent,
    OverviewSectionHeaderComponent,
    OverviewSectionComponent,
    ShowCaseA11yTabComponent,
  ],
  templateUrl: './a11y-tab-page.component.html',
  styleUrl: './a11y-tab-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class A11yTabPageComponent {
  api: ApiSection = {
    directives: [
      {
        name: 'A11yTabGroupDirective',
        selector: '[ktA11yTabGroup]',
        description: 'the root directive for a11y tab group',
      },
      {
        name: 'A11yTabListDirective',
        selector: '[ktA11yTabList]',
        description: 'the container directive for tabs',
      },
      {
        name: 'A11yTabDirective',
        selector: '[ktA11yTab]',
        description:
          'the directive for a11y tab. The tab directive is the tab button not including the content (via ARIA specification) ',
        inputs: [
          {
            name: 'a11yIsSelected',
            type: 'boolean',
            default: 'false',
            description: 'whether the tab is selected or not',
          },
        ],
      },
      {
        name: 'A11yTabPanelDirective',
        selector: '[ktA11yTabPanel]',
        description: 'the directive for tab content',
      },
    ],
    services: [
      {
        name: 'A11yTabStack',
        description: 'the service is used to register tab components',
      },
    ],
  };
}
