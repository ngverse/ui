import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { zoomInOnEnter } from '@ngverse/motion/animatecss';
import { ButtonComponent } from '../../button/button.component';
import { DialogCloseDirective } from '../dialog-close.directive';

export interface AlertDialogOption {
  title: string;
  description: string;
  buttonLabel?: string;
}

@Component({
  selector: 'app-alert-dialog',
  imports: [DialogCloseDirective, ButtonComponent],
  templateUrl: './alert-dialog.component.html',
  styleUrl: './alert-dialog.component.css',
  animations: [zoomInOnEnter({ duration: 250 })],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertDialogComponent {
  dialogData = inject<AlertDialogOption>(DIALOG_DATA);
  dialogRef = inject(DialogRef);

  get title() {
    return this.dialogData.title;
  }

  get description() {
    return this.dialogData.description;
  }

  get buttonLabel() {
    return this.dialogData.buttonLabel;
  }
}
