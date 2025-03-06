import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[app-sort-header]',
  imports: [],
  templateUrl: './sort-header.component.html',
  styleUrl: './sort-header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortHeaderComponent {}
