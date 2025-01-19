import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DrawerHeaderComponent } from '@ng-verse/drawer/drawer-header/drawer-header.component';
import { DrawerTitleComponent } from '@ng-verse/drawer/drawer-title/drawer-title.component';
import { DrawerSubtitleComponent } from '@ng-verse/drawer/drawer-subtitle/drawer-subtitle.component';
import { DrawerCloseDirective } from '@ng-verse/drawer/drawer-close.directive';
import { ButtonComponent } from '@ng-verse/button/button.component';

@Component({
  selector: 'doc-drawer-test',
  imports: [
    DrawerHeaderComponent,
    DrawerTitleComponent,
    DrawerSubtitleComponent,
    DrawerCloseDirective,
    ButtonComponent,
  ],
  templateUrl: './drawer-test.component.html',
  styleUrl: './drawer-test.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerTestComponent {}
