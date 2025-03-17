import { ButtonComponent } from '@/ui/button/button.component';
import { DIALOG_DATA, DialogConfig } from '@angular/cdk/dialog';
import {
  CdkPortalOutlet,
  ComponentPortal,
  ComponentType,
} from '@angular/cdk/portal';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { matClose } from '@ng-icons/material-icons/baseline';
import { zoomInOnEnter } from '@ngverse/motion/animatecss';
import { DialogCloseDirective } from '../dialog-close.directive';

export interface DialogOptions
  extends Pick<DialogConfig, 'disableClose' | 'hasBackdrop'> {
  component: ComponentType<unknown>;
  title?: string;
  showClose?: boolean;
}

@Component({
  selector: 'app-dialog',
  imports: [CdkPortalOutlet, DialogCloseDirective, ButtonComponent, NgIcon],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [zoomInOnEnter({ duration: 250 })],
})
export class DialogComponent {
  dialogData = inject<DialogOptions>(DIALOG_DATA);
  componentPortal: ComponentPortal<unknown>;
  CLOSE_ICON = matClose;

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
