import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  ApiInfo,
  ApiInfoComponent,
} from '../../blueprint/api-info/api-info.component';
import { AUTO_GENERATED_API_DEFAULT_VALUE } from '../../blueprint/api-info/api-inputs/api-inputs.component';
import { BlueprintPageComponent } from '../../blueprint/blueprint-page/blueprint-page.component';
import { CommandInstallationComponent } from '../../blueprint/command-installation/command-installation.component';
import { ShowCaseComponent } from '../../blueprint/show-case/show-case.component';
import {
  SourceTreeBuilder,
  SourceTreeFolder,
} from '../../blueprint/source-tree/source-tree-builder';
import { SourceTreeComponent } from '../../blueprint/source-tree/source-tree.component';
import { ShowCaseCheckboxComponent } from '../../examples/checkbox/show-case-checkbox/show-case-checkbox.component';

const ROOT = 'checkbox';

@Component({
  selector: 'doc-checkbox-page',
  imports: [
    BlueprintPageComponent,
    ShowCaseComponent,
    ReactiveFormsModule,
    ShowCaseCheckboxComponent,
    CommandInstallationComponent,
    SourceTreeComponent,
    ApiInfoComponent,
  ],
  templateUrl: './checkbox-page.component.html',
  styleUrl: './checkbox-page.component.scss',
})
export class CheckboxPageComponent {
  sourceTreeBuilder = inject(SourceTreeBuilder);
  sourceTree: SourceTreeFolder[] = [
    {
      name: ROOT,
      files: [
        ...this.sourceTreeBuilder.fullComponent(ROOT, ROOT),
        this.sourceTreeBuilder.file('checkbox-icon.component', ROOT),
        this.sourceTreeBuilder.file('checkbox-animations', ROOT),
      ],
      hideName: true,
    },
  ];

  apiInfo: ApiInfo = {
    entities: [
      {
        name: 'CheckboxComponent',
        selector: 'app-checkbox',
        type: 'component',
        formBindable: true,
        inputs: [
          {
            name: 'disabled',
            type: 'boolean',
            description: 'Disables the checkbox',
            default: 'false',
          },
          {
            name: 'required',
            type: 'boolean',
            description: 'Adds required validation to the checkbox',
            default: 'false',
          },
          {
            name: 'labelAlign',
            type: 'start | end',
            description: 'Aligns the label of the checkbox',
            default: 'end',
          },
          {
            name: 'id',
            type: 'string',
            description: 'Sets id attribute to the native checkbox',
            default: AUTO_GENERATED_API_DEFAULT_VALUE,
          },
        ],
      },
    ],
  };
}
