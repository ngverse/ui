import { CdkTextColumn } from '@angular/cdk/table';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CellDefDirective } from '../cells/cell-def.directive';
import { CellDirective } from '../cells/cell.directive';
import { ColumnDefDirective } from '../cells/column-def.directive';
import { HeaderCellDefDirective } from '../cells/header-cell-def.directive';
import { HeaderCellDirective } from '../cells/header-cell.directive';

@Component({
  selector: 'app-text-column',
  template: `
    <ng-container appColumnDef>
      <th app-header-cell *appHeaderCellDef [style.text-align]="justify">
        {{ headerText }}
      </th>
      <td app-cell *appCellDef="let data" [style.text-align]="justify">
        {{ dataAccessor(data, name) }}
      </td>
    </ng-container>
  `,
  // Change detection is intentionally not set to OnPush. This component's template will be provided
  // to the table to be inserted into its view. This is problematic when change detection runs since
  // the bindings in this template will be evaluated _after_ the table's view is evaluated, which
  // mean's the template in the table's view will not have the updated value (and in fact will cause
  // an ExpressionChangedAfterItHasBeenCheckedError).
  // eslint-disable-next-line @angular-eslint/prefer-on-push-component-change-detection
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [
    ColumnDefDirective,
    HeaderCellDefDirective,
    HeaderCellDirective,
    CellDefDirective,
    CellDirective,
  ],
})
export class TextColumnComponent<T> extends CdkTextColumn<T> {}
