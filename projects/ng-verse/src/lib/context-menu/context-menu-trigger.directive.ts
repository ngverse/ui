import { Directive, HostListener, output } from '@angular/core';

@Directive({
  selector: '[appContextMenuTrigger]',
  exportAs: 'appContextMenuTrigger',
})
export class ContextMenuTriggerDirective {
  openTriggered = output<MouseEvent>();
  @HostListener('contextmenu', ['$event'])
  onClick($event: MouseEvent) {
    this.openTriggered.emit($event);
  }
}
