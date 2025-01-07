import { CdkScrollable } from '@angular/cdk/scrolling';
import { Directive } from '@angular/core';

@Directive({
  selector: '[appPopoverScroll]',
  hostDirectives: [CdkScrollable],
})
export class PopoverScrollDirective {}
