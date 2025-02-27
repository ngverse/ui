import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ApiOutput } from '../../kit-page.types';
import { ApiTableComponent } from '../api-table/api-table.component';

@Component({
  selector: 'doc-api-outputs',
  imports: [ApiTableComponent],
  templateUrl: './api-outputs.component.html',
  styleUrl: './api-outputs.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApiOutputsComponent {
  api = input.required<ApiOutput[]>();
}
