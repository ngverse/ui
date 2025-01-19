import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-drawer-title',
  imports: [],
  templateUrl: './drawer-title.component.html',
  styleUrl: './drawer-title.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerTitleComponent {}
