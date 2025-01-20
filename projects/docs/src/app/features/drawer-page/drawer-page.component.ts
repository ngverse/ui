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
import { ShowCaseDrawerComponent } from '../../examples/drawer/show-case-drawer/show-case-drawer.component';
import { VOID_API_RETURN_TYPE } from '../../blueprint/api-info/api-inputs/api-inputs.component';

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
        name: 'DrawerComponent',
        selector: 'app-drawer',
        type: 'component',
        description:
          'Just wrapper that renders another component and add animations and styles',
        inputs: [
          {
            name: 'component',
            type: 'ComponentType<unknown>',
            description: 'component to render inside drawer',
          },
          {
            name: 'data',
            type: 'Record<string, unknown> | null',
            description: 'properties to pass to the component',
          },
        ],
        outputs: [
          {
            name: 'close',
            description: 'emits when the drawer is closed',
            value: 'void',
          },
        ],
      },
      {
        name: 'DrawerService',
        type: 'service',
        description: 'Singleton service that is used to open the drawer',
        methods: [
          {
            name: 'open',
            description: 'opens the drawer',
            returnType: VOID_API_RETURN_TYPE,
            params: [
              {
                name: 'component',
                type: 'ComponentType<unknown>',
                description: 'component to render inside the drawer.',
              },
              {
                name: 'data',
                type: 'Record<string, unknown>',
                description: 'data to pass to the component.',
              },
            ],
          },
        ],
      },
      {
        name: 'DrawerCloseDirective',
        selector: '[appDrawerClose]',
        type: 'directive',
        description:
          'A directive used to close the drawer. It can be placed on any element inside the drawer.',
      },
      {
        name: 'DrawerRef',
        type: 'service',
        description:
          'A simple class that can be used to manually close the drawer.',
        methods: [
          {
            name: 'close',
            description: 'closes the drawer',
            returnType: VOID_API_RETURN_TYPE,
            params: [],
          },
        ],
      },
      {
        name: 'DrawerTitleComponent',
        selector: 'app-drawer-title',
        type: 'component',
        description:
          'Renders the title of the drawer. It can be placed inside the app-drawer-header component.',
      },
      {
        name: 'DrawerHeaderComponent',
        selector: 'app-drawer-header',
        type: 'component',
        description:
          'Renders the header of the drawer. It can be placed inside the app-drawer component.',
      },
      {
        name: 'DrawerSubtitleComponent',
        selector: 'app-drawer-subtitle',
        type: 'component',
        description:
          'Renders the subtitle of the drawer. It can be placed inside the app-drawer-header component.',
      },
    ],
  };
}
