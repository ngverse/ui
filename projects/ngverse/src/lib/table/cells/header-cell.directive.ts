import { CdkHeaderCell, CdkHeaderCellDef } from '@angular/cdk/table';
import { Directive } from '@angular/core';

@Directive({
  selector: '[appHeaderCellDef]',
  providers: [
    { provide: CdkHeaderCellDef, useExisting: HeaderCellDefDirective },
  ],
})
export class HeaderCellDefDirective extends CdkHeaderCellDef {}

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'th[app-header-cell]',
  host: {
    class: 'px-6 py-3',
    role: 'columnheader',
  },
})
export class HeaderCellDirective extends CdkHeaderCell {}
