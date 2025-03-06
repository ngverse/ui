import { CdkCellOutlet, CdkRow, CdkRowDef } from '@angular/cdk/table';
import { ChangeDetectionStrategy, Component, Directive } from '@angular/core';

@Directive({
  selector: '[appRowDef]',
  providers: [{ provide: CdkRowDef, useExisting: RowDefDirective }],
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [
    { name: 'columns', alias: 'appRowDefColumns' },
    { name: 'when', alias: 'appRowDefWhen' },
  ],
})
export class RowDefDirective<T> extends CdkRowDef<T> {}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tr[app-row]',
  template: `<ng-container cdkCellOutlet></ng-container>`,
  host: {
    class: 'bg-background border-b border-border',
    role: 'row',
  },
  // See note on CdkTable for explanation on why this uses the default change detection strategy.
  // eslint-disable-next-line @angular-eslint/prefer-on-push-component-change-detection
  changeDetection: ChangeDetectionStrategy.Default,
  exportAs: 'appRow',
  providers: [{ provide: CdkRow, useExisting: RowComponent }],
  imports: [CdkCellOutlet],
})
export class RowComponent extends CdkRow {}
