import { Component, input, output } from '@angular/core';
import { LucideAngularModule, ChevronLast } from 'lucide-angular';

@Component({
  selector: 'app-pagination-last',
  imports: [LucideAngularModule],
  templateUrl: './pagination-last.component.html',
  styleUrl: './pagination-last.component.scss',
})
export class PaginationLastComponent {
  ChevronLast = ChevronLast;

  disabled = input<boolean>();

  goToLast = output();
}
