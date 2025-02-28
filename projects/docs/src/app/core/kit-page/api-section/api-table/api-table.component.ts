import { CardComponent } from '@/ui/card/card.component';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'doc-api-table',
  imports: [CardComponent],
  templateUrl: './api-table.component.html',
  styleUrl: './api-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApiTableComponent {
  label = input.required<string>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data = input<any[]>();
  headers = input.required<string[]>();

  hasRequired(item: Record<string, unknown>) {
    return !!item['required'];
  }

  getValue(item: Record<string, unknown>, key: string) {
    const mapedKey = key.replace(' ', '').toLowerCase();
    const value =
      item[
        Object.keys(item).find((k) => k.toLowerCase() === mapedKey) as string
      ];
    return value;
  }
}
