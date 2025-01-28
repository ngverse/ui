import { Directive, inject, input } from '@angular/core';
import { DrawerRef } from './drawer-ref';

@Directive({
  selector: '[appDrawerClose]',
  host: {
    '(click)': 'close()',
  },
})
export class DrawerCloseDirective {
  private readonly drawerRef = inject(DrawerRef);
  value = input<unknown>(undefined, { alias: 'appDrawerClose' });

  close() {
    const value = this.value();
    this.drawerRef.close(value);
  }
}
