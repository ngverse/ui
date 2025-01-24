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
import { ShowCaseButtonComponent } from '../../examples/button/show-case-button/show-case-button.component';
const ROOT = 'button';
@Component({
  selector: 'doc-button-page',
  imports: [
    BlueprintPageComponent,
    ShowCaseComponent,
    ShowCaseComponent,
    ApiInfoComponent,
    SourceTreeComponent,
    CommandInstallationComponent,
    ShowCaseButtonComponent,
  ],
  templateUrl: './button-page.component.html',
  styleUrl: './button-page.component.scss',
})
export class ButtonPageComponent {
  sourceTreeBuilder = inject(SourceTreeBuilder);
  sourceTree: SourceTreeFolder[] = [
    {
      name: ROOT,
      files: [
        ...this.sourceTreeBuilder.fullComponent(ROOT, ROOT),
        ...this.sourceTreeBuilder.fullInlineComponent('button-loader', ROOT),
      ],
      hideName: true,
    },
  ];

  apiInfo: ApiInfo = {
    ariaDescription:
      'The Button component uses the native <button> element as its host, making all accessibility features readily available.',
    entities: [
      {
        name: 'ButtonComponent',
        type: 'component',
        selector: 'button[appButton]',
        description:
          'appButton is used with native button element, so all native input attributes can be used',
        inputs: [
          {
            name: 'color',
            type: 'primary | secondary | danger | success | none',
            description: "Defines the button's color type",
            default: 'primary',
          },
          {
            name: 'size',
            type: 'sm | md | lg | none',
            description: 'changes the size of the button',
            default: 'md',
          },
          {
            name: 'variant',
            type: 'fill | outline | link | none',
            description: 'changes the variant of the button',
            default: 'fill',
          },
          {
            name: 'disabled',
            type: 'boolean',
            description: 'disables the button',
            default: 'false',
          },
          {
            name: 'loading',
            type: 'boolean',
            description:
              'adds spinner on the button. The button will not emit any event while loading is true',
            default: 'false',
          },
        ],
      },
    ],
  };
}
