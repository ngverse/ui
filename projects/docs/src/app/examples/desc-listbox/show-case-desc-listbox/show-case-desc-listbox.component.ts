import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  model,
  viewChild,
} from '@angular/core';
import { DescListboxItemDirective } from '@ng-verse/desc-listbox/desc-listbox-item.directive';
import { DescListboxDirective } from '@ng-verse/desc-listbox/desc-listbox.directive';
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
  selector: 'doc-show-case-desc-listbox',
  imports: [DescListboxDirective, DescListboxItemDirective, JsonPipe],
  templateUrl: './show-case-desc-listbox.component.html',
  styleUrl: './show-case-desc-listbox.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowCaseDescListboxComponent {
  countries = countries;
  listbox = viewChild.required<DescListboxDirective>(DescListboxDirective);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value = model<any>([]);

  constructor() {
    setTimeout(() => {
      this.listbox().focus();
    }, 100);
  }

  compare(o1: { code: string }, o2: { code: string }) {
    return o1?.code === o2.code;
  }

  valueChange($event: { code: string; name: string }) {
    const values = [...this.value(), $event];
    this.value.set(values);
  }
}
