import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[tabBody]',
})
export class TabBodyDirective {
  templateRef = inject(TemplateRef<unknown>);
}
