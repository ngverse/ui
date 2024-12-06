import { Component, input } from '@angular/core';

@Component({
  selector: 'doc-api-info-input',
  imports: [],
  templateUrl: './api-info-input.component.html',
  styleUrl: './api-info-input.component.scss',
})
export class ApiInfoInputComponent {
  name = input.required<string>();
  default = input<string>();
  description = input.required<string>();
  type = input.required<string>();
}
