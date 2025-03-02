import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ShowCaseComponent } from '../../blueprint/show-case/show-case.component';
import { ApiSectionComponent } from '../../core/kit-page/api-section/api-section.component';
import { KitPageComponent } from '../../core/kit-page/kit-page.component';
import { ApiSection } from '../../core/kit-page/kit-page.types';
import { OverviewSectionComponent } from '../../core/kit-page/overview-section/overview-section.component';
import { ShowCaseSessionStorageComponent } from '../../examples/session-storage/show-case-session-storage/show-case-session-storage.component';

@Component({
  selector: 'doc-session-storage-page',
  imports: [
    ShowCaseComponent,
    ShowCaseSessionStorageComponent,
    KitPageComponent,
    OverviewSectionComponent,
    ApiSectionComponent,
  ],
  templateUrl: './session-storage-page.component.html',
  styleUrl: './session-storage-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SessionStoragePageComponent {
  api: ApiSection = {
    services: [
      {
        name: 'SessionStorageService',
        description: '',
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
            type: 'get',
            returnType: 'number',
            description: 'The number of items in the storage.',
          },
          {
            name: 'enabled',
            type: 'get',
            returnType: 'boolean',
            description:
              'Whether the session storage is enabled. if SSR the value is false.',
          },
        ],
      },
    ],
  };
}
