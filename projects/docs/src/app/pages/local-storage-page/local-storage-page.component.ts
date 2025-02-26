import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ApiDescriptionComponent } from '../../blueprint/api-info/api-description/api-description.component';
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
import { ShowCaseLocalStorageComponent } from '../../examples/local-storage/show-case-local-storage/show-case-local-storage.component';

const ROOT = 'local-storage';

@Component({
  selector: 'doc-local-storage-page',
  imports: [
    BlueprintPageComponent,
    CommandInstallationComponent,
    ShowCaseComponent,
    SourceTreeComponent,
    ApiInfoComponent,
    ShowCaseLocalStorageComponent,
    ApiDescriptionComponent,
  ],
  templateUrl: './local-storage-page.component.html',
  styleUrl: './local-storage-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocalStoragePageComponent {
  sourceTreeBuilder = inject(SourceTreeBuilder);
  sourceTree: SourceTreeFolder[] = [
    {
      name: ROOT,
      files: [...this.sourceTreeBuilder.service(ROOT, ROOT)],
      hideName: true,
    },
  ];

  apiInfo: ApiInfo = {
    articleLink:
      'https://medium.com/ngverse/make-localstorage-ssr-compatible-in-angular-431d7ce5714e',
    entities: [
      {
        name: 'LocalStorageService',
        type: 'service',
        methods: [
          {
            name: 'getItem',
            returnType: 'string | null',
            description: 'Returns the value associated with the given key.',
            params: [
              {
                name: 'key',
                type: 'string',
                description: 'The key of the value to retrieve.',
              },
            ],
          },
          {
            name: 'setItem',
            returnType: 'void',
            description: 'Associates a key with a given value.',
            params: [
              {
                name: 'key',
                type: 'string',
                description: 'The key of the value to set.',
              },
              {
                name: 'value',
                type: 'string',
                description: 'The value to set.',
              },
            ],
          },
          {
            name: 'removeItem',
            returnType: 'void',
            description: 'Removes the value associated with the given key.',
            params: [
              {
                name: 'key',
                type: 'string',
                description: 'The key of the value to remove.',
              },
            ],
          },
          {
            name: 'clear',
            returnType: 'void',
            description: 'Removes all values from the storage.',
          },
          {
            name: 'key',
            returnType: 'string | null',
            description: 'Returns the key of the item at the given index.',
            params: [
              {
                name: 'index',
                type: 'number',
                description: 'The index of the item.',
              },
            ],
          },
        ],
        properties: [
          {
            name: 'length',
            propType: 'get',
            returnType: 'number',
            description: 'The number of items in the storage.',
          },
          {
            name: 'enabled',
            propType: 'get',
            returnType: 'boolean',
            description:
              'Whether the local storage is enabled. if SSR the value is false.',
          },
        ],
      },
    ],
  };
}
