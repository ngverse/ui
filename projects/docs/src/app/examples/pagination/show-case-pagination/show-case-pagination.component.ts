import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { PaginationComponent } from 'ng-verse/pagination/pagination.component';

@Component({
  selector: 'doc-show-case-pagination',
  imports: [PaginationComponent],
  templateUrl: './show-case-pagination.component.html',
  styleUrl: './show-case-pagination.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowCasePaginationComponent {
  currentPage = signal(1);
  totalPages = signal(10);

  setPage(page: number) {
    this.currentPage.set(page);
  }
}
