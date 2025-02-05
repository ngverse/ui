import { DialogRef } from '@angular/cdk/dialog';
import { InjectionToken } from '@angular/core';
import { DrawerComponent } from './drawer.component';
export const DRAWER_DATA = new InjectionToken<unknown>('DRAWER_DATA');
export class DrawerRef {
  private dialogRef: DialogRef<unknown, DrawerComponent>;

  get closed() {
    return this.dialogRef.closed;
  }

  constructor(dialogRef: DialogRef<unknown, DrawerComponent>) {
    this.dialogRef = dialogRef;
  }

  close(value?: unknown) {
    const instance = this.dialogRef.componentInstance as DrawerComponent;
    instance.onExit.subscribe(() => {
      this.dialogRef.close(value);
    });
    instance.exit();
  }
}
