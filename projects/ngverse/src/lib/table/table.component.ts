import {
  _DisposeViewRepeaterStrategy,
  _VIEW_REPEATER_STRATEGY,
} from '@angular/cdk/collections';
import {
  _COALESCED_STYLE_SCHEDULER,
  _CoalescedStyleScheduler,
  CDK_TABLE,
  CdkTable,
  DataRowOutlet,
  FooterRowOutlet,
  HeaderRowOutlet,
  NoDataRowOutlet,
  STICKY_POSITIONING_LISTENER,
} from '@angular/cdk/table';
import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'table[app-table]',
  imports: [HeaderRowOutlet, DataRowOutlet, NoDataRowOutlet, FooterRowOutlet],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  providers: [
    { provide: CdkTable, useExisting: TableComponent },
    { provide: CDK_TABLE, useExisting: TableComponent },
    { provide: _COALESCED_STYLE_SCHEDULER, useClass: _CoalescedStyleScheduler },
    // TODO(michaeljamesparsons) Abstract the view repeater strategy to a directive API so this code
    //  is only included in the build if used.
    {
      provide: _VIEW_REPEATER_STRATEGY,
      useClass: _DisposeViewRepeaterStrategy,
    },
    // Prevent nested tables from seeing this table's StickyPositioningListener.
    { provide: STICKY_POSITIONING_LISTENER, useValue: null },
  ],
  // See note on CdkTable for explanation on why this uses the default change detection strategy.
  // link: https://github.com/angular/components/blob/main/src/cdk/table/table.ts
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent<T> extends CdkTable<T> {}
