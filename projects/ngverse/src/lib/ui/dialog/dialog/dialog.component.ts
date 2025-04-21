import { FontIconComponent } from '@/ui/font-icon/font-icon.component';
import { DIALOG_DATA, DialogConfig } from '@angular/cdk/dialog';
import {
  CdkPortalOutlet,
  ComponentPortal,
  ComponentType,
} from '@angular/cdk/portal';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { zoomInOnEnter } from '@ngverse/motion/animatecss';
import { ButtonComponent } from '../../button/button.component';
import { DialogCloseDirective } from '../dialog-close.directive';

export interface DialogOptions
  extends Pick<DialogConfig, 'disableClose' | 'hasBackdrop'> {
  component: ComponentType<unknown>;
  title?: string;
  showClose?: boolean;
}

@Component({
  selector: 'app-dialog',
  imports: [
    CdkPortalOutlet,
    DialogCloseDirective,
    ButtonComponent,
    FontIconComponent,
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [zoomInOnEnter({ duration: 250 })],
})
export class DialogComponent {
  dialogData = inject<DialogOptions>(DIALOG_DATA);
  componentPortal: ComponentPortal<unknown>;

  get showClose() {
    return this.dialogData.showClose;
  }

  get title() {
    return this.dialogData.title;
  }

  constructor() {
    this.componentPortal = new ComponentPortal(this.dialogData.component);
  }
}
