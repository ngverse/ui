import { DIALOG_DATA, DialogConfig, DialogRef } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';

export interface ConfirmDialogOptions<T = boolean, K = boolean>
  extends Pick<DialogConfig, 'disableClose' | 'hasBackdrop'> {
  title: string;
  description: string;
  yesLabel?: string;
  noLabel?: string;
}

@Component({
  selector: 'app-confirm-dialog',
  imports: [],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss',
})
export class ConfirmDialogComponent {
  dialogData = inject<ConfirmDialogOptions>(DIALOG_DATA);
  dialogRef = inject(DialogRef);

  get title() {
    return this.dialogData.title;
  }

  get description() {
    return this.dialogData.description;
  }

  get yesLabel() {
    return this.dialogData.yesLabel ?? 'Yes';
  }

  get noLabel() {
    return this.dialogData.noLabel ?? 'No';
  }

  yes() {
    this.dialogRef.close(true);
    this.dialogRef.close();
  }

  no() {
    this.dialogRef.close(false);
    this.dialogRef.close();
  }
}
