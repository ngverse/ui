import { CdkNoDataRow } from '@angular/cdk/table';
import { Directive } from '@angular/core';

@Directive({
  selector: 'ng-template[appNoDataRow]',
  providers: [{ provide: CdkNoDataRow, useExisting: NoDataRowDirective }],
})
export class NoDataRowDirective extends CdkNoDataRow {
  override _contentClassName = 'mat-mdc-no-data-row';
}
