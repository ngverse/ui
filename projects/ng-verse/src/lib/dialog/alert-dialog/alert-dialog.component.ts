import { CdkTrapFocus } from '@angular/cdk/a11y';
import { DIALOG_DATA, DialogConfig, DialogRef } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DIALOG_ENTER_ANIMATION } from '../dialog-animations';
import { DialogCloseDirective } from '../dialog-close.directive';

export interface AlertDialogOption
  extends Pick<DialogConfig, 'disableClose' | 'hasBackdrop'> {
  title: string;
  description: string;
  buttonLabel?: string;
}

@Component({
  selector: 'app-alert-dialog',
  imports: [CdkTrapFocus, DialogCloseDirective],
  templateUrl: './alert-dialog.component.html',
  styleUrl: './alert-dialog.component.scss',
  animations: [DIALOG_ENTER_ANIMATION],
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
