import {
  Directive,
  ElementRef,
  HostBinding,
  inject,
  Input,
} from '@angular/core';

@Directive({
  selector: '[appPopoverTrigger]',
  exportAs: 'appPopoverTrigger',
})
export class PopoverTriggerDirective {
  host = inject<ElementRef<HTMLElement>>(ElementRef);

  @HostBinding('attr.popovertargetaction')
  @Input()
  popovertarget = 'toggle';

  get el() {
    return this.host.nativeElement;
  }

  constructor() {}
}
