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
import { ShowCaseInputComponent } from '../../examples/input/show-case-input/show-case-input.component';

const ROOT = 'input';

@Component({
  selector: 'doc-input-page',
  imports: [
    BlueprintPageComponent,
    ShowCaseComponent,
    ShowCaseInputComponent,
    CommandInstallationComponent,
    SourceTreeComponent,
    ApiInfoComponent,
  ],
  templateUrl: './input-page.component.html',
  styleUrl: './input-page.component.css',
})
export class InputPageComponent {
  sourceTreeBuilder = inject(SourceTreeBuilder);
  sourceTree: SourceTreeFolder[] = [
    {
      name: ROOT,
      files: [...this.sourceTreeBuilder.directive(ROOT, ROOT, true)],
      hideName: true,
    },
  ];

  apiInfo: ApiInfo = {
    stylesInGlobal: true,
    ariaDescription:
      'The Input directive uses the native <input> element as its host, making all accessibility features readily available.',
    entities: [
      {
        name: 'InputDirective',
        type: 'directive',
        selector: 'input[appInput]',
      },
    ],
  };
}
