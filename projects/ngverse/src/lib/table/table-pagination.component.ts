import { ButtonComponent } from '@/ui/button/button.component';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'app-table-pagination',
  imports: [ButtonComponent],
  templateUrl: './table-pagination.component.html',
  styleUrl: './table-pagination.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'sticky bottom-0',
  },
})
export class TablePaginationComponent {
  currentPage = input.required<number>();
  totalPages = input.required<number>();
  ariaLabel = input<string>();
  prevPageAriaLabel = input<string>('Previus Page');
  nextPageAriaLabel = input<string>('Next Page');
  pageAriaLabel = input<string>('Page ');

  pageChange = output<number>();

  hasNextPage = computed(() => this.currentPage() < this.totalPages());

  hasPrevPage = computed(() => this.currentPage() > 0);

  pages = computed(() =>
    Array.from({ length: this.totalPages() }, (_, i) => i + 1)
  );

  firstPage() {
    this.pageChange.emit(0);
  }

  lastPage() {
    this.pageChange.emit(this.totalPages());
  }

  prevPage() {
    this.pageChange.emit(this.currentPage() - 1);
  }

  nextPage() {
    this.pageChange.emit(this.currentPage() + 1);
  }

  setPage(page: number) {
    this.pageChange.emit(page);
  }
}
