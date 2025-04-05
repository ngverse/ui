import { CdkContextMenuTrigger } from '@angular/cdk/menu';
import { Directive } from '@angular/core';

@Directive({
  selector: '[appContextMenuTrigger]',
  exportAs: 'appContextMenuTrigger',
  hostDirectives: [
    {
      directive: CdkContextMenuTrigger,
      inputs: ['cdkContextMenuTriggerFor:appContextMenuTrigger'],
    },
  ],
})
export class ContextMenuTriggerDirective {}
