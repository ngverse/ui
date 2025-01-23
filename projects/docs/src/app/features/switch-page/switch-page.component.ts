import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { ShowCaseSwitchComponent } from '../../examples/switch/show-case-switch/show-case-switch.component';
const ROOT = 'switch';
@Component({
  selector: 'doc-switch-page',
  imports: [
    BlueprintPageComponent,
    ShowCaseComponent,
    FormsModule,
    ShowCaseSwitchComponent,
    CommandInstallationComponent,
    SourceTreeComponent,
    ApiInfoComponent,
  ],
  templateUrl: './switch-page.component.html',
  styleUrl: './switch-page.component.scss',
})
export class SwitchPageComponent {
  sourceTreeBuilder = inject(SourceTreeBuilder);
  sourceTree: SourceTreeFolder[] = [
    {
      name: 'switch',
      files: [...this.sourceTreeBuilder.fullComponent(ROOT, ROOT)],
      hideName: true,
    },
  ];
  apiInfo: ApiInfo = {
    ariaLink: 'https://www.w3.org/WAI/ARIA/apg/patterns/switch/',
    entities: [
      {
        name: 'SwitchComponent',
        selector: 'app-switch',
        type: 'component',
        formBindable: true,
        inputs: [
          {
            name: 'disabled',
            type: 'boolean',
            description: 'Disables the switch.',
            default: 'false',
          },
          {
            name: 'required',
            type: 'boolean',
            description: 'Applies required validation to the switch.',
            default: 'false',
          },
          {
            name: 'labelAlign',
            type: 'start | end',
            description: 'Specifies the alignment of the switch label.',
            default: 'end',
          },
        ],
      },
    ],
  };
}
