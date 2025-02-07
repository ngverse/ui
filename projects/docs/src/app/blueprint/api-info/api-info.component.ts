import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from 'ng-verse/icon/icon.component';
import {
  ApiEntity,
  ApiInputsComponent,
} from './api-inputs/api-inputs.component';
export interface ApiInfo {
  articleLink?: string;
  entities: ApiEntity[];
  description?: string;
  ariaLink?: string;
  ariaDescription?: string;
  stylesInGlobal?: boolean;
}
@Component({
  selector: 'doc-api-info',
  imports: [ApiInputsComponent, RouterLink, IconComponent],
  templateUrl: './api-info.component.html',
  styleUrl: './api-info.component.scss',
})
export class ApiInfoComponent {
  apiInfo = input.required<ApiInfo>();
}
