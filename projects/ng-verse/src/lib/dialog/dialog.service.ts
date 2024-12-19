import { Dialog } from '@angular/cdk/dialog';
import { inject, Injectable } from '@angular/core';
import {
  AlertDialogComponent,
  AlertDialogOption,
} from './alert-dialog/alert-dialog.component';
import {
  ConfirmDialogComponent,
  ConfirmDialogOptions,
} from './confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private dialog = inject(Dialog);
  open() {
    // const dialogRef = this.dialog.open<string>(DialogComponent, {
    //   width: '250px',
    // });
  }

  confirm(options: ConfirmDialogOptions) {
    const disableClose =
      options.disableClose === undefined ? false : options.disableClose;
    const hasBackdrop =
      options.hasBackdrop === undefined ? true : options.hasBackdrop;
    const yesLabel = options.yesLabel ?? 'Yes';
    const noLabel = options.noLabel ?? 'No';
    const title = options.title;
    const description = options.description;

    const dialogRef = this.dialog.open<boolean>(ConfirmDialogComponent, {
      data: {
        yesLabel,
        noLabel,
        title,
        description,
      },
      disableClose: disableClose,
      hasBackdrop: hasBackdrop,
    });
    return dialogRef.closed;
  }

  alert(options: AlertDialogOption) {
    const disableClose =
      options.disableClose === undefined ? false : options.disableClose;
    const hasBackdrop =
      options.hasBackdrop === undefined ? true : options.hasBackdrop;
    const buttonLabel = options.buttonLabel ?? 'OK';
    const title = options.title;
    const description = options.description;

    const dialogRef = this.dialog.open<void>(AlertDialogComponent, {
      disableClose: disableClose,
      hasBackdrop: hasBackdrop,

      data: {
        buttonLabel,
        title,
        description,
      },
    });
    return dialogRef.closed;
  }
}
