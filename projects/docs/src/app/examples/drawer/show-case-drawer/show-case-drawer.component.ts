import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '@/ui/button/button.component';
import { CheckboxComponent } from '@/ui/checkbox/checkbox.component';
import { DrawerCloseDirective } from '@/ui/drawer/drawer-close.directive';
import { DRAWER_DATA } from '@/ui/drawer/drawer-ref';
import { DrawerService } from '@/ui/drawer/drawer.service';

@Component({
  selector: 'doc-show-case-drawer',
  imports: [ButtonComponent],
  templateUrl: './show-case-drawer.component.html',
  styleUrl: './show-case-drawer.component.css',
})
export class ShowCaseDrawerComponent {
  drawerService = inject(DrawerService);

  open() {
    this.drawerService.open(DrawerTestComponent, {
      title: 'Edit Notification',
      data: {
        name: 'John Doe',
      },
    });
  }
}

@Component({
  selector: 'doc-drawer-test',
  imports: [
    DrawerCloseDirective,
    ButtonComponent,
    ReactiveFormsModule,
    CheckboxComponent,
  ],
  styles: `
    .footer {
      display: flex;
      justify-content: space-between;
      margin-top: 12px;
    }

    form {
      display: flex;
      flex-direction: column;
      row-gap: 12px;
    }
  `,
  template: `<form>
    <p>Hello {{ data.name }}</p>
    <app-checkbox>Receive newsletter</app-checkbox>
    <app-checkbox>Allow data analytics</app-checkbox>
    <app-checkbox>Enable push notifications</app-checkbox>
    <div class="footer">
      <button type="button" appButton variant="outline" appDrawerClose>
        Close
      </button>
      <button type="button" appButton [appDrawerClose]="'test'">Update</button>
    </div>
  </form> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerTestComponent {
  data = inject<{ name: string }>(DRAWER_DATA);
}
