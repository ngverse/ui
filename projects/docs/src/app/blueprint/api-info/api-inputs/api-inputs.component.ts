import { Component, input } from '@angular/core';

export type ApiInputType = {
  name: string;
  type: string;
  description: string;
  default?:string;
};

@Component({
  selector: 'doc-api-inputs',
  imports: [],
  templateUrl: './api-inputs.component.html',
  styleUrl: './api-inputs.component.scss',
})
export class ApiInputsComponent {
  apiInputs = input.required<ApiInputType[]>();
  name = input('Inputs')
}
