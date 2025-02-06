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
import { ShowCaseDarkModeComponent } from '../../examples/dark-mode/show-case-dark-mode/show-case-dark-mode.component';
import {
  Prerequisite,
  PrerequisitesComponent,
} from '../../blueprint/prerequisites/prerequisites.component';
import { RouterLink } from '@angular/router';

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
      },
      {
        name: 'DarkModeService',
        type: 'service',
        description: 'service that stores and control dark mode state',
        properties: [
          {
            name: 'darkMode',
            returnType: 'Signal<boolean>',
            description: 'stores current dark mode state',
            propType: 'get',
          },
        ],
        methods: [
          {
            name: 'setDarkMode',
            description: 'sets dark mode state',
            returnType: 'void',
          },
        ],
      },
    ],
  };
}
