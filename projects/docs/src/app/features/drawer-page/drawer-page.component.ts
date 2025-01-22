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
import { ShowCaseDrawerComponent } from '../../examples/drawer/show-case-drawer/show-case-drawer.component';

const ROOT = 'drawer';

@Component({
  selector: 'doc-drawer-page',
  imports: [
    BlueprintPageComponent,
    ShowCaseComponent,
    CommandInstallationComponent,
    SourceTreeComponent,
    ApiInfoComponent,
    ShowCaseDrawerComponent,
  ],
  templateUrl: './drawer-page.component.html',
  styleUrl: './drawer-page.component.scss',
})
export class DrawerPageComponent {
  sourceTreeBuilder = inject(SourceTreeBuilder);

  sourceTree: SourceTreeFolder[] = [
    {
      name: 'drawer',
      files: [
        ...this.sourceTreeBuilder.fullComponent('drawer', `${ROOT}/drawer`),
        ...this.sourceTreeBuilder.fullComponent(
          'drawer-header',
          `${ROOT}/drawer-header`
        ),
        ...this.sourceTreeBuilder.fullComponent(
          'drawer-subtitle',
          `${ROOT}/drawer-subtitle`
        ),
        ...this.sourceTreeBuilder.fullComponent(
          'drawer-title',
          `${ROOT}/drawer-title`
        ),
        ...this.sourceTreeBuilder.service('drawer', `${ROOT}`),
        ...this.sourceTreeBuilder.directive('drawer-close', `${ROOT}`),
        this.sourceTreeBuilder.file('drawer-ref', `${ROOT}`, 'ts'),
      ],
    },
  ];

  apiInfo: ApiInfo = {
    entities: [
      {
        name: 'DrawerService',
        type: 'service',
        description: 'service that opens drawer component',
        methods: [
          {
            name: 'open',
            description: 'opens the drawer',
            returnType: 'DrawerRef',
            params: [
              {
                name: 'component',
                type: 'ComponentType<unknown>',
                description: 'component to render inside the drawer.',
              },
              {
                name: 'options',
                type: 'object',
                fields: [
                  {
                    name: 'data',
                    type: 'unknown',
                    description: 'data to pass to the component.',
                  },
                  {
                    name: 'title',
                    type: 'string',
                    description: 'title of the drawer.',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'DrawerRef',
        type: 'service',
        description:
          'DrawerRef is a class that represents a reference to a drawer component.',
        methods: [
          {
            name: 'close',
            description: 'close the drawer',
            returnType: VOID_API_RETURN_TYPE,
            params: [],
          },
          {
            name: 'closed',
            returnType: 'Observable<unknown>>',
            description:
              'observable that emits when the drawer is closed. it passes the value that was passed to the close method.',
          },
        ],
      },
      {
        name: 'DrawerCloseDirective',
        selector: '[appDrawerClose]',
        type: 'directive',
        description:
          'A directive used to close the drawer. It can be placed on any element inside the drawer.',
        inputs: [
          {
            name: 'appDrawerClose',
            type: 'unknown',
            description: 'value to pass to the close method',
          },
        ],
      },
    ],
  };
}
