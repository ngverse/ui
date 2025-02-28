import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ApiTableComponent } from '../api-section/api-table/api-table.component';
import { ApiProperty } from '../kit-page.types';

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
