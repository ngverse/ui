import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ApiEntity,
  ApiInputsComponent,
} from './api-inputs/api-inputs.component';
export interface ApiInfo {
  entities: ApiEntity[];
  description?: string;
  ariaLink?: string;
  ariaDescription?: string;
  stylesInGlobal?: boolean;
}
@Component({
  selector: 'doc-api-info',
  imports: [ApiInputsComponent, RouterLink],
  templateUrl: './api-info.component.html',
  styleUrl: './api-info.component.scss',
})
export class ApiInfoComponent {
  apiInfo = input.required<ApiInfo>();
}
