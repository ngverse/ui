import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ChevronRight, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-pagination-next',
  imports: [LucideAngularModule],
  templateUrl: './pagination-next.component.html',
  styleUrl: './pagination-next.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationNextComponent {
  ChevronRight = ChevronRight;

  disabled = input<boolean>();

  goToNext = output();
}
