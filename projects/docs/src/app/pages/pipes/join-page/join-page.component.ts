import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  ApiInputType,
  ApiPipeReturnType,
} from '../../../blueprint/api-info/api-inputs/api-inputs.component';
import { PipePageComponent } from '../../../pipe-page/pipe-page.component';

@Component({
  selector: 'doc-join-page',
  imports: [PipePageComponent],
  templateUrl: './join-page.component.html',
  styleUrl: './join-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JoinPageComponent {
  apiInfo: ApiInputType[] = [
    {
      name: 'value',
      type: 'T[]',
      description: 'The array to join',
    },
    {
      name: 'character',
      type: 'string',
      description: 'The character to join the array with',
    },
  ];

  returns: ApiPipeReturnType = {
    type: 'string',
    description: 'The joined string',
  };
}
