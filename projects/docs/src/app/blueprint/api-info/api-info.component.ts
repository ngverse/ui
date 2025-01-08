import { Component, input } from '@angular/core';
import {
  ApiEntity,
  ApiInputsComponent,
} from './api-inputs/api-inputs.component';
export interface ApiInfo {
  entities: ApiEntity[];
  description?: string;
}
@Component({
  selector: 'doc-api-info',
  imports: [ApiInputsComponent],
  templateUrl: './api-info.component.html',
  styleUrl: './api-info.component.scss',
})
export class ApiInfoComponent {
  apiInfo = input<ApiInfo>();
}
