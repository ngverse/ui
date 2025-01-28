import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { ChevronLeft, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-pagination-prev',
  imports: [LucideAngularModule],
  templateUrl: './pagination-prev.component.html',
  styleUrl: './pagination-prev.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationPrevComponent {
  ChevronLeft = ChevronLeft;

  disabled = input<boolean>();

  goToPrev = output();
}
