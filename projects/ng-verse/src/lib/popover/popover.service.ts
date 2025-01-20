import { Injectable, ViewContainerRef } from '@angular/core';
import { PopoverOriginDirective } from './popover-origin.directive';
import { PopoverComponent } from './popover.component';

@Injectable({
  providedIn: 'root',
})
export class PopoverService {
  open(host: PopoverOriginDirective, vf: ViewContainerRef) {
    const comp = vf.createComponent(PopoverComponent);
    comp.setInput('origin', host);
  }
}
