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
  private _dialogService = inject(Dialog);
  dialog<T>(
    component: ComponentType<unknown>,
    options?: Omit<DialogOptions, 'component'>
  ): DialogReturn<T> {
    const title = options?.title;
    const showClose =
      options?.showClose === undefined ? true : options?.showClose;

    const dialogRef = this._dialogService.open<T>(DialogComponent, {
      ...options,
      data: {
        title,
        component,
        showClose,
      },
    });
    return { close: dialogRef.close, closed: dialogRef.closed };
  }

  confirm(options: ConfirmDialogOptions): DialogReturn<boolean> {
    const yesLabel = options.yesLabel ?? 'Yes';
    const noLabel = options.noLabel ?? 'No';
    const title = options.title;
    const description = options.description;

    const dialogRef = this._dialogService.open<boolean>(
      ConfirmDialogComponent,
      {
        data: {
          yesLabel,
          noLabel,
          title,
          description,
        },
        disableClose: false,
        hasBackdrop: true,
      }
    );
    return { close: dialogRef.close, closed: dialogRef.closed };
  }

  alert<T>(options: AlertDialogOption): DialogReturn<T> {
    const dialogRef = this._dialogService.open<T>(AlertDialogComponent, {
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
