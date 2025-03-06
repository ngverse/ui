import {
  CdkCellOutlet,
  CdkFooterRow,
  CdkFooterRowDef,
} from '@angular/cdk/table';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  Directive,
} from '@angular/core';

@Directive({
  selector: '[appFooterRowDef]',
  providers: [{ provide: CdkFooterRowDef, useExisting: FooterRowDefDirective }],
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [
    { name: 'columns', alias: 'appFooterRowDef' },
    {
      name: 'sticky',
      alias: 'matFooterRowDefSticky',
      transform: booleanAttribute,
    },
  ],
})
export class FooterRowDefDirective extends CdkFooterRowDef {}

@Component({
  selector: 'app-footer-row, tr[app-footer-row]',
  template: `<ng-container cdkCellOutlet></ng-container>`,
  host: {
    class: 'mat-mdc-footer-row mdc-data-table__row',
    role: 'row',
  },
  // See note on CdkTable for explanation on why this uses the default change detection strategy.
  // eslint-disable-next-line @angular-eslint/prefer-on-push-component-change-detection
  changeDetection: ChangeDetectionStrategy.Default,
  exportAs: 'appFooterRow',
  providers: [{ provide: CdkFooterRow, useExisting: FooterRowComponent }],
  imports: [CdkCellOutlet],
})
export class FooterRowComponent extends CdkFooterRow {}
