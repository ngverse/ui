import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  ApiInputType,
  ApiPipeReturnType,
} from '../../blueprint/api-info/api-inputs/api-inputs.component';
import { PipePageComponent } from '../../pipe-page/pipe-page.component';

@Component({
  selector: 'doc-chart-at-page',
  imports: [PipePageComponent],
  templateUrl: './chart-at-page.component.html',
  styleUrl: './chart-at-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartAtPageComponent {
  apiInfo: ApiInputType[] = [
    {
      name: 'value',
      type: 'string | undefined | null',
      description: 'The string to get the character from',
    },
    {
      name: 'index',
      type: 'number',
      description: 'The index of the character to get',
    },
  ];

  returns: ApiPipeReturnType = {
    type: 'string | undefined',
    description: 'The character at the specified index',
  };
}
