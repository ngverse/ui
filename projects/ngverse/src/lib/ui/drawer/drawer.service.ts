import { Dialog, DialogConfig } from '@angular/cdk/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentType } from '@angular/cdk/portal';
import { inject, Injectable } from '@angular/core';
import { filter, merge, take } from 'rxjs';
import { DRAWER_DATA, DrawerRef } from './drawer-ref';
import { DrawerComponent } from './drawer.component';

interface DrawerConfig
  extends Pick<
    DialogConfig,
    | 'ariaDescribedBy'
    | 'ariaLabel'
    | 'ariaLabelledBy'
    | 'autoFocus'
    | 'injector'
  > {
  data?: unknown;
  title?: string;
}

@Injectable({
  providedIn: 'root',
})
export class DrawerService {
  private readonly overlay = inject(Overlay);
  private readonly dialog = inject(Dialog);

  open(component: ComponentType<unknown>, options?: DrawerConfig) {
    const dialogRef = this.dialog.open(DrawerComponent, {
      disableClose: true,
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .right(),
      providers(dialogRef) {
        return [
          {
            provide: DrawerRef,
            useValue: new DrawerRef(dialogRef),
          },
          { provide: DRAWER_DATA, useValue: options?.data },
        ];
      },
      ...options,
    });
    const instance = dialogRef.componentInstance as DrawerComponent;
    instance.component = component;
    instance.title.set(options?.title);

    const drawerRef = dialogRef.componentRef?.injector.get(
      DrawerRef
    ) as DrawerRef;

    const keydownEvent$ = dialogRef.keydownEvents.pipe(
      filter((event) => event.key === 'Escape')
    );

    const backdropEvent$ = dialogRef.backdropClick;

    merge(keydownEvent$, backdropEvent$)
      .pipe(take(1))
      .subscribe(() => {
        drawerRef.close();
      });

    return drawerRef;
  }
}
