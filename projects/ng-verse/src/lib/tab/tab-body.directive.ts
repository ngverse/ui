import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[appTabBody]',
})
export class TabBodyDirective {
  templateRef = inject(TemplateRef<unknown>);
}
