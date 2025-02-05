import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  ApiInfo,
  ApiInfoComponent,
} from '../../blueprint/api-info/api-info.component';
import { BlueprintPageComponent } from '../../blueprint/blueprint-page/blueprint-page.component';
import { CommandInstallationComponent } from '../../blueprint/command-installation/command-installation.component';
import { ShowCaseComponent } from '../../blueprint/show-case/show-case.component';
import {
  SourceTreeBuilder,
  SourceTreeFolder,
} from '../../blueprint/source-tree/source-tree-builder';
import { SourceTreeComponent } from '../../blueprint/source-tree/source-tree.component';
import { EMPTY_API_INPUT_DEFAULT_VALUE } from '../../blueprint/api-info/api-inputs/api-inputs.component';
import { ShowCaseDarkModeComponent } from '../../examples/dark-mode/show-case-dark-mode/show-case-dark-mode.component';

const ROOT = 'dark-mode';

@Component({
  selector: 'doc-dark-mode-page',
  imports: [
    BlueprintPageComponent,
    ShowCaseDarkModeComponent,
    SourceTreeComponent,
    ApiInfoComponent,
    ShowCaseComponent,
    CommandInstallationComponent,
  ],
  templateUrl: './dark-mode-page.component.html',
  styleUrl: './dark-mode-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DarkModePageComponent {
  sourceTreeBuilder = inject(SourceTreeBuilder);

  sourceTree: SourceTreeFolder[] = [
    {
      name: 'dark-mode',
      files: [
        ...this.sourceTreeBuilder.fullComponent(
          'dark-mode-toggle',
          `${ROOT}/dark-mode-toggle`
        ),
      ],
      hideName: true,
    },
  ];

  apiInfo: ApiInfo = {
    ariaLink:
      'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/status_role',
    entities: [
      {
        name: 'BadgeComponent',
        type: 'component',
        selector: 'app-badge',
        inputs: [
          {
            name: 'value',
            type: 'number | string | null | undefined',
            description: 'text to display in badge',
            default: EMPTY_API_INPUT_DEFAULT_VALUE,
          },
          {
            name: 'hide',
            type: 'boolean',
            description: 'hides the badge content',
            default: 'false',
          },
          {
            name: 'useParent',
            type: 'boolean',
            description:
              "If true, the parent element's style is automatically set to relative. If false, you must explicitly set it to either relative or absolute.",
            default: 'true',
          },
        ],
      },
    ],
  };
}
