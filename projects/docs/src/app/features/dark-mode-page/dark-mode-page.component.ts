import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ApiInfo,
  ApiInfoComponent,
} from '../../blueprint/api-info/api-info.component';
import { BlueprintPageComponent } from '../../blueprint/blueprint-page/blueprint-page.component';
import { CommandInstallationComponent } from '../../blueprint/command-installation/command-installation.component';
import {
  Prerequisite,
  PrerequisitesComponent,
} from '../../blueprint/prerequisites/prerequisites.component';
import { ShowCaseComponent } from '../../blueprint/show-case/show-case.component';
import {
  SourceTreeBuilder,
  SourceTreeFolder,
} from '../../blueprint/source-tree/source-tree-builder';
import { SourceTreeComponent } from '../../blueprint/source-tree/source-tree.component';
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
    PrerequisitesComponent,
    RouterLink,
  ],
  templateUrl: './dark-mode-page.component.html',
  styleUrl: './dark-mode-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DarkModePageComponent {
  sourceTreeBuilder = inject(SourceTreeBuilder);

  preps: Prerequisite[] = [{ name: 'button' }, { name: 'local-storage' }];

  sourceTree: SourceTreeFolder[] = [
    {
      name: 'dark-mode',
      files: [
        ...this.sourceTreeBuilder.fullComponent(
          'dark-mode-toggle',
          `${ROOT}/dark-mode-toggle`
        ),
        this.sourceTreeBuilder.component(
          'dark-mode-icon',
          `${ROOT}/dark-mode-toggle`
        ),
        this.sourceTreeBuilder.component(
          'light-mode-icon',
          `${ROOT}/dark-mode-toggle`
        ),
      ],
      hideName: true,
    },
  ];

  apiInfo: ApiInfo = {
    entities: [
      {
        name: 'DarkModeToggleComponent',
        type: 'component',
        selector: 'app-dark-mode-toggle',
        description: 'button that toggles dark mode',
      },
      {
        name: 'DarkModeService',
        type: 'service',
        description: 'service that stores and control dark mode state',
        properties: [
          {
            name: 'isEnabled',
            returnType: 'Signal<boolean>',
            description: 'indicates if dark mode is enabled',
            propType: 'get',
          },
        ],
        methods: [
          {
            name: 'toggle',
            description: 'toggles dark mode',
            returnType: 'void',
          },
          {
            name: 'enable',
            description: 'enables dark mode',
            returnType: 'void',
          },
          {
            name: 'disable',
            description: 'disables dark mode',
            returnType: 'void',
          },
        ],
      },
    ],
  };
}
