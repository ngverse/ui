import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MultiSelectComponent } from '@ng-verse/multi-select/multi-select.component';
const countries = [
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
  selector: 'doc-show-case-multi-select',
  imports: [MultiSelectComponent, ReactiveFormsModule],
  templateUrl: './show-case-multi-select.component.html',
  styleUrl: './show-case-multi-select.component.scss',
})
export class ShowCaseMultiSelectComponent {
  countries = countries;
  formControl = new FormControl(null, Validators.required);

  constructor() {
    this.formControl.valueChanges.subscribe(() => {
      console.log(this.formControl.value);
    });
  }
}
