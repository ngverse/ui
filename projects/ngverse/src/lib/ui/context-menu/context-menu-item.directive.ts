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
    class:
      'w-full text-left p-2.5 hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground focus-visible:outline-hidden',
  },
})
export class ContextMenuItemDirective {}
