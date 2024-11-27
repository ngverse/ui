import { Component, input } from '@angular/core';

@Component({
  selector: 'doc-api-info-prop',
  imports: [],
  templateUrl: './api-info-prop.component.html',
  styleUrl: './api-info-prop.component.scss',
})
export class ApiInfoPropComponent {
  propName = input.required<string>();
  description = input.required<string>();
}
