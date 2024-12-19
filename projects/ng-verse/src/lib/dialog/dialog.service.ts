import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { inject, Injectable } from '@angular/core';
import { filter, merge, take } from 'rxjs';
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
    const dialogRef = this.dialog.open<string>(ConfirmDialogComponent, {
      width: '250px',
      data: options,
      disableClose: options.disableClose,
      hasBackdrop: options.hasBackdrop,
    });
    return dialogRef.closed;
  }

  alert(options: AlertDialogOption) {
    const disableClose =
      options.disableClose === undefined ? true : options.disableClose;
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
    this.closeOnAction(dialogRef);
    return dialogRef.closed;
  }

  private closeOnAction<T>(dialogRef: DialogRef<T, unknown>) {
    merge(
      dialogRef.backdropClick,
      dialogRef.keydownEvents.pipe(filter((event) => event.key === 'Escape'))
    )
      .pipe(take(1))
      .subscribe(() => {
        dialogRef.close();
      });
  }
}
