import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ApiMethod } from '../../kit-page.types';
import { ApiTableComponent } from '../api-table/api-table.component';

@Component({
  selector: 'doc-api-methods',
  imports: [ApiTableComponent],
  templateUrl: './api-methods.component.html',
  styleUrl: './api-methods.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApiMethodsComponent {
  api = input.required<ApiMethod[]>();
}
