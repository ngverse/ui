import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-pagination-numbers',
  imports: [],
  templateUrl: './pagination-numbers.component.html',
  styleUrl: './pagination-numbers.component.scss',
})
export class PaginationNumbersComponent {
  pageChange = output<number>();

  pages = input.required<number[]>();

  currentPage = input.required<number>();
}
