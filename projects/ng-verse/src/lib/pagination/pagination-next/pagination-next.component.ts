import { Component, input, output } from '@angular/core';
import { LucideAngularModule, ChevronRight } from 'lucide-angular';

@Component({
  selector: 'app-pagination-next',
  imports: [LucideAngularModule],
  templateUrl: './pagination-next.component.html',
  styleUrl: './pagination-next.component.scss',
})
export class PaginationNextComponent {
  ChevronRight = ChevronRight;

  disabled = input<boolean>();

  goToNext = output();
}
