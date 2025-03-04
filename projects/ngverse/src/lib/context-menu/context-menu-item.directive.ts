import { CdkMenuItem } from '@angular/cdk/menu';
import { Directive } from '@angular/core';

@Directive({
  selector: '[appContextMenuItem]',
  hostDirectives: [
    {
      directive: CdkMenuItem,
      inputs: ['cdkMenuItemDisabled:disabled'],
    },
  ],
  host: {
    '[class.context-menu-item]': 'true',
  },
})
export class ContextMenuItemDirective {}
