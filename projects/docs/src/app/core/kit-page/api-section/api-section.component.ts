import { DividerComponent } from '@/ui/divider/divider.component';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ApiSection } from '../kit-page.types';
import { ApiFieldsComponent } from './api-fields/api-fields.component';
import { ApiInputsComponent } from './api-inputs/api-inputs.component';
import { ApiMethodsComponent } from './api-methods/api-methods.component';
import { ApiOutputsComponent } from './api-outputs/api-outputs.component';
import { ApiPropertiesComponent } from './api-properties/api-properties.component';

@Component({
  selector: 'doc-api-section',
  imports: [
    DividerComponent,
    ApiInputsComponent,
    ApiOutputsComponent,
    ApiFieldsComponent,
    ApiMethodsComponent,
    ApiPropertiesComponent,
  ],
  templateUrl: './api-section.component.html',
  styleUrl: './api-section.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApiSectionComponent {
  api = input.required<ApiSection>();
}
