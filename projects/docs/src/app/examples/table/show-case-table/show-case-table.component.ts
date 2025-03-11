import { SortHeaderComponent } from '@/ui/table/sort-header.component';
import { SortDirective } from '@/ui/table/sort.directive';
import { TableLayoutComponent } from '@/ui/table/table-layout.component';
import { TablePaginationComponent } from '@/ui/table/table-pagination.component';
import { TableDirective } from '@/ui/table/table.directive';
import { SortChangeType } from '@/ui/table/table.types';
import { TdDirective } from '@/ui/table/td.directive';
import { ThDirective } from '@/ui/table/th.directive';
import { TrHeadDirective } from '@/ui/table/tr-head.directive';
import { TrDirective } from '@/ui/table/tr.directive';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';

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
    TrHeadDirective,
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
  data = signal(ELEMENT_DATA);
  currentPage = signal(0);
  totalPages = computed(() => Math.ceil(this.data().length / LIMIT));

  selectedRow = signal<PeriodicElement | undefined>(undefined);

  sortChange($event: SortChangeType) {
    console.log($event);
  }

  setPage(page: number) {
    this.currentPage.set(page);
  }

  selectRow($event: PeriodicElement) {
    this.selectedRow.set($event);
  }
}
