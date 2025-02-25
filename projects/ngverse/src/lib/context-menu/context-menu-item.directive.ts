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
    '[class.app-context-menu-item]': 'true',
  },
})
export class ContextMenuItemDirective {}
