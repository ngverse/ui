import { CdkFooterCell, CdkFooterCellDef } from '@angular/cdk/table';
import { Directive } from '@angular/core';

@Directive({
  selector: '[appFooterCellDef]',
  providers: [
    { provide: CdkFooterCellDef, useExisting: FooterCellDefDirective },
  ],
})
export class FooterCellDefDirective extends CdkFooterCellDef {}

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'td[app-footer-cell]',
  host: {
    class: 'mat-mdc-footer-cell mdc-data-table__cell',
  },
})
export class FooterCellDirective extends CdkFooterCell {}
