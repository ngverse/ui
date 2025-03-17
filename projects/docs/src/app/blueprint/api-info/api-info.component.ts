import { DividerComponent } from '@/ui/divider/divider.component';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { matOpenInNew } from '@ng-icons/material-icons/baseline';
import {
  ApiEntity,
  ApiInputsComponent,
} from './api-inputs/api-inputs.component';
export interface ApiInfo {
  reliesOn?: string;
  articleLink?: string;
  entities: ApiEntity[];
  description?: string;
  ariaLink?: string;
  ariaDescription?: string;
  stylesInGlobal?: boolean;
}
@Component({
  selector: 'doc-api-info',
  imports: [ApiInputsComponent, RouterLink, DividerComponent],
  templateUrl: './api-info.component.html',
  styleUrl: './api-info.component.css',
})
export class ApiInfoComponent {
  apiInfo = input.required<ApiInfo>();
  EXTERNAL_LINK = matOpenInNew;
}
