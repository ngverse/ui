import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { PaginationPrevIconComponent } from 'ng-verse/pagination/pagination-prev-icon.component';
import { PaginationNextIconComponent } from 'ng-verse/pagination/pagination-next-icon.component';

// We will keep always 7 visible items so it will prevent the width of the pagination from changing
const ALWAYS_VISIBLE_ITEMS = 7;

const ELLIPSIS = '...';

function getPagination(totalPages: number, currentPage: number) {
  const pages = [];

  if (totalPages <= ALWAYS_VISIBLE_ITEMS) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  pages.push(1);

  if (currentPage > 4) {
    pages.push(ELLIPSIS);
  }

  let start = Math.max(2, currentPage - 1);
  let end = Math.min(totalPages - 1, currentPage + 1);

  // If the current page is close to the start, show the first 5 also same for the end
  if (currentPage <= 4) {
    start = 2;
    end = 5;
  } else if (currentPage >= totalPages - 3) {
    start = totalPages - 4;
    end = totalPages - 1;
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (currentPage < totalPages - 3) {
    pages.push(ELLIPSIS);
  }

  pages.push(totalPages);

  return pages;
}

@Component({
  selector: 'app-pagination',
  imports: [PaginationPrevIconComponent, PaginationNextIconComponent],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  currentPage = input.required<number>();
  totalPages = input.required<number>();

  pageChange = output<number>();

  ELLIPSIS = ELLIPSIS;

  visiblePages = computed(() => {
    return getPagination(this.totalPages(), this.currentPage());
  });

  prevPage() {
    this.pageChange.emit(this.currentPage() - 1);
  }

  nextPage() {
    this.pageChange.emit(this.currentPage() + 1);
  }

  setPage(page: number) {
    this.pageChange.emit(page);
  }

  hasNextPage() {
    return this.currentPage() < this.totalPages();
  }

  hasPrevPage() {
    return this.currentPage() > 1;
  }
}
