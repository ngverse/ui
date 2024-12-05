import { CdkTrapFocus } from '@angular/cdk/a11y';
import { Component, inject } from '@angular/core';
import { DIALOG_DATA, DialogConfig, DialogRef } from '@angular/cdk/dialog';

export interface ConfirmOptions<T = boolean, K = boolean>
  extends Pick<DialogConfig, 'disableClose' | 'hasBackdrop'> {
  title: string;
  description: string;
  yesLabel?: string;
  noLabel?: string;
}

@Component({
  selector: 'app-confirm',
  imports: [CdkTrapFocus],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.scss',
  host: {
    role: 'dialog',
  },
})
export class ConfirmComponent {
  dialogData = inject<ConfirmOptions>(DIALOG_DATA);
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
