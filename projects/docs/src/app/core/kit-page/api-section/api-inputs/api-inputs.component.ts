import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ApiInput } from '../../kit-page.types';
import { ApiTableComponent } from '../api-table/api-table.component';

@Component({
  selector: 'doc-api-inputs',
  imports: [ApiTableComponent],
  templateUrl: './api-inputs.component.html',
  styleUrl: './api-inputs.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApiInputsComponent {
  api = input.required<ApiInput[]>();
}
