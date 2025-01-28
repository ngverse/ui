import { Directive, output } from '@angular/core';

@Directive({
  selector: '[appContextMenuTrigger]',
  exportAs: 'appContextMenuTrigger',
  host: {
    '(contextmenu)': 'onContextMenu($event)',
  },
})
export class ContextMenuTriggerDirective {
  triggered = output<MouseEvent>();

  onContextMenu($event: MouseEvent) {
    this.triggered.emit($event);
  }
}
