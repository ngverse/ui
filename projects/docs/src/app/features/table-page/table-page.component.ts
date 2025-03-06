import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BlueprintPageComponent } from '../../blueprint/blueprint-page/blueprint-page.component';
import { ShowCaseComponent } from '../../blueprint/show-case/show-case.component';
import { ShowCaseTableComponent } from '../../examples/table/show-case-table/show-case-table.component';

@Component({
  selector: 'doc-table-page',
  imports: [BlueprintPageComponent, ShowCaseComponent, ShowCaseTableComponent],
  templateUrl: './table-page.component.html',
  styleUrl: './table-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TablePageComponent {}
