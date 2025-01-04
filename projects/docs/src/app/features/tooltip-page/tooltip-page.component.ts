import { Component, inject } from '@angular/core';
import {
  ApiInfo,
  ApiInfoComponent,
} from '../../blueprint/api-info/api-info.component';
import { EMPTY_API_INPUT_DEFAULT_VALUE } from '../../blueprint/api-info/api-inputs/api-inputs.component';
import { BlueprintPageComponent } from '../../blueprint/blueprint-page/blueprint-page.component';
import { CommandInstallationComponent } from '../../blueprint/command-installation/command-installation.component';
import { ShowCaseComponent } from '../../blueprint/show-case/show-case.component';
import {
  SourceTreeBuilder,
  SourceTreeFolder,
} from '../../blueprint/source-tree/source-tree-builder';
import { SourceTreeComponent } from '../../blueprint/source-tree/source-tree.component';
import { ShowCaseTooltipComponent } from '../../examples/tooltip/show-case-tooltip/show-case-tooltip.component';
const ROOT = 'tooltip';

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
  ],
  templateUrl: './tooltip-page.component.html',
  styleUrl: './tooltip-page.component.scss',
})
export class TooltipPageComponent {
  sourceTreeBuilder = inject(SourceTreeBuilder);
  sourceTree: SourceTreeFolder[] = [
    {
      name: ROOT,
      files: [this.sourceTreeBuilder.directive('tooltip', ROOT)],
      hideName: true,
    },
    {
      name: 'tooltip-container',
      files: this.sourceTreeBuilder.fullComponent(
        'tooltip-container',
        `${ROOT}/tooltip-container`
      ),
    },
  ];

  apiInfo: ApiInfo = {
    entities: [
      {
        name: 'TooltipComponent',
        type: 'directive',
        selector: '[appTooltip]',
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
            description:
              'A delay (in milliseconds) before the tooltip appears.',
            default: '0',
          },
          {
            name: 'tooltipContent',
            type: 'ng-template',
            description:
              'The content template to be displayed inside the tooltip.',
            default: EMPTY_API_INPUT_DEFAULT_VALUE,
          },
        ],
      },
    ],
  };
}
