import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { AccordionBodyComponent } from '@ng-verse/accordion/accordion-body.component';
import { AccordionHeaderComponent } from '@ng-verse/accordion/accordion-header.component';
import { AccordionItemComponent } from '@ng-verse/accordion/accordion-item.component';
import { AccordionComponent } from '@ng-verse/accordion/accordion.component';
import { CardComponent } from '../../../../../../ng-verse/src/lib/card/card.component';

interface ApiInputType {
  name: string;
  type: string;
  description: string;
  default?: string;
}

interface ApiMethodParam {
  name: string;
  type: string;
  description?: string;
  fields?: {
    name: string;
    type: string;
    description: string;
    default?: string;
  }[];
}

interface ApiMethodType {
  name: string;
  returnType: string;
  returnDescription?: string;
  description?: string;
  params?: ApiMethodParam[];
}

interface ApiOutputType {
  name: string;
  value: string;
  description: string;
}

interface ApiPropertyType {
  name: string;
  returnType: string;
  description: string;
  propType: 'get' | 'set' | 'get;set;';
}

export const VOID_API_RETURN_TYPE = 'void';

export const VOID_API_NO_PARAMS = '--';

export const EMPTY_API_INPUT_DEFAULT_VALUE = '--';

export const AUTO_GENERATED_API_DEFAULT_VALUE = 'Auto Generated';

export interface ApiEntity {
  name: string;
  inputs?: ApiInputType[];
  outputs?: ApiOutputType[];
  methods?: ApiMethodType[];
  properties?: ApiPropertyType[];
  description?: string;
  type?: 'component' | 'directive' | 'service';
  selector?: string;
  formBindable?: boolean;
}

@Component({
  selector: 'doc-api-inputs',
  imports: [
    NgClass,
    AccordionComponent,
    AccordionItemComponent,
    AccordionBodyComponent,
    AccordionHeaderComponent,
    CardComponent,
  ],
  templateUrl: './api-inputs.component.html',
  styleUrl: './api-inputs.component.scss',
})
export class ApiInputsComponent {
  apiInputs = input.required<ApiEntity[]>();
}
