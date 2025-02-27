import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ApiField } from '../../kit-page.types';
import { ApiTableComponent } from '../api-table/api-table.component';

@Component({
  selector: 'doc-api-fields',
  imports: [ApiTableComponent],
  templateUrl: './api-fields.component.html',
  styleUrl: './api-fields.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApiFieldsComponent {
  api = input.required<ApiField[]>();
}
