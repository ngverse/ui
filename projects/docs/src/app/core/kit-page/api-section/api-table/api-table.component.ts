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

  keys(item: Record<string, unknown>) {
    const lowered = this.headers().map((h) => h.toLowerCase());
    const keys = Object.keys(item).filter(
      (it) => it.toLowerCase() !== 'required'
    );

    return keys.sort((a, b) => {
      return (
        lowered.indexOf(a.toLowerCase()) - lowered.indexOf(b.toLowerCase())
      );
    });
  }
}
