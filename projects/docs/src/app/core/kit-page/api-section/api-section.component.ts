import { DividerComponent } from '@/ui/divider/divider.component';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ApiSection } from '../kit-page.types';
import { ApiInputsComponent } from './api-inputs/api-inputs.component';

@Component({
  selector: 'doc-api-section',
  imports: [DividerComponent, ApiInputsComponent],
  templateUrl: './api-section.component.html',
  styleUrl: './api-section.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApiSectionComponent {
  api = input.required<ApiSection>();
}
