import { Directive, inject, input } from '@angular/core';
import { DrawerRef } from '../drawer/drawer-ref';

@Directive({
  selector: '[appDrawerClose]',
  host: {
    '(click)': 'close()',
  },
})
export class DrawerCloseDirective {
  private readonly drawerRef = inject(DrawerRef);
  value = input<unknown>({ alias: 'appDrawerClose' });
  close() {
    this.drawerRef.close(this.value());
  }
}
