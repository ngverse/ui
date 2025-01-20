import { Component, inject } from '@angular/core';
import { DrawerService } from '@ng-verse/drawer/drawer.service';
import { DrawerTestComponent } from './drawer-test/drawer-test.component';
import { ButtonComponent } from '@ng-verse/button/button.component';

@Component({
  selector: 'doc-show-case-drawer',
  imports: [ButtonComponent],
  templateUrl: './show-case-drawer.component.html',
  styleUrl: './show-case-drawer.component.scss',
})
export class ShowCaseDrawerComponent {
  drawerService = inject(DrawerService);

  open() {
    this.drawerService.open(DrawerTestComponent);
  }
}
