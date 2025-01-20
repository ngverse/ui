import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { inject, Injectable, Injector } from '@angular/core';
import { Subscription } from 'rxjs';
import { DrawerRef } from '../drawer/drawer-ref';
import { DrawerComponent } from '../drawer/drawer/drawer.component';

@Injectable({
  providedIn: 'root',
})
export class DrawerService {
  private readonly overlay = inject(Overlay);

  open(component: ComponentType<unknown>, data?: Record<string, unknown>) {
    let overlayRef: OverlayRef | null = null;
    const subs = new Subscription();

    function close() {
      if (overlayRef) {
        overlayRef.detach();
        overlayRef = null;
        subs.unsubscribe();
      }
    }

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
    subs.add(overlayRef.backdropClick().subscribe(() => close()));

    const customInjector = Injector.create({
      providers: [
        { provide: DrawerRef, useFactory: () => new DrawerRef(overlayRef) },
      ],
    });

    const overlayPortal = new ComponentPortal(
      DrawerComponent,
      null,
      customInjector
    );
    const ref = overlayRef.attach(overlayPortal);
    ref.setInput('component', component);
    ref.setInput('data', data);

    subs.add(ref.instance.close.subscribe(() => close()));
  }
}
