import { Component, inject } from '@angular/core';
import {
  ApiInfo,
  ApiInfoComponent,
} from '../../blueprint/api-info/api-info.component';
import { VOID_API_RETURN_TYPE } from '../../blueprint/api-info/api-inputs/api-inputs.component';
import { BlueprintPageComponent } from '../../blueprint/blueprint-page/blueprint-page.component';
import { CommandInstallationComponent } from '../../blueprint/command-installation/command-installation.component';
import { ShowCaseComponent } from '../../blueprint/show-case/show-case.component';
import {
  SourceTreeBuilder,
  SourceTreeFolder,
} from '../../blueprint/source-tree/source-tree-builder';
import { SourceTreeComponent } from '../../blueprint/source-tree/source-tree.component';
import { ShowCaseIconComponent } from '../../examples/icon/show-case-icon/show-case-icon.component';

const ROOT = 'icon';

@Component({
  selector: 'doc-icon-page',
  imports: [
    BlueprintPageComponent,
    ShowCaseIconComponent,
    ShowCaseComponent,
    SourceTreeComponent,
    CommandInstallationComponent,
    ApiInfoComponent,
  ],
  templateUrl: './icon-page.component.html',
  styleUrl: './icon-page.component.css',
})
export class IconPageComponent {
  sourceTreeBuilder = inject(SourceTreeBuilder);
  sourceTree: SourceTreeFolder[] = [
    {
      name: ROOT,
      files: [
        ...this.sourceTreeBuilder.fullInlineComponent('icon', ROOT),
        ...this.sourceTreeBuilder.service('icon-registry', ROOT),
        ...this.sourceTreeBuilder.service('icon-loader', ROOT),
      ],
      hideName: true,
    },
  ];
  apiInfo: ApiInfo = {
    ariaLink:
      'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/img_role',
    entities: [
      {
        name: 'IconComponent',
        selector: 'app-icon',
        type: 'component',
        inputs: [
          {
            name: 'name',
            type: 'string',
            description: 'The name of the icon to display.',
          },
          {
            name: 'width',
            type: 'number | string',
            description:
              'The width of the icon. it can be either px value like 16px or percentage like 50%.',
          },
          {
            name: 'height',
            type: 'number | string',
            description:
              'The height of the icon. it can be either px value like 16px or percentage like 50%.',
          },
          {
            name: 'stretch',
            type: 'boolean',
            description: 'Whether to stretch the icon to fit the container.',
          },
        ],
      },
      {
        name: 'IconRegistry',
        type: 'service',
        methods: [
          {
            name: 'addIcon',
            description: 'add an icon to the registry',
            returnType: VOID_API_RETURN_TYPE,
            params: [
              {
                name: 'name',
                type: 'string',
                description: 'The name of the icon to add.',
              },
              {
                name: 'url',
                type: 'string',
                description: 'The url of the icon to add.',
              },
            ],
          },
          {
            name: 'getUrl',
            description: 'get the url of an icon',
            returnType: 'string | undefined',
            params: [
              {
                name: 'name',
                type: 'string',
                description: 'The icon name',
              },
            ],
          },
        ],
      },
      {
        name: 'FontIconComponent',
        type: 'component',
        selector: 'app-font-icon',
        inputs: [
          {
            name: 'ng-content',
            type: 'ng-content',
            description: 'The name of the icon to display.',
          },
          {
            name: 'size',
            type: 'number | string',
            default: '24px',
            description: 'The size of the icon.',
          },
          {
            name: 'variant',
            type: 'outlined | rounded | sharp',
            default: 'outlined',
            description: 'The variant of the icon.',
          },
        ],
      },
    ],
  };
}
