import { OptionGroupLabelComponent } from '@/ui/select/option-group-label.component';
import { OptionGroupComponent } from '@/ui/select/option-group.component';
import { OptionComponent } from '@/ui/select/option.component';
import { SelectComponent } from '@/ui/select/select.component';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIcon } from '@ng-icons/core';
import {
  matBlender,
  matElectricBolt,
  matIron,
} from '@ng-icons/material-icons/baseline';
import { SelectLabelDirective } from '../../../../../../ngverse/src/lib/select/select-label.directive';
const countries = [
  { code: 'KA', name: 'Georgia' },
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'JP', name: 'Japan' },
  { code: 'AU', name: 'Australia' },
  { code: 'IT', name: 'Italy' },
  { code: 'ES', name: 'Spain' },
  { code: 'CN', name: 'China' },
  { code: 'IN', name: 'India' },
  { code: 'BR', name: 'Brazil' },
  { code: 'ZA', name: 'South Africa' },
  { code: 'RU', name: 'Russia' },
  { code: 'MX', name: 'Mexico' },
  { code: 'KR', name: 'South Korea' },
  { code: 'AR', name: 'Argentina' },
  { code: 'SA', name: 'Saudi Arabia' },
  { code: 'NG', name: 'Nigeria' },
  { code: 'EG', name: 'Egypt' },
];

const directories = [
  {
    name: 'Documents',
    files: [
      {
        name: 'Profile Picture',
      },
      {
        name: 'Work File',
      },
    ],
  },
  {
    name: 'Downloads',
    files: [
      {
        name: 'The Dark Knight',
      },
      {
        name: 'Joker',
      },
    ],
  },
];

const customOptions = [
  { label: 'Electricity', value: matElectricBolt },
  { label: 'Blender', value: matBlender },
  { label: 'Iron', value: matIron },
];

@Component({
  selector: 'doc-show-case-select',
  imports: [
    SelectComponent,
    ReactiveFormsModule,
    OptionComponent,
    OptionGroupComponent,
    OptionGroupLabelComponent,
    SelectLabelDirective,
    NgIcon,
  ],
  templateUrl: './show-case-select.component.html',
  styleUrl: './show-case-select.component.css',
})
export class ShowCaseSelectComponent {
  countries = countries;
  directories = directories;
  customOptions = customOptions;
  formControlSingle = new FormControl(null, Validators.required);

  formControlMulti = new FormControl(['US', 'CA'], Validators.required);

  dirFormControl = new FormControl(null);

  customLabelControl = new FormControl(null);
}
