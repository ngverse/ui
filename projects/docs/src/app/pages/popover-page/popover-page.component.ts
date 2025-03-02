import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  ApiInfo,
  ApiInfoComponent,
} from '../../blueprint/api-info/api-info.component';
import { EMPTY_API_INPUT_DEFAULT_VALUE } from '../../blueprint/api-info/api-inputs/api-inputs.component';
import { BlueprintPageComponent } from '../../blueprint/blueprint-page/blueprint-page.component';
import { ShowCaseComponent } from '../../blueprint/show-case/show-case.component';
import {
  SourceTreeBuilder,
  SourceTreeFolder,
} from '../../blueprint/source-tree/source-tree-builder';
import { SourceTreeComponent } from '../../blueprint/source-tree/source-tree.component';
import { ShowCasePopoverComponent } from '../../examples/popover/show-case-popover/show-case-popover.component';
const ROOT = 'popover';
@Component({
  selector: 'doc-popover-page',
  imports: [
    ShowCasePopoverComponent,
    BlueprintPageComponent,
    ShowCaseComponent,
    SourceTreeComponent,
    ApiInfoComponent,
  ],
  templateUrl: './popover-page.component.html',
  styleUrl: './popover-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopoverPageComponent {
  sourceTreeBuilder = inject(SourceTreeBuilder);

  apiInfo: ApiInfo = {
    entities: [
      {
        name: 'PopoverComponent',
        type: 'component',
        selector: 'kt-popover',
        inputs: [
          {
            name: 'isOpen',
            type: 'model<boolean>()',
            description: 'Determines whether the popover is open or closed',
            default: 'false',
          },
          {
            name: 'origin',
            type: 'PopoverOriginDirective',
            description: 'The element to which the popover should be attached',
            default: EMPTY_API_INPUT_DEFAULT_VALUE,
          },
          {
            name: 'offsetX',
            type: 'number',
            description:
              'The horizontal offset of the popover relative to the origin',
            default: '0',
          },
          {
            name: 'offsetY',
            type: 'number',
            description:
              'The vertical offset of the popover relative to the origin',
            default: '0',
          },
          {
            name: 'styled',
            type: 'boolean',
            description: 'Applies default styles to the popover',
            default: 'false',
          },
          {
            name: 'hasBackdrop',
            type: 'boolean',
            description: 'Displays a backdrop behind the popover',
            default: 'false',
          },
          {
            name: 'blockScroll',
            type: 'boolean',
            description: 'Prevents scrolling of the page when popover is open',
            default: 'false',
          },
          {
            name: 'outsideClose',
            type: 'boolean',
            description:
              'Closes the popover when the user clicks outside or presses the escape key',
            default: 'false',
          },
          {
            name: 'stretchToOrigin',
            type: 'boolean',
            description:
              'Stretches the width of the popover to fit the origin element',
            default: 'false',
          },
          {
            name: 'restoreFocus',
            type: 'boolean',
            description:
              'Restores focus to the origin element after the popover is closed',
            default: 'false',
          },
          {
            name: 'positionY',
            type: 'top | right | bottom | left',
            description:
              'The vertical position of the popover relative to the origin',
            default: 'bottom',
          },
        ],
        outputs: [
          {
            name: 'opened',
            description: 'Emits when the popover is opened',
            value: 'void',
          },
          {
            name: 'closed',
            description: 'Emits when the popover is closed',
            value: 'void',
          },
        ],
      },
      {
        name: 'PopoverOriginDirective',
        type: 'directive',
        selector: '[ktPopoverOrigin]',
        description: 'The element to which the popover should be attached',
      },
    ],
  };

  sourceTree: SourceTreeFolder[] = [
    {
      name: 'popover',
      files: [
        ...this.sourceTreeBuilder.fullComponent(ROOT, ROOT),
        ...this.sourceTreeBuilder.directive('popover-origin', ROOT, true),
      ],
      hideName: true,
    },
  ];
}
