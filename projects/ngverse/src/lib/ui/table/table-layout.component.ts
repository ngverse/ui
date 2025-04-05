import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-table-layout',
  imports: [],
  host: {
    class: 'block',
  },
  template: `
    <ng-content select="table[appTable]"></ng-content>
    <div class="sticky bottom-0 bg-background">
      <ng-content select="app-table-pagination"></ng-content>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableLayoutComponent {}
