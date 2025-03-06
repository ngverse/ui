import { CdkColumnDef } from '@angular/cdk/table';
import { Directive, Input } from '@angular/core';
@Directive({
  selector: '[appColumnDef]',
  providers: [
    { provide: CdkColumnDef, useExisting: ColumnDefDirective },
    { provide: 'SORT_HEADER_COLUMN_DEF', useExisting: ColumnDefDirective },
  ],
})
export class ColumnDefDirective extends CdkColumnDef {
  /** Unique name for this column. */
  @Input('appColumnDef')
  override get name(): string {
    return this._name;
  }
  override set name(name: string) {
    this._setNameInput(name);
  }

  /**
   * Add "mat-column-" prefix in addition to "cdk-column-" prefix.
   * In the future, this will only add "mat-column-" and columnCssClassName
   * will change from type string[] to string.
   * @docs-private
   */
  protected override _updateColumnCssClassName() {
    super._updateColumnCssClassName();
    this._columnCssClassName!.push(`app-column-${this.cssClassFriendlyName}`);
  }
}
