import { Component, inject } from '@angular/core';
import { DrawerService } from '@ng-verse/drawer/drawer.service';
import { DrawerTestComponent } from './drawer-test/drawer-test.component';

@Component({
  selector: 'doc-show-case-drawer',
  imports: [],
  templateUrl: './show-case-drawer.component.html',
  styleUrl: './show-case-drawer.component.scss',
})
export class ShowCaseDrawerComponent {
  drawerService = inject(DrawerService);

  open() {
    this.drawerService.open(DrawerTestComponent);
  }
}
