import { Component } from '@angular/core';
import { CdkOption } from '@angular/cdk/listbox';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrl: './option.component.scss',
  hostDirectives: [
    {
      directive: CdkOption,
      inputs: ['cdkOption'],
    },
  ],
})
export class OptionComponent {}
