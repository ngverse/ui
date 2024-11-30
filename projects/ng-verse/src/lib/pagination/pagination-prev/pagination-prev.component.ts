import { Component, input, output } from '@angular/core';
import { LucideAngularModule, ChevronLeft } from 'lucide-angular';

@Component({
  selector: 'app-pagination-prev',
  imports: [LucideAngularModule],
  templateUrl: './pagination-prev.component.html',
  styleUrl: './pagination-prev.component.scss',
})
export class PaginationPrevComponent {
  ChevronLeft = ChevronLeft;

  disabled = input<boolean>();

  goToPrev = output();
}
