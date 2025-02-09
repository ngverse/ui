import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ApiDescriptionComponent } from '../../blueprint/api-info/api-description/api-description.component';
import {
  ApiInfo,
  ApiInfoComponent,
} from '../../blueprint/api-info/api-info.component';
import { EMPTY_API_INPUT_DEFAULT_VALUE } from '../../blueprint/api-info/api-inputs/api-inputs.component';
import { BlueprintPageComponent } from '../../blueprint/blueprint-page/blueprint-page.component';
import { CommandInstallationComponent } from '../../blueprint/command-installation/command-installation.component';
import { ShowCaseComponent } from '../../blueprint/show-case/show-case.component';
import { SourceTreeBuilder } from '../../blueprint/source-tree/source-tree-builder';
import { SourceTreeComponent } from '../../blueprint/source-tree/source-tree.component';
import { ShowCaseContextMenuComponent } from '../../examples/context-menu/show-case-context-menu/show-case-context-menu.component';

@Component({
  selector: 'doc-context-menu-page',
  imports: [
    BlueprintPageComponent,
    ShowCaseComponent,
    ShowCaseContextMenuComponent,
    CommandInstallationComponent,
    SourceTreeComponent,
    ApiInfoComponent,
    ApiDescriptionComponent,
  ],
  templateUrl: './context-menu-page.component.html',
  styleUrl: './context-menu-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContextMenuPageComponent {
  sourceTreeBuilder = inject(SourceTreeBuilder);

  apiInfo: ApiInfo = {
    stylesInGlobal: true,
    entities: [
      {
        name: 'ContextMenuTriggerDirective',
        type: 'directive',
        selector: '[appContextMenuTrigger]',
        description:
          'This directive should be applied to the element that will open the context menu.',
        inputs: [
          {
            name: 'appContextMenuTrigger',
            type: 'ng-template',
            default: EMPTY_API_INPUT_DEFAULT_VALUE,
            description: 'The template to use for the context menu.',
          },
        ],
      },
      {
        name: 'ContextMenuDirective',
        type: 'directive',
        selector: '[appContextMenu]',
      },
      {
        name: 'ContextMenuItemDirective',
        type: 'directive',
        selector: '[appContextMenuItem]',
        inputs: [
          {
            name: 'disabled',
            type: 'boolean',
            default: 'false',
            description: 'Disables the menu item',
          },
        ],
      },
    ],
  };
}
