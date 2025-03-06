import { CdkCell, CdkCellDef } from '@angular/cdk/table';
import { Directive } from '@angular/core';

@Directive({
  selector: '[appCellDef]',
  providers: [{ provide: CdkCellDef, useExisting: CellDefDirective }],
})
export class CellDefDirective extends CdkCellDef {}

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'td[app-cell]',
  host: {
    class: 'px-6 py-3',
  },
})
export class CellDirective extends CdkCell {}
