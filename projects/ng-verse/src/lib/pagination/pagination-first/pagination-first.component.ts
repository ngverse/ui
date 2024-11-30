import { Component, input, output } from '@angular/core';
import { LucideAngularModule, ChevronFirst } from 'lucide-angular';

@Component({
  selector: 'app-pagination-first',
  imports: [LucideAngularModule],
  templateUrl: './pagination-first.component.html',
  styleUrl: './pagination-first.component.scss',
})
export class PaginationFirstComponent {
  ChevronFirst = ChevronFirst;

  disabled = input<boolean>();

  goToFirst = output();
}
