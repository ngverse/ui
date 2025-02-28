import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ApiProperty } from '../../kit-page.types';
import { ApiTableComponent } from '../api-table/api-table.component';

@Component({
  selector: 'doc-api-properties',
  imports: [ApiTableComponent],
  templateUrl: './api-properties.component.html',
  styleUrl: './api-properties.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApiPropertiesComponent {
  api = input.required<ApiProperty[]>();
}
