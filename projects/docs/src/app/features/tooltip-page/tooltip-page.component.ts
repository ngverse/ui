import { Component, inject } from '@angular/core';
import { ApiInfoComponent } from '../../blueprint/api-info/api-info.component';
import {
    ApiEntity,
    ApiInputsComponent,
    EMPTY_API_INPUT_DEFAULT_VALUE,
} from '../../blueprint/api-info/api-inputs/api-inputs.component';
import { BlueprintPageComponent } from '../../blueprint/blueprint-page/blueprint-page.component';
import { CommandInstallationComponent } from '../../blueprint/command-installation/command-installation.component';
import { ShowCaseComponent } from '../../blueprint/show-case/show-case.component';
import { SourceTreeBuilder } from '../../blueprint/source-tree/source-tree-builder';
import { SourceTreeComponent } from '../../blueprint/source-tree/source-tree.component';
import { ShowCaseTooltipComponent } from '../../examples/tooltip/show-case-tooltip/show-case-tooltip.component';

@Component({
  selector: 'doc-tooltip-page',
  imports: [
    BlueprintPageComponent,
    ShowCaseComponent,
    ShowCaseComponent,
    CommandInstallationComponent,
    ShowCaseTooltipComponent,
    SourceTreeComponent,
    ApiInfoComponent,
    ApiInputsComponent,
  ],
  templateUrl: './tooltip-page.component.html',
  styleUrl: './tooltip-page.component.scss',
})
export class TooltipPageComponent {
  sourceTreeBuilder = inject(SourceTreeBuilder);
  sourceTree = this.sourceTreeBuilder.sourceTree('tooltip', (root) => [
    this.sourceTreeBuilder.folder(
      root,
      root,
      () => [this.sourceTreeBuilder.directive('tooltip', root)],
      true
    ),
    this.sourceTreeBuilder.folder(
      'tooltip-container',
      `${root}/tooltip-container`,
      (root) => this.sourceTreeBuilder.fullComponent('tooltip-container', root),
      false
    ),
  ]);

  apiInputs: ApiEntity[] = [
    {
      name: 'toolip',
      inputs: [
        {
          name: 'message',
          type: 'string',
          description: 'text to display on tooltip',
          default: EMPTY_API_INPUT_DEFAULT_VALUE,
        },
        {
          name: 'tooltipPosition',
          type: 'top | right | bottom | left',
          description: 'tooltip position',
          default: 'top',
        },
        {
          name: 'tooltipEvent',
          type: 'hover | focus | both',
          description: 'defines when to display tooltip',
          default: 'both',
        },
        {
          name: 'tooltipDelay',
          type: 'number',
          description: 'A delay (in milliseconds) before the tooltip appears.',
          default: '0',
        },
        {
          name: 'tooltipContent',
          type: 'ng-template',
          description: 'The content template to be displayed inside the tooltip.',
          default: EMPTY_API_INPUT_DEFAULT_VALUE,
        },
      ],
    },
  ];
}
