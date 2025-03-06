import {
  CdkCellOutlet,
  CdkHeaderRow,
  CdkHeaderRowDef,
} from '@angular/cdk/table';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  Directive,
} from '@angular/core';

@Directive({
  selector: '[appHeaderRowDef]',
  providers: [{ provide: CdkHeaderRowDef, useExisting: HeaderRowDefDirective }],
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [
    { name: 'columns', alias: 'appHeaderRowDef' },
    {
      name: 'sticky',
      alias: 'appHeaderRowDefSticky',
      transform: booleanAttribute,
    },
  ],
})
export class HeaderRowDefDirective extends CdkHeaderRowDef {}

@Component({
  selector: 'app-header-row, tr[app-header-row]',
  template: `<ng-container cdkCellOutlet></ng-container>`,
  host: {
    class: 'text-xs text-left text-on-surface uppercase bg-surface',
    role: 'row',
  },
  // See note on CdkTable for explanation on why this uses the default change detection strategy.
  // eslint-disable-next-line @angular-eslint/prefer-on-push-component-change-detection
  changeDetection: ChangeDetectionStrategy.Default,
  exportAs: 'appHeaderRow',
  providers: [{ provide: CdkHeaderRow, useExisting: HeaderRowComponent }],
  imports: [CdkCellOutlet],
})
export class HeaderRowComponent extends CdkHeaderRow {}
