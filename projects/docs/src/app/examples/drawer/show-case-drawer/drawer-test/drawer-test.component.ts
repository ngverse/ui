import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '@ng-verse/button/button.component';
import { CheckboxComponent } from '@ng-verse/checkbox/checkbox.component';
import { DrawerCloseDirective } from '@ng-verse/drawer/drawer-close.directive';
import { DRAWER_DATA } from '@ng-verse/drawer/drawer-ref';

@Component({
  selector: 'doc-drawer-test',
  imports: [
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
  data = inject<{ name: string }>(DRAWER_DATA);
}
