import { inject, Injectable } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ConfirmComponent, ConfirmOptions } from './confirm/confirm.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private dialog = inject(Dialog);
  open() {
    const dialogRef = this.dialog.open<string>(DialogComponent, {
      width: '250px',
    });
    dialogRef.closed.subscribe((result) => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  confirm(options: ConfirmOptions) {
    const dialogRef = this.dialog.open<string>(ConfirmComponent, {
      width: '250px',
      data: options,
      disableClose: options.disableClose,
      hasBackdrop: options.hasBackdrop,
    });
    return dialogRef.closed;
  }
}
