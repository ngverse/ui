import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { inject, Injectable, Injector } from '@angular/core';
import { filter, merge, Subscription, take } from 'rxjs';
import { DRAWER_DATA, DrawerRef } from '../drawer/drawer-ref';
import { DrawerComponent } from '../drawer/drawer/drawer.component';

@Injectable({
  providedIn: 'root',
})
export class DrawerService {
  private readonly overlay = inject(Overlay);

  open(
    component: ComponentType<unknown>,
    options?: {
      data?: unknown;
      title?: string;
    }
  ) {
    let overlayRef: OverlayRef | null = null;
    const subs = new Subscription();

    const positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .right();

    overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true,
      scrollStrategy: this.overlay.scrollStrategies.block(),
    });
    const drawerRef = new DrawerRef(overlayRef);

    subs.add(
      merge(
        overlayRef
          .keydownEvents()
          .pipe(filter((event) => event.key === 'Escape')),
        overlayRef.backdropClick()
      )
        .pipe(take(1))
        .subscribe(() => drawerRef.close())
    );

    const customInjector = Injector.create({
      providers: [
        { provide: DrawerRef, useValue: drawerRef },
        { provide: DRAWER_DATA, useValue: options?.data },
        { provide: OverlayRef, useValue: overlayRef },
      ],
    });

    const overlayPortal = new ComponentPortal(
      DrawerComponent,
      null,
      customInjector
    );
    const ref = overlayRef.attach(overlayPortal);
    ref.instance.component = component;
    ref.instance.title.set(options?.title);
  }
}
