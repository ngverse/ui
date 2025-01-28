import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { ChevronLast, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-pagination-last',
  imports: [LucideAngularModule],
  templateUrl: './pagination-last.component.html',
  styleUrl: './pagination-last.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationLastComponent {
  ChevronLast = ChevronLast;

  disabled = input<boolean>();

  goToLast = output();
}
