import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { OptionGroupLabelComponent } from '@ngverse/select/option-group-label.component';
import { OptionGroupComponent } from '@ngverse/select/option-group.component';
import { OptionComponent } from '@ngverse/select/option.component';
import { SelectComponent } from '@ngverse/select/select.component';
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

@Component({
  selector: 'doc-show-case-select',
  imports: [
    SelectComponent,
    ReactiveFormsModule,
    OptionComponent,
    OptionGroupComponent,
    OptionGroupLabelComponent,
  ],
  templateUrl: './show-case-select.component.html',
  styleUrl: './show-case-select.component.scss',
})
export class ShowCaseSelectComponent {
  countries = countries;
  directories = directories;
  formControlSingle = new FormControl(null, Validators.required);

  formControlMulti = new FormControl(['US', 'CA'], Validators.required);

  dirFormControl = new FormControl(null);
}
