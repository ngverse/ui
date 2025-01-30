import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ApiInfo,
  ApiInfoComponent,
} from '../../blueprint/api-info/api-info.component';
import { EMPTY_API_INPUT_DEFAULT_VALUE } from '../../blueprint/api-info/api-inputs/api-inputs.component';
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
import { ShowCaseContextMenuComponent } from '../../examples/context-menu/show-case-context-menu/show-case-context-menu.component';
const ROOT = 'context-menu';

@Component({
  selector: 'doc-context-menu-page',
  imports: [
    BlueprintPageComponent,
    ShowCaseComponent,
    ShowCaseContextMenuComponent,
    CommandInstallationComponent,
    PrerequisitesComponent,
    RouterLink,
    SourceTreeComponent,
    ApiInfoComponent,
  ],
  templateUrl: './context-menu-page.component.html',
  styleUrl: './context-menu-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContextMenuPageComponent {
  sourceTreeBuilder = inject(SourceTreeBuilder);

  prerequisites: Prerequisite[] = [
    {
      name: 'popover',
    },
    {
      name: 'listbox',
    },
  ];

  sourceTree: SourceTreeFolder[] = [
    {
      name: ROOT,
      files: [
        ...this.sourceTreeBuilder.fullComponent(ROOT, ROOT),
        ...this.sourceTreeBuilder.fullComponent('context-menu-item', ROOT),
        ...this.sourceTreeBuilder.directive('context-menu-trigger', ROOT),
      ],
      hideName: true,
    },
  ];

  apiInfo: ApiInfo = {
    entities: [
      {
        name: 'ContextMenuComponent',
        type: 'component',
        selector: 'app-context-menu',
        inputs: [
          {
            name: 'trigger',
            type: 'ContextMenuTriggerDirective',
            description: 'Trigger element',
            default: EMPTY_API_INPUT_DEFAULT_VALUE,
          },
        ],
      },
      {
        name: 'ContextMenuTriggerDirective',
        type: 'directive',
        selector: '[appContextMenuTrigger]',
      },
      {
        name: 'ContextMenuItemComponent',
        type: 'component',
        selector: 'app-context-menu-item',
      },
    ],
  };
}
