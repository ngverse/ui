import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DrawerCloseDirective } from '@ng-verse/drawer/drawer-close.directive';
import { DrawerHeaderComponent } from '@ng-verse/drawer/drawer-header/drawer-header.component';
import { DrawerSubtitleComponent } from '@ng-verse/drawer/drawer-subtitle/drawer-subtitle.component';
import { DrawerTitleComponent } from '@ng-verse/drawer/drawer-title/drawer-title.component';
import { ButtonComponent } from '@ng-verse/button/button.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckboxComponent } from '@ng-verse/checkbox/checkbox.component';

@Component({
  selector: 'doc-drawer-test',
  imports: [
    DrawerHeaderComponent,
    DrawerTitleComponent,
    DrawerSubtitleComponent,
    DrawerCloseDirective,
    ButtonComponent,
    ReactiveFormsModule,
    CheckboxComponent,
  ],
  templateUrl: './drawer-test.component.html',
  styleUrl: './drawer-test.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerTestComponent {
  protected readonly close = close;
}
