import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  ApiInputType,
  ApiPipeReturnType,
} from '../../../blueprint/api-info/api-inputs/api-inputs.component';
import { PipePageComponent } from '../../../pipe-page/pipe-page.component';

@Component({
  selector: 'doc-map-page',
  imports: [PipePageComponent],
  templateUrl: './map-page.component.html',
  styleUrl: './map-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapPageComponent {
  apiInfo: ApiInputType[] = [
    {
      name: 'value',
      type: 'T[]',
      description: 'The array to map',
    },
    {
      name: 'fn',
      type: 'string | ((value: T, index: number) => unknown)',
      description:
        'The function to map the array with, if the string is provided it will map the value of the property with that name',
    },
  ];

  returns: ApiPipeReturnType = {
    type: 'unknown',
    description: 'returns mapped array',
  };
}
