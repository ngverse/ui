import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { OptionComponent } from '@ng-verse/select/option.component';
import { SelectComponent } from '@ng-verse/select/select.component';
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
@Component({
  selector: 'doc-show-case-select',
  imports: [SelectComponent, ReactiveFormsModule, OptionComponent],
  templateUrl: './show-case-select.component.html',
  styleUrl: './show-case-select.component.scss',
})
export class ShowCaseSelectComponent {
  countries = countries;
  formControlSingle = new FormControl(null, Validators.required);

  formControlMulti = new FormControl(null, Validators.required);
}
