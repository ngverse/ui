import { Directive, inject } from '@angular/core';
import { DrawerRef } from '../drawer/drawer-ref';

@Directive({
  selector: '[appDrawerClose]',
  host: {
    '(click)': 'close()',
  },
})
export class DrawerCloseDirective {
  private readonly drawerRef = inject(DrawerRef);
  close() {
    this.drawerRef.close();
  }
}
