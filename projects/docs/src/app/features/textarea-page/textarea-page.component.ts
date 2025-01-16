import { Component, inject } from '@angular/core';
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
import { ShowCaseTextareaComponent } from '../../examples/textarea/show-case-textarea/show-case-textarea.component';
const ROOT = 'textarea';
@Component({
  selector: 'doc-textarea-page',
  imports: [
    BlueprintPageComponent,
    ShowCaseComponent,
    CommandInstallationComponent,
    SourceTreeComponent,
    ApiInfoComponent,
    ShowCaseTextareaComponent,
  ],
  templateUrl: './textarea-page.component.html',
  styleUrl: './textarea-page.component.scss',
})
export class TextareaPageComponent {
  sourceTreeBuilder = inject(SourceTreeBuilder);

  sourceTree: SourceTreeFolder[] = [
    {
      name: 'textarea',
      files: [...this.sourceTreeBuilder.inlineComponent(ROOT, ROOT)],
      hideName: true,
    },
  ];

  apiInfo: ApiInfo = {
    entities: [
      {
        name: 'TextareaComponent',
        type: 'component',
        selector: 'textarea[appTextarea]',
        description:
          'appTextarea is used with native textarea element, so all native input attributes can be used',
        inputs: [
          {
            name: 'resize',
            type: 'none | both | horizontal | vertical | block | inline',
            description: 'resize type',
            default: 'none',
          },
        ],
      },
    ],
  };
}
