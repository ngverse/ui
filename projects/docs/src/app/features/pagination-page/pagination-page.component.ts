import { Component, input, signal } from '@angular/core';
import { PaginationComponent } from '../../../../../ng-verse/src/lib/pagination/pagination.component';
import { BlueprintPageComponent } from '../../blueprint/blueprint-page/blueprint-page.component';
import { ShowCaseComponent } from '../../blueprint/show-case/show-case.component';

@Component({
  selector: 'doc-pagination-page',
  imports: [PaginationComponent, BlueprintPageComponent, ShowCaseComponent],
  templateUrl: './pagination-page.component.html',
  styleUrl: './pagination-page.component.scss',
})
export class PaginationPageComponent {
  currentPage = signal<number>(1);

  pageChange($event: number) {
    this.currentPage.set($event);
  }
}
