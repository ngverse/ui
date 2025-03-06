import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-table-layout',
  imports: [],
  host: {
    class: 'block',
  },
  template: `<div class="h-[250px] overflow-auto">
      <ng-content select="table[appTable]"></ng-content>
    </div>
    <div>
      <ng-content select="app-table-pagination"></ng-content>
    </div> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableLayoutComponent {}
