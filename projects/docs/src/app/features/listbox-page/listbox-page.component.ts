import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
import { ShowCaseListboxComponent } from '../../examples/listbox/show-case-listbox/show-case-listbox.component';

const ROOT = 'listbox';

@Component({
  selector: 'doc-listbox-page',
  imports: [
    BlueprintPageComponent,
    CommandInstallationComponent,
    SourceTreeComponent,
    ApiInfoComponent,
    ShowCaseComponent,
    ShowCaseListboxComponent,
  ],
  templateUrl: './listbox-page.component.html',
  styleUrl: './listbox-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListboxPageComponent {
  sourceTreeBuilder = inject(SourceTreeBuilder);
  sourceTree: SourceTreeFolder[] = [
    {
      name: ROOT,
      files: [
        ...this.sourceTreeBuilder.directive(ROOT, ROOT, true),
        ...this.sourceTreeBuilder.directive('listbox-item', ROOT, true),
        this.sourceTreeBuilder.file('listbox-key-manager', ROOT, 'ts'),
        this.sourceTreeBuilder.file('listbox-key-manager', ROOT, 'spec.ts'),
        this.sourceTreeBuilder.file('listbox-registry', ROOT, 'ts'),
        this.sourceTreeBuilder.file('listbox-registry', ROOT, 'spec.ts'),
      ],
      hideName: true,
    },
  ];
  apiInfo: ApiInfo = {
    ariaLink: 'https://www.w3.org/WAI/ARIA/apg/patterns/listbox/',
    entities: [
      {
        name: 'ListboxDirective',
        type: 'directive',
        selector: '[appListbox]',
        inputs: [
          {
            name: 'withWrap',
            type: 'boolean',
            description:
              'Enables wrapping of keyboard navigation. If false, navigation stops at the list ends; if true, it cycles back to the start or end.',
          },
          {
            name: 'orientation',
            type: 'horizontal | vertical',
            description: 'The orientation of the listbox',
            default: 'vertical',
          },
          {
            name: 'withTypeAhead',
            type: 'boolean',
            description: 'Enables type-ahead functionality.',
            default: 'false',
          },
          {
            name: 'value',
            type: 'unknown',
            description:
              'The value of the listbox. this value is used to activate the item that matches the value.',
            default: EMPTY_API_INPUT_DEFAULT_VALUE,
          },
          {
            name: 'multiple',
            type: 'boolean',
            description:
              'Determines wheter value is multiple (array) or not, if set true, it activates the last item of value',
            default: 'false',
          },
          {
            name: 'compareWith',
            type: '(o1: any, o2: any) => boolean',
            description:
              'Function to compare the value of the items with the value of the listbox',
            default: '(o1: any, o2: any) => o1 === o2',
          },
        ],
        outputs: [
          {
            name: 'selected',
            value: 'the value of listbox item',
            description: 'Emits when the item is selected',
          },
        ],
      },
      {
        name: 'ListboxItemDirective',
        type: 'directive',
        selector: '[appListboxItem]',
        inputs: [
          {
            name: 'value',
            type: 'unknown',
            description: 'The value of the listbox item',
            default: EMPTY_API_INPUT_DEFAULT_VALUE,
          },
          {
            name: 'disabled',
            type: 'boolean',
            description: 'Disables the listbox item',
          },
        ],
      },
    ],
  };
}
