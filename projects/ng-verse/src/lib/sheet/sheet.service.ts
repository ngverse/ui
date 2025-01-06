import { inject, Injectable, Injector } from '@angular/core';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { SheetBodyComponent } from '@ng-verse/sheet/sheet-body/sheet-body.component';
import { SheetRef } from './sheet-ref';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SheetService {
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

    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .bottom();

    overlayRef = this.overlay.create({ positionStrategy, hasBackdrop: true, scrollStrategy: this.overlay.scrollStrategies.block() });
    subs.add(overlayRef.backdropClick().subscribe(() => close()));

    const customInjector = Injector.create({
      providers: [
        { provide: SheetRef, useFactory: () => new SheetRef(overlayRef) },
      ]
    });

    const overlayPortal = new ComponentPortal(SheetBodyComponent, null, customInjector);
    const ref = overlayRef.attach(overlayPortal);
    ref.setInput('component', component);
    ref.setInput('data', data);

    subs.add(ref.instance.close.subscribe(() => close()));
  }
}
