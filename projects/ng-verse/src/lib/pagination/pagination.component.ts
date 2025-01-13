import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { PaginationFirstComponent } from './pagination-first/pagination-first.component';
import { PaginationLastComponent } from './pagination-last/pagination-last.component';
import { PaginationNextComponent } from './pagination-next/pagination-next.component';
import { PaginationNumbersComponent } from './pagination-numbers/pagination-numbers.component';
import { PaginationPrevComponent } from './pagination-prev/pagination-prev.component';

@Component({
  selector: 'app-pagination',
  imports: [
    PaginationPrevComponent,
    PaginationNextComponent,
    PaginationNumbersComponent,
    PaginationLastComponent,
    PaginationFirstComponent,
  ],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  pageSize = input.required<number>();

  pageChange = output<number>();

  currentPage = input<number>(1);

  goToPrev = output<number>();

  goToNext = output<number>();

  pageWindow = input<number>(5);

  hasPrev = computed(() => {
    return this.currentPage() - 1 >= 1;
  });

  hasNext = computed(() => {
    return this.currentPage() + 1 <= this.pageSize();
  });

  pages = computed(() => {
    const pageWindow = this.pageWindow();
    const perSideWindow = Math.floor(pageWindow / 2);
    const currentPage = this.currentPage();
    const pageSize = this.pageSize();
    const leftWindow = currentPage - perSideWindow;
    const rightWindow = currentPage + perSideWindow;

    const leftSide = Math.max(leftWindow, 1);
    const rightSide = Math.min(rightWindow, pageSize);

    const pages = [];
    for (let i = leftSide; i <= rightSide; i++) {
      pages.push(i);
    }
    return pages;
  });
}
