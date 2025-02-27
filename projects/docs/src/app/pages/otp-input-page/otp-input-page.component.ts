import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ApiInfo,
  ApiInfoComponent,
} from '../../blueprint/api-info/api-info.component';
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
import { ShowCaseOtpInputComponent } from '../../examples/otp-input/show-case-otp-input/show-case-otp-input.component';
const ROOT = 'otp-input';

@Component({
  selector: 'doc-otp-input-page',
  imports: [
    BlueprintPageComponent,
    ShowCaseComponent,
    ShowCaseOtpInputComponent,
    SourceTreeComponent,
    CommandInstallationComponent,
    ApiInfoComponent,
    PrerequisitesComponent,
    RouterLink,
  ],
  templateUrl: './otp-input-page.component.html',
  styleUrl: './otp-input-page.component.css',
})
export class OtpInputPageComponent {
  sourceTreeBuilder = inject(SourceTreeBuilder);

  preprs: Prerequisite[] = [
    {
      name: 'input',
      label: 'Input',
    },
  ];

  sourceTree: SourceTreeFolder[] = [
    {
      name: ROOT,
      files: [...this.sourceTreeBuilder.fullComponent(ROOT, ROOT)],
      hideName: true,
    },
  ];
  apiInfo: ApiInfo = {
    ariaLink:
      'https://ej2.syncfusion.com/react/documentation/otp-input/accessibility',
    entities: [
      {
        name: 'OtpInputComponent',
        selector: 'app-otp-input',
        type: 'component',
        inputs: [
          {
            name: 'codeLength',
            type: 'number',
            default: '4',
            description: 'The length of the OTP',
          },
          {
            name: 'inputMode',
            type: 'string',
            default: 'numeric',
            description: 'The input mode of the OTP',
          },
        ],
        outputs: [
          {
            name: 'filled',
            description: 'Emits the value of OTP when the OTP is filled',
            value: 'string',
          },
        ],
        methods: [
          {
            name: 'focus',
            returnType: 'void',
            description: 'Focuses the first input',
          },
          {
            name: 'fillFromText',
            returnType: 'void',
            description: 'Fills the OTP from text',
            params: [
              {
                name: 'text',
                type: 'string',
                description: 'The text to fill the OTP',
              },
            ],
          },
          {
            name: 'clear',
            returnType: 'void',
            description: 'Clears the OTP',
          },
        ],
      },
    ],
  };
}
