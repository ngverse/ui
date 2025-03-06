import { HeadTrDirective } from '@/ui/table/head-tr.directive';
import { SortHeaderComponent } from '@/ui/table/sort-header.component';
import { SortDirective } from '@/ui/table/sort.directive';
import { TableLayoutComponent } from '@/ui/table/table-layout.component';
import { TableLocalSource } from '@/ui/table/table-local-source';
import { TablePaginationComponent } from '@/ui/table/table-pagination.component';
import { TableDirective } from '@/ui/table/table.directive';
import { SortChangeType } from '@/ui/table/table.types';
import { TdDirective } from '@/ui/table/td.directive';
import { ThDirective } from '@/ui/table/th.directive';
import { TrDirective } from '@/ui/table/tr.directive';
import { ChangeDetectionStrategy, Component } from '@angular/core';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const LIMIT = 30;

const elementNames = [
  'Hydrogen',
  'Helium',
  'Lithium',
  'Beryllium',
  'Boron',
  'Carbon',
  'Nitrogen',
  'Oxygen',
  'Fluorine',
  'Neon',
];
const elementSymbols = ['H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne'];

export function generatePeriodicElements(count = 500): PeriodicElement[] {
  const elements: PeriodicElement[] = [];

  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * elementNames.length);
    elements.push({
      name: elementNames[randomIndex],
      position: i + 1,
      weight: parseFloat((Math.random() * 200).toFixed(2)),
      symbol: elementSymbols[randomIndex],
    });
  }

  return elements;
}

// Example usage
const ELEMENT_DATA = generatePeriodicElements();

@Component({
  selector: 'doc-show-case-table',
  imports: [
    SortDirective,
    TableDirective,
    TrDirective,
    TdDirective,
    ThDirective,
    HeadTrDirective,
    TableLayoutComponent,
    SortHeaderComponent,
    SortDirective,
    TablePaginationComponent,
  ],
  templateUrl: './show-case-table.component.html',
  styleUrl: './show-case-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowCaseTableComponent {
  // data = signal(ELEMENT_DATA);
  // currentPage = signal(0);
  // totalPages = computed(() => Math.ceil(this.data().length / LIMIT));

  tableLocalSource = new TableLocalSource({ limit: LIMIT, data: ELEMENT_DATA });

  currentPage = this.tableLocalSource.currentPage;
  totalPages = this.tableLocalSource.totalPages;
  data = this.tableLocalSource.data;

  sortChange($event: SortChangeType) {
    this.tableLocalSource.sort($event);
  }

  setPage(page: number) {
    this.tableLocalSource.setPage(page);
  }
}
