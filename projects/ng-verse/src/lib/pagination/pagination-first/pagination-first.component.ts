import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ChevronFirst, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-pagination-first',
  imports: [LucideAngularModule],
  templateUrl: './pagination-first.component.html',
  styleUrl: './pagination-first.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationFirstComponent {
  ChevronFirst = ChevronFirst;

  disabled = input<boolean>();

  goToFirst = output();
}
