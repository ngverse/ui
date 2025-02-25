import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DividerComponent } from '../../../../../ngverse/src/lib/ui/divider/divider.component';
import { IconComponent } from '../../../../../ngverse/src/lib/ui/icon/icon.component';
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
  imports: [ApiInputsComponent, RouterLink, IconComponent, DividerComponent],
  templateUrl: './api-info.component.html',
  styleUrl: './api-info.component.css',
})
export class ApiInfoComponent {
  apiInfo = input.required<ApiInfo>();
}
