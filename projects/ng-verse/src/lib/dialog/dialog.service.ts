import { Dialog } from '@angular/cdk/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AlertDialogComponent,
  AlertDialogOption,
} from './alert-dialog/alert-dialog.component';
import {
  ConfirmDialogComponent,
  ConfirmDialogOptions,
} from './confirm-dialog/confirm-dialog.component';
import { DialogComponent, DialogOptions } from './dialog/dialog.component';

interface DialogReturn<T> {
  close: () => void;
  closed: Observable<T | undefined>;
}

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private dialog = inject(Dialog);
  open(
    component: ComponentType<unknown>,
    options?: Omit<DialogOptions, 'component'>
  ) {
    const disableClose =
      options?.disableClose === undefined ? false : options.disableClose;
    const hasBackdrop =
      options?.hasBackdrop === undefined ? true : options.hasBackdrop;
    const title = options?.title;
    const showClose =
      options?.showClose === undefined ? true : options?.showClose;

    const dialogRef = this.dialog.open<string>(DialogComponent, {
      data: {
        disableClose,
        hasBackdrop,
        title,
        component,
        showClose,
      },
    });
    return { close: dialogRef.close, closed: dialogRef.closed };
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
    return { close: dialogRef.close, closed: dialogRef.closed };
  }

  alert<T>(options: AlertDialogOption): DialogReturn<T> {
    const dialogRef = this.dialog.open<T>(AlertDialogComponent, {
      disableClose: false,
      hasBackdrop: true,
      backdropClass: 'cdk-backdrop-transparent',
      data: {
        buttonLabel: options.buttonLabel ?? 'OK',
        title: options.title,
        description: options.description,
      },
    });
    return { close: dialogRef.close, closed: dialogRef.closed };
  }
}
