import {
  CellDefDirective,
  CellDirective,
} from '@/ui/table/cells/cell.directive';
import { ColumnDefDirective } from '@/ui/table/cells/column-def.directive';
import {
  FooterCellDefDirective,
  FooterCellDirective,
} from '@/ui/table/cells/footer-cell.directive';
import {
  HeaderCellDefDirective,
  HeaderCellDirective,
} from '@/ui/table/cells/header-cell.directive';
import {
  FooterRowComponent,
  FooterRowDefDirective,
} from '@/ui/table/rows/footer-row.component';
import {
  HeaderRowComponent,
  HeaderRowDefDirective,
} from '@/ui/table/rows/header-row.component';
import { RowComponent, RowDefDirective } from '@/ui/table/rows/row.component';
import { SortHeaderComponent } from '@/ui/table/sort/sort-header/sort-header.component';
import { TableComponent } from '@/ui/table/table.component';
import { DataSource } from '@angular/cdk/collections';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

export class ExampleDataSource extends DataSource<PeriodicElement> {
  /** Stream of data that is provided to the table. */
  data = new BehaviorSubject<PeriodicElement[]>(ELEMENT_DATA);

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<PeriodicElement[]> {
    return this.data;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  disconnect() {}
}

@Component({
  selector: 'doc-show-case-table',
  imports: [
    TableComponent,
    ColumnDefDirective,
    HeaderCellDirective,
    HeaderCellDefDirective,
    CellDirective,
    CellDefDirective,
    HeaderRowDefDirective,
    RowComponent,
    HeaderRowComponent,
    RowDefDirective,
    FooterCellDirective,
    FooterCellDefDirective,
    FooterRowDefDirective,
    FooterRowComponent,
    SortHeaderComponent,
  ],
  templateUrl: './show-case-table.component.html',
  styleUrl: './show-case-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowCaseTableComponent {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new ExampleDataSource();
}
